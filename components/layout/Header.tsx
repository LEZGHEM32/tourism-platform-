
import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { PAGES } from '../../constants';
import { SunIcon, MoonIcon, GlobeIcon } from '../common/Icons';
import { UserType } from '../../types';

const Header: React.FC = () => {
  const { state, dispatch, t } = useAppContext();
  const { currentUser, language, theme } = state;

  const handleNav = (page: string) => {
    dispatch({ type: 'SET_PAGE', payload: { page } });
  };

  const toggleLanguage = () => {
    dispatch({ type: 'SET_LANGUAGE', payload: language === 'en' ? 'ar' : 'en' });
  };

  const toggleTheme = () => {
    dispatch({ type: 'SET_THEME', payload: theme === 'light' ? 'dark' : 'light' });
  };
  
  const handleLogout = () => {
    dispatch({ type: 'SET_USER', payload: null });
    handleNav(PAGES.HOME);
  };

  return (
    <header className="bg-white/80 dark:bg-background-dark/80 backdrop-blur-sm shadow-md sticky top-0 z-40 transition-colors duration-300">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div 
            className="flex items-center space-x-2 cursor-pointer rtl:space-x-reverse"
            onClick={() => handleNav(PAGES.HOME)}
        >
          <span className="text-3xl font-bold text-primary dark:text-primary-light">🐪</span>
          <div>
            <h1 className="text-xl font-bold text-primary dark:text-primary-light">{t('marhaba')}</h1>
            <p className="text-xs text-secondary dark:text-gray-400">{t('desertTourism')}</p>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-8 rtl:space-x-reverse">
          <button onClick={() => handleNav(PAGES.HOME)} className="text-secondary dark:text-gray-300 hover:text-primary dark:hover:text-primary-light font-semibold transition-colors">{t('home')}</button>
          <button onClick={() => handleNav(PAGES.OFFERS)} className="text-secondary dark:text-gray-300 hover:text-primary dark:hover:text-primary-light font-semibold transition-colors">{t('offers')}</button>
          {currentUser && <button onClick={() => handleNav(PAGES.DASHBOARD)} className="text-secondary dark:text-gray-300 hover:text-primary dark:hover:text-primary-light font-semibold transition-colors">{t('dashboard')}</button>}
        </div>

        <div className="flex items-center space-x-4 rtl:space-x-reverse">
          <button onClick={toggleLanguage} title={language === 'en' ? 'العربية' : 'English'} className="text-secondary dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors">
            <GlobeIcon className="w-6 h-6" />
          </button>
          <button onClick={toggleTheme} title={theme === 'light' ? t('darkMode') : t('lightMode')} className="text-secondary dark:text-gray-300 hover:text-primary dark:hover:text-primary-light transition-colors">
            {theme === 'light' ? <MoonIcon className="w-6 h-6" /> : <SunIcon className="w-6 h-6" />}
          </button>
          {currentUser ? (
            <div className="relative group">
               <span className="cursor-pointer bg-primary text-white w-10 h-10 rounded-full flex items-center justify-center font-bold">{currentUser.name.charAt(0)}</span>
               <div className="absolute top-full rtl:left-0 ltr:right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg py-1 opacity-0 group-hover:opacity-100 transition-opacity duration-300 invisible group-hover:visible">
                    <div className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 border-b dark:border-gray-700">
                        <p className="font-semibold">{currentUser.name}</p>
                        <p className="text-xs text-gray-500">{currentUser.type === UserType.Provider ? t('serviceProvider') : t('tourist')}</p>
                    </div>
                    <a href="#" onClick={() => handleNav(PAGES.DASHBOARD)} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">{t('dashboard')}</a>
                    <a href="#" onClick={handleLogout} className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700">{t('logout')}</a>
               </div>
            </div>
          ) : (
            <button onClick={() => dispatch({type: 'OPEN_MODAL', payload: 'auth'})} className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-full transition-colors duration-300">
              {t('login')}
            </button>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Header;
