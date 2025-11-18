
import { User, Offer, Booking, Inquiry, UserType, OfferCategory } from '../types';

export const mockUsers: User[] = [
  { id: 1, name: 'Ahmed Ali', email: 'tourist@example.com', type: UserType.Tourist },
  { id: 2, name: 'Sahara Adventures', email: 'provider@example.com', type: UserType.Provider },
  { id: 3, name: 'Fatima Zahra', email: 'tourist2@example.com', type: UserType.Tourist },
];

export const mockOffers: Offer[] = [
  {
    id: 'offer-1',
    providerId: 2,
    title: { en: 'Tassili n\'Ajjer 10-Day Trek', ar: 'رحلة 10 أيام في طاسيلي ناجر' },
    description: {
      en: 'An unforgettable journey through the stunning landscapes of Tassili n\'Ajjer National Park. Discover ancient rock art and sleep under the stars.',
      ar: 'رحلة لا تُنسى عبر المناظر الطبيعية الخلابة لمنتزه طاسيلي ناجر الوطني. اكتشف الفن الصخري القديم ونم تحت النجوم.',
    },
    category: OfferCategory.Tour,
    location: { en: 'Djanet', ar: 'جانت' },
    pricePerPerson: 1200,
    images: ['https://picsum.photos/seed/desert1/800/600', 'https://picsum.photos/seed/desert2/800/600', 'https://picsum.photos/seed/desert3/800/600'],
    rating: 4.9,
    reviews: 120,
    featured: true,
    includedServices: {
      en: ['4x4 Transport', 'Professional Guide', 'All Meals', 'Camping Gear', 'Park Fees'],
      ar: ['نقل بالدفع الرباعي', 'دليل محترف', 'جميع الوجبات', 'معدات التخييم', 'رسوم المنتزه'],
    },
    cancellationPolicy: {
      en: 'Full refund if canceled 30 days before the trip. 50% refund if canceled 15 days before.',
      ar: 'استرداد كامل المبلغ في حالة الإلغاء قبل 30 يومًا من الرحلة. استرداد 50٪ في حالة الإلغاء قبل 15 يومًا.',
    },
    itinerary: [
      { day: 1, title: { en: 'Arrival in Djanet', ar: 'الوصول إلى جانت' }, description: { en: 'Welcome and transfer to the campsite.', ar: 'الاستقبال والنقل إلى المخيم.' } },
      { day: 2, title: { en: 'Discovering Rock Art', ar: 'اكتشاف الفن الصخري' }, description: { en: 'Visit the famous rock art sites of Jabbaren.', ar: 'زيارة مواقع الفن الصخري الشهيرة في جبّارين.' } },
    ],
  },
  {
    id: 'offer-2',
    providerId: 2,
    title: { en: 'Luxury Stay at Oasis Palace', ar: 'إقامة فاخرة في قصر الواحة' },
    description: {
      en: 'Experience luxury in the heart of the desert. Our hotel offers premium amenities with breathtaking views of the dunes.',
      ar: 'جرب الفخامة في قلب الصحراء. يقدم فندقنا وسائل راحة ممتازة مع إطلالات خلابة على الكثبان الرملية.',
    },
    category: OfferCategory.Hotel,
    location: { en: 'Taghit', ar: 'تاغيت' },
    pricePerNight: 250,
    images: ['https://picsum.photos/seed/hotel1/800/600', 'https://picsum.photos/seed/hotel2/800/600', 'https://picsum.photos/seed/hotel3/800/600'],
    rating: 4.8,
    reviews: 340,
    featured: true,
    includedServices: {
      en: ['Swimming Pool', 'Breakfast Included', 'Wi-Fi', 'Air Conditioning'],
      ar: ['مسبح', 'شامل الإفطار', 'واي فاي', 'تكييف هواء'],
    },
    cancellationPolicy: {
      en: 'Free cancellation up to 7 days before check-in.',
      ar: 'إلغاء مجاني حتى 7 أيام قبل تاريخ الوصول.',
    },
  },
  {
    id: 'offer-3',
    providerId: 2,
    title: { en: 'Authentic Guesthouse in Ghardaia', ar: 'دار ضيافة أصيلة في غرداية' },
    description: {
      en: 'Stay with a local family in a traditional M\'zabite house. A unique cultural immersion experience.',
      ar: 'أقم مع عائلة محلية في منزل مزابي تقليدي. تجربة انغماس ثقافي فريدة من نوعها.',
    },
    category: OfferCategory.Guesthouse,
    location: { en: 'Ghardaia', ar: 'غرداية' },
    pricePerNight: 80,
    images: ['https://picsum.photos/seed/house1/800/600', 'https://picsum.photos/seed/house2/800/600'],
    rating: 4.9,
    reviews: 95,
    featured: true,
    includedServices: {
      en: ['Home-cooked Dinner & Breakfast', 'Guided tour of the city', 'Mint Tea Ceremony'],
      ar: ['عشاء و فطور منزلي', 'جولة مع مرشد في المدينة', 'جلسة شاي بالنعناع'],
    },
    cancellationPolicy: {
      en: 'Full refund if canceled 14 days before check-in.',
      ar: 'استرداد كامل المبلغ في حالة الإلغاء قبل 14 يومًا من تاريخ الوصول.',
    },
  },
  {
    id: 'offer-4',
    providerId: 2,
    title: { en: 'Assekrem at Sunrise', ar: 'أسكرام عند شروق الشمس' },
    description: {
      en: 'A 3-day trip to the Hoggar Mountains, culminating in the breathtaking sunrise view from the Assekrem plateau.',
      ar: 'رحلة لمدة 3 أيام إلى جبال الهقار، تبلغ ذروتها بمشهد شروق الشمس الخلاب من هضبة أسكرام.',
    },
    category: OfferCategory.Tour,
    location: { en: 'Tamanrasset', ar: 'تمنراست' },
    pricePerPerson: 500,
    images: ['https://picsum.photos/seed/assekrem1/800/600', 'https://picsum.photos/seed/assekrem2/800/600'],
    rating: 5.0,
    reviews: 210,
    featured: true,
    includedServices: {
      en: ['Transport', 'Guide', 'Meals', 'Accommodation in a refuge'],
      ar: ['النقل', 'مرشد', 'وجبات', 'إقامة في ملجأ'],
    },
    cancellationPolicy: {
      en: '50% refund if canceled 15 days before.',
      ar: 'استرداد 50٪ في حالة الإلغاء قبل 15 يومًا.',
    },
  },
];

export const mockBookings: Booking[] = [
  {
    id: 'booking-1',
    offerId: 'offer-2',
    userId: 1,
    startDate: '2024-09-10',
    endDate: '2024-09-15',
    guests: 2,
    companions: [{ name: 'Jane Doe', age: 30 }],
    totalPrice: 1250,
    status: 'confirmed',
    bookingDate: '2024-07-20',
    roomType: 'suite',
  },
  {
    id: 'booking-2',
    offerId: 'offer-1',
    userId: 3,
    guests: 1,
    companions: [],
    totalPrice: 1200,
    status: 'pending',
    bookingDate: '2024-07-22',
  },
];

export const mockInquiries: Inquiry[] = [
  {
    id: 'inquiry-1',
    offerId: 'offer-1',
    userId: 1,
    question: 'Is it possible to have vegetarian meals during the trek?',
    answer: 'Yes, absolutely! We can cater to all dietary requirements. Please let us know in advance.',
    date: '2024-07-15',
  },
  {
    id: 'inquiry-2',
    offerId: 'offer-2',
    userId: 3,
    question: 'Do you have an airport shuttle service from Taghit airport?',
    date: '2024-07-21',
  },
];
