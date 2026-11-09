import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, MapPin, MessageSquare, Shield, Users, Clock, Star, FileText, CreditCard, Camera, File, Files, Award, HelpCircle, Monitor, GraduationCap, Image, Plane, Printer, Scan, FileType, Layout, Minimize, Baby, Send, type LucideIcon } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { ServiceGrid } from '../components/ServiceGrid';
import { FAQ } from '../components/FAQ';
import { getPopularServices, getServicesByCategory, type Service, type ServiceCategory } from '../data/services';
import { businessConfig } from '../config/business';
import { getWhatsAppUrl, getDefaultWhatsAppMessage } from '../utils/helpers';
import { PageSEO } from '../components/PageSEO';
import { SchemaMarkup } from '../components/SchemaMarkup';
import { FaWhatsapp } from 'react-icons/fa';

const COLOR_MAP = {
  blue: { gradient: 'from-blue-600 to-blue-900', soft: 'bg-blue-50', softText: 'text-blue-900', border: 'border-t-blue-600', badge: 'bg-blue-100 text-blue-800', iconSoft: 'bg-blue-100 text-blue-700', hoverBorder: 'hover:border-blue-300', whatsappHover: 'hover:bg-green-50' },
  orange: { gradient: 'from-orange-500 to-orange-600', soft: 'bg-orange-50', softText: 'text-orange-900', border: 'border-t-orange-500', badge: 'bg-orange-100 text-orange-800', iconSoft: 'bg-orange-100 text-orange-700', hoverBorder: 'hover:border-orange-300', whatsappHover: 'hover:bg-green-50' },
  green: { gradient: 'from-green-500 to-green-700', soft: 'bg-green-50', softText: 'text-green-900', border: 'border-t-green-600', badge: 'bg-green-100 text-green-800', iconSoft: 'bg-green-100 text-green-700', hoverBorder: 'hover:border-green-300', whatsappHover: 'hover:bg-green-50' },
  purple: { gradient: 'from-purple-500 to-purple-700', soft: 'bg-purple-50', softText: 'text-purple-900', border: 'border-t-purple-600', badge: 'bg-purple-100 text-purple-800', iconSoft: 'bg-purple-100 text-purple-700', hoverBorder: 'hover:border-purple-300', whatsappHover: 'hover:bg-green-50' },
  teal: { gradient: 'from-teal-500 to-teal-700', soft: 'bg-teal-50', softText: 'text-teal-900', border: 'border-t-teal-600', badge: 'bg-teal-100 text-teal-800', iconSoft: 'bg-teal-100 text-teal-700', hoverBorder: 'hover:border-teal-300', whatsappHover: 'hover:bg-green-50' },
  pink: { gradient: 'from-pink-500 to-pink-600', soft: 'bg-pink-50', softText: 'text-pink-900', border: 'border-t-pink-500', badge: 'bg-pink-100 text-pink-800', iconSoft: 'bg-pink-100 text-pink-700', hoverBorder: 'hover:border-pink-300', whatsappHover: 'hover:bg-green-50' },
} as const;

type CategoryConfig = {
  id: ServiceCategory;
  name: string;
  description: string;
  icon: LucideIcon;
  color: keyof typeof COLOR_MAP;
};

const categoryConfigs: CategoryConfig[] = [
  {
    id: 'online-forms',
    name: 'Online Forms and Applications',
    description: 'Assistance with filling and submitting various online forms and applications',
    icon: FileText,
    color: 'blue',
  },
  {
    id: 'online-payments',
    name: 'Online Payment Assistance',
    description: 'Guidance and support for online payment processes',
    icon: CreditCard,
    color: 'orange',
  },
  {
    id: 'photo-passport',
    name: 'Photo and Passport-size Photo Services',
    description: 'Passport-size photos, digital photo preparation, and passport application guidance',
    icon: Camera,
    color: 'green',
  },
  {
    id: 'document-services',
    name: 'Document Services',
    description: 'Printing, scanning, PDF creation, formatting, and file conversion',
    icon: File,
    color: 'purple',
  },
  {
    id: 'certificate-assistance',
    name: 'Certificate Assistance',
    description: 'Guidance for birth certificates and other certificate applications',
    icon: Award,
    color: 'teal',
  },
  {
    id: 'general-digital',
    name: 'General Digital Assistance',
    description: 'Help with online applications and general digital service guidance',
    icon: Monitor,
    color: 'pink',
  },
];

