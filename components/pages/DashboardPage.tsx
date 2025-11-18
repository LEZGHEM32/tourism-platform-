
import React, { useState } from 'react';
import { useAppContext } from '../../hooks/useAppContext';
import { UserType, Booking, Inquiry, Offer } from '../../types';
import { PAGES } from '../../constants';
import Modal from '../common/Modal';
import { TrashIcon, XCircleIcon } from '../common/Icons';

const TouristDashboard: React.FC = () => {
    const { state, dispatch, t } = useAppContext();
    const { currentUser, bookings, offers, inquiries } = state;
    const myBookings = bookings.filter(b => b.userId === currentUser?.id);
    const myInquiries = inquiries.filter(i => i.userId === currentUser?.id);
    const [bookingToCancel, setBookingToCancel] = useState<string | null>(null);

    const promptCancel = (bookingId: string) => {
        setBookingToCancel(bookingId);
        dispatch({ type: 'OPEN_MODAL', payload: 'cancelBooking' });
    };

    const confirmCancel = () => {
        if (bookingToCancel) {
            dispatch({ type: 'UPDATE_BOOKING_STATUS', payload: { bookingId: bookingToCancel, status: 'cancelled' } });
            setBookingToCancel(null);
            dispatch({ type: 'CLOSE_MODAL', payload: 'cancelBooking' });
        }
    };

    const abortCancel = () => {
         setBookingToCancel(null);
         dispatch({ type: 'CLOSE_MODAL', payload: 'cancelBooking' });
    }

    return (
        <div>
            <h2 className="text-2xl font-bold mb-6">{t('myBookings')}</h2>
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-x-auto mb-12">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">{t('offer')}</th>
                            <th scope="col" className="px-6 py-3">{t('date')}</th>
                            <th scope="col" className="px-6 py-3">{t('status')}</th>
                            <th scope="col" className="px-6 py-3">{t('totalPrice')}</th>
                            <th scope="col" className="px-6 py-3">{t('action')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myBookings.map(booking => {
                            const offer = offers.find(o => o.id === booking.offerId);
                            return (
                                <tr key={booking.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{offer?.title[state.language]}</td>
                                    <td className="px-6 py-4">{booking.startDate ? `${booking.startDate} - ${booking.endDate}` : booking.bookingDate}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                                            booking.status === 'confirmed' ? 'bg-green-100 text-green-800' : 
                                            booking.status === 'pending' ? 'bg-yellow-100 text-yellow-800' : 
                                            booking.status === 'cancelled' ? 'bg-gray-100 text-gray-800' :
                                            'bg-red-100 text-red-800'
                                        }`}>
                                            {t(booking.status)}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">${booking.totalPrice.toFixed(2)}</td>
                                    <td className="px-6 py-4 flex gap-2 items-center">
                                        <button onClick={() => dispatch({type: 'SET_PAGE', payload: {page: PAGES.RECEIPT, pagePayload: booking.id}})} className="text-primary hover:underline">{t('viewReceipt')}</button>
                                        {booking.status !== 'cancelled' && booking.status !== 'rejected' && (
                                            <button onClick={() => promptCancel(booking.id)} className="text-red-500 hover:text-red-700 ml-2" title={t('cancelBooking')}>
                                                <XCircleIcon className="w-5 h-5" />
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                        {myBookings.length === 0 && (
                             <tr>
                                <td colSpan={5} className="px-6 py-4 text-center">{t('noResults') || "No bookings yet."}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <h2 className="text-2xl font-bold mb-6">{t('inquiries')}</h2>
            <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                        <tr>
                            <th scope="col" className="px-6 py-3">{t('offer')}</th>
                            <th scope="col" className="px-6 py-3">{t('date')}</th>
                            <th scope="col" className="px-6 py-3">{t('question')}</th>
                            <th scope="col" className="px-6 py-3">{t('answer')}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {myInquiries.map(inquiry => {
                            const offer = offers.find(o => o.id === inquiry.offerId);
                            return (
                                <tr key={inquiry.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
                                    <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{offer?.title[state.language]}</td>
                                    <td className="px-6 py-4">{inquiry.date}</td>
                                    <td className="px-6 py-4 max-w-xs truncate" title={inquiry.question}>{inquiry.question}</td>
                                    <td className="px-6 py-4">
                                        {inquiry.answer ? (
                                            <span className="text-green-600 dark:text-green-400 truncate block max-w-xs" title={inquiry.answer}>{inquiry.answer}</span>
                                        ) : (
                                            <span className="px-2 py-1 rounded-full text-xs font-semibold bg-yellow-100 text-yellow-800">{t('pending')}</span>
                                        )}
                                    </td>
                                </tr>
                            )
                        })}
                         {myInquiries.length === 0 && (
                            <tr>
                                <td colSpan={4} className="px-6 py-4 text-center text-gray-500">{t('noReplyYet')}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

             {/* Cancel Booking Confirmation Modal */}
             <Modal isOpen={state.modals.cancelBooking} onClose={abortCancel} title={t('confirmCancelBookingTitle')}>
                <p className="mb-6 text-gray-600 dark:text-gray-300">{t('confirmCancelBookingMessage')}</p>
                <div className="flex justify-end gap-3">
                    <button onClick={abortCancel} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">{t('cancel')}</button>
                    <button onClick={confirmCancel} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md">{t('confirm')}</button>
                </div>
            </Modal>
        </div>
    );
};

const ProviderDashboard: React.FC = () => {
    const { state, dispatch, t } = useAppContext();
    const { currentUser, offers, bookings, inquiries, users } = state;
    const [activeTab, setActiveTab] = useState('offers');
    const [replyText, setReplyText] = useState<{[key:string]: string}>({});
    const [offerToDelete, setOfferToDelete] = useState<string | null>(null);
    
    const myOffers = offers.filter(o => o.providerId === currentUser?.id);
    const myOfferIds = myOffers.map(o => o.id);
    const myBookings = bookings.filter(b => myOfferIds.includes(b.offerId));
    const myInquiries = inquiries.filter(i => myOfferIds.includes(i.offerId));

    const handleBookingStatus = (bookingId: string, status: 'confirmed' | 'rejected') => {
        dispatch({type: 'UPDATE_BOOKING_STATUS', payload: {bookingId, status}});
    };

    const handleReply = (inquiryId: string) => {
        dispatch({type: 'ADD_REPLY_TO_INQUIRY', payload: {inquiryId, answer: replyText[inquiryId]}});
        setReplyText(prev => ({...prev, [inquiryId]: ''}));
    };

    const promptDelete = (offerId: string) => {
        setOfferToDelete(offerId);
        dispatch({ type: 'OPEN_MODAL', payload: 'deleteConfirmation' });
    };

    const confirmDelete = () => {
        if (offerToDelete) {
            dispatch({ type: 'DELETE_OFFER', payload: offerToDelete });
            setOfferToDelete(null);
            dispatch({ type: 'CLOSE_MODAL', payload: 'deleteConfirmation' });
        }
    };

    const cancelDelete = () => {
        setOfferToDelete(null);
        dispatch({ type: 'CLOSE_MODAL', payload: 'deleteConfirmation' });
    };
    
    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                 <h2 className="text-2xl font-bold">{t('dashboard')}</h2>
                 <button onClick={() => dispatch({type: 'SET_PAGE', payload: {page: PAGES.ADD_OFFER}})} className="bg-primary hover:bg-primary-dark text-white font-bold py-2 px-4 rounded-md transition-colors">{t('addNewOffer')}</button>
            </div>
            <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
                <nav className="-mb-px flex space-x-8 rtl:space-x-reverse" aria-label="Tabs">
                    <button onClick={() => setActiveTab('offers')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'offers' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>{t('myOffers')}</button>
                    <button onClick={() => setActiveTab('bookings')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'bookings' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>{t('myBookings')}</button>
                    <button onClick={() => setActiveTab('inquiries')} className={`whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm ${activeTab === 'inquiries' ? 'border-primary text-primary' : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'}`}>{t('inquiries')}</button>
                </nav>
            </div>

            {activeTab === 'offers' && (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {myOffers.map(offer => (
                        <div key={offer.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow relative group">
                            <h3 className="font-bold">{offer.title[state.language]}</h3>
                            <p className="text-sm text-gray-500">{offer.location[state.language]}</p>
                            <div className="absolute top-4 right-4 rtl:left-4 rtl:right-auto opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                    onClick={() => promptDelete(offer.id)} 
                                    className="p-2 text-red-500 hover:bg-red-100 rounded-full transition-colors"
                                    title={t('deleteOffer')}
                                >
                                    <TrashIcon className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
            {activeTab === 'bookings' && (
                <div className="bg-white dark:bg-gray-800 shadow-md rounded-lg overflow-x-auto">
                    <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                             <tr>
                                <th scope="col" className="px-6 py-3">{t('customer')}</th>
                                <th scope="col" className="px-6 py-3">{t('offer')}</th>
                                <th scope="col" className="px-6 py-3">{t('date')}</th>
                                <th scope="col" className="px-6 py-3">{t('status')}</th>
                                <th scope="col" className="px-6 py-3">{t('action')}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {myBookings.map(booking => {
                                const offer = offers.find(o => o.id === booking.offerId);
                                const user = users.find(u => u.id === booking.userId);
                                return (
                                    <tr key={booking.id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                        <td className="px-6 py-4">{user?.name}</td>
                                        <td className="px-6 py-4">{offer?.title[state.language]}</td>
                                        <td className="px-6 py-4">{booking.startDate ? `${booking.startDate} - ${booking.endDate}` : booking.bookingDate}</td>
                                        <td className="px-6 py-4">{t(booking.status)}</td>
                                        <td className="px-6 py-4 flex gap-2">
                                            {booking.status === 'pending' && (
                                                <>
                                                    <button onClick={() => handleBookingStatus(booking.id, 'confirmed')} className="text-green-600 hover:underline">{t('approve')}</button>
                                                    <button onClick={() => handleBookingStatus(booking.id, 'rejected')} className="text-red-600 hover:underline">{t('reject')}</button>
                                                </>
                                            )}
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            )}
             {activeTab === 'inquiries' && (
                <div className="space-y-6">
                    {myInquiries.map(inquiry => {
                        const user = users.find(u => u.id === inquiry.userId);
                        return (
                            <div key={inquiry.id} className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow">
                               <p className="text-sm text-gray-500">{user?.name} - {inquiry.date}</p>
                               <p className="font-semibold mt-1">{t('question')}: {inquiry.question}</p>
                               {inquiry.answer ? (
                                   <p className="mt-2 text-green-700 dark:text-green-400">{t('answer')}: {inquiry.answer}</p>
                               ) : (
                                   <div className="mt-2 flex gap-2">
                                       <input 
                                         type="text" 
                                         value={replyText[inquiry.id] || ''}
                                         onChange={e => setReplyText(prev => ({...prev, [inquiry.id]: e.target.value}))}
                                         className="flex-grow p-2 border rounded-md dark:bg-gray-700 dark:border-gray-600" 
                                         placeholder={t('noReplyYet')} />
                                       <button onClick={() => handleReply(inquiry.id)} className="bg-primary text-white px-4 rounded-md">{t('reply')}</button>
                                   </div>
                               )}
                            </div>
                        )
                    })}
                </div>
            )}
             {/* Delete Confirmation Modal */}
            <Modal isOpen={state.modals.deleteConfirmation} onClose={cancelDelete} title={t('confirmDeleteTitle')}>
                <p className="mb-6 text-gray-600 dark:text-gray-300">{t('confirmDeleteMessage')}</p>
                <div className="flex justify-end gap-3">
                    <button onClick={cancelDelete} className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700">{t('cancel')}</button>
                    <button onClick={confirmDelete} className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-md">{t('delete')}</button>
                </div>
            </Modal>
        </div>
    );
};


const DashboardPage: React.FC = () => {
    const { state, t } = useAppContext();
    const { currentUser } = state;

    if (!currentUser) {
        return <div className="container mx-auto px-6 py-12 text-center">Please log in to view your dashboard.</div>;
    }

    return (
        <div className="bg-gray-100 dark:bg-background-dark text-text-light dark:text-text-dark min-h-screen">
            <div className="container mx-auto px-6 py-12">
                <h1 className="text-4xl font-bold mb-8">{t('yourDashboard')}</h1>
                {currentUser.type === UserType.Tourist ? <TouristDashboard /> : <ProviderDashboard />}
            </div>
        </div>
    );
}

export default DashboardPage;
