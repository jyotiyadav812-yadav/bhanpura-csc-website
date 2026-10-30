import { Link } from 'react-router-dom';
import {
  ArrowRight,
  Award,
  Camera,
  CreditCard,
  File,
  FileText,
  HelpCircle,
  LayoutGrid,
  MapPin,
  MessageSquare,
  Phone,
  type LucideIcon,
} from 'lucide-react';
import { FaWhatsapp } from 'react-icons/fa';
import { SectionHeading } from '../components/SectionHeading';
import { ServiceGrid } from '../components/ServiceGrid';
import { serviceCategories, services, getServicesByCategory } from '../data/services';
import { businessConfig } from '../config/business';
import { getWhatsAppUrl, getDefaultWhatsAppMessage } from '../utils/helpers';
import { Helmet } from 'react-helmet-async';

const categoryIcons: Record<string, LucideIcon> = {
  FileText,
  CreditCard,
  Camera,
  File,
  Award,
  HelpCircle,
};

const categoryThemes: Record<string, { gradient: string; soft: string; text: string; border: string }> = {
  'online-forms': {
    gradient: 'from-blue-600 to-indigo-700',
    soft: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-200',
  },
  'online-payments': {
    gradient: 'from-orange-500 to-rose-600',
    soft: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-200',
  },
  'photo-passport': {
    gradient: 'from-emerald-500 to-teal-700',
    soft: 'bg-emerald-50',
    text: 'text-emerald-700',
    border: 'border-emerald-200',
  },
  'document-services': {
    gradient: 'from-violet-600 to-purple-700',
    soft: 'bg-violet-50',
    text: 'text-violet-700',
    border: 'border-violet-200',
  },
  'certificate-assistance': {
    gradient: 'from-teal-500 to-cyan-700',
    soft: 'bg-teal-50',
    text: 'text-teal-700',
    border: 'border-teal-200',
  },
  'general-digital': {
    gradient: 'from-pink-500 to-rose-600',
    soft: 'bg-pink-50',
    text: 'text-pink-700',
    border: 'border-pink-200',
  },
};

const stats = [
  { value: `${services.length}+`, label: 'Services', icon: LayoutGrid, color: 'bg-blue-50 text-blue-700' },
  { value: `${serviceCategories.length}`, label: 'Categories', icon: FileText, color: 'bg-orange-50 text-orange-700' },
  { value: 'Local', label: 'Support', icon: MapPin, color: 'bg-emerald-50 text-emerald-700' },
  { value: '1-to-1', label: 'Guidance', icon: MessageSquare, color: 'bg-violet-50 text-violet-700' },
];