function CategorySection({ config, services }: { config: CategoryConfig; services: Service[] }) {
  const Icon = config.icon;
  const serviceCount = services.length;
  const colors = COLOR_MAP[config.color];
  const iconMap: Record<string, LucideIcon> = {
    FileText, CreditCard, Camera, File, Files, Award, HelpCircle, Monitor, GraduationCap, Image, Plane, Printer, Scan, FileType, Layout, Minimize, Baby, Send,
  };
  return (
    <section id={config.id} className="scroll-mt-24 min-w-0" aria-labelledby={`${config.id}-title`}>
      <div className={`relative rounded-2xl border border-slate-200 ${colors.soft} bg-gradient-to-r ${colors.soft} to-white shadow-md overflow-hidden`}>
        <div className={`absolute left-0 top-0 bottom-0 w-[6px] bg-gradient-to-b ${colors.gradient}`} aria-hidden="true" />
        <div className="p-6 lg:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className={`flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center text-white bg-gradient-to-br ${colors.gradient} shadow-lg`}>
                <Icon className="w-7 h-7 sm:w-8 sm:h-8" aria-hidden="true" />
              </div>
              <div>
                <h3 id={`${config.id}-title`} className="text-xl sm:text-2xl font-bold text-blue-900">{config.name}</h3>
                <p className="text-slate-600 mt-1 text-sm sm:text-base">{config.description}</p>
              </div>
            </div>
            <span className={`px-3 py-1 rounded-full text-sm font-semibold ${colors.badge} whitespace-nowrap`}>
              {serviceCount} Services
            </span>
          </div>
        </div>
        <div className="bg-white/60 px-4 sm:px-6 lg:px-8 pb-6 sm:pb-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {services.map((service) => {
              const ServiceIcon = (service.icon && iconMap[service.icon] ? iconMap[service.icon] : FileText) as LucideIcon;
              return (
                <article key={service.id} className={`bg-white rounded-2xl border border-slate-200 border-t-4 ${colors.border} p-5 sm:p-6 shadow-sm flex flex-col ${colors.hoverBorder} hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}>
                  <div className={`w-11 h-11 sm:w-12 sm:h-12 rounded-xl flex items-center justify-center mb-4 ${colors.iconSoft}`}>
                    <ServiceIcon className="w-5 h-5 sm:w-6 sm:h-6" aria-hidden="true" />
                  </div>
                  <h4 className="text-base sm:text-lg font-bold text-blue-900 mb-2">{service.name}</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{service.description}</p>
                  <a
                    href={`https://wa.me/919541611393?text=${encodeURIComponent(`Hello, I need help with ${service.name}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`mt-auto pt-3 border-t border-slate-100 flex items-center gap-2 text-green-600 font-semibold text-sm rounded-lg px-2 py-1 transition-colors ${colors.whatsappHover} hover:text-green-700`}
                  >
                    <FaWhatsapp className="w-4 h-4" aria-hidden="true" />
                    <span>Enquire on WhatsApp</span>
                  </a>
                </article>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

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

  return (
    <>
      <PageSEO
        title={`${businessConfig.name} | Online Forms & Digital Services in Kaithal`}
        description="Get online form, document, photo, payment and certificate assistance at Bhanpura CSC Centre in Kaithal, Haryana. Call or WhatsApp for local support."
        keywords={['Bhanpura CSC Centre', 'CSC centre in Bhanpura', 'digital services in Kaithal', 'online form filling Kaithal', 'document services', 'passport photo service']}
      />
      <SchemaMarkup
        type="LocalBusiness"
        data={{
          name: businessConfig.name,
          image: 'https://bhanpura-csc.vercel.app/og-image.jpg',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'Near Shiv Mandir, Yadav Chopal',
            addressLocality: 'Village Bhanpura',
            addressRegion: 'Kaithal',
            postalCode: '136027',
            addressCountry: 'IN',
          },
          telephone: `+91${businessConfig.contact.phone}`,
          email: businessConfig.contact.email,
          url: 'https://bhanpura-csc.vercel.app',
          priceRange: '₹',
          openingHoursSpecification: [
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
              opens: '09:00',
              closes: '13:00',
            },
            {
              '@type': 'OpeningHoursSpecification',
              dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
              opens: '16:00',
              closes: '20:00',
            },
          ],
          sameAs: [
            businessConfig.social.instagram,
          ],
        }}
      />

      <section id="home" className="relative min-h-[480px] sm:min-h-[560px] md:min-h-[calc(100svh-80px)] flex items-center scroll-mt-24" aria-label="Bhanpura CSC Centre">
        <img
          src="/hero-banner.webp"
          alt="Bhanpura CSC Centre, providing local digital assistance in Kaithal"
          loading="eager"
          decoding="async"
          width={1672}
          height={941}
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-blue-950/90 via-blue-900/70 to-blue-900/40 md:bg-gradient-to-r md:from-blue-950/90 md:via-blue-900/60 md:to-transparent" aria-hidden="true" />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full py-8 md:py-0">
          <div className="max-w-xl">
            <p className="text-xs sm:text-sm font-medium text-blue-100 uppercase tracking-wider mb-2">Common Service Centre & Digital Assistance</p>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl xl:text-5xl font-bold text-white leading-tight mb-3 sm:mb-4 drop-shadow-lg">
              Your Trusted Partner for Digital Services
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-white/90 leading-relaxed mb-5">
              Online form assistance, document services, photo services, payment assistance, and more, with friendly local support at Bhanpura.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mb-5">
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
            <div className="space-y-1 text-xs sm:text-sm text-white/80">
              <p>Open: {businessConfig.workingHours.display}</p>
              <p>{businessConfig.location.formatted}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 lg:py-24 bg-white" aria-labelledby="popular-services-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="popular-services-title"
            title="Popular Services"
            subtitle="Most Requested"
            description="These are the services our customers ask for most often. Click to see details and request assistance."
          />
          <ServiceGrid services={popularServices} />
          <div className="text-center mt-8">
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

      <section id="services" className="relative overflow-hidden py-12 md:py-20 lg:py-24 bg-gradient-to-b from-blue-50 via-white to-orange-50/40 scroll-mt-24" aria-labelledby="all-categories-title">
        <div className="absolute -top-16 -left-16 w-64 h-64 bg-blue-200/30 rounded-full blur-3xl pointer-events-none -z-10" aria-hidden="true" />
        <div className="absolute -bottom-16 -right-16 w-64 h-64 bg-orange-200/30 rounded-full blur-3xl pointer-events-none -z-10" aria-hidden="true" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="all-categories-title"
            title="All Service Categories"
            subtitle="WHAT WE OFFER"
            description="Browse our complete range of digital assistance services organised by category."
          />
          <div className="space-y-10">
            {categoryConfigs.map((config) => {
              const services = getServicesByCategory(config.id as import('../data/services').ServiceCategory);
              return <CategorySection key={config.id} config={config} services={services} />;
            })}
          </div>

          <div className="mt-12 rounded-3xl bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 text-white p-6 md:p-10 text-center shadow-xl">
            <h3 className="text-xl md:text-2xl lg:text-3xl font-bold">Apni service list mein nahi mili? Hamse puchiye.</h3>
            <p className="text-white/80 mt-2">Hum aapki zaroorat ke hisaab se guide karenge.</p>
            <div className="mt-5 flex flex-col sm:flex-row gap-3 justify-center">
              <a
                href="https://wa.me/919541611393"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 bg-green-600 text-white font-semibold rounded-xl hover:-translate-y-1 transition-transform"
              >
                <FaWhatsapp className="w-5 h-5" aria-hidden="true" />
                Contact on WhatsApp
              </a>
              <a
                href="tel:+919541611393"
                className="inline-flex items-center justify-center gap-2 w-full sm:w-auto px-5 py-3 bg-white text-blue-900 font-semibold rounded-xl hover:-translate-y-1 transition-transform"
              >
                Call Us
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-12 md:py-20 lg:py-24 bg-white" aria-labelledby="how-it-works-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="how-it-works-title"
            title="How It Works"
            subtitle="Simple Process"
            description="Getting digital assistance at Bhanpura CSC is straightforward. Here's what to expect."
          />
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="hidden lg:block absolute left-0 right-0 top-8 h-0.5 bg-gradient-to-r from-blue-500 via-green-500 to-purple-500" aria-hidden="true" />
            {howItWorksSteps.map((step, index) => {
              const theme = ['theme-blue','theme-green','theme-orange','theme-purple'][index % 4];
              return (
                <article key={index} className={`hl-card ${theme}`}>
                  <div className="hl-number">{step.number}</div>
                  <div className="hl-icon">
                    <step.icon className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg md:text-xl">{step.title}</h3>
                  <p className="text-sm">{step.description}</p>
                </article>
              );
            })}
          </div>
          <div className="text-center mt-10">
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

      <section className="py-20 md:py-24 bg-gray-50" aria-labelledby="why-choose-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="why-choose-title"
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