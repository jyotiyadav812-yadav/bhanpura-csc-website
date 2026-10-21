import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, MapPin, MessageSquare, Shield, Users, Clock, Star } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { ServiceGrid } from '../components/ServiceGrid';
import { FAQ } from '../components/FAQ';
import { getPopularServices, getServicesByCategory, serviceCategories } from '../data/services';
import { businessConfig } from '../config/business';
import { getWhatsAppUrl, getDefaultWhatsAppMessage } from '../utils/helpers';
import { Helmet } from 'react-helmet-async';

const heroSlides = [
  {
    image: '/hero.jpg',
    alt: 'Bhanpura CSC Centre - Your Local Digital Partner',
    overlay: true,
    showText: true,
    loading: 'eager' as const,
    imageClass: 'object-cover object-center',
    backgroundClass: '',
  },
  {
    image: '/hero-2.png',
    alt: 'Bhanpura CSC Centre - Your Local Digital Partner',
    overlay: false,
    showText: false,
    loading: 'lazy' as const,
    imageClass: 'object-contain object-center md:object-cover',
    backgroundClass: 'bg-[#1e4fd8]',
  },
];

const popularServices = getPopularServices();

const howItWorksSteps = [
  {
    number: '01',
    title: 'Visit or Contact Us',
    description: 'Walk into our centre at Village Bhanpura, or call/WhatsApp us to discuss your requirements.',
    icon: MapPin,
  },
  {
    number: '02',
    title: 'Explain Your Need',
    description: 'Tell us what service you need — form filling, payment, photo, document work, certificate guidance, etc.',
    icon: MessageSquare,
  },
  {
    number: '03',
    title: 'We Assist You',
    description: 'Our team helps you complete the process — filling forms, making payments, preparing documents, or guiding you through the steps.',
    icon: Users,
  },
  {
    number: '04',
    title: 'Get Confirmation',
    description: 'Receive acknowledgment receipts, printed documents, or digital files as applicable. We\'re here for follow-up support too.',
    icon: CheckCircle,
  },
];

const whyChooseUs = [
  {
    title: 'Local & Accessible',
    description: 'Based right in Village Bhanpura, Kaithal. No need to travel far for digital assistance.',
    icon: MapPin,
  },
  {
    title: 'Friendly Guidance',
    description: 'We explain everything in simple language — Hindi, English, or Hinglish — so you understand every step.',
    icon: Users,
  },
  {
    title: 'Safe Payment Practices',
    description: 'We NEVER ask for UPI PINs, OTPs, or passwords. You enter your own payment details; we only guide the process.',
    icon: Shield,
  },
  {
    title: 'Transparent Pricing',
    description: 'We say "Contact us for applicable charges" upfront. No hidden fees or surprise costs.',
    icon: Clock,
  },
  {
    title: 'Wide Range of Services',
    description: 'From online forms and payments to photos, documents, and certificates — multiple services under one roof.',
    icon: Star,
  },
  {
    title: 'Follow-up Support',
    description: 'Our job isn\'t done at submission. We help track status, download receipts, and resolve issues if they arise.',
    icon: MessageSquare,
  },
];

const faqItems = [
  {
    question: 'What are your working hours?',
    answer: 'Please contact us directly for current working hours as they may vary. You can call or WhatsApp us at 9541611393.',
  },
  {
    question: 'Do you charge for enquiries?',
    answer: 'Initial enquiries and guidance are free. Service charges apply for specific tasks like form filling, printing, scanning, photo services, etc. Contact us for applicable charges.',
  },
  {
    question: 'Can you guarantee my application will be approved?',
    answer: 'No. We assist with form filling, document preparation, and process guidance only. Approval decisions rest entirely with the respective government department or authority.',
  },
  {
    question: 'Do you ask for my UPI PIN, OTP, or banking passwords?',
    answer: 'Absolutely not. We NEVER ask for or store UPI PINs, OTPs, card PINs, passwords, or any banking credentials. You enter payment details yourself on the secure payment gateway.',
  },
  {
    question: 'What documents do I need to bring?',
    answer: 'Required documents vary by service. Common documents include Aadhaar card, passport-size photos, address proof, and educational certificates. Check the specific service details or contact us for a checklist.',
  },
  {
    question: 'Can you help with services not listed on the website?',
    answer: 'Yes. Use our Enquiry page to describe your need. We\'ll assess feasibility and guide you or refer you to the appropriate resource.',
  },
];

