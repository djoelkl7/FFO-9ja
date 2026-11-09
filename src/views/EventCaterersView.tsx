import React, { useState, useEffect } from 'react';
import { PageView } from '../types';
import { RESTAURANT_INFO, createWhatsAppUrl } from '../data/menuData';
import {
  MapPin,
  Utensils,
  Flame,
  Check,
  ChevronRight,
  ArrowRight,
  ArrowUpRight,
  Sparkles,
  Award,
  HeartHandshake,
  ShieldCheck,
  Truck,
  MessageCircle,
  X,
  Send,
  Eye,
  Plus,
} from 'lucide-react';
import { getAssetUrl, handleImageError } from '../utils/assetHelper';
import { CartingEventSlider } from '../components/CartingEventSlider';

interface EventCaterersViewProps {
  onNavigate: (page: PageView) => void;
}

interface CateringMenuItem {
  id: string;
  name: string;
  category: 'rice' | 'swallows' | 'grills' | 'chops' | 'drinks';
  description: string;
  image: string;
  tag: string;
}

const CATERING_MENU_ITEMS: CateringMenuItem[] = [
  // Rice
  {
    id: 'party-jollof',
    name: 'Party Jollof Rice',
    category: 'rice',
    description: 'Iconic firewood-smokey jollof rice prepared in traditional party style with deep savoury tomato richness.',
    image: getAssetUrl('assets/images/uploads/Jollof-Rice-450x450.jpg'),
    tag: 'Owambe Essential',
  },
  {
    id: 'jollof-assorted',
    name: 'Jollof with Assorted Meat & Plantain',
    category: 'rice',
    description: 'Smokey party jollof served with fried sweet dodo and tender spiced assorted beef and shaki.',
    image: getAssetUrl('assets/images/uploads/Jollof-with-assorted-meat-450x450.jpg'),
    tag: 'Crown Favourite',
  },
  {
    id: 'fried-rice-chicken',
    name: 'Nigerian Fried Rice & Chicken',
    category: 'rice',
    description: 'Seasoned grain stir-fried with sweet carrots, peas, liver and fragrant thyme, served with golden grilled chicken.',
    image: getAssetUrl('assets/images/uploads/Fried-Rice-with-chicken-450x450.jpg'),
    tag: 'Classic Feast',
  },
  {
    id: 'gizdodo-platter',
    name: 'Special Gizdodo Platter',
    category: 'rice',
    description: 'Sweet fried ripe plantain and tender chicken gizzards tossed in rich, seasoned pepper sauce.',
    image: getAssetUrl('assets/images/uploads/Gizdodo.JPG'),
    tag: 'Chef Signature',
  },

  // Soups & Swallows
  {
    id: 'pounded-yam-eforiro',
    name: 'Pounded Yam & Efo Riro',
    category: 'swallows',
    description: 'Silky smooth pounded yam paired with rich, hearty spinach vegetable soup cooked with locust beans, stockfish and assorted meat.',
    image: getAssetUrl('assets/images/uploads/Pounded-Yam-450x450.jpg'),
    tag: 'Traditional Royal',
  },
  {
    id: 'amala-ewedu-gbegiri',
    name: 'Amala, Ewedu & Gbegiri (Abula)',
    category: 'swallows',
    description: 'Authentic dark yam flour amala served with jute leaf soup (ewedu), yellow bean broth (gbegiri) and peppered meat sauce.',
    image: getAssetUrl('assets/images/uploads/Amala-450x450.jpg'),
    tag: 'Lagos Heritage',
  },
  {
    id: 'egusi-assorted-soup',
    name: 'Egusi Assorted Meat Soup',
    category: 'swallows',
    description: 'Slow-simmered ground melon seeds with bitterleaf and spinach, loaded with assorted meats and rich stock.',
    image: getAssetUrl('assets/images/uploads/Egusi-Assorted-meat-soup.JPG'),
    tag: 'Hearty Soup',
  },
  {
    id: 'eforiro-soup-catering',
    name: 'Eforiro Assorted Soup',
    category: 'swallows',
    description: 'Traditional rich vegetable stew loaded with assorted meats, smoked prawns, and traditional spices.',
    image: getAssetUrl('assets/images/uploads/Eforiro-Assorted-meat-soup.JPG'),
    tag: 'Rich Greens',
  },

  // Grills Corner
  {
    id: 'suya-platter-catering',
    name: 'Charcoal Suya Skewers & Platters',
    category: 'grills',
    description: 'Authentic northern Nigerian beef suya seasoned with artisanal yaji spice and grilled hot over hardwood charcoal.',
    image: getAssetUrl('assets/images/uploads/Suya-Platter-450x450.jpg'),
    tag: 'Live Charcoal',
  },
  {
    id: 'odogwu-platter-catering',
    name: 'The Grand Odogwu Platter',
    category: 'grills',
    description: 'Showstopping sharing feast with chicken wings, suya beef, butterfly king prawns, jollof rice, fried yam, corn and dodo.',
    image: getAssetUrl('assets/images/uploads/Odogwu-Platter.JPG'),
    tag: 'VIP Sharing',
  },
  {
    id: 'fish-odogwu-platter-catering',
    name: 'Fish Odogwu Platter (VIP Seafood Feast)',
    category: 'grills',
    description: '3 Whole Grilled Tilapias, Corn, Suya Chicken Wings, Butterfly King Prawns, Fried Yam (Dundun), Fried Plantain (Dodo), Fried Plantain on the Cob & Jollof Rice.',
    image: getAssetUrl('assets/images/uploads/Fish-Odogwu-Platter .JPG'),
    tag: 'Grand Seafood Feast',
  },
  {
    id: 'asun-goat-catering',
    name: 'Hot & Smokey Goat Asun',
    category: 'grills',
    description: 'Smokey charcoal-grilled goat meat diced and tossed in fiery scotch bonnets, red onions and bell peppers.',
    image: getAssetUrl('assets/images/uploads/Asun-450x450.jpg'),
    tag: 'Fiery Favourite',
  },
  {
    id: 'grilled-fish-catering',
    name: 'Whole Grilled Tilapia & Croaker',
    category: 'grills',
    description: 'Whole seasoned fish slow-grilled to flaky perfection, served with signature chilli dipping sauce and fried yam.',
    image: getAssetUrl('assets/images/uploads/Grilled-fish .JPG'),
    tag: 'Seafood Grill',
  },
  {
    id: 'bbq-peppered-chicken',
    name: 'BBQ Peppered Chicken Legs',
    category: 'grills',
    description: 'Succulent chicken legs glazed with spicy peppered reduction and roasted fresh for banquet service.',
    image: getAssetUrl('assets/images/uploads/BBQ-Peppered Chicken-Leg.JPG'),
    tag: 'Crowd Pleaser',
  },

  // Small Chops
  {
    id: 'small-chops-platter-catering',
    name: 'Deluxe Small Chops Platter',
    category: 'chops',
    description: 'Crispy spring rolls, samosas, spicy asun cubes, seasoned chicken bites and pillowy sweet puff puff.',
    image: getAssetUrl('assets/images/uploads/Small-chops-platterJ-450x450.jpg'),
    tag: 'Event Starter',
  },
  {
    id: 'meatpie-fresh',
    name: 'Freshly Baked Naija Meat Pies',
    category: 'chops',
    description: 'Golden, flaky, buttery shortcrust pastries packed with seasoned minced beef, potatoes and mild herbs.',
    image: getAssetUrl('assets/images/uploads/Meatpie-450x450.jpg'),
    tag: 'Bakery Fresh',
  },
  {
    id: 'puff-puff-catering',
    name: 'Golden Puff Puff Platters',
    category: 'chops',
    description: 'Warm, round, golden fried dough spheres with subtle nutmeg sweetness — freshly prepared on-site.',
    image: getAssetUrl('assets/images/uploads/Puff-Puff-450x450.jpg'),
    tag: 'Sweet Delight',
  },

  // Drinks & Extras
  {
    id: 'drinks-bar-catering',
    name: 'Mobile Bar & Chilled Beverage Service',
    category: 'drinks',
    description: 'Ice-cold Malta Guinness, Fayrouz, Chapman punch, chilled sodas, and fresh juice assortments.',
    image: getAssetUrl('assets/images/uploads/drinks/malta-guinness.jpg'),
    tag: 'Refreshment Bar',
  },
];

