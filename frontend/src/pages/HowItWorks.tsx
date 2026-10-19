import { MapPin, MessageSquare, Users, CheckCircle, Clock, Shield, Phone } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { businessConfig } from '../config/business';
import { getWhatsAppUrl, getDefaultWhatsAppMessage } from '../utils/helpers';
import { Helmet } from 'react-helmet-async';

const steps = [
  {
    number: 1,
    title: 'Visit or Contact Us',
    description: 'Walk into our centre at Village Bhanpura, Kaithal, or reach out via phone or WhatsApp. No appointment needed for most services.',
    icon: MapPin,
    details: [
      'Centre location: Village Bhanpura, Kaithal, Haryana',
      'Phone: 9541611393 (tap to call)',
      'WhatsApp: 9541611393 (message anytime)',
      'Email: digitalbhanpura@gmail.com',
    ],
  },
  {
    number: 2,
    title: 'Explain Your Requirement',
    description: 'Tell us what you need — filling a form, making a payment, getting a photo, scanning documents, certificate guidance, or any other digital assistance.',
    icon: MessageSquare,
    details: [
      'We listen in Hindi, English, or Hinglish',
      'We identify the right service for you',
      'We explain the process and timeline',
      'We list any documents you may need',
    ],
  },
  {
    number: 3,
    title: 'We Assist You Step by Step',
    description: 'Our team helps you complete the task — filling online forms, guiding through payment gateways, capturing photos, scanning/printing documents, or preparing certificate applications.',
    icon: Users,
    details: [
      'Form filling on government portals',
      'Safe payment guidance (you enter credentials)',
      'Passport-size photo capture & formatting',
      'Document scanning, printing, PDF conversion',
      'Certificate application guidance & checklists',
    ],
  },
  {
    number: 4,
    title: 'Receive Confirmation & Follow-up',
    description: 'You get acknowledgment receipts, printed documents, digital files, or application reference numbers. We\'re available for status checks and further assistance.',
    icon: CheckCircle,
    details: [
      'Download/submission receipts provided',
      'Printed documents or digital files handed over',
      'Application reference numbers noted',
      'Follow-up support for status tracking',
    ],
  },
];

const keyPoints = [
  {
    title: 'No Hidden Charges',
    description: 'We tell you "Contact us for applicable charges" upfront. No surprise fees.',
    icon: Clock,
  },
  {
    title: 'Your Data Stays Yours',
    description: 'We NEVER ask for UPI PINs, OTPs, passwords, or banking credentials. You enter payment details yourself.',
    icon: Shield,
  },
  {
    title: 'Local Language Support',
    description: 'Communicate comfortably in Hindi, English, or Hinglish. We explain everything clearly.',
    icon: MessageSquare,
  },
  {
    title: 'Follow-up Included',
    description: 'Our support doesn\'t end at submission. We help track status and resolve issues.',
    icon: Users,
  },
];

