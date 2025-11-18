
import React from 'react';
import Modal from '../common/Modal';
import { useAppContext } from '../../hooks/useAppContext';
import { PAGES } from '../../constants';

const PaymentModal: React.FC = () => {
  const { state, dispatch, t } = useAppContext();

  const handlePayment = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate payment success
    const latestBooking = state.bookings[state.bookings.length -1];
    dispatch({type: 'UPDATE_BOOKING_STATUS', payload: {bookingId: latestBooking.id, status: 'confirmed'}});
    
    // In a real app with a provider dashboard, this might stay pending until approved.
    // For this simulation, we'll auto-confirm.
    
    dispatch({ type: 'CLOSE_MODAL', payload: 'payment' });
    alert('Payment Successful! Your booking is confirmed.');
    dispatch({ type: 'SET_PAGE', payload: { page: PAGES.RECEIPT, pagePayload: latestBooking.id } });
  };

  return (
    <Modal isOpen={state.modals.payment} onClose={() => dispatch({ type: 'CLOSE_MODAL', payload: 'payment' })} title={t('paymentDetails')}>
      <form onSubmit={handlePayment}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">{t('cardNumber')}</label>
          <input type="text" placeholder="**** **** **** ****" className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"/>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium mb-1">{t('expiryDate')}</label>
            <input type="text" placeholder="MM/YY" className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">{t('cvc')}</label>
            <input type="text" placeholder="123" className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"/>
          </div>
        </div>
        <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-md transition-colors duration-300">
          {t('payNow')}
        </button>
      </form>
    </Modal>
  );
};

export default PaymentModal;