const CATERING_SERVICES = [
  {
    id: 'weddings',
    title: 'Wedding Catering',
    badge: 'Traditional & White Weddings',
    desc: 'Grand multi-course Nigerian banquets, royal buffet displays, swallow bars, and late-night suya stations tailored to your dream wedding.',
    image: getAssetUrl('assets/images/uploads/Carting-Event1.JPG'),
    features: ['Lavish buffet or seated table service', 'Bridal table custom menu', 'Chafing dish presentation', 'Late-night small chops station'],
  },
  {
    id: 'corporate',
    title: 'Corporate & Executive Events',
    badge: 'Conferences & Galas',
    desc: 'Impress clients, colleagues and delegates with sophisticated hot buffets, boardroom platters, and punctual professional catering.',
    image: getAssetUrl('assets/images/uploads/Carting-Event2.JPG'),
    features: ['Corporate breakfast & lunch packages', 'Full hot chafing setups', 'Dietary & allergen accommodations', 'Professional uniformed staff'],
  },
  {
    id: 'birthdays',
    title: 'Birthday & Milestone Celebrations',
    badge: '18th, 30th, 50th, 60th+ Birthdays',
    desc: 'Celebrate your special milestones with mouthwatering party jollof, spicy asun platters, small chops and vibrant African hospitality.',
    image: getAssetUrl('assets/images/uploads/Carting-Event3.JPG'),
    features: ['Custom celebration menus', 'Family-style sharing platters', 'Puff-puff & grill stations', 'Flexible guest numbers'],
  },
  {
    id: 'private',
    title: 'Private Banquets & Gatherings',
    badge: 'Anniversaries & Gatherings',
    desc: 'Intimate dining experiences and home celebrations catered with the same passion and precision as large banquet halls.',
    image: getAssetUrl('assets/images/uploads/Carting-Event.JPG'),
    features: ['Chef on-site or drop-off trays', 'Warm disposable chafing packs', 'Generous portion sizing', 'Stress-free hosting'],
  },
  {
    id: 'traditional',
    title: 'Traditional Nigerian Celebrations',
    badge: 'Owambe & Cultural Ceremonies',
    desc: 'Authentic engagement feasts, naming ceremonies and cultural gatherings complete with classic soups, swallows and party jollof.',
    image: getAssetUrl('assets/images/uploads/Carting-Event4.JPG'),
    features: ['Authentic recipe heritage', 'Abula, Egusi & Efo Riro bars', 'Continuous replenishment', 'Generous Nigerian hospitality'],
  },
  {
    id: 'funerals',
    title: 'Funeral & Memorial Catering',
    badge: 'Dignified & Respectful Service',
    desc: 'Reliable, compassionate catering for memorial gatherings, wakes and celebrations of life, handled with utmost care and grace.',
    image: getAssetUrl('assets/images/uploads/Carting-Event5.JPG'),
    features: ['Seamless setup & clear-down', 'Comforting classic dishes', 'Reliable punctual timing', 'Supportive dedicated team'],
  },
  {
    id: 'outdoor-truck',
    title: 'Outdoor Festivals & Food Truck',
    badge: 'Mobile Live Kitchen',
    desc: 'Hire our official Naija Pot Food Truck for live outdoor grilling, UK festivals, community sports days and summer gatherings.',
    image: getAssetUrl('assets/images/uploads/Food-Truck.png'),
    features: ['Live charcoal grilling on-site', 'Fast-serve festival menu', 'Fully self-contained mobile kitchen', 'Nationwide event travel'],
  },
  {
    id: 'live-grill-bbq',
    title: 'BBQ & Live Charcoal Grills',
    badge: 'Smokey Suya & Fish',
    desc: 'Our grill masters prepare tender beef suya, hot goat asun, whole grilled tilapia, and glazed chicken wings fresh before your guests.',
    image: getAssetUrl('assets/images/uploads/Mixed-Grill-450x450.jpg'),
    features: ['Live woodsmoke grilling aroma', 'Authentic northern yaji spice', 'Signature spicy chilli dips', 'Interactive guest experience'],
  },
  {
    id: 'buffet-equipment',
    title: 'Buffet Catering & Equipment Hire',
    badge: 'Mobile Bars & Chafing Dishes',
    desc: 'Complete banquet solutions including stainless steel roll-top chafing dishes, mobile bars, banquet tableware and serving utensils.',
    image: getAssetUrl('assets/images/uploads/Carting-Event5.JPG'),
    features: ['Commercial chafing dish rental', 'Glassware & tableware hire', 'Mobile bar setups', 'Full setup & breakdown'],
  },
];

