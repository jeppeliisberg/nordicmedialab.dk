import { useState } from 'react';
import { useTranslation } from 'react-i18next';

const MAX = 120;

const MemberSubmit = () => {
  const { t } = useTranslation();
  const [count, setCount] = useState(0);
  const [sending, setSending] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState(false);

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

  if (done) {
    return (
      <div className="bg-white rounded-2xl p-8 shadow-lg max-w-xl">
        <h3 className="font-serif text-2xl font-bold text-[#1D1F29] mb-2">{t('submit.thanksTitle')}</h3>
        <p className="text-neutral-600">{t('submit.thanksBody')}</p>
      </div>
    );
  }

  const field =
    'w-full rounded-xl border border-black/15 px-4 py-3 font-sans text-[#1D1F29] focus:outline-none focus:border-[#39A97C]';
  const label = 'block font-sans font-semibold text-sm text-[#1D1F29] mb-1';
  const help = 'text-xs text-neutral-500 mt-1';

  return (
    <form
      name="member-submission"
      method="POST"
      data-netlify="true"
      data-netlify-honeypot="bot-field"
      onSubmit={handleSubmit}
      className="bg-white rounded-2xl p-6 md:p-8 shadow-lg flex flex-col gap-5 max-w-xl"
    >
      <input type="hidden" name="form-name" value="member-submission" />
      <p className="hidden">
        <label>
          Do not fill this out: <input name="bot-field" />
        </label>
      </p>

      <div>
        <label className={label}>{t('submit.name')}</label>
        <input type="text" name="name" required className={field} />
      </div>

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
        <input type="url" name="website" required placeholder="https://" className={field} />
      </div>

      <div>
        <label className={label}>{t('submit.email')}</label>
        <input type="email" name="contact" required className={field} />
      </div>

      <div>
        <label className={label}>{t('submit.language')}</label>
        <select name="language" className={field} defaultValue="da">
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

      {error && (
        <p className="text-sm text-red-600">{t('submit.error')}</p>
      )}

      <button
        type="submit"
        disabled={sending}
        className="bg-[#FF881B] hover:brightness-105 text-white font-semibold font-sans px-7 py-3 rounded-full transition disabled:opacity-60 self-start"
      >
        {sending ? t('submit.sending') : t('submit.send')}
      </button>
    </form>
  );
};

export default MemberSubmit;