export function Services() {
  const whatsappUrl = getWhatsAppUrl(getDefaultWhatsAppMessage());

  return (
    <>
      <Helmet>
        <title>All Services | {businessConfig.name}</title>
        <meta name="description" content="Browse all digital assistance services at Bhanpura CSC Centre - Online forms, payments, photos, documents, certificates, and general digital help." />
        <meta property="og:title" content={`All Services | ${businessConfig.name}`} />
        <meta property="og:description" content="Browse all digital assistance services at Bhanpura CSC Centre." />
        <meta property="og:type" content="website" />
      </Helmet>

      <section
        id="services"
        className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-orange-50/40 py-20 md:py-24 scroll-mt-24"
        aria-labelledby="services-title"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="services-title"
            title="All Services"
            subtitle="Complete Catalogue"
            description="Online forms, payments, documents, photos and most online services, with friendly local support."
          />

          <div className="mb-12 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
            {stats.map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-white/80 bg-white/80 p-4 shadow-sm shadow-blue-900/5 backdrop-blur sm:p-5"
              >
                <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${stat.color}`}>
                  <stat.icon className="h-5 w-5" aria-hidden="true" />
                </div>
                <p className="mt-3 text-2xl font-extrabold leading-none text-blue-900">{stat.value}</p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">{stat.label}</p>
              </div>
            ))}
          </div>

          <div className="mb-16 flex flex-wrap justify-center gap-2.5" aria-label="Jump to service category">
            {serviceCategories.map((category) => {
              const theme = categoryThemes[category.id];
              const Icon = categoryIcons[category.icon] || HelpCircle;
              const count = getServicesByCategory(category.id).length;
              return (
                <a
                  key={category.id}
                  href={`#${category.id}`}
                  className={`group inline-flex items-center gap-2 rounded-full border bg-white px-3.5 py-2 text-sm font-semibold text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md ${theme.border}`}
                >
                  <span className={`flex h-7 w-7 items-center justify-center rounded-full ${theme.soft} ${theme.text}`}>
                    <Icon className="h-3.5 w-3.5" aria-hidden="true" />
                  </span>
                  <span>{category.name}</span>
                  <span className={`rounded-full px-2 py-0.5 text-[11px] font-bold ${theme.soft} ${theme.text}`}>{count}</span>
                </a>
              );
            })}
          </div>

          <div className="space-y-16">
            {serviceCategories.map((category, index) => {
              const categoryServices = getServicesByCategory(category.id);
              const theme = categoryThemes[category.id];
              const Icon = categoryIcons[category.icon] || HelpCircle;
              return (
                <section
                  key={category.id}
                  id={category.id}
                  className="min-w-0 scroll-mt-24"
                  aria-labelledby={`${category.id}-title`}
                >
                  <div className={`relative mb-6 overflow-hidden rounded-3xl bg-gradient-to-r ${theme.gradient} p-6 text-white shadow-xl shadow-slate-900/10 sm:p-8`}>
                    <div className="pointer-events-none absolute -right-10 -top-10 h-44 w-44 rounded-full bg-white/10 blur-2xl" aria-hidden="true" />
                    <div className="relative flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                      <div className="flex items-start gap-4">
                        <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-white/15 text-white ring-1 ring-white/20 backdrop-blur">
                          <Icon className="h-7 w-7" aria-hidden="true" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] font-bold uppercase tracking-[0.22em] text-white/70">
                            Category {String(index + 1).padStart(2, '0')}
                          </p>
                          <h3 id={`${category.id}-title`} className="mt-1 text-2xl font-extrabold leading-tight sm:text-3xl">
                            {category.name}
                          </h3>
                          <p className="mt-2 max-w-2xl text-sm leading-relaxed text-white/80 sm:text-base">
                            {category.description}
                          </p>
                        </div>
                      </div>
                      <span className="inline-flex shrink-0 items-center gap-2 self-start rounded-full bg-white/15 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/20 sm:self-center">
                        <span className="h-1.5 w-1.5 rounded-full bg-white" aria-hidden="true" />
                        {categoryServices.length} services
                      </span>
                    </div>
                  </div>
                  <ServiceGrid services={categoryServices} />
                </section>
              );
            })}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-blue-950 py-16 text-white md:py-20" aria-label="Contact for services">
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-20 -top-24 h-80 w-80 rounded-full bg-blue-500/20 blur-3xl" />
          <div className="absolute -bottom-24 -right-16 h-80 w-80 rounded-full bg-orange-400/20 blur-3xl" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.06] p-8 text-center shadow-2xl backdrop-blur sm:p-10">
            <h2 className="text-3xl font-extrabold lg:text-4xl">Need Help Choosing a Service?</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-100/80">
              Not sure which service you need? Contact us and we'll guide you to the right assistance.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
              <Link
                to="/contact"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-white px-6 py-3.5 font-bold text-blue-900 shadow-xl transition hover:-translate-y-0.5 hover:bg-blue-50 sm:w-auto"
              >
                Contact Us
                <ArrowRight className="h-5 w-5" aria-hidden="true" />
              </Link>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-green-600 px-6 py-3.5 font-bold text-white shadow-xl transition hover:-translate-y-0.5 hover:bg-green-700 sm:w-auto"
              >
                <FaWhatsapp className="h-5 w-5" aria-hidden="true" />
                WhatsApp
              </a>
              <a
                href={`tel:+91${businessConfig.contact.phone}`}
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/5 px-6 py-3.5 font-semibold text-white transition hover:bg-white/10 sm:w-auto"
              >
                <Phone className="h-5 w-5" aria-hidden="true" />
                Call
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