const WHY_CHOOSE_US = [
  {
    icon: Flame,
    title: 'Authentic Nigerian Flavours',
    desc: 'We never compromise on traditional cooking methods. Real firewood smoke, iru, crayfish and authentic northern yaji spice bring the true taste of Nigeria to your table.',
  },
  {
    icon: Utensils,
    title: 'Freshly Prepared Food',
    desc: 'Every dish is cooked fresh for your event date using premium ingredients and locally sourced meats, ensuring outstanding aroma, temperature and presentation.',
  },
  {
    icon: ShieldCheck,
    title: 'Professional Service & Hygiene',
    desc: 'Fully registered with Milton Keynes council, 5-star food hygiene standards, and experienced uniformed catering staff committed to punctual, immaculate service.',
  },
  {
    icon: Sparkles,
    title: 'Flexible Catering Options',
    desc: 'From hot chafing buffet lines and plated VIP dining to outdoor food truck service and self-contained hot drop-off platters, we tailor to your venue and budget.',
  },
  {
    icon: Award,
    title: 'Quality & Reliability',
    desc: 'Countless successful events across Milton Keynes, London and the UK. We arrive punctually, set up meticulously, and ensure food is kept piping hot throughout.',
  },
  {
    icon: HeartHandshake,
    title: 'Memorable African Hospitality',
    desc: 'Generous portions, welcoming warmth and attentive care. At Naija Pot, your guests are treated like family, creating memories that linger long after the event.',
  },
];

const HOW_IT_WORKS = [
  {
    step: '01',
    title: 'Tell Us About Your Event',
    desc: 'Share your event date, venue location, estimated guest numbers and preferred catering style using our simple quote form or WhatsApp enquiry.',
  },
  {
    step: '02',
    title: 'Choose Your Catering Requirements',
    desc: 'Select from our signature rice dishes, authentic soups and swallows, charcoal grills, small chops, mobile bar services or equipment hire.',
  },
  {
    step: '03',
    title: 'Receive a Personalised Quotation',
    desc: 'Our catering team prepares a clear, transparent and itemized quotation customized specifically to your preferences and budget.',
  },
  {
    step: '04',
    title: 'Confirm Your Booking',
    desc: 'Secure your event date with our straightforward booking agreement and deposit. We finalize timelines, dietary needs and venue logistics.',
  },
  {
    step: '05',
    title: 'Enjoy Your Event',
    desc: 'Relax and celebrate! Our chefs and catering staff handle preparation, presentation, live serving and cleanup, ensuring an unforgettable feast.',
  },
];

const TESTIMONIAL_PLACEHOLDERS = [
  {
    quote: 'Naija Pot catered our traditional wedding banquet in Milton Keynes for 220 guests. The party jollof, asun and pounded yam with egusi were sensational! Guests are still talking about the food.',
    client: 'Chinedu & Blessing O.',
    event: 'Traditional Wedding Reception · Milton Keynes',
    rating: 5,
  },
  {
    quote: 'We hired Naija Pot for our annual corporate summer festival. The Food Truck was a huge hit — hot suya skewers, meat pies and fresh puff puff served quickly and professionally.',
    client: 'Sarah M., Event Director',
    event: 'Corporate Summer Gala · Northampton',
    rating: 5,
  },
  {
    quote: 'For my mum’s 60th birthday, the team set up gorgeous chafing buffet stations. The food stayed piping hot, portions were generous, and the staff were so kind and attentive.',
    client: 'Tunde A.',
    event: 'Milestone 60th Birthday Celebration · London',
    rating: 5,
  },
];

const GALLERY_IMAGES = [
  { url: getAssetUrl('assets/images/uploads/Carting-Event.JPG'), title: 'Event Catering & Banquets' },
  { url: getAssetUrl('assets/images/uploads/Carting-Event1.JPG'), title: 'Wedding Catering Setup' },
  { url: getAssetUrl('assets/images/uploads/Carting-Event2.JPG'), title: 'Corporate Buffet Reception' },
  { url: getAssetUrl('assets/images/uploads/Carting-Event3.JPG'), title: 'Private Celebration Feast' },
  { url: getAssetUrl('assets/images/uploads/Carting-Event4.JPG'), title: 'Paella & Live Outdoor Service' },
  { url: getAssetUrl('assets/images/uploads/Carting-Event5.JPG'), title: 'Equipment & Chafing Hire' },
  { url: getAssetUrl('assets/images/uploads/Mixed-Grill-450x450.jpg'), title: 'Charcoal Suya & Asun Grills' },
  { url: getAssetUrl('assets/images/uploads/Odogwu-Platter.JPG'), title: 'Grand Odogwu Sharing Platter' },
];

