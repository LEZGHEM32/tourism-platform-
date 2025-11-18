
import React, { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { PAGES } from '../../constants';
import OfferCard from '../common/OfferCard';
import YoutubePlayerModal from '../modals/YoutubePlayerModal';
import { HotelIcon, HomeIcon, MapIcon } from '../common/Icons';

const HomePage: React.FC = () => {
  const { state, dispatch, t } = useAppContext();
  const [showVrOffers, setShowVrOffers] = useState(false);

  const featuredOffers = state.offers.filter(o => o.featured).slice(0, 4);

  const openYoutubeModal = () => {
    dispatch({ type: 'OPEN_MODAL', payload: 'youtube' });
    // This is a bit of a hack to show offers after the modal might be watched
    // In a real app, you might use onclose callback more robustly
    setTimeout(() => setShowVrOffers(true), 1000);
  }

  return (
    <div className="text-text-light dark:text-text-dark">
      {/* Hero Section */}
      <section className="relative h-[60vh] min-h-[400px] bg-cover bg-center text-white" style={{ backgroundImage: "url('https://picsum.photos/seed/hero/1600/900')" }}>
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="relative container mx-auto px-6 h-full flex flex-col justify-center items-center text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.7)'}}>{t('marhaba')}</h1>
          <p className="text-lg md:text-2xl mb-8 max-w-2xl">{t('discoverAndBook')}</p>
          <div className="w-full max-w-2xl bg-white/20 backdrop-blur-sm p-4 rounded-full">
             <form className="flex items-center" onSubmit={(e) => { e.preventDefault(); dispatch({ type: 'SET_PAGE', payload: { page: PAGES.OFFERS } })}}>
                <input type="text" placeholder={t('searchPlaceholder')} className="w-full bg-transparent text-white placeholder-gray-200 border-none focus:ring-0 px-4"/>
                <button type="submit" className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition-colors">
                    {t('search')}
                </button>
             </form>
          </div>
        </div>
      </section>

      {/* Quick Links/Categories */}
      <section className="py-12 bg-background-light dark:bg-background-dark">
        <div className="container mx-auto px-6 text-center">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div onClick={() => dispatch({type:'SET_PAGE', payload:{page:PAGES.OFFERS}})} className="cursor-pointer p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow group">
                    <HotelIcon className="w-12 h-12 mx-auto text-primary dark:text-primary-light mb-4 group-hover:scale-110 transition-transform" />
                    <p className="font-semibold">{t('hotels')}</p>
                </div>
                <div onClick={() => dispatch({type:'SET_PAGE', payload:{page:PAGES.OFFERS}})} className="cursor-pointer p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow group">
                    <MapIcon className="w-12 h-12 mx-auto text-primary dark:text-primary-light mb-4 group-hover:scale-110 transition-transform" />
                    <p className="font-semibold">{t('tours')}</p>
                </div>
                 <div onClick={() => dispatch({type:'SET_PAGE', payload:{page:PAGES.OFFERS}})} className="cursor-pointer p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-xl transition-shadow group">
                    <HomeIcon className="w-12 h-12 mx-auto text-primary dark:text-primary-light mb-4 group-hover:scale-110 transition-transform" />
                    <p className="font-semibold">{t('guesthouses')}</p>
                </div>
            </div>
        </div>
      </section>

      {/* Featured Offers */}
      <section className="py-16">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-2">{t('featuredOffers')}</h2>
          <div className="w-20 h-1 bg-primary mx-auto mb-10"></div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredOffers.map(offer => <OfferCard key={offer.id} offer={offer} />)}
          </div>
        </div>
      </section>
      
      {/* VR Experience */}
      <section className="py-16 bg-secondary-dark text-white">
        <div className="container mx-auto px-6 text-center">
           <h2 className="text-3xl font-bold mb-4">{t('vrExperience')}</h2>
           <p className="max-w-2xl mx-auto mb-8">Take a virtual tour of the Algerian desert and get inspired for your next adventure.</p>
           <button onClick={openYoutubeModal} className="bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-full transition-colors">
            {t('watchVideo')}
           </button>
           {showVrOffers && (
             <div className="mt-12">
               <h3 className="text-2xl font-bold mb-8">Ready for the real thing?</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {state.offers.filter(o=>o.category === 'tour').slice(0,4).map(offer => <OfferCard key={offer.id} offer={offer} />)}
               </div>
             </div>
           )}
        </div>
      </section>
      <YoutubePlayerModal videoId="5R_5o3Jd5dM" />

      {/* Tourist Info & Partners */}
      <section className="py-16">
          <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
            <div>
                <h2 className="text-2xl font-bold mb-4">{t('touristInfo')}</h2>
                <ul className="space-y-3">
                    <li><a href="#" className="text-primary hover:underline">{t('eVisaPortal')}</a></li>
                    <li><a href="#" className="text-primary hover:underline">{t('algerianAirlines')}</a></li>
                </ul>
            </div>
            <div>
                <h2 className="text-2xl font-bold mb-4">{t('ourPartners')}</h2>
                <div className="flex space-x-8 rtl:space-x-reverse items-center grayscale opacity-60">
                    <p className="text-2xl font-serif">Partner A</p>
                    <p className="text-2xl font-serif">Partner B</p>
                    <p className="text-2xl font-serif">Partner C</p>
                </div>
            </div>
          </div>
      </section>
    </div>
  );
};

export default HomePage;
