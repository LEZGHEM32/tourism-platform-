
import React from 'react';
import { AppProvider, AppContext } from './context/AppContext';
import { useAppContext } from './hooks/useAppContext';
import { PAGES } from './constants';

import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import HomePage from './components/pages/HomePage';
import OffersPage from './components/pages/OffersPage';
import OfferDetailsPage from './components/pages/OfferDetailsPage';
import DashboardPage from './components/pages/DashboardPage';
import AddOfferPage from './components/pages/AddOfferPage';
import ReceiptPage from './components/pages/ReceiptPage';
import AuthModal from './components/modals/AuthModal';
import ChatAssistant from './components/common/ChatAssistant';

const PageRenderer = () => {
    const { state } = useAppContext();
    
    switch (state.activePage) {
        case PAGES.HOME:
            return <HomePage />;
        case PAGES.OFFERS:
            return <OffersPage />;
        case PAGES.OFFER_DETAILS:
            return <OfferDetailsPage />;
        case PAGES.DASHBOARD:
            return <DashboardPage />;
        case PAGES.ADD_OFFER:
            return <AddOfferPage />;
        case PAGES.RECEIPT:
            return <ReceiptPage />;
        default:
            return <HomePage />;
    }
}

const App: React.FC = () => {
  return (
    <AppProvider>
        <div className="flex flex-col min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300">
            <Header />
            <main className="flex-grow relative">
                <PageRenderer />
            </main>
            <Footer />
            <AuthModal />
            <ChatAssistant />
        </div>
    </AppProvider>
  );
};

export default App;