export function Home() {
  const whatsappUrl = getWhatsAppUrl(getDefaultWhatsAppMessage());
  const [activeSlide, setActiveSlide] = useState(0);
  const [timerResetKey, setTimerResetKey] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    const handleChange = () => setReducedMotion(mediaQuery.matches);
    handleChange();
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    if (reducedMotion) return;
    const intervalId = setInterval(() => {
      setActiveSlide(current => (current + 1) % heroSlides.length);
    }, 5000);
    return () => clearInterval(intervalId);
  }, [activeSlide, timerResetKey, reducedMotion]);

  const goToSlide = (index: number) => {
    setActiveSlide(index);
    setTimerResetKey(key => key + 1);
  };

  const currentSlide = heroSlides[activeSlide];

  return (
    <>
      <Helmet>
        <title>{businessConfig.name} | Your Trusted Partner for Digital Services</title>
        <meta name="description" content="Bhanpura CSC Centre - Online form assistance, document services, photo services, payment assistance, and more with friendly local support at Village Bhanpura, Kaithal, Haryana." />
        <meta property="og:title" content={`${businessConfig.name} | Your Trusted Partner for Digital Services`} />
        <meta property="og:description" content="Online form assistance, document services, photo services, payment assistance, and more, with friendly local support at Bhanpura." />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
      </Helmet>

      <section
        className="relative flex items-center min-h-screen overflow-hidden"
        aria-label="Bhanpura CSC Centre"
      >
        {heroSlides.map((slide, index) => (
          <div
            key={slide.image}
            className={`absolute inset-0 transition-opacity duration-1000 ${index === activeSlide ? 'opacity-100' : 'opacity-0'} ${slide.backgroundClass}`}
            aria-hidden={index !== activeSlide}
          >
            <img
              src={slide.image}
              alt={slide.alt}
              loading={slide.loading}
              className={`absolute inset-0 w-full h-full ${slide.imageClass}`}
            />
          </div>
        ))}

        {currentSlide.overlay && (
          <div className="absolute inset-0 bg-gradient-to-r from-blue-950/90 via-blue-900/70 to-blue-900/30" aria-hidden="true" />
        )}

        {currentSlide.showText && (
          <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24 w-full">
            <motion.div
              className="max-w-2xl text-center lg:text-left mx-auto lg:mx-0"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: 'easeOut' }}
            >
              <p className="text-sm font-medium text-blue-100 uppercase tracking-wider mb-4">Common Service Centre & Digital Assistance</p>
              <h1 id="hero-title" className="text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-6">
                Your Trusted Partner for Digital Services
              </h1>
              <p className="text-base lg:text-lg text-blue-50 leading-relaxed mb-8">
                Online form assistance, document services, photo services, payment assistance, and more, with friendly local support at Bhanpura.
              </p>
              <div className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-4">
                <Link
                  to="/services"
                  className="btn btn-accent btn-block sm:w-auto"
                >
                  Explore Services
                  <ArrowRight className="arrow w-5 h-5" aria-hidden="true" />
                </Link>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-block sm:w-auto"
                >
                  <MessageSquare className="w-5 h-5" aria-hidden="true" />
                  Contact on WhatsApp
                </a>
              </div>
              <div className="mt-6 space-y-1 text-sm text-blue-100">
                <p>Open: {businessConfig.workingHours.display}</p>
                <p>{businessConfig.location.formatted}</p>
              </div>
            </motion.div>
          </div>
        )}

        <div className="absolute bottom-6 left-0 right-0 z-20 flex items-center justify-center gap-3">
          {heroSlides.map((slide, index) => (
            <button
              key={slide.image}
              type="button"
              onClick={() => goToSlide(index)}
              className={`h-2.5 rounded-full shadow-md transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-900 ${
                index === activeSlide ? 'w-8 bg-white' : 'w-2.5 bg-white/50 hover:bg-white/80'
              }`}
              aria-label={`Go to slide ${index + 1}`}
              aria-current={index === activeSlide}
            />
          ))}
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white" aria-labelledby="popular-services-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Popular Services"
            subtitle="Most Requested"
            description="These are the services our customers ask for most often. Click to see details and request assistance."
          />
          <ServiceGrid services={popularServices} />
          <div className="text-center mt-10">
            <Link
              to="/services"
              className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              View All Services
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50" aria-labelledby="all-categories-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="All Service Categories"
            subtitle="What We Offer"
            description="Browse our complete range of digital assistance services organised by category."
          />
          <div className="space-y-16">
            {serviceCategories.map((category, index) => {
              const categoryServices = getServicesByCategory(category.id);
              const theme = ['theme-blue','theme-orange','theme-green','theme-purple','theme-teal','theme-rose'][index % 6];
              return (
                <section key={category.id} id={category.id} className={`scroll-mt-20 ${theme}`} aria-labelledby={`${category.id}-title`}>
                  <div className="cat-header">
                    <div className="cat-icon">
                      <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                        <polyline points="10 9 9 9 8 9" />
                      </svg>
                    </div>
                    <div>
                      <h3 id={`${category.id}-title`}>{category.name}</h3>
                      <p className="text-gray-600">{category.description}</p>
                    </div>
                  </div>
                  <ServiceGrid services={categoryServices} variant="compact" />
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-white" aria-labelledby="how-it-works-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="How It Works"
            subtitle="Simple Process"
            description="Getting digital assistance at Bhanpura CSC is straightforward. Here's what to expect."
          />
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="hidden lg:block absolute left-0 right-0 top-8 h-0.5 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500" aria-hidden="true" />
            {howItWorksSteps.map((step, index) => {
              const theme = ['theme-blue','theme-green','theme-orange','theme-purple'][index % 4];
              return (
                <article key={index} className={`hl-card ${theme}`}>
                  <div className="hl-number">{step.number}</div>
                  <div className="hl-icon">
                    <step.icon className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl">{step.title}</h3>
                  <p>{step.description}</p>
                </article>
              );
            })}
          </div>
          <div className="text-center mt-12">
            <Link
              to="/how-it-works"
              className="inline-flex items-center gap-2 px-6 py-3 border-2 border-primary-600 text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500 focus:ring-offset-2"
            >
              Learn More About Our Process
              <ArrowRight className="w-5 h-5" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-gray-50" aria-labelledby="why-choose-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Why Choose Bhanpura CSC?"
            subtitle="Our Commitment"
            description="We focus on honest, transparent, and helpful service for our local community."
          />
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {whyChooseUs.map((reason, index) => {
              const theme = ['theme-blue','theme-green','theme-orange','theme-purple','theme-teal','theme-rose'][index % 6];
              return (
                <article key={index} className={`hl-card ${theme}`}>
                  <div className="hl-icon">
                    <reason.icon className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg">{reason.title}</h3>
                  <p>{reason.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <FAQ items={faqItems} title="Frequently Asked Questions" subtitle="Common Queries" />
    </>
  );
}