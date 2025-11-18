
import React, { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { Offer, OfferCategory } from '../../types';
import { PAGES } from '../../constants';

const AddOfferPage: React.FC = () => {
  const { state, dispatch, t, categoryToString } = useAppContext();
  const [titleEn, setTitleEn] = useState('');
  const [titleAr, setTitleAr] = useState('');
  const [descEn, setDescEn] = useState('');
  const [descAr, setDescAr] = useState('');
  const [category, setCategory] = useState<OfferCategory | ''>('');
  const [locationEn, setLocationEn] = useState('');
  const [locationAr, setLocationAr] = useState('');
  const [price, setPrice] = useState(0);
  const [images, setImages] = useState('');
  const [servicesEn, setServicesEn] = useState('');
  const [servicesAr, setServicesAr] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.currentUser) return;

    const newOffer: Offer = {
      id: `offer-${Date.now()}`,
      providerId: state.currentUser.id,
      title: { en: titleEn, ar: titleAr },
      description: { en: descEn, ar: descAr },
      category: category as OfferCategory,
      location: { en: locationEn, ar: locationAr },
      images: images.split(',').map(url => url.trim()),
      rating: 0,
      reviews: 0,
      includedServices: { en: servicesEn.split(','), ar: servicesAr.split(',') },
      cancellationPolicy: { en: 'Standard policy', ar: 'سياسة قياسية' }, // Placeholder
    };

    if (category === OfferCategory.Tour) {
      newOffer.pricePerPerson = price;
    } else {
      newOffer.pricePerNight = price;
    }
    
    dispatch({ type: 'ADD_OFFER', payload: newOffer });
    alert('Offer added successfully!');
    dispatch({ type: 'SET_PAGE', payload: { page: PAGES.DASHBOARD } });
  };
  
  const InputGroup: React.FC<{label: string, children: React.ReactNode}> = ({label, children}) => (
      <div className="mb-6 bg-gray-50 dark:bg-gray-700 p-4 rounded-lg">
        <label className="block text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">{label}</label>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {children}
        </div>
      </div>
  )

  return (
    <div className="bg-background-light dark:bg-background-dark text-text-light dark:text-text-dark min-h-screen">
      <div className="container mx-auto px-6 py-12">
        <h1 className="text-4xl font-bold mb-8">{t('addOffer')}</h1>
        <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-md">
            
            <InputGroup label={t('offerTitle')}>
                <input type="text" placeholder={`${t('english')}`} value={titleEn} onChange={e => setTitleEn(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500" required />
                <input type="text" placeholder={`${t('arabic')}`} value={titleAr} onChange={e => setTitleAr(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500" dir="rtl" required />
            </InputGroup>
            
            <InputGroup label={t('offerDescription')}>
                 <textarea rows={4} placeholder={`${t('english')}`} value={descEn} onChange={e => setDescEn(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500" required />
                 <textarea rows={4} placeholder={`${t('arabic')}`} value={descAr} onChange={e => setDescAr(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500" dir="rtl" required />
            </InputGroup>
            
             <InputGroup label={t('location')}>
                <input type="text" placeholder={`${t('english')}`} value={locationEn} onChange={e => setLocationEn(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500" required />
                <input type="text" placeholder={`${t('arabic')}`} value={locationAr} onChange={e => setLocationAr(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500" dir="rtl" required />
            </InputGroup>

             <InputGroup label={t('services')}>
                <input type="text" placeholder={`${t('english')}`} value={servicesEn} onChange={e => setServicesEn(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500" />
                <input type="text" placeholder={`${t('arabic')}`} value={servicesAr} onChange={e => setServicesAr(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500" dir="rtl" />
            </InputGroup>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                 <div>
                    <label className="block font-semibold mb-1">{t('category')}</label>
                    <select value={category} onChange={e => setCategory(e.target.value as OfferCategory)} className="w-full p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500" required>
                        <option value="" disabled>{t('selectCategory')}</option>
                         {Object.values(OfferCategory).map(cat => (
                            <option key={cat} value={cat}>{categoryToString(cat)}</option>
                        ))}
                    </select>
                </div>
                <div>
                    <label className="block font-semibold mb-1">{t('price')} ($)</label>
                    <input type="number" value={price} onChange={e => setPrice(parseFloat(e.target.value))} className="w-full p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500" required />
                </div>
            </div>

             <div className="mb-6">
                <label className="block font-semibold mb-1">{t('images')}</label>
                <input type="text" value={images} onChange={e => setImages(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-600 dark:border-gray-500" required />
            </div>

            <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-md transition-colors">{t('saveOffer')}</button>
        </form>
      </div>
    </div>
  );
};

export default AddOfferPage;
