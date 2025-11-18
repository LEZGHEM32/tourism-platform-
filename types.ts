
export enum UserType {
  Tourist = 'tourist',
  Provider = 'provider',
}

export interface User {
  id: number;
  name: string;
  email: string;
  type: UserType;
}

export enum OfferCategory {
  Tour = 'tour',
  Hotel = 'hotel',
  Guesthouse = 'guesthouse',
}

export interface ItineraryItem {
  day: number;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
}

export interface Offer {
  id: string;
  providerId: number;
  title: { en: string; ar: string };
  description: { en: string; ar: string };
  category: OfferCategory;
  location: { en: string; ar: string };
  pricePerNight?: number;
  pricePerPerson?: number;
  images: string[];
  rating: number;
  reviews: number;
  includedServices: { en: string[]; ar: string[] };
  cancellationPolicy: { en: string; ar: string };
  itinerary?: ItineraryItem[];
  featured?: boolean;
}

export interface Booking {
  id: string;
  offerId: string;
  userId: number;
  startDate?: string;
  endDate?: string;
  guests: number;
  companions: { name: string; age: number }[];
  totalPrice: number;
  status: 'pending' | 'confirmed' | 'rejected' | 'cancelled';
  bookingDate: string;
  roomType?: string;
}

export interface Inquiry {
  id: string;
  offerId: string;
  userId: number;
  question: string;
  answer?: string;
  date: string;
}

export type AppState = {
  language: 'en' | 'ar';
  theme: 'light' | 'dark';
  currentUser: User | null;
  offers: Offer[];
  bookings: Booking[];
  inquiries: Inquiry[];
  activePage: string;
  pagePayload: any;
  modals: {
    auth: boolean;
    booking: boolean;
    payment: boolean;
    inquiry: boolean;
    youtube: boolean;
    deleteConfirmation: boolean;
    cancelBooking: boolean;
  };
};

export type Action =
  | { type: 'SET_LANGUAGE'; payload: 'en' | 'ar' }
  | { type: 'SET_THEME'; payload: 'light' | 'dark' }
  | { type: 'SET_USER'; payload: User | null }
  | { type: 'ADD_BOOKING'; payload: Booking }
  | { type: 'UPDATE_BOOKING_STATUS'; payload: { bookingId: string; status: 'confirmed' | 'rejected' | 'cancelled' } }
  | { type: 'ADD_INQUIRY'; payload: Inquiry }
  | { type: 'ADD_REPLY_TO_INQUIRY'; payload: { inquiryId: string; answer: string } }
  | { type: 'SET_PAGE'; payload: { page: string; pagePayload?: any } }
  | { type: 'OPEN_MODAL'; payload: keyof AppState['modals'] }
  | { type: 'CLOSE_MODAL'; payload: keyof AppState['modals'] }
  | { type: 'ADD_OFFER'; payload: Offer }
  | { type: 'DELETE_OFFER'; payload: string }
  | { type: 'SET_INITIAL_DATA'; payload: { offers: Offer[], bookings: Booking[], inquiries: Inquiry[] } };
