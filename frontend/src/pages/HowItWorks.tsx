import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  CheckCircle,
  Clock,
  MapPin,
  MessageSquare,
  Phone,
  Shield,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { SectionHeading } from '../components/SectionHeading';
import { businessConfig } from '../config/business';
import { getWhatsAppUrl, getDefaultWhatsAppMessage } from '../utils/helpers';
import { PageSEO } from '../components/PageSEO';
import { cn } from '../utils/helpers';

interface Step {
  number: number;
  title: string;
  description: string;
  icon: LucideIcon;
  details: string[];
}

const steps: Step[] = [
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

const stepThemes = [
  {
    gradient: 'from-blue-600 to-indigo-700',
    soft: 'bg-blue-50',
    text: 'text-blue-700',
    chip: 'bg-blue-100 text-blue-700',
    glow: 'bg-blue-400/20',
  },
  {
    gradient: 'from-emerald-500 to-teal-700',
    soft: 'bg-emerald-50',
    text: 'text-emerald-700',
    chip: 'bg-emerald-100 text-emerald-700',
    glow: 'bg-emerald-400/20',
  },
  {
    gradient: 'from-orange-500 to-rose-600',
    soft: 'bg-orange-50',
    text: 'text-orange-700',
    chip: 'bg-orange-100 text-orange-700',
    glow: 'bg-orange-400/20',
  },
  {
    gradient: 'from-violet-600 to-fuchsia-700',
    soft: 'bg-violet-50',
    text: 'text-violet-700',
    chip: 'bg-violet-100 text-violet-700',
    glow: 'bg-violet-400/20',
  },
] as const;

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
  const [activeStep, setActiveStep] = useState(1);
  const active = steps[activeStep - 1];
  const theme = stepThemes[activeStep - 1];
  const ActiveIcon = active.icon;
  const whatsappUrl = getWhatsAppUrl(getDefaultWhatsAppMessage());

  return (
    <>
      <PageSEO
        title={`How CSC Services Work | ${businessConfig.name}`}
        description="See how to get digital service assistance at CSC Centre Bhanpura: visit, explain your requirement, get guided help, and receive your confirmation."
        keywords={['how CSC services work', 'digital service assistance process', 'CSC Centre Bhanpura', 'Kaithal service centre']}
      />

      <section
        id="how-it-works"
        className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-emerald-50 py-20 md:py-24 scroll-mt-24"
        aria-labelledby="how-it-works-title"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -right-24 -top-24 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
          <div className="absolute -left-24 bottom-0 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl" />
          <div className="absolute left-1/2 top-1/3 h-96 w-96 -translate-x-1/2 rounded-full bg-emerald-200/20 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            as="h1"
            id="how-it-works-title"
            title="How It Works"
            subtitle="SIMPLE 4-STEP PROCESS"
            description="Getting digital assistance at Bhanpura CSC is straightforward. Here's what to expect when you visit or contact us."
          />

          <div className="mb-16 grid gap-6 lg:grid-cols-12 lg:gap-8">
            <div className="lg:col-span-5">
              <div className="rounded-3xl border border-blue-100 bg-white p-3 shadow-xl shadow-blue-900/5 sm:p-4">
                <div className="mb-3 flex items-center justify-between px-2">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-slate-400">Your journey</span>
                  <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-bold text-blue-700">
                    Step {activeStep} of {steps.length}
                  </span>
                </div>

                <div role="tablist" aria-label="Process steps" className="grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-1">
                  {steps.map((step, index) => {
                    const stepTheme = stepThemes[index];
                    const isActive = activeStep === step.number;
                    return (
                      <button
                        key={step.number}
                        type="button"
                        role="tab"
                        id={`step-tab-${step.number}`}
                        aria-selected={isActive}
                        aria-controls={`step-panel-${step.number}`}
                        onClick={() => setActiveStep(step.number)}
                        className={cn(
                          'group flex w-full items-center gap-3 rounded-2xl border p-3 text-left transition-all duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 touch-manipulation',
                          isActive
                            ? `border-transparent bg-gradient-to-r ${stepTheme.gradient} text-white shadow-lg`
                            : 'border-slate-200 bg-white text-slate-900 hover:border-blue-200 hover:bg-blue-50/60'
                        )}
                      >
                        <span
                          className={cn(
                            'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-sm font-extrabold',
                            isActive ? 'bg-white/20 text-white' : stepTheme.chip
                          )}
                        >
                          {String(step.number).padStart(2, '0')}
                        </span>
                        <span className="min-w-0 flex-1">
                          <span className={cn('block text-[10px] font-bold uppercase tracking-[0.18em]', isActive ? 'text-white/70' : 'text-slate-400')}>
                            Step {step.number}
                          </span>
                          <span className="block text-sm font-bold leading-snug">{step.title}</span>
                        </span>
                        <ArrowRight
                          className={cn(
                            'h-4 w-4 shrink-0 transition-transform',
                            isActive ? 'text-white' : 'text-slate-300 group-hover:translate-x-0.5 group-hover:text-blue-500'
                          )}
                          aria-hidden="true"
                        />
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            <div className="lg:col-span-7">
              <div
                role="tabpanel"
                id={`step-panel-${active.number}`}
                aria-labelledby={`step-tab-${active.number}`}
                className="relative h-full overflow-hidden rounded-3xl border border-blue-100 bg-white p-5 shadow-xl shadow-slate-200/70 sm:p-7 lg:p-10"
              >
                <div className={cn('pointer-events-none absolute -right-16 -top-16 h-60 w-60 rounded-full blur-3xl', theme.glow)} aria-hidden="true" />
                <div className="relative">
                  <div className="flex flex-wrap items-center gap-4">
                    <div className={cn('flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br text-white shadow-lg', theme.gradient)}>
                      <ActiveIcon className="h-7 w-7" aria-hidden="true" />
                    </div>
                    <div>
                      <span className={cn('inline-flex rounded-full px-3 py-1 text-xs font-bold uppercase tracking-widest', theme.chip)}>
                        Step {active.number}
                      </span>
                      <h3 className="mt-2 text-xl font-extrabold leading-tight text-blue-900 sm:text-2xl">{active.title}</h3>
                    </div>
                  </div>

                  <p className="mt-5 text-base leading-relaxed text-slate-600 sm:text-lg">{active.description}</p>

                  <div className="mt-6 grid gap-3 sm:grid-cols-2">
                    {active.details.map((detail) => (
                      <div
                        key={detail}
                        className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-3.5 text-sm leading-relaxed text-slate-700"
                      >
                        <span className={cn('mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full', theme.soft, theme.text)}>
                          <CheckCircle className="h-3.5 w-3.5" aria-hidden="true" />
                        </span>
                        <span>{detail}</span>
                      </div>
                    ))}
                  </div>

                  <div className="mt-7 flex flex-col gap-3 border-t border-slate-100 pt-6 sm:flex-row">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-green-600 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-600/20 transition hover:-translate-y-0.5 hover:bg-green-700 touch-manipulation"
                    >
                      <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
                      Contact on WhatsApp
                    </a>
                    <a
                      href={`tel:+91${businessConfig.contact.phone}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:border-blue-200 hover:text-blue-700 touch-manipulation"
                    >
                      <Phone className="h-5 w-5" aria-hidden="true" />
                      Call {businessConfig.contact.phone}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <SectionHeading
              title="What Makes Our Process Different"
              subtitle="Key Points"
            />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 sm:gap-5">
              {keyPoints.map((point, index) => {
                const pointTheme = stepThemes[index % stepThemes.length];
                return (
                  <article
                    key={point.title}
                    className="group relative overflow-hidden rounded-3xl border border-slate-200 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
                  >
                    <span className="pointer-events-none absolute right-4 top-3 text-5xl font-black leading-none text-slate-100 transition-colors group-hover:text-blue-100" aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className={cn('relative flex h-11 w-11 items-center justify-center rounded-2xl', pointTheme.soft, pointTheme.text)}>
                      <point.icon className="h-6 w-6" aria-hidden="true" />
                    </div>
                    <h3 className="relative mt-4 text-lg font-bold text-blue-900">{point.title}</h3>
                    <p className="relative mt-2 text-sm leading-relaxed text-slate-600">{point.description}</p>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-blue-950 py-16 text-white md:py-20" aria-labelledby="start-title">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-20 -top-24 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-orange-400/20 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-6 shadow-2xl backdrop-blur sm:p-8 lg:p-12">
            <div className="grid gap-8 lg:grid-cols-[1.4fr_1fr] lg:items-center">
              <div>
                <span className="inline-flex rounded-full bg-orange-500/20 px-3 py-1.5 text-xs font-bold uppercase tracking-widest text-orange-300">
                  Start Here
                </span>
                <h2 id="start-title" className="mt-3 text-2xl font-extrabold sm:text-3xl lg:text-[40px]">
                  Ready to Get Started?
                </h2>
                <p className="mt-2 max-w-2xl text-base text-blue-100/80 sm:text-lg">
                  Visit us at Village Bhanpura, call us, or message on WhatsApp. We're here to help.
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <a
                  href={`tel:+91${businessConfig.contact.phone}`}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-blue-900 shadow-xl transition hover:-translate-y-0.5 hover:bg-blue-50 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60 touch-manipulation"
                  aria-label="Call Now"
                >
                  <Phone className="h-5 w-5" aria-hidden="true" />
                  Call Now
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 font-bold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-green-700 focus:outline-none focus-visible:ring-4 focus-visible:ring-white/60 touch-manipulation"
                  aria-label="WhatsApp Us"
                >
                  <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
                  WhatsApp Us
                </a>
                <Link
                  to="/contact"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10 touch-manipulation"
                >
                  Send an Enquiry
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
