
import React, { useState } from 'react';
import Modal from '../common/Modal';
import { useAppContext } from '../../hooks/useAppContext';
import { Offer, Inquiry } from '../../types';

interface InquiryModalProps {
    offer: Offer;
}

const InquiryModal: React.FC<InquiryModalProps> = ({ offer }) => {
  const { state, dispatch, t } = useAppContext();
  const [question, setQuestion] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!state.currentUser) {
        dispatch({ type: 'CLOSE_MODAL', payload: 'inquiry' });
        dispatch({ type: 'OPEN_MODAL', payload: 'auth' });
        return;
    }
    const newInquiry: Inquiry = {
        id: `inquiry-${Date.now()}`,
        offerId: offer.id,
        userId: state.currentUser.id,
        question,
        date: new Date().toISOString().split('T')[0],
    };
    dispatch({type: 'ADD_INQUIRY', payload: newInquiry});
    setQuestion('');
    dispatch({ type: 'CLOSE_MODAL', payload: 'inquiry' });
    alert('Your question has been sent!');
  };

  return (
    <Modal isOpen={state.modals.inquiry} onClose={() => dispatch({ type: 'CLOSE_MODAL', payload: 'inquiry' })} title={t('askQuestion')}>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">{t('yourQuestion')}</label>
          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            rows={5}
            className="w-full p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600"
            placeholder={t('yourQuestion')}
            required
          />
        </div>
        <button type="submit" className="w-full bg-primary hover:bg-primary-dark text-white font-bold py-3 px-4 rounded-md transition-colors duration-300">
          {t('sendQuestion')}
        </button>
      </form>
    </Modal>
  );
};

export default InquiryModal;
