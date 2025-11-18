
import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { PAGES } from '../../constants';

const Footer: React.FC = () => {
    const { t, dispatch } = useAppContext();
    
    const handleNav = (page: string) => {
        dispatch({ type: 'SET_PAGE', payload: { page } });
    };

    return (
        <footer className="bg-secondary-dark text-gray-300">
            <div className="container mx-auto px-6 py-8">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-6 md:mb-0">
                        <h2 className="text-2xl font-bold text-primary-light">{t('marhaba')}</h2>
                        <p className="text-sm">{t('desertTourism')}</p>
                    </div>
                    <div className="flex space-x-6 rtl:space-x-reverse">
                        <button onClick={() => handleNav(PAGES.HOME)} className="hover:text-primary-light transition-colors">{t('home')}</button>
                        <button onClick={() => handleNav(PAGES.OFFERS)} className="hover:text-primary-light transition-colors">{t('offers')}</button>
                    </div>
                </div>
                <hr className="my-6 border-gray-600" />
                <div className="text-center text-sm text-gray-400">
                    <p>&copy; {new Date().getFullYear()} Marhaba. All Rights Reserved.</p>
                </div>
            </div>
        </footer>
    );
}

export default Footer;
