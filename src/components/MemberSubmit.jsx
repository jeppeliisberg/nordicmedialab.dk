import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const MAX = 120;
const MAX_PERSONS = 5;

const MemberSubmit = ({ variant = 'button', triggerLabel } = {}) => {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const [type, setType] = useState('platform');
  const [count, setCount] = useState(0);
  const [persons, setPersons] = useState(1);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);

  const isIndividual = type === 'individual';

  const nameLabel =
    type === 'organization'
      ? t('submit.nameOrganization')
      : isIndividual
      ? t('submit.nameIndividual')
      : t('submit.namePlatform');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSending(true);
    setError(false);
    try {
      const data = new FormData(e.target);
      await fetch('/', { method: 'POST', body: data });
      setDone(true);
    } catch (err) {
      setError(true);
    } finally {
      setSending(false);
    }
  };

  const field =
    'w-full rounded-xl border border-black/15 px-4 py-2.5 font-sans text-[#1D1F29] focus:outline-none focus:border-[#39A97C]';
  const label = 'block font-sans font-semibold text-sm text-[#1D1F29] mb-1';
  const help = 'text-xs text-neutral-500 mt-1';

  return (
    <>
      {variant === 'link' ? (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="font-serif text-lg lg:text-xl text-[#39A97C] underline underline-offset-4 hover:brightness-110 text-left"
        >
          {triggerLabel || t('submit.applyNow')}
        </button>
      ) : (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="bg-[#FF881B] hover:brightness-105 text-white font-semibold font-sans px-8 py-3 rounded-full transition"
        >
          {triggerLabel || t('submit.applyNow')}
        </button>
      )}

      {open && (
        <div
          className="fixed inset-0 z-50 flex items-start justify-center bg-black/60 p-4 overflow-y-auto"
          onClick={() => setOpen(false)}
        >
          <div
            className="bg-white rounded-2xl w-full max-w-xl my-8 p-6 md:p-8 relative text-left"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setOpen(false)}
              aria-label={t('submit.close')}
              className="absolute right-4 top-4 text-neutral-400 hover:text-[#1D1F29]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.8} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            </button>

            {done ? (
              <div>
                <h3 className="font-serif text-2xl font-bold text-[#1D1F29] mb-2">{t('submit.thanksTitle')}</h3>
                <p className="text-neutral-600 mb-6">{t('submit.thanksBody')}</p>
                <button
                  onClick={() => setOpen(false)}
                  className="bg-[#39A97C] text-white font-semibold font-sans px-6 py-2.5 rounded-full"
                >
                  {t('submit.close')}
                </button>
              </div>
            ) : (
              <>
                <h3 className="font-serif text-2xl md:text-3xl font-bold text-[#1D1F29] mb-2 pr-8">{t('submit.title')}</h3>
                <p className="text-neutral-600 mb-6">{t('submit.intro')}</p>

                <form
                  name="member-submission"
                  method="POST"
                  data-netlify="true"
                  data-netlify-honeypot="bot-field"
                  onSubmit={handleSubmit}
                  className="flex flex-col gap-4"
                >
                  <input type="hidden" name="form-name" value="member-submission" />
                  <p className="hidden">
                    <label>
                      Do not fill this out: <input name="bot-field" />
                    </label>
                  </p>

                  <div>
                    <label className={label}>{t('submit.type')}</label>
                    <select name="type" value={type} onChange={(e) => setType(e.target.value)} className={field}>
                      <option value="platform">{t('submit.typePlatform')}</option>
                      <option value="organization">{t('submit.typeOrganization')}</option>
                      <option value="individual">{t('submit.typeIndividual')}</option>
                    </select>
                  </div>

                  <div>
                    <label className={label}>{nameLabel}</label>
                    <input type="text" name="name" required className={field} />
                  </div>

                  {isIndividual ? (
                    <>
                      <div>
                        <label className={label}>{t('submit.personEmail')}</label>
                        <input type="email" name="email" required className={field} />
                      </div>
                      <div>
                        <label className={label}>{t('submit.indivBio')}</label>
                        <textarea name="bio" rows={2} className={field + ' resize-none'} />
                      </div>
                      <div>
                        <label className={label}>{t('submit.indivLink')}</label>
                        <input type="url" name="website" placeholder="https://" className={field} />
                      </div>
                      <p className={help}>{t('submit.individualNote')}</p>
                    </>
                  ) : (
                    <>
                      <div>
                        <label className={label}>{t('submit.description')}</label>
                        <textarea
                          name="description"
                          required
                          maxLength={MAX}
                          rows={3}
                          onChange={(e) => setCount(e.target.value.length)}
                          className={field + ' resize-none'}
                        />
                        <div className="flex justify-between gap-3">
                          <span className={help}>{t('submit.descriptionHelp')}</span>
                          <span className={help}>
                            {count}/{MAX}
                          </span>
                        </div>
                      </div>

                      <div>
                        <label className={label}>{t('submit.website')}</label>
                        <input type="url" name="website" placeholder="https://" className={field} />
                      </div>

                      <div>
                        <label className={label}>{t('submit.language')}</label>
                        <select name="language" defaultValue="da" className={field}>
                          <option value="da">Dansk</option>
                          <option value="en">English</option>
                        </select>
                      </div>

                      <div>
                        <label className={label}>{t('submit.logo')}</label>
                        <input
                          type="file"
                          name="logo"
                          accept=".svg,.png,image/svg+xml,image/png"
                          className="block w-full text-sm text-neutral-600 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-[#39A97C] file:text-white file:font-semibold hover:file:brightness-105"
                        />
                        <div className={help}>{t('submit.logoHelp')}</div>
                      </div>

                      <div className="border-t border-black/10 pt-4 mt-1">
                        <h4 className="font-serif text-lg font-bold text-[#1D1F29]">{t('submit.contactsTitle')}</h4>
                        <p className={help + ' mb-3'}>{t('submit.contactsHelp')}</p>
                        {Array.from({ length: persons }).map((_, i) => (
                          <div key={i} className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
                            <input type="text" name={`contact${i + 1}_name`} placeholder={t('submit.personName')} required={i === 0} className={field} />
                            <input type="email" name={`contact${i + 1}_email`} placeholder={t('submit.personEmail')} required={i === 0} className={field} />
                            <input type="text" name={`contact${i + 1}_title`} placeholder={t('submit.personTitle')} className={field} />
                          </div>
                        ))}
                        {persons < MAX_PERSONS && (
                          <button
                            type="button"
                            onClick={() => setPersons((p) => p + 1)}
                            className="text-sm font-semibold text-[#39A97C] hover:underline mt-1"
                          >
                            + {t('submit.addPerson')}
                          </button>
                        )}
                      </div>
                    </>
                  )}

                  {error && <p className="text-sm text-red-600">{t('submit.error')}</p>}

                  <button
                    type="submit"
                    disabled={sending}
                    className="bg-[#FF881B] hover:brightness-105 text-white font-semibold font-sans px-7 py-3 rounded-full transition disabled:opacity-60 self-start mt-1"
                  >
                    {sending ? t('submit.sending') : t('submit.send')}
                  </button>
                </form>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default MemberSubmit;
