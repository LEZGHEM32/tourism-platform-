
import React, { useState, useMemo } from 'react';
import Modal from '../common/Modal';
import { useAppContext } from '../../hooks/useAppContext';
import { Offer, OfferCategory, Booking } from '../../types';
import { PlusIcon, MinusIcon } from '../common/Icons';

interface BookingModalProps {
  offer: Offer;
}

const BookingModal: React.FC<BookingModalProps> = ({ offer }) => {
  const { state, dispatch, t } = useAppContext();
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [guests, setGuests] = useState(1);
  const [companions, setCompanions] = useState<{ name: string; age: number }[]>([]);

  const totalPrice = useMemo(() => {
    if (offer.category === OfferCategory.Tour) {
      return (offer.pricePerPerson || 0) * guests;
    }
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const nights = Math.ceil((end.getTime() - start.getTime()) / (1000 * 3600 * 24));
      return (offer.pricePerNight || 0) * (nights > 0 ? nights : 0);
    }
    return 0;
  }, [startDate, endDate, guests, offer]);

  const addCompanion = () => {
    setCompanions([...companions, { name: '', age: 0 }]);
  };

  const removeCompanion = (index: number) => {
    setCompanions(companions.filter((_, i) => i !== index));
  };
  
  const handleCompanionChange = <T,>(index: number, field: keyof typeof companions[0], value: T) => {
    const newCompanions = [...companions];
    newCompanions[index] = { ...newCompanions[index], [field]: value };
    setCompanions(newCompanions);
  };


  const handleSubmit = () => {
    if (!state.currentUser) {
        dispatch({ type: 'CLOSE_MODAL', payload: 'booking' });
        dispatch({ type: 'OPEN_MODAL', payload: 'auth' });
        return;
    }
    const newBooking: Booking = {
        id: `booking-${Date.now()}`,
        offerId: offer.id,
        userId: state.currentUser.id,
        startDate: offer.category !== OfferCategory.Tour ? startDate : undefined,
        endDate: offer.category !== OfferCategory.Tour ? endDate : undefined,
        guests,
        companions,
        totalPrice,
        status: 'pending',
        bookingDate: new Date().toISOString().split('T')[0],
    };
    dispatch({type: 'ADD_BOOKING', payload: newBooking});
    dispatch({ type: 'CLOSE_MODAL', payload: 'booking' });
    dispatch({ type: 'OPEN_MODAL', payload: 'payment' });
  };

  const isTour = offer.category === OfferCategory.Tour;

  return (
    <Modal isOpen={state.modals.booking} onClose={() => dispatch({ type: 'CLOSE_MODAL', payload: 'booking' })} title={t('completeYourBooking')}>
      <div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {!isTour && (
                <>
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('checkIn')}</label>
                        <input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"/>
                    </div>
                    <div>
                        <label className="block text-sm font-medium mb-1">{t('checkOut')}</label>
                        <input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"/>
                    </div>
                </>
            )}
            {isTour && (
                 <div>
                    <label className="block text-sm font-medium mb-1">{t('numberOfGuests')}</label>
                    <div className="flex items-center space-x-2">
                        <button onClick={() => setGuests(g => Math.max(1, g - 1))} className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"><MinusIcon className="w-4 h-4" /></button>
                        <span className="w-12 text-center font-semibold">{guests}</span>
                        <button onClick={() => setGuests(g => g + 1)} className="p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"><PlusIcon className="w-4 h-4" /></button>
                    </div>
                </div>
            )}
        </div>

        {isTour && (
            <div className="mb-4">
                <h4 className="font-semibold mb-2">{t('companions')}</h4>
                {companions.map((comp, index) => (
                    <div key={index} className="flex items-center gap-2 mb-2">
                        <input type="text" placeholder={t('companionName')} value={comp.name} onChange={e => handleCompanionChange(index, 'name', e.target.value)} className="flex-grow p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"/>
                        <input type="number" placeholder={t('age')} value={comp.age || ''} onChange={e => handleCompanionChange(index, 'age', parseInt(e.target.value))} className="w-20 p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"/>
                        <button onClick={() => removeCompanion(index)} className="bg-red-500 text-white p-2 rounded-md">&times;</button>
                    </div>
                ))}
                <button onClick={addCompanion} className="text-sm text-primary hover:underline">{t('addCompanion')}</button>
            </div>
        )}

        <div className="mt-6 p-4 bg-primary-light/20 dark:bg-primary-dark/20 rounded-lg flex justify-between items-center">
            <span className="font-bold text-lg">{t('totalPrice')}</span>
            <span className="font-bold text-xl text-primary dark:text-primary-light">${totalPrice.toFixed(2)}</span>
        </div>

        <button onClick={handleSubmit} className="mt-6 w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-md transition-colors duration-300">
            {t('proceedToPayment')}
        </button>
      </div>
    </Modal>
  );
};

export default BookingModal;

