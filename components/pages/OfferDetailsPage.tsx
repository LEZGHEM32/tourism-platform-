
import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { Offer } from '../../types';
import { StarIcon } from '../common/Icons';
import BookingModal from '../modals/BookingModal';
import InquiryModal from '../modals/InquiryModal';

const OfferDetailsPage: React.FC = () => {
  const { state, dispatch, t, categoryToString } = useAppContext();
  const { language, offers, pagePayload } = state;

  const offer = offers.find(o => o.id === pagePayload);

  if (!offer) {
    return <div className="container mx-auto px-6 py-12 text-center text-xl">Offer not found.</div>;
  }

  return (
    <div className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark">
      <div className="container mx-auto px-6 py-12">
        {/* Header */}
        <div className="mb-8">
            <p className="text-primary dark:text-primary-light font-semibold">{categoryToString(offer.category)}</p>
            <h1 className="text-4xl font-bold mt-1">{offer.title[language]}</h1>
            <div className="flex items-center mt-2 text-gray-600 dark:text-gray-400">
                <span>{offer.location[language]}</span>
                <span className="mx-2">&bull;</span>
                <div className="flex items-center">
                    <StarIcon className="w-5 h-5 text-yellow-400" />
                    <span className="font-bold ml-1">{offer.rating}</span>
                    <span className="ml-1">({offer.reviews} {t('reviews')})</span>
                </div>
            </div>
        </div>
        
        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 md:grid-rows-2 gap-2 mb-12 h-[60vh]">
            <div className="md:col-span-1 md:row-span-2">
                <img src={offer.images[0]} alt={offer.title[language]} className="w-full h-full object-cover rounded-lg"/>
            </div>
            {offer.images.slice(1,3).map((img, index) => (
                <div key={index} className="hidden md:block">
                    <img src={img} alt={`${offer.title[language]} ${index+2}`} className="w-full h-full object-cover rounded-lg"/>
                </div>
            ))}
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
                <h2 className="text-2xl font-bold mb-4 border-b pb-2">{t('details')}</h2>
                <p className="whitespace-pre-wrap leading-relaxed">{offer.description[language]}</p>
                
                <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">{t('includedServices')}</h2>
                <ul className="grid grid-cols-2 gap-4 list-disc list-inside">
                    {offer.includedServices[language].map((service, i) => <li key={i}>{service}</li>)}
                </ul>

                {offer.itinerary && (
                     <div className="mt-8">
                        <h2 className="text-2xl font-bold mb-4 border-b pb-2">{t('itinerary')}</h2>
                        <div className="space-y-6">
                            {offer.itinerary.map(item => (
                                <div key={item.day}>
                                    <h3 className="font-bold text-lg text-primary dark:text-primary-light">{t('day')} {item.day}: {item.title[language]}</h3>
                                    <p className="mt-1 text-gray-600 dark:text-gray-400">{item.description[language]}</p>
                                </div>
                            ))}
                        </div>
                     </div>
                )}

                 <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">{t('cancellationPolicy')}</h2>
                <p>{offer.cancellationPolicy[language]}</p>

                <h2 className="text-2xl font-bold mt-8 mb-4 border-b pb-2">{t('location')}</h2>
                <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-lg flex items-center justify-center">
                    <p>Map of {offer.location[language]}</p>
                </div>
            </div>
            <div className="lg:col-span-1">
                <div className="sticky top-24 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg">
                    <p className="text-2xl font-bold mb-4">
                        ${offer.pricePerNight || offer.pricePerPerson} 
                        <span className="text-base font-normal text-gray-600 dark:text-gray-400"> / {offer.pricePerNight ? t('perNight') : t('perPerson')}</span>
                    </p>
                    <div className="flex flex-col gap-4">
                        <button onClick={() => dispatch({type: 'OPEN_MODAL', payload: 'booking'})} className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-md transition-colors">{t('bookNow')}</button>
                        <button onClick={() => dispatch({type: 'OPEN_MODAL', payload: 'inquiry'})} className="w-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 font-bold py-3 px-4 rounded-md transition-colors">{t('askQuestion')}</button>
                    </div>
                </div>
            </div>
        </div>
      </div>
      <BookingModal offer={offer}/>
      <InquiryModal offer={offer}/>
    </div>
  );
};

export default OfferDetailsPage;
