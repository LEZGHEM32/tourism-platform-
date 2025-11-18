
import React, { useState, useMemo } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { Offer, OfferCategory } from '../../types';
import OfferCard from '../common/OfferCard';

const OffersPage: React.FC = () => {
  const { state, t, categoryToString } = useAppContext();
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState<OfferCategory | 'all'>('all');
  const [sortBy, setSortBy] = useState('rating');

  const filteredAndSortedOffers = useMemo(() => {
    let offers = state.offers
      .filter(offer =>
        offer.title[state.language].toLowerCase().includes(searchTerm.toLowerCase()) ||
        offer.location[state.language].toLowerCase().includes(searchTerm.toLowerCase())
      )
      .filter(offer =>
        categoryFilter === 'all' || offer.category === categoryFilter
      );

    offers.sort((a, b) => {
      switch (sortBy) {
        case 'rating':
          return b.rating - a.rating;
        case 'priceAsc':
          return (a.pricePerNight || a.pricePerPerson || 0) - (b.pricePerNight || b.pricePerPerson || 0);
        case 'priceDesc':
          return (b.pricePerNight || b.pricePerPerson || 0) - (a.pricePerNight || a.pricePerPerson || 0);
        default:
          return 0;
      }
    });

    return offers;
  }, [state.offers, searchTerm, categoryFilter, sortBy, state.language]);

  return (
    <div className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-primary dark:text-primary-light">{t('allOffers')}</h1>
            <p className="text-lg mt-2">{t('discoverAndBook')}</p>
        </div>

        {/* Filters */}
        <div className="mb-8 p-4 bg-white dark:bg-gray-800 rounded-lg shadow-md flex flex-col md:flex-row gap-4 items-center">
            <input 
                type="text"
                placeholder={t('searchPlaceholder')}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
                className="flex-grow p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-primary focus:border-primary"
            />
            <select
                value={categoryFilter}
                onChange={e => setCategoryFilter(e.target.value as OfferCategory | 'all')}
                className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-primary focus:border-primary"
            >
                <option value="all">{t('filterByCategory')}</option>
                {Object.values(OfferCategory).map(cat => (
                    <option key={cat} value={cat}>{categoryToString(cat)}</option>
                ))}
            </select>
             <select
                value={sortBy}
                onChange={e => setSortBy(e.target.value)}
                className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600 focus:ring-primary focus:border-primary"
            >
                <option value="rating">{t('sortBy')} {t('rating')}</option>
                <option value="priceAsc">{t('priceAsc')}</option>
                <option value="priceDesc">{t('priceDesc')}</option>
            </select>
        </div>

        {/* Offers Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
            {filteredAndSortedOffers.map(offer => (
                <OfferCard key={offer.id} offer={offer} />
            ))}
        </div>
        {filteredAndSortedOffers.length === 0 && (
            <p className="text-center text-xl mt-12">{t('noResults')}</p>
        )}
      </div>
    </div>
  );
};

export default OffersPage;