export const EventCaterersView: React.FC<EventCaterersViewProps> = ({ onNavigate }) => {
  const [selectedCategory, setSelectedCategory] = useState<'all' | 'rice' | 'swallows' | 'grills' | 'chops' | 'drinks'>('all');
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string } | null>(null);

  // Catering Quote Form State
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [eventType, setEventType] = useState('Wedding Catering');
  const [eventDate, setEventDate] = useState('');
  const [eventLocation, setEventLocation] = useState('');
  const [guestCount, setGuestCount] = useState('50 - 100 Guests');
  const [serviceStyle, setServiceStyle] = useState('Chafing Dish Buffet');
  const [selectedRequirements, setSelectedRequirements] = useState<string[]>([
    'Party Jollof & Fried Rice',
    'Suya & Charcoal Grills',
    'Small Chops (Puff-Puff & Meat Pies)',
  ]);
  const [additionalNotes, setAdditionalNotes] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    // Dynamic SEO title & description
    document.title = 'NAIJA POT EVENT CATERERS | Nigerian Wedding & Event Catering UK';
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Discover authentic Nigerian event catering by NAIJA POT KITCHEN & GRILL LTD. Catering for weddings, corporate events, private parties and special celebrations across the UK. Request a personalised quote.'
      );
    }
  }, []);

  const toggleRequirement = (req: string) => {
    setSelectedRequirements((prev) =>
      prev.includes(req) ? prev.filter((item) => item !== req) : [...prev, req]
    );
  };

  const generateWhatsAppMessage = () => {
    return `Hello Naija Pot Catering Team,
I would like to request an Event Catering Quote:

• Full Name: ${fullName || 'Not provided'}
• Phone Number: ${phone || 'Not provided'}
• Email Address: ${email || 'Not provided'}
• Event Type: ${eventType}
• Event Date: ${eventDate || 'Date to be confirmed'}
• Event Location: ${eventLocation || 'Milton Keynes / UK'}
• Estimated Guests: ${guestCount}
• Service Style: ${serviceStyle}
• Selected Requirements: ${selectedRequirements.length ? selectedRequirements.join(', ') : 'Custom menu discussion'}
• Additional Notes: ${additionalNotes || 'None'}

Please provide me with availability and a personalized quotation. Thank you!`;
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormSubmitted(true);
    const message = generateWhatsAppMessage();
    const url = createWhatsAppUrl(message);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const filteredMenuItems =
    selectedCategory === 'all'
      ? CATERING_MENU_ITEMS
      : CATERING_MENU_ITEMS.filter((item) => item.category === selectedCategory);

  return (
    <div className="space-y-0 bg-[#090a08] text-[#f6f0e4] selection:bg-[#d8ad53] selection:text-[#090a08]">
      {/* SECTION A: HERO SECTION */}
      <section className="relative min-h-[580px] sm:min-h-[660px] lg:min-h-[740px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Gradient Overlay */}
        <div
          className="absolute inset-0 bg-cover bg-center transition-transform duration-1000 scale-105"
          style={{ backgroundImage: `url(${getAssetUrl('assets/images/uploads/Carting-Event.JPG')})` }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050604]/98 via-[#090a08]/85 to-[#090a08]/50" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#090a08] via-transparent to-black/40" />

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 w-full">
          <div className="max-w-3xl space-y-6">
            <div className="inline-flex items-center gap-2.5 bg-[#19834b]/20 border border-[#19834b]/50 px-3.5 py-1.5 rounded-full backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-[#20c76a] animate-pulse" />
              <span className="text-[11px] font-bold uppercase tracking-[0.22em] text-[#2fe27c]">
                AUTHENTIC NIGERIAN CUISINE · MILTON KEYNES &amp; UK-WIDE
              </span>
            </div>

            <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-normal leading-tight text-[#f6f0e4]">
              EVENT CATERING <br />
              <em className="text-[#f2d58a] italic not-italic">BY NAIJA POT</em>
            </h1>

            <p className="text-sm sm:text-base lg:text-lg text-[#ded8cb] leading-relaxed max-w-2xl font-light">
              Bring the vibrant warmth, rich heritage and unforgettable flavours of Nigerian feasts to your celebration. From lavish wedding buffets and corporate banquets to intimate family milestones, our experienced catering team handles every detail with love and precision.
            </p>

            {/* CTAs */}
            <div className="pt-2 flex flex-wrap items-center gap-4">
              <a
                href="#catering-quote"
                className="bg-[#d8ad53] hover:bg-[#e4bb61] text-[#090a08] font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-xl transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>REQUEST A CATERING QUOTE</span>
                <ArrowRight className="w-4 h-4" />
              </a>

              <a
                href="#catering-menus"
                className="border-2 border-[#d8ad53]/60 hover:bg-[#d8ad53]/15 text-[#f6f0e4] font-bold text-xs uppercase tracking-wider px-7 py-3.5 rounded-xl transition-all inline-flex items-center gap-2 cursor-pointer"
              >
                <span>EXPLORE OUR MENUS</span>
                <ChevronRight className="w-4 h-4 text-[#d8ad53]" />
              </a>

              <button
                type="button"
                onClick={() => onNavigate('menu')}
                className="text-xs uppercase font-bold tracking-wider text-[#ded8cb] hover:text-[#f2d58a] inline-flex items-center gap-1.5 py-3.5 px-3 cursor-pointer"
              >
                <span>View Full Menu</span>
                <ArrowUpRight className="w-3.5 h-3.5 text-[#d8ad53]" />
              </button>
            </div>

            {/* Quick Metrics Bar */}
            <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 border-t border-white/10 text-xs">
              <div>
                <p className="font-serif text-2xl font-bold text-[#f2d58a]">5★</p>
                <p className="text-[#b9b4a8] uppercase text-[10px] tracking-wider">Food Hygiene Rating</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-[#f2d58a]">20 - 500+</p>
                <p className="text-[#b9b4a8] uppercase text-[10px] tracking-wider">Guest Capacity</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-[#f2d58a]">100%</p>
                <p className="text-[#b9b4a8] uppercase text-[10px] tracking-wider">Authentic Nigerian</p>
              </div>
              <div>
                <p className="font-serif text-2xl font-bold text-[#f2d58a]">UK-Wide</p>
                <p className="text-[#b9b4a8] uppercase text-[10px] tracking-wider">Event Coverage</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION B: INTRODUCTION SECTION */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 space-y-6">
            <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#45a866]">
              A TASTE OF NAIJA · ELEVATED FOR YOUR CELEBRATION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#f6f0e4]">
              Where authentic tradition meets <br />
              <em className="text-[#f2d58a] italic not-italic">impeccable event presentation.</em>
            </h2>
            <div className="space-y-4 text-sm text-[#b9b4a8] leading-relaxed">
              <p>
                At Naija Pot Kitchen &amp; Grill Ltd, we understand that food is the beating heart of every African celebration. Whether it is a colorful Nigerian wedding, a high-profile corporate gala, a milestone birthday or an intimate family banquet, our mission is to deliver the authentic, generous spirit of an owambe.
              </p>
              <p>
                We slow-cook our party jollof with genuine woodsmoke depth, simmer rich Egusi and Efo Riro soups with artisanal locust beans and stockfish, and grill our suya and asun over red-hot charcoal seasoned with authentic northern yaji. Paired with elegant chafing buffet presentation, mobile bars and courteous staff, we ensure your guests eat abundantly and remember your event with joy.
              </p>
            </div>

            <div className="pt-2 grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="p-4 bg-[#141710] border border-[#d8ad53]/25 rounded-xl space-y-1">
                <Utensils className="w-5 h-5 text-[#d8ad53]" />
                <h4 className="font-serif font-bold text-sm text-[#f6f0e4]">Fresh On-Site</h4>
                <p className="text-[11px] text-[#b9b4a8]">Prepared on the day, served piping hot.</p>
              </div>
              <div className="p-4 bg-[#141710] border border-[#d8ad53]/25 rounded-xl space-y-1">
                <Flame className="w-5 h-5 text-[#d8ad53]" />
                <h4 className="font-serif font-bold text-sm text-[#f6f0e4]">Live Charcoal</h4>
                <p className="text-[11px] text-[#b9b4a8]">Smokey suya &amp; grill stations.</p>
              </div>
              <div className="p-4 bg-[#141710] border border-[#d8ad53]/25 rounded-xl space-y-1">
                <ShieldCheck className="w-5 h-5 text-[#45a866]" />
                <h4 className="font-serif font-bold text-sm text-[#f6f0e4]">Certified Service</h4>
                <p className="text-[11px] text-[#b9b4a8]">5★ food hygiene &amp; fully insured.</p>
              </div>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="relative rounded-3xl overflow-hidden border-2 border-[#d8ad53]/35 shadow-2xl bg-[#141710] group">
              <img
                src={getAssetUrl('assets/images/uploads/Carting-Event.JPG')}
                alt="Naija Pot Event Catering Buffet"
                className="w-full h-[460px] sm:h-[520px] object-cover transition-transform duration-700 group-hover:scale-105"
                onError={handleImageError}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#090a08] via-transparent to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 p-4 bg-[#090a08]/90 backdrop-blur-md rounded-2xl border border-white/10">
                <p className="text-[10px] uppercase font-bold tracking-widest text-[#45a866]">EVENT CATERING GROUP</p>
                <p className="font-serif font-bold text-base text-[#f2d58a]">Naija Pot Kitchen &amp; Grill Ltd</p>
                <p className="text-xs text-[#b9b4a8]">Full catering services across Milton Keynes &amp; the United Kingdom.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION C: OUR CATERING SERVICES */}
      <section id="services" className="bg-[#0e110a] py-20 lg:py-28 border-y border-[#d8ad53]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#45a866]">
              TAILORED PACKAGES FOR EVERY OCCASION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#f6f0e4]">
              Our Event Catering <em className="text-[#f2d58a] italic not-italic">Services</em>
            </h2>
            <p className="text-xs sm:text-sm text-[#b9b4a8] leading-relaxed">
              Whether you require a grand wedding feast, an executive corporate conference lunch, or a live outdoor charcoal grill, we craft menus that suit your venue, guest numbers and celebration vision.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {CATERING_SERVICES.map((service) => (
              <article
                key={service.id}
                className="bg-[#141710] border border-[#d8ad53]/25 hover:border-[#d8ad53] rounded-2xl overflow-hidden shadow-xl flex flex-col justify-between transition-all duration-300 group hover:-translate-y-1"
              >
                <div>
                  <div className="relative h-56 sm:h-60 overflow-hidden bg-black">
                    <img
                      src={service.image}
                      alt={service.title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      onError={handleImageError}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#141710] via-black/30 to-transparent" />
                    <span className="absolute top-4 left-4 bg-black/85 backdrop-blur-md text-[#f2d58a] text-[10px] font-bold uppercase tracking-wider px-3 py-1 rounded-full border border-[#d8ad53]/35">
                      {service.badge}
                    </span>
                  </div>

                  <div className="p-6 space-y-3">
                    <h3 className="font-serif text-xl font-bold text-[#f6f0e4] group-hover:text-[#f2d58a] transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-xs text-[#b9b4a8] leading-relaxed">
                      {service.desc}
                    </p>

                    <div className="pt-2 space-y-1.5 border-t border-white/5">
                      {service.features.map((feat, i) => (
                        <div key={i} className="flex items-center gap-2 text-[11px] text-[#ded8cb]">
                          <Check className="w-3.5 h-3.5 text-[#45a866] shrink-0" />
                          <span>{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-6 pt-0">
                  <a
                    href="#catering-quote"
                    onClick={() => setEventType(service.title)}
                    className="w-full bg-[#1e2318] hover:bg-[#d8ad53] text-[#f2d58a] hover:text-[#090a08] border border-[#d8ad53]/40 text-xs font-bold uppercase tracking-wider py-3 rounded-xl transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <span>Request Quote For This</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION D: CATERING MENUS (DISCOVERY & FOOD CARDS) */}
      <section id="catering-menus" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 space-y-12">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#45a866]">
            AUTHENTIC NAIJA CUISINE SELECTIONS
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#f6f0e4]">
            Catering Menu <em className="text-[#f2d58a] italic not-italic">Highlights</em>
          </h2>
          <p className="text-xs sm:text-sm text-[#b9b4a8] leading-relaxed">
            Browse our signature Nigerian celebration dishes. We provide personalized catering quotes tailored to your exact guest count, dietary requests and service style.
          </p>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center justify-center gap-2 pt-4">
            {[
              { id: 'all', label: 'All Dishes' },
              { id: 'rice', label: 'Rice Specialties' },
              { id: 'swallows', label: 'Soups & Swallows' },
              { id: 'grills', label: 'Charcoal Grills' },
              { id: 'chops', label: 'Small Chops & Pastries' },
              { id: 'drinks', label: 'Drinks & Bar' },
            ].map((cat) => (
              <button
                key={cat.id}
                type="button"
                onClick={() => setSelectedCategory(cat.id as any)}
                className={`px-4 py-2 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-[#d8ad53] text-[#090a08] font-bold shadow-md'
                    : 'bg-[#141710] text-[#b9b4a8] hover:text-white border border-white/5'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredMenuItems.map((item) => (
            <div
              key={item.id}
              className="bg-[#141710] border border-white/10 hover:border-[#d8ad53]/50 rounded-2xl overflow-hidden shadow-lg flex flex-col justify-between group transition-all"
            >
              <div>
                <div
                  className="relative h-48 overflow-hidden bg-black cursor-zoom-in"
                  onClick={() => setPreviewImage({ url: item.image, title: item.name })}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={handleImageError}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#141710] via-transparent to-transparent" />
                  <span className="absolute top-3 left-3 bg-black/80 text-[#f2d58a] text-[9px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-md border border-[#d8ad53]/30">
                    {item.tag}
                  </span>
                  <span className="absolute bottom-3 right-3 bg-[#19834b] text-white text-[10px] font-bold px-2.5 py-0.5 rounded-full shadow">
                    Quote on Request
                  </span>
                </div>

                <div className="p-5 space-y-2">
                  <h4 className="font-serif font-bold text-lg text-[#f6f0e4] leading-snug">
                    {item.name}
                  </h4>
                  <p className="text-xs text-[#b9b4a8] leading-relaxed line-clamp-2">
                    {item.description}
                  </p>
                </div>
              </div>

              <div className="p-5 pt-0">
                <a
                  href="#catering-quote"
                  onClick={() => {
                    if (!selectedRequirements.includes(item.name)) {
                      setSelectedRequirements((prev) => [...prev, item.name]);
                    }
                  }}
                  className="w-full bg-[#1b2016] hover:bg-[#d8ad53] text-[#d8ad53] hover:text-[#090a08] border border-[#d8ad53]/30 text-[11px] font-bold uppercase tracking-wider py-2.5 rounded-lg transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Add to Quote Request</span>
                </a>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-4">
          <p className="text-xs text-[#b9b4a8] mb-3">
            Looking for something specific or custom family recipes? We tailor every menu to your exact preferences.
          </p>
          <a
            href={createWhatsAppUrl("Hello Naija Pot, I'd like to discuss a custom catering menu for my event.")}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#d8ad53] hover:text-[#f2d58a] border-b border-[#d8ad53] pb-1 transition-all"
          >
            <span>Discuss Custom Menu on WhatsApp</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </a>
        </div>
      </section>

      {/* SECTION E: WHY CHOOSE NAIJA POT? */}
      <section className="bg-[#0e110a] py-20 lg:py-28 border-y border-[#d8ad53]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#45a866]">
              OUR COMMITMENT TO EXCELLENCE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#f6f0e4]">
              Why Choose <em className="text-[#f2d58a] italic not-italic">Naija Pot?</em>
            </h2>
            <p className="text-xs sm:text-sm text-[#b9b4a8] leading-relaxed">
              We combine deep culinary authenticity with modern professional event management, ensuring seamless coordination from initial enquiry to final guest farewell.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {WHY_CHOOSE_US.map((item, index) => {
              const Icon = item.icon;
              return (
                <div
                  key={index}
                  className="bg-[#141710] border border-[#d8ad53]/25 hover:border-[#d8ad53] rounded-2xl p-7 space-y-4 shadow-xl transition-all hover:-translate-y-1"
                >
                  <div className="w-12 h-12 rounded-xl bg-[#19834b]/15 border border-[#19834b]/40 flex items-center justify-center text-[#2fe27c]">
                    <Icon className="w-6 h-6" />
                  </div>
                  <h3 className="font-serif text-xl font-bold text-[#f6f0e4]">
                    {item.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-[#b9b4a8] leading-relaxed">
                    {item.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* SECTION F: HOW IT WORKS (5 STEPS) */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28 space-y-14">
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#45a866]">
            SIMPLE, TRANSPARENT &amp; STRESS-FREE
          </span>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#f6f0e4]">
            How It <em className="text-[#f2d58a] italic not-italic">Works</em>
          </h2>
          <p className="text-xs sm:text-sm text-[#b9b4a8] leading-relaxed">
            Planning event catering with Naija Pot is straightforward and reliable. From your first message to the last empty plate, here is what you can expect:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {HOW_IT_WORKS.map((step, idx) => (
            <div
              key={idx}
              className="bg-[#141710] border border-white/10 rounded-2xl p-6 space-y-3 relative flex flex-col justify-between shadow-lg"
            >
              <div>
                <span className="font-serif text-3xl font-bold text-[#d8ad53] block mb-2">
                  {step.step}
                </span>
                <h4 className="font-serif font-bold text-base text-[#f6f0e4] leading-snug">
                  {step.title}
                </h4>
                <p className="text-xs text-[#b9b4a8] leading-relaxed mt-2">
                  {step.desc}
                </p>
              </div>
              <div className="pt-3 border-t border-white/5 flex items-center text-[10px] uppercase font-bold tracking-widest text-[#45a866]">
                <span>Step {idx + 1} of 5</span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* SECTION G: FOOD GALLERY & SLIDER */}
      <section className="bg-[#0e110a] py-20 lg:py-28 border-y border-[#d8ad53]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#45a866]">
              VISUAL FEAST &amp; LIVE PRESENTATION
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#f6f0e4]">
              Our Event <em className="text-[#f2d58a] italic not-italic">Gallery</em>
            </h2>
            <p className="text-xs sm:text-sm text-[#b9b4a8] leading-relaxed">
              Explore authentic Nigerian dishes, buffet chafing setups and live catering service from recent celebrations.
            </p>
          </div>

          {/* 3s Auto-rotating Event Catering Slider Showcase */}
          <div className="max-w-4xl mx-auto">
            <CartingEventSlider showInfoCard={false} />
          </div>

          {/* Responsive Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 pt-6">
            {GALLERY_IMAGES.map((img, i) => (
              <div
                key={i}
                className="group relative h-48 sm:h-64 rounded-2xl overflow-hidden border border-white/10 cursor-pointer shadow-md"
                onClick={() => setPreviewImage(img)}
              >
                <img
                  src={img.url}
                  alt={img.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  onError={handleImageError}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-4">
                  <p className="font-serif text-xs sm:text-sm font-bold text-[#f2d58a] flex items-center justify-between w-full">
                    <span>{img.title}</span>
                    <Eye className="w-4 h-4 text-[#d8ad53]" />
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION H: SERVICE COVERAGE */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="bg-[#141710] border border-[#d8ad53]/35 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          <div className="lg:col-span-7 space-y-5">
            <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#45a866]">
              MILTON KEYNES BASE · UK-WIDE COVERAGE
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-normal leading-tight text-[#f6f0e4]">
              Where We <em className="text-[#f2d58a] italic not-italic">Cater</em>
            </h2>
            <p className="text-xs sm:text-sm text-[#b9b4a8] leading-relaxed">
              Based at our Bradville commercial kitchen in Milton Keynes, Naija Pot accepts event catering bookings across the UK. We frequently cater celebrations throughout:
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2 text-xs">
              {[
                'Milton Keynes',
                'Greater London',
                'Northampton',
                'Bedford',
                'Luton',
                'Oxford',
                'Aylesbury',
                'Birmingham',
                'Buckinghamshire',
              ].map((loc) => (
                <div key={loc} className="flex items-center gap-2 p-2.5 rounded-lg bg-[#0e110a] border border-white/5 text-[#f6f0e4]">
                  <MapPin className="w-3.5 h-3.5 text-[#d8ad53] shrink-0" />
                  <span>{loc}</span>
                </div>
              ))}
            </div>

            <div className="pt-3 p-4 rounded-xl bg-[#0a0d08] border-l-4 border-[#d8ad53] text-[11px] text-[#b9b4a8] leading-relaxed">
              <strong>Notice:</strong> We do not operate separate physical restaurant branches outside Milton Keynes. Availability, travel logistics and minimum guest numbers for regional and national events are evaluated and confirmed individually on request.
            </div>
          </div>

          <div className="lg:col-span-5 space-y-6 bg-[#0a0d08] border border-white/10 rounded-2xl p-6 sm:p-8">
            <div className="flex items-center gap-3">
              <Truck className="w-8 h-8 text-[#2fe27c]" />
              <div>
                <h4 className="font-serif font-bold text-lg text-[#f6f0e4]">Mobile Event Logistics</h4>
                <p className="text-xs text-[#b9b4a8]">Temperature-controlled hot transit &amp; Food Truck</p>
              </div>
            </div>
            <p className="text-xs text-[#b9b4a8] leading-relaxed">
              Equipped with commercial heated transport boxes and on-site chafing units, our food arrives at your venue at optimal serving temperature, adhering strictly to commercial food safety regulations.
            </p>
            <div className="pt-2">
              <a
                href={createWhatsAppUrl("Hello Naija Pot, I would like to check catering availability for my location.")}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex items-center justify-center gap-2 bg-[#19834b] hover:bg-[#1f9e5b] text-white text-xs font-bold uppercase tracking-wider py-3.5 rounded-xl transition-all shadow"
              >
                <span>Check Your Event Location</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION I: CUSTOMER TESTIMONIALS (CLEAR IDENTIFIABLE PLACEHOLDERS) */}
      <section className="bg-[#0e110a] py-20 lg:py-28 border-y border-[#d8ad53]/20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#45a866]">
              CLIENT EXPERIENCES &amp; REVIEWS
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#f6f0e4]">
              What Our Guests <em className="text-[#f2d58a] italic not-italic">Say</em>
            </h2>
            <p className="text-xs text-[#b9b4a8]">
              (Illustrative sample testimonials from client feedback across our recent banquet events)
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIAL_PLACEHOLDERS.map((t, i) => (
              <div
                key={i}
                className="bg-[#141710] border border-white/10 rounded-2xl p-7 space-y-4 shadow-xl flex flex-col justify-between"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-[#d8ad53]">
                    {[...Array(t.rating)].map((_, s) => (
                      <span key={s} className="text-sm">★</span>
                    ))}
                  </div>
                  <p className="text-xs sm:text-sm text-[#ded8cb] italic leading-relaxed">
                    "{t.quote}"
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5">
                  <p className="font-serif font-bold text-sm text-[#f2d58a]">{t.client}</p>
                  <p className="text-[11px] text-[#b9b4a8]">{t.event}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION J: CATERING ENQUIRY FORM */}
      <section id="catering-quote" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-28">
        <div className="bg-[#141710] border-2 border-[#d8ad53]/40 rounded-3xl p-8 sm:p-12 lg:p-16 shadow-2xl">
          <div className="max-w-3xl mx-auto text-center space-y-4 mb-12">
            <div className="inline-flex items-center gap-2 bg-[#d8ad53]/15 text-[#f2d58a] border border-[#d8ad53]/40 px-3.5 py-1 rounded-full text-[10px] font-bold uppercase tracking-widest">
              STEP 1: REQUEST YOUR QUOTATION
            </div>
            <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl font-normal leading-tight text-[#f6f0e4]">
              Catering <em className="text-[#f2d58a] italic not-italic">Enquiry Form</em>
            </h2>
            <p className="text-xs sm:text-sm text-[#b9b4a8] leading-relaxed">
              Complete the details below to receive a personalized event catering proposal. Submitting opens a pre-composed WhatsApp message with your verified details for prompt review by our catering manager.
            </p>
          </div>

          <form onSubmit={handleFormSubmit} className="max-w-4xl mx-auto space-y-8">
            {/* Contact Details */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#b9b4a8] block mb-2">
                  Full Name <span className="text-[#d8ad53]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Adeola Adeleke"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  className="w-full bg-[#0d100b] border border-white/10 focus:border-[#d8ad53] rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#b9b4a8] block mb-2">
                  Phone Number <span className="text-[#d8ad53]">*</span>
                </label>
                <input
                  type="tel"
                  required
                  placeholder="e.g. +44 7123 456789"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className="w-full bg-[#0d100b] border border-white/10 focus:border-[#d8ad53] rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#b9b4a8] block mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="e.g. info@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-[#0d100b] border border-white/10 focus:border-[#d8ad53] rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none"
                />
              </div>
            </div>

            {/* Event Specifics */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#b9b4a8] block mb-2">
                  Event Type <span className="text-[#d8ad53]">*</span>
                </label>
                <select
                  value={eventType}
                  onChange={(e) => setEventType(e.target.value)}
                  className="w-full bg-[#0d100b] border border-white/10 focus:border-[#d8ad53] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                >
                  <option value="Wedding Catering">Wedding Catering</option>
                  <option value="Corporate Event">Corporate Event</option>
                  <option value="Birthday Celebration">Birthday Celebration</option>
                  <option value="Private Banquet">Private Banquet</option>
                  <option value="Traditional Owambe">Traditional Owambe</option>
                  <option value="Funeral & Memorial">Funeral &amp; Memorial</option>
                  <option value="Outdoor & Festival">Outdoor &amp; Festival</option>
                  <option value="Other Celebration">Other Celebration</option>
                </select>
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#b9b4a8] block mb-2">
                  Event Date <span className="text-[#d8ad53]">*</span>
                </label>
                <input
                  type="date"
                  required
                  value={eventDate}
                  onChange={(e) => setEventDate(e.target.value)}
                  className="w-full bg-[#0d100b] border border-white/10 focus:border-[#d8ad53] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#b9b4a8] block mb-2">
                  Event Location / Venue <span className="text-[#d8ad53]">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="City, Postcode or Venue"
                  value={eventLocation}
                  onChange={(e) => setEventLocation(e.target.value)}
                  className="w-full bg-[#0d100b] border border-white/10 focus:border-[#d8ad53] rounded-xl px-4 py-3 text-sm text-white placeholder-white/30 focus:outline-none"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold uppercase tracking-wider text-[#b9b4a8] block mb-2">
                  Estimated Guests <span className="text-[#d8ad53]">*</span>
                </label>
                <select
                  value={guestCount}
                  onChange={(e) => setGuestCount(e.target.value)}
                  className="w-full bg-[#0d100b] border border-white/10 focus:border-[#d8ad53] rounded-xl px-4 py-3 text-sm text-white focus:outline-none"
                >
                  <option value="20 - 50 Guests">20 - 50 Guests</option>
                  <option value="50 - 100 Guests">50 - 100 Guests</option>
                  <option value="100 - 200 Guests">100 - 200 Guests</option>
                  <option value="200 - 350 Guests">200 - 350 Guests</option>
                  <option value="350 - 500+ Guests">350 - 500+ Guests</option>
                </select>
              </div>
            </div>

            {/* Service Style */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#b9b4a8] block mb-3">
                Preferred Service Style
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[
                  'Chafing Dish Buffet',
                  'Seated Table Service',
                  'Food Truck Live On-site',
                  'Drop-off Hot Trays',
                ].map((style) => (
                  <button
                    key={style}
                    type="button"
                    onClick={() => setServiceStyle(style)}
                    className={`p-3 rounded-xl text-xs font-semibold tracking-wider text-center transition-all cursor-pointer ${
                      serviceStyle === style
                        ? 'bg-[#19834b] text-white font-bold border border-[#2fe27c]'
                        : 'bg-[#0d100b] text-[#b9b4a8] border border-white/10 hover:border-white/30'
                    }`}
                  >
                    {style}
                  </button>
                ))}
              </div>
            </div>

            {/* Catering Requirements Checklist */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#b9b4a8] block mb-3">
                Catering Requirements (Select all that apply)
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {[
                  'Party Jollof & Fried Rice',
                  'Suya & Charcoal Grills',
                  'Small Chops (Puff-Puff & Meat Pies)',
                  'Traditional Soups & Swallows',
                  'Whole Grilled Tilapia & Fish',
                  'Spicy Goat Asun Platters',
                  'Beverage & Mobile Bar Service',
                  'Chafing Dishes & Tableware Hire',
                  'Full On-site Service Staff',
                ].map((req) => {
                  const isChecked = selectedRequirements.includes(req);
                  return (
                    <button
                      key={req}
                      type="button"
                      onClick={() => toggleRequirement(req)}
                      className={`p-3 rounded-xl text-xs flex items-center justify-between text-left transition-all cursor-pointer ${
                        isChecked
                          ? 'bg-[#d8ad53]/20 border border-[#d8ad53] text-[#f2d58a] font-semibold'
                          : 'bg-[#0d100b] border border-white/5 text-[#b9b4a8] hover:border-white/20'
                      }`}
                    >
                      <span>{req}</span>
                      <span
                        className={`w-4 h-4 rounded flex items-center justify-center text-[10px] ${
                          isChecked ? 'bg-[#d8ad53] text-[#090a08] font-bold' : 'border border-white/20'
                        }`}
                      >
                        {isChecked && '✓'}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Additional Information */}
            <div>
              <label className="text-[11px] font-bold uppercase tracking-wider text-[#b9b4a8] block mb-2">
                Additional Information / Dietary Notes
              </label>
              <textarea
                rows={4}
                placeholder="Share any special details, schedule timelines, preferred proteins (goat, fish, beef, chicken), or dietary needs..."
                value={additionalNotes}
                onChange={(e) => setAdditionalNotes(e.target.value)}
                className="w-full bg-[#0d100b] border border-white/10 focus:border-[#d8ad53] rounded-xl p-4 text-sm text-white placeholder-white/30 focus:outline-none resize-none"
              />
            </div>

            {/* Submit Action */}
            <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-white/10">
              <div className="text-left text-xs text-[#b9b4a8] max-w-md">
                <p>
                  Clicking submit generates a structured enquiry sent directly to our verified catering WhatsApp line (<strong>+{RESTAURANT_INFO.whatsappNumber}</strong>) where you can review and send it instantly.
                </p>
              </div>

              <button
                type="submit"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 bg-[#20c76a] hover:bg-[#2fe27c] text-[#062b17] font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-xl transition-all transform hover:-translate-y-0.5 cursor-pointer"
              >
                <MessageCircle className="w-5 h-5 fill-current" />
                <span>Submit Catering Enquiry via WhatsApp</span>
                <Send className="w-4 h-4" />
              </button>
            </div>

            {formSubmitted && (
              <div className="p-4 rounded-xl bg-[#19834b]/20 border border-[#20c76a] text-center text-xs text-[#2fe27c]">
                Thank you! Your catering message has been generated. If WhatsApp did not open automatically,{' '}
                <a
                  href={createWhatsAppUrl(generateWhatsAppMessage())}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline font-bold"
                >
                  click here to open WhatsApp directly
                </a>.
              </div>
            )}
          </form>
        </div>
      </section>

      {/* SECTION K: FINAL CALL TO ACTION */}
      <section className="bg-gradient-to-r from-[#174A35] via-[#11110F] to-[#262626] py-20 lg:py-24 border-t border-[#d8ad53]/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <span className="text-[11px] font-bold uppercase tracking-[0.24em] text-[#d8ad53]">
            LET’S MAKE YOUR CELEBRATION UNFORGETTABLE
          </span>
          <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl font-normal text-[#f6f0e4] max-w-3xl mx-auto leading-tight">
            LET NAIJA POT CATER YOUR NEXT EVENT.
          </h2>
          <p className="text-xs sm:text-base text-[#ded8cb] max-w-xl mx-auto leading-relaxed">
            From smoky grills and party jollof to lavish banquet displays and mobile bar setups, experience real Nigerian hospitality at its finest.
          </p>
          <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#catering-quote"
              className="bg-[#d8ad53] hover:bg-[#e4bb61] text-[#090a08] font-bold text-xs uppercase tracking-wider px-8 py-4 rounded-xl shadow-2xl transition-all transform hover:-translate-y-0.5 inline-flex items-center gap-2 cursor-pointer"
            >
              <span>REQUEST YOUR CATERING QUOTE</span>
              <ArrowRight className="w-4 h-4" />
            </a>
            <a
              href={`tel:${RESTAURANT_INFO.phone}`}
              className="border border-white/20 hover:border-[#d8ad53] text-[#f6f0e4] font-bold text-xs uppercase tracking-wider px-7 py-4 rounded-xl transition-all"
            >
              <span>Call Us: {RESTAURANT_INFO.phone}</span>
            </a>
          </div>
        </div>
      </section>

      {/* Lightbox Image Preview Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4 sm:p-8"
          role="dialog"
          aria-modal="true"
          onClick={() => setPreviewImage(null)}
        >
          <button
            type="button"
            onClick={() => setPreviewImage(null)}
            className="absolute right-5 top-5 z-10 rounded-full bg-[#141711] p-3 text-white hover:bg-[#252a20]"
            aria-label="Close image preview"
          >
            <X className="h-6 w-6" />
          </button>
          <div className="flex max-h-full w-full max-w-5xl flex-col items-center gap-4" onClick={(e) => e.stopPropagation()}>
            <img
              src={previewImage.url}
              alt={previewImage.title}
              className="max-h-[80vh] max-w-full rounded-2xl object-contain shadow-2xl border border-white/10"
              onError={handleImageError}
            />
            <p className="font-serif text-lg font-bold text-[#f2d58a]">{previewImage.title}</p>
          </div>
        </div>
      )}
    </div>
  );
};