export function HowItWorks() {
  return (
    <>
      <Helmet>
        <title>How It Works | {businessConfig.name}</title>
        <meta name="description" content="Learn how Bhanpura CSC Centre works - visit us, explain your need, get assisted, receive confirmation. Simple 4-step process for digital services." />
        <meta property="og:title" content={`How It Works | ${businessConfig.name}`} />
        <meta property="og:description" content="Learn how Bhanpura CSC Centre works - simple 4-step process for digital services." />
        <meta property="og:type" content="website" />
      </Helmet>

      <section className="relative py-16 lg:py-24 bg-gradient-to-br from-white via-slate-50 to-blue-50 overflow-hidden" aria-labelledby="how-it-works-title">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -right-24 w-80 h-80 bg-blue-200/30 rounded-full blur-3xl" />
          <div className="absolute bottom-0 -left-24 w-80 h-80 bg-orange-200/30 rounded-full blur-3xl" />
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-green-200/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="How It Works"
            subtitle="SIMPLE 4-STEP PROCESS"
            description="Getting digital assistance at Bhanpura CSC is straightforward. Here's what to expect when you visit or contact us."
            titleClassName="text-slate-900"
            subtitleClassName="text-orange-700 bg-orange-100 px-3 py-1 rounded-full inline-block"
            descriptionClassName="text-slate-600"
          />

          <div className="relative max-w-3xl mx-auto pl-16 sm:pl-24 space-y-12 sm:space-y-16">
            <div className="absolute left-5 sm:left-9 top-3 bottom-3 w-1 rounded-full bg-gradient-to-b from-blue-500 via-green-500 to-purple-500" aria-hidden="true" />
            {steps.map(step => (
              <article
                key={step.number}
                className="relative"
                aria-labelledby={`step-${step.number}-title`}
              >
                <span
                  className={`absolute -left-16 sm:-left-24 top-8 w-6 h-6 rounded-full border-4 border-white shadow-lg ${step.number === 1 ? 'bg-blue-500 shadow-blue-500/40' : step.number === 2 ? 'bg-green-500 shadow-green-500/40' : step.number === 3 ? 'bg-orange-500 shadow-orange-500/40' : 'bg-purple-500 shadow-purple-500/40'}`}
                  aria-hidden="true"
                />

                <div className={`relative bg-white border border-slate-200 rounded-2xl p-6 sm:p-8 shadow-lg shadow-slate-200/60 overflow-hidden hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ${step.number === 1 ? 'border-t-4 border-t-blue-500' : step.number === 2 ? 'border-t-4 border-t-green-500' : step.number === 3 ? 'border-t-4 border-t-orange-500' : 'border-t-4 border-t-purple-500'}`}>
                  <div className={`absolute -top-6 -left-6 w-16 h-16 rounded-full text-white flex items-center justify-center text-2xl font-bold shadow-lg ${step.number === 1 ? 'bg-gradient-to-br from-blue-500 to-blue-700 shadow-blue-500/30' : step.number === 2 ? 'bg-gradient-to-br from-green-500 to-green-700 shadow-green-500/30' : step.number === 3 ? 'bg-gradient-to-br from-orange-500 to-orange-700 shadow-orange-500/30' : 'bg-gradient-to-br from-purple-500 to-indigo-700 shadow-purple-500/30'}`}>
                    {step.number}
                  </div>
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center mb-4 ${step.number === 1 ? 'bg-blue-100 text-blue-600' : step.number === 2 ? 'bg-green-100 text-green-600' : step.number === 3 ? 'bg-orange-100 text-orange-600' : 'bg-purple-100 text-purple-600'}`}>
                    <step.icon className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h3 id={`step-${step.number}-title`} className="text-2xl font-bold text-slate-800 mb-3">Step {step.number}: {step.title}</h3>
                  <p className="text-slate-600 text-lg mb-4">{step.description}</p>
                  <ul className="space-y-2" role="list">
                    {step.details.map((detail, i) => (
                      <li key={i} className="flex items-start gap-2 text-slate-700">
                        <CheckCircle className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" aria-hidden="true" />
                        <span>{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-20 mb-14 text-center">
            <span className="inline-block px-4 py-2 rounded-full bg-orange-100 text-orange-700 text-xs font-bold uppercase tracking-widest">
              Key Points
            </span>
            <h2 className="text-3xl lg:text-4xl font-extrabold text-slate-900 mt-5">
              What Makes Our Process Different
            </h2>
            <div className="w-20 h-1 rounded-full mx-auto mt-4 bg-gradient-to-r from-blue-600 to-orange-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
            {keyPoints.map((point, index) => {
              const theme = ['theme-blue', 'theme-green', 'theme-orange', 'theme-purple'][index % 4];
              return (
                <article
                  key={index}
                  className={`hl-card ${theme} h-full`}
                  aria-label={point.title}
                >
                  <div className="hl-icon">
                    <point.icon className="w-7 h-7" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900">{point.title}</h3>
                  <p className="text-gray-700 leading-relaxed">{point.description}</p>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative py-20 lg:py-28 bg-gradient-to-br from-blue-600 to-indigo-700 text-white overflow-hidden" aria-labelledby="start-title">
        <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
          <div className="absolute -top-24 -left-20 w-80 h-80 bg-white/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 -right-16 w-80 h-80 bg-orange-400/20 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 id="start-title" className="text-4xl lg:text-[44px] font-extrabold mb-4">Ready to Get Started?</h2>
          <p className="text-white/90 text-lg mb-10 max-w-2xl mx-auto">Visit us at Village Bhanpura, call us, or message on WhatsApp. We're here to help.</p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={`tel:+91${businessConfig.contact.phone}`}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-blue-700 font-bold rounded-xl shadow-xl hover:scale-105 transition-transform duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60"
              aria-label="Call Now"
            >
              <Phone className="w-5 h-5" aria-hidden="true" />
              Call Now
            </a>
            <a
              href={getWhatsAppUrl(getDefaultWhatsAppMessage())}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-4 bg-green-600 text-white font-bold rounded-xl shadow-xl hover:scale-105 transition-transform duration-200 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60"
              aria-label="WhatsApp Us"
            >
              <MessageSquare className="w-5 h-5" aria-hidden="true" />
              WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </>
  );
}