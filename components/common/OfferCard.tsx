
import React from 'react';
import { Offer, OfferCategory } from '../../types';
import { useAppContext } from '../../hooks/useAppContext';
import { PAGES } from '../../constants';
import { StarIcon, HotelIcon, HomeIcon, MapIcon } from './Icons';

interface OfferCardProps {
  offer: Offer;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
  const { state, dispatch, t, categoryToString } = useAppContext();
  const { language } = state;

  const handleCardClick = () => {
    dispatch({ type: 'SET_PAGE', payload: { page: PAGES.OFFER_DETAILS, pagePayload: offer.id } });
  };

  const getCategoryIcon = (category: OfferCategory) => {
    switch (category) {
        case OfferCategory.Hotel: return <HotelIcon className="w-4 h-4 mr-1" />;
        case OfferCategory.Guesthouse: return <HomeIcon className="w-4 h-4 mr-1" />;
        case OfferCategory.Tour: return <MapIcon className="w-4 h-4 mr-1" />;
        default: return null;
    }
  }

  return (
    <div 
      className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer group"
      onClick={handleCardClick}
    >
      <div className="relative overflow-hidden">
        <img className="w-full h-56 object-cover transition-transform duration-500 group-hover:scale-110" src={offer.images[0]} alt={offer.title[language]} />
        <div className="absolute top-0 right-0 bg-primary dark:bg-primary-dark text-white px-3 py-1 m-2 rounded-full text-sm font-semibold z-10 flex items-center shadow-md">
          {getCategoryIcon(offer.category)}
          {categoryToString(offer.category)}
        </div>
      </div>
      <div className="p-6">
        <h3 className="text-xl font-bold text-secondary-dark dark:text-white mb-2 truncate group-hover:text-primary-dark dark:group-hover:text-primary-light transition-colors">
          {offer.title[language]}
        </h3>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-4">{offer.location[language]}</p>
        <div className="flex justify-between items-center">
          <div className="flex items-center">
            <StarIcon className="w-5 h-5 text-yellow-400" />
            <span className="text-gray-700 dark:text-gray-300 font-bold ml-1">{offer.rating}</span>
            <span className="text-gray-500 dark:text-gray-400 text-sm ml-2">({offer.reviews} {t('reviews')})</span>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-primary dark:text-primary-light">
              ${offer.pricePerNight || offer.pricePerPerson}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              {offer.pricePerNight ? t('perNight') : t('perPerson')}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OfferCard;
