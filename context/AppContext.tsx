
import React, { createContext, useReducer, ReactNode, Dispatch, useEffect } from 'react';
import { AppState, Action, User, Offer, Booking, Inquiry, UserType, OfferCategory } from '../types';
import { mockUsers, mockOffers, mockBookings, mockInquiries } from '../data/mock';
import { translations } from '../translations';

const initialState: AppState = {
  language: 'en',
  theme: 'light',
  currentUser: null,
  offers: [],
  bookings: [],
  inquiries: [],
  activePage: 'HOME',
  pagePayload: null,
  modals: {
    auth: false,
    booking: false,
    payment: false,
    inquiry: false,
    youtube: false,
    deleteConfirmation: false,
    cancelBooking: false,
  },
};

const appReducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case 'SET_INITIAL_DATA':
        return { ...state, ...action.payload };
    case 'SET_LANGUAGE':
      return { ...state, language: action.payload };
    case 'SET_THEME':
      return { ...state, theme: action.payload };
    case 'SET_USER':
      return { ...state, currentUser: action.payload };
    case 'ADD_BOOKING':
      return { ...state, bookings: [...state.bookings, action.payload] };
    case 'UPDATE_BOOKING_STATUS':
      return {
        ...state,
        bookings: state.bookings.map(b =>
          b.id === action.payload.bookingId ? { ...b, status: action.payload.status } : b
        ),
      };
    case 'ADD_INQUIRY':
      return { ...state, inquiries: [...state.inquiries, action.payload] };
    case 'ADD_REPLY_TO_INQUIRY':
      return {
          ...state,
          inquiries: state.inquiries.map(i => i.id === action.payload.inquiryId ? {...i, answer: action.payload.answer} : i)
      }
    case 'ADD_OFFER':
      return { ...state, offers: [...state.offers, action.payload] };
    case 'DELETE_OFFER':
      return { ...state, offers: state.offers.filter(o => o.id !== action.payload) };
    case 'SET_PAGE':
      return { ...state, activePage: action.payload.page, pagePayload: action.payload.pagePayload || null };
    case 'OPEN_MODAL':
      return { ...state, modals: { ...state.modals, [action.payload]: true } };
    case 'CLOSE_MODAL':
      return { ...state, modals: { ...state.modals, [action.payload]: false } };
    default:
      return state;
  }
};

interface AppContextType {
  state: AppState;
  dispatch: Dispatch<Action>;
  t: (key: keyof typeof translations.en) => string;
  categoryToString: (category: OfferCategory) => string;
}

export const AppContext = createContext<AppContextType>({
  state: initialState,
  dispatch: () => null,
  t: () => '',
  categoryToString: () => '',
});

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(appReducer, initialState);

  useEffect(() => {
    // Simulate fetching initial data
    dispatch({
        type: 'SET_INITIAL_DATA',
        payload: {
            offers: mockOffers,
            bookings: mockBookings,
            inquiries: mockInquiries
        }
    })
  }, []);

  useEffect(() => {
    document.documentElement.lang = state.language;
    document.documentElement.dir = state.language === 'ar' ? 'rtl' : 'ltr';
    if(state.language === 'ar') {
        document.documentElement.style.fontFamily = 'Cairo, sans-serif';
    } else {
        document.documentElement.style.fontFamily = 'Inter, sans-serif';
    }
  }, [state.language]);

  useEffect(() => {
    if (state.theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [state.theme]);

  const t = (key: keyof typeof translations.en): string => {
    return translations[state.language][key] || key;
  };

  const categoryToString = (category: OfferCategory): string => {
    const key = category as keyof typeof translations.en;
    return t(key);
  }

  return (
    <AppContext.Provider value={{ state, dispatch, t, categoryToString }}>
      {children}
    </AppContext.Provider>
  );
};
