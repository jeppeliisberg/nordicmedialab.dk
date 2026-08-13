/* eslint-disable react/prop-types */
import { Trans, useTranslation } from 'react-i18next';
import Footer from '../components/Footer';

const link =
  'text-[#2C7A57] underline underline-offset-2 hover:brightness-110';

const Pine = () => (
  <svg className="w-5 h-auto" viewBox="0 0 117 182" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M62.9185 0C63.0374 0.0875785 100.976 28.056 106.529 63.75C107.624 70.7892 82.5537 49.9799 69.9439 39.1299L69.8433 54.8398C83.2477 62.8301 111.797 82.7946 116.029 110C117.169 117.328 84.161 97.3654 69.6274 88.2578L69.5171 105.396C80.77 112.642 101.974 128.751 113.029 153C116.07 159.67 84.0775 144.73 69.3091 137.561L69.0806 173.103L69.0669 173.515C68.8252 177.74 65.3088 181.078 61.0288 181.051C56.7488 181.023 53.2756 177.64 53.0884 173.412L53.0806 173L53.3023 138.552C34.5588 148.073 -7.05332 168.01 1.02882 153C3.67925 148.078 37.3234 120.791 53.5005 107.834L53.5845 94.8076C40.7953 108.862 18.8542 129.996 14.0288 115.5C11.5394 108.021 38.9834 76.835 53.8042 60.7266L53.9194 42.7832C40.827 56.3685 17.5933 77.7762 13.1216 63.75C10.5353 55.6376 62.9185 0 62.9185 0Z" fill="#F4FBF7"/>
  </svg>
);

const Section = ({ title, children }) => (
  <section className="py-7 border-b border-black/10">
    <h2 className="font-serif text-2xl font-bold text-[#1D1F29] mb-2.5">{title}</h2>
    <div className="text-neutral-700 leading-relaxed space-y-3">{children}</div>
  </section>
);

export default function Privacy() {
  const { t, i18n } = useTranslation();
  const changeLanguage = (lng) => i18n.changeLanguage(lng);
  const langBtn = (lng) =>
    `px-2 py-1 rounded text-sm font-sans font-medium ${
      i18n.language === lng ? 'bg-white/90 text-[#2C7A57]' : 'text-[#EAF6EF] hover:bg-white/15'
    }`;

  return (
    <div className="min-h-screen bg-[#FEFBF4] text-[#1D1F29] flex flex-col">
      {/* Green header band, echoing the members and about sections */}
      <div className="bg-[#39A97C] text-[#F4FBF7]">
        <div className="max-w-3xl mx-auto px-6 pt-7 pb-12">
          <div className="flex items-center justify-between gap-4 mb-8">
            <a href="/" className="flex items-center gap-2 hover:brightness-110">
              <Pine />
              <span className="font-serif font-bold text-sm leading-none">Nordic<br />Media<br />Lab</span>
            </a>
            <div className="flex gap-x-2">
              <button onClick={() => changeLanguage('da')} className={langBtn('da')}>DA</button>
              <button onClick={() => changeLanguage('en')} className={langBtn('en')}>EN</button>
            </div>
          </div>
          <h1 className="font-serif font-bold text-4xl md:text-5xl leading-tight">{t('privacy.title')}</h1>
          <p className="mt-4 max-w-2xl text-lg text-[#EAF6EF]">{t('privacy.lede')}</p>
        </div>
      </div>

      <main className="max-w-3xl mx-auto w-full px-6 py-8 flex-1">
        <Section title={t('privacy.whoTitle')}>
          <p>
            <Trans
              i18nKey="privacy.who"
              components={{ email: <a className={link} href="mailto:hej@nordicmedialab.dk" /> }}
            />
          </p>
        </Section>

        <Section title={t('privacy.collectTitle')}>
          <p>{t('privacy.collect1')}</p>
          <p>{t('privacy.collect2')}</p>
        </Section>

        <Section title={t('privacy.whyTitle')}>
          <p>{t('privacy.why1')}</p>
          <p>{t('privacy.why2')}</p>
        </Section>

        <Section title={t('privacy.basisTitle')}>
          <p>{t('privacy.basis')}</p>
        </Section>

        <Section title={t('privacy.whereTitle')}>
          <p>{t('privacy.where')}</p>
        </Section>

        <Section title={t('privacy.keepTitle')}>
          <p>{t('privacy.keep')}</p>
        </Section>

        <Section title={t('privacy.rightsTitle')}>
          <p>
            <Trans
              i18nKey="privacy.rights"
              components={{
                email: <a className={link} href="mailto:hej@nordicmedialab.dk" />,
                dpa: <a className={link} href="https://www.datatilsynet.dk" target="_blank" rel="noopener noreferrer" />,
              }}
            />
          </p>
        </Section>

        <Section title={t('privacy.changesTitle')}>
          <p>{t('privacy.changes')}</p>
        </Section>

        <div className="flex items-center justify-between flex-wrap gap-3 pt-6 text-sm text-neutral-500">
          <span>{t('privacy.updated')}</span>
          <a href="/" className="text-neutral-500 underline underline-offset-2 hover:text-[#2C7A57]">{t('privacy.back')}</a>
        </div>
      </main>

      <Footer />
    </div>
  );
}
