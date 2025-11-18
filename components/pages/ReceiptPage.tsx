
import React from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { generatePdf } from '../../utils/pdfGenerator';

const ReceiptPage: React.FC = () => {
    const { state, t } = useAppContext();
    const { pagePayload, bookings, offers, users } = state;

    const booking = bookings.find(b => b.id === pagePayload);

    if (!booking) {
        return <div className="container mx-auto p-8">Booking not found.</div>;
    }

    const offer = offers.find(o => o.id === booking.offerId);
    const user = users.find(u => u.id === booking.userId);

    if (!offer || !user) {
        return <div className="container mx-auto p-8">Error loading receipt details.</div>
    }
    
    const RECEIPT_ID = 'receipt-content';

    return (
        <div className="bg-gray-100 dark:bg-background-dark min-h-screen py-12">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
                    <div id={RECEIPT_ID} className="text-text-light dark:text-text-dark p-4">
                        <div className="flex justify-between items-start mb-8 border-b pb-4 dark:border-gray-600">
                            <div>
                                <h1 className="text-3xl font-bold text-primary dark:text-primary-light">{t('bookingReceipt')}</h1>
                                <p className="text-gray-500 dark:text-gray-400">Booking ID: {booking.id}</p>
                            </div>
                             <div className="text-right rtl:text-left">
                                <h2 className="text-xl font-bold">{t('marhaba')}</h2>
                                <p className="text-sm">{t('desertTourism')}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-8 mb-8">
                             <div>
                                <h3 className="font-semibold mb-2">{t('customer')}</h3>
                                <p>{user.name}</p>
                                <p>{user.email}</p>
                            </div>
                            <div>
                                <h3 className="font-semibold mb-2">{t('bookingDetails')}</h3>
                                <p><strong>{t('offer')}:</strong> {offer.title[state.language]}</p>
                                <p><strong>{t('date')}:</strong> {booking.startDate ? `${booking.startDate} - ${booking.endDate}` : booking.bookingDate}</p>
                                <p><strong>{t('guests')}:</strong> {booking.guests}</p>
                            </div>
                        </div>
                        
                        <div className="mb-8">
                             <h3 className="font-semibold mb-2 text-lg border-b pb-2 dark:border-gray-600">{t('summary')}</h3>
                             <div className="flex justify-between items-center py-2">
                                <span>{offer.title[state.language]}</span>
                                <span>${booking.totalPrice.toFixed(2)}</span>
                             </div>
                             <div className="flex justify-between items-center py-4 border-t-2 border-gray-500 dark:border-gray-400 mt-4">
                                <span className="font-bold text-xl">{t('total')}</span>
                                <span className="font-bold text-xl text-primary dark:text-primary-light">${booking.totalPrice.toFixed(2)}</span>
                             </div>
                        </div>
                    </div>
                     <div className="text-center mt-8">
                        <button onClick={() => generatePdf(RECEIPT_ID, `receipt-${booking.id}`)} className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-6 rounded-md transition-colors">
                            {t('downloadPDF')}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ReceiptPage;
