
import React, { FC, useEffect, useState } from 'react';
import { motion, AnimatePresence, Variants } from 'framer-motion';
import { useTranslation } from 'react-i18next';


const Header = () => {
     const { t, i18n } = useTranslation();
     const [isOpen, setIsOpen] = useState<boolean>(false);

     const changeLanguage = (lng: string) => {
       i18n.changeLanguage(lng);
       // Write the choice into the URL (no reload, no history entry) so it
       // survives a refresh, is shareable, and beats navigator.language on the
       // next load. See the precedence order in src/i18n.js.
       if (typeof window !== 'undefined') {
         const url = new URL(window.location.href);
         url.searchParams.set('lang', lng);
         window.history.replaceState({}, '', url);
       }
     };
    
      const backdropVariants: Variants = {
        hidden: {
          opacity: 0,
          pointerEvents: 'none',
          transition: { duration: 0.2 }
        },
        visible: {
          opacity: 1,
          pointerEvents: 'auto',
          transition: { duration: 0.3 }
        }
      };
    
      const menuVariants: Variants = {
        hidden: {
          y: '-100%',
          transition: { duration: 0.3, ease: 'easeIn' }
        },
        visible: {
          y: 0,
          transition: { duration: 0.5, ease: 'easeOut' }
        }
      };
    
      const toggleMenu = () => setIsOpen((prev) => !prev);
      const closeMenu = () => setIsOpen(false);
      useEffect(() => {
        if (isOpen) {
          // disable scroll
          document.body.style.overflow = 'hidden';

          // close on Escape
          const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
              setIsOpen(false);
            }
          };
          window.addEventListener('keydown', handleKeyDown);

          return () => {
            // re-enable scroll & cleanup
            document.body.style.overflow = '';
            window.removeEventListener('keydown', handleKeyDown);
          };
        }
        // if not open, ensure scroll is enabled
        document.body.style.overflow = '';
        return undefined;
      }, [isOpen]);

      

      const onMenuClick: React.MouseEventHandler<HTMLUListElement> = (e) => {
        const target = e.target as HTMLElement;
        if (target.tagName === 'A' && target.getAttribute('href')?.startsWith('#')) {
          closeMenu();
        }
      };
    return (
        <>
        <header id="header" className="bg-white/80 sticky top-0 backdrop-blur-sm z-20 w-full">
            <div className="flex flex-row items-center justify-between gap-2 max-w-8xl mx-auto px-2 xl:px-6 py-4 lg:py-4">
                <div className="pl-2 flex gap-x-1 items-center">
                    <svg className="w-6 h-auto" viewBox="0 0 117 182" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M62.9185 0C63.0374 0.0875785 100.976 28.056 106.529 63.75C107.624 70.7892 82.5537 49.9799 69.9439 39.1299L69.8433 54.8398C83.2477 62.8301 111.797 82.7946 116.029 110C117.169 117.328 84.161 97.3654 69.6274 88.2578L69.5171 105.396C80.77 112.642 101.974 128.751 113.029 153C116.07 159.67 84.0775 144.73 69.3091 137.561L69.0806 173.103L69.0669 173.515C68.8252 177.74 65.3088 181.078 61.0288 181.051C56.7488 181.023 53.2756 177.64 53.0884 173.412L53.0806 173L53.3023 138.552C34.5588 148.073 -7.05332 168.01 1.02882 153C3.67925 148.078 37.3234 120.791 53.5005 107.834L53.5845 94.8076C40.7953 108.862 18.8542 129.996 14.0288 115.5C11.5394 108.021 38.9834 76.835 53.8042 60.7266L53.9194 42.7832C40.827 56.3685 17.5933 77.7762 13.1216 63.75C10.5353 55.6376 62.9185 0 62.9185 0Z" fill="#39A97C"/>
                    </svg>
                    <span className="font-bold font-serif text-sm text-neutral-600 leading-none">Nordic<br/>Media<br/>Lab</span>
                </div>
               
                <ul className="hidden lg:flex gap-x-5 text-base font-sans font-medium pr-5 items-center">
                    <li><a className="hover:underline underline-offset-4" href="#hvorfor">{t('nav.why')}</a></li>
                    <li><a className="hover:underline underline-offset-4" href="#projekter">{t('nav.projects')}</a></li>
                    <li><a className="hover:underline underline-offset-4" href="#medlemmer">{t('nav.members')}</a></li>
                    <li className="flex gap-x-2 ml-2">
                      <button
                        onClick={() => changeLanguage('da')}
                        className={`px-2 py-1 rounded text-sm ${i18n.language === 'da' ? 'bg-emerald-500 text-white' : 'hover:bg-gray-100'}`}
                      >
                        DA
                      </button>
                      <button
                        onClick={() => changeLanguage('en')}
                        className={`px-2 py-1 rounded text-sm ${i18n.language === 'en' ? 'bg-emerald-500 text-white' : 'hover:bg-gray-100'}`}
                      >
                        EN
                      </button>
                    </li>
                </ul>
                {!isOpen &&
                <div className="flex lg:hidden items-center gap-x-2 pr-5">
                    <button
                      onClick={() => changeLanguage('da')}
                      className={`px-2 py-1 rounded text-sm font-sans font-medium ${i18n.language === 'da' ? 'bg-emerald-500 text-white' : 'hover:bg-gray-100'}`}
                    >
                      DA
                    </button>
                    <button
                      onClick={() => changeLanguage('en')}
                      className={`px-2 py-1 rounded text-sm font-sans font-medium ${i18n.language === 'en' ? 'bg-emerald-500 text-white' : 'hover:bg-gray-100'}`}
                    >
                      EN
                    </button>
                    <button
                      id="primary-menu-toggle"
                      aria-label="Open menu"
                      className="cursor-pointer select-none outline-none focus:outline-none border-0 text-sm font-sans font-bold"
                      onClick={toggleMenu}
                    >
                    Menu
                    </button>
                </div>
                }
            </div>
        </header>
        <AnimatePresence>
          {isOpen && (
            <>
              <motion.div
                id="backdrop-overlay"
                aria-label="Close menu"
                role="button"
                className="fixed inset-0 bg-black bg-opacity-80 backdrop-blur-sm z-20 transform-gpu"
                variants={backdropVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
                onClick={closeMenu}
              />
              <motion.div
                id="primary-menu"
                className="fixed inset-0 top-0 flex items-center justify-center z-30 transform-gpu"
                variants={menuVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                <div className="relative flex flex-col items-start justify-center bg-back w-full h-full mx-auto">
                  <div className="p-4 absolute right-0 top-0">
                    <button
                      id="menu-close-btn"
                      aria-label="Close menu"
                      className="p-2"
                      onClick={closeMenu}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-5 h-5 text-white hover:text-red-500"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                  <ul className="flex lg:hidden text-white flex-col gap-y-8 text-5xl font-serif text-center w-full font-medium" onClick={onMenuClick}>
                      <li><a className="hover:underline underline-offset-4" href="#hvorfor">{t('nav.why')}</a></li>
                      <li><a className="hover:underline underline-offset-4" href="#projekter">{t('nav.projects')}</a></li>
                      <li><a className="hover:underline underline-offset-4" href="#pagt">{t('nav.pact')}</a></li>
                      <li><a className="hover:underline underline-offset-4" href="#team">{t('nav.team')}</a></li>
                      <li><a className="hover:underline underline-offset-4" href="#organisering">{t('nav.organization')}</a></li>
                  </ul>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>
    </>
    )
}

export default Header;