import { useTranslation } from 'react-i18next';

const Footer = () => {
    const { t } = useTranslation();
    return (

        <footer className="relative w-full bg-[#FEFBF3] flex flex-col items-center gap-1.5 pt-4 pb-5">
            <a
              href="/privacy"
              className="text-xs font-sans text-neutral-600 underline underline-offset-2 hover:text-[#39A97C]"
            >
              {t('footer.privacy')}
            </a>
            <span className="text-center text-xs font-sans">Copyright 2026 - Nordic Media Lab</span>
        </footer>
    )
}

export default Footer;