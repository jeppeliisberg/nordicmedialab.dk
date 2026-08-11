import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';

const MAX = 120;
const field =
  'w-full rounded-xl border border-black/15 px-4 py-2.5 font-sans text-[#1D1F29] focus:outline-none focus:border-[#39A97C]';
const labelCls = 'block font-sans font-semibold text-sm text-[#1D1F29] mb-1';
const helpCls = 'text-xs text-neutral-500 mt-1';

const emptyContact = () => ({ id: null, name: '', email: '', phone: '', title: '' });

export default function UpdateMember() {
  const { t } = useTranslation();
  const token = new URLSearchParams(window.location.search).get('token') || '';
  // status: loading | invalid | notfound | ready | saving | done | error
  const [status, setStatus] = useState(token ? 'loading' : 'invalid');
  const [data, setData] = useState(null);
  const [logoFile, setLogoFile] = useState(null);

  useEffect(() => {
    if (!token) return;
    fetch(`/.netlify/functions/member-get?token=${encodeURIComponent(token)}`)
      .then(async (r) => {
        if (r.status === 404) return setStatus('notfound');
        if (!r.ok) return setStatus('error');
        const d = await r.json();
        setData({
          name: d.name || '',
          type: d.type || '',
          descriptionEN: d.descriptionEN || '',
          descriptionDA: d.descriptionDA || '',
          website: d.website || '',
          logoUrl: d.logoUrl || '',
          contacts: d.contacts && d.contacts.length ? d.contacts.map((c) => ({ ...c })) : [emptyContact()],
        });
        return setStatus('ready');
      })
      .catch(() => setStatus('error'));
  }, [token]);

  const set = (k, v) => setData((d) => ({ ...d, [k]: v }));
  const setContact = (i, k, v) =>
    setData((d) => ({ ...d, contacts: d.contacts.map((c, j) => (j === i ? { ...c, [k]: v } : c)) }));
  const addContact = () => setData((d) => ({ ...d, contacts: [...d.contacts, emptyContact()] }));
  const removeContact = (i) => setData((d) => ({ ...d, contacts: d.contacts.filter((_, j) => j !== i) }));

  const readLogo = (file) =>
    new Promise((resolve) => {
      if (!file) return resolve(null);
      const reader = new FileReader();
      reader.onload = () =>
        resolve({ filename: file.name, contentType: file.type, dataBase64: String(reader.result).split(',')[1] });
      reader.onerror = () => resolve(null);
      reader.readAsDataURL(file);
    });

  const submit = async (e) => {
    e.preventDefault();
    setStatus('saving');
    try {
      const logo = await readLogo(logoFile);
      const r = await fetch('/.netlify/functions/member-update', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          token,
          name: data.name,
          type: data.type,
          descriptionEN: data.descriptionEN,
          descriptionDA: data.descriptionDA,
          website: data.website,
          contacts: data.contacts,
          ...(logo ? { logo } : {}),
        }),
      });
      if (!r.ok) return setStatus('error');
      return setStatus('done');
    } catch {
      return setStatus('error');
    }
  };

  return (
    <div className="min-h-screen bg-[#FEFBF4] text-[#1D1F29] flex flex-col items-center px-4 py-10">
      <div className="w-full max-w-xl">
        <a href="/" className="inline-block mb-8">
          <img src="/LogoRed.svg" alt="Nordic Media Lab" className="h-8 w-auto" />
        </a>

        {status === 'invalid' && <p className="text-neutral-600 font-sans">{t('update.invalid')}</p>}
        {status === 'notfound' && <p className="text-neutral-600 font-sans">{t('update.notFound')}</p>}
        {status === 'loading' && <p className="text-neutral-600 font-sans">{t('update.loading')}</p>}
        {status === 'error' && !data && <p className="text-neutral-600 font-sans">{t('update.error')}</p>}

        {status === 'done' && (
          <div>
            <h1 className="font-serif text-3xl font-bold mb-2">{t('update.savedTitle')}</h1>
            <p className="text-neutral-600">{t('update.savedBody')}</p>
          </div>
        )}

        {(status === 'ready' || status === 'saving' || status === 'error') && data && (
          <form onSubmit={submit} className="flex flex-col gap-4">
            <h1 className="font-serif text-3xl md:text-4xl font-bold">{t('update.title')}</h1>
            <p className="text-neutral-600 mb-2">{t('update.intro')}</p>

            <div>
              <label className={labelCls}>{t('update.type')}</label>
              <select className={field} value={data.type} onChange={(e) => set('type', e.target.value)}>
                <option value="">{t('update.typePlaceholder')}</option>
                <option value="Platform">{t('submit.typePlatform')}</option>
                <option value="Organisation">{t('submit.typeOrganization')}</option>
                <option value="Consultant">{t('submit.typeConsultant')}</option>
                <option value="Other">{t('submit.typeOther')}</option>
              </select>
            </div>

            <div>
              <label className={labelCls}>{t('update.name')}</label>
              <input className={field} value={data.name} onChange={(e) => set('name', e.target.value)} />
            </div>

            <div>
              <label className={labelCls}>{t('update.descriptionEN')}</label>
              <textarea
                className={field + ' resize-none'}
                rows={3}
                maxLength={MAX}
                value={data.descriptionEN}
                onChange={(e) => set('descriptionEN', e.target.value)}
              />
              <div className="flex justify-between gap-3">
                <span className={helpCls}>{t('update.descriptionHelp')}</span>
                <span className={helpCls}>{data.descriptionEN.length}/{MAX}</span>
              </div>
            </div>

            <div>
              <label className={labelCls}>{t('update.descriptionDA')}</label>
              <textarea
                className={field + ' resize-none'}
                rows={3}
                maxLength={MAX}
                value={data.descriptionDA}
                onChange={(e) => set('descriptionDA', e.target.value)}
              />
              <div className="flex justify-between gap-3">
                <span className={helpCls}>{t('update.descriptionHelp')}</span>
                <span className={helpCls}>{data.descriptionDA.length}/{MAX}</span>
              </div>
            </div>

            <div>
              <label className={labelCls}>{t('update.website')}</label>
              <input
                className={field}
                value={data.website}
                placeholder="https://"
                onChange={(e) => set('website', e.target.value)}
              />
            </div>

            <div>
              <label className={labelCls}>{t('update.logo')}</label>
              {data.logoUrl && (
                <div className="flex items-center gap-3 mb-2">
                  <img src={data.logoUrl} alt="" className="h-10 w-auto object-contain" />
                  <span className="text-xs text-neutral-500">{t('update.logoCurrent')}</span>
                </div>
              )}
              <input
                type="file"
                accept=".svg,.png,image/svg+xml,image/png"
                onChange={(e) => setLogoFile((e.target.files && e.target.files[0]) || null)}
                className="block w-full text-sm text-neutral-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#39A97C] file:text-white file:font-semibold hover:file:brightness-105"
              />
              <div className={helpCls}>{t('update.logoHelp')}</div>
            </div>

            <div className="border-t border-black/10 pt-4 mt-1">
              <h2 className="font-serif text-lg font-bold">{t('update.contactsTitle')}</h2>
              <p className={helpCls + ' mb-3'}>{t('update.contactsHelp')}</p>
              {data.contacts.map((c, i) => (
                <div key={i} className="mb-3">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <input className={field} placeholder={t('update.contactName')} value={c.name} onChange={(e) => setContact(i, 'name', e.target.value)} />
                    <input className={field} type="email" placeholder={t('update.contactEmail')} value={c.email} onChange={(e) => setContact(i, 'email', e.target.value)} />
                    <input className={field} type="tel" placeholder={t('update.contactPhone')} value={c.phone} onChange={(e) => setContact(i, 'phone', e.target.value)} />
                    <input className={field} placeholder={t('update.contactRole')} value={c.title} onChange={(e) => setContact(i, 'title', e.target.value)} />
                  </div>
                  {data.contacts.length > 1 && (
                    <button type="button" onClick={() => removeContact(i)} className="text-xs text-neutral-500 hover:text-red-600 mt-1">
                      {t('update.remove')}
                    </button>
                  )}
                </div>
              ))}
              <button type="button" onClick={addContact} className="text-sm font-semibold text-[#39A97C] hover:underline mt-1">
                + {t('update.addContact')}
              </button>
            </div>

            {status === 'error' && <p className="text-sm text-red-600">{t('update.error')}</p>}

            <button
              type="submit"
              disabled={status === 'saving'}
              className="bg-[#FF881B] hover:brightness-105 text-white font-semibold font-sans px-7 py-3 rounded-full transition disabled:opacity-60 self-start mt-1"
            >
              {status === 'saving' ? t('update.saving') : t('update.save')}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
