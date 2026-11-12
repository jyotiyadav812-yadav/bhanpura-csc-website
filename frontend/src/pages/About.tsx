import { Link } from 'react-router-dom';
import {
  AlertCircle,
  ArrowRight,
  Award,
  Building2,
  Clock,
  MapPin,
  Phone,
  Shield,
  Star,
  Users,
} from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { businessConfig } from '../config/business';
import { PageSEO } from '../components/PageSEO';
import { SchemaMarkup } from '../components/SchemaMarkup';

const COLOR_MAP = {
  blue: {
    gradient: 'from-blue-600 to-blue-800',
    soft: 'bg-blue-50',
    border: 'border-t-blue-500',
    hoverBorder: 'hover:border-blue-500',
    number: 'text-blue-100',
    titleHover: 'group-hover:text-blue-700',
  },
  green: {
    gradient: 'from-green-500 to-green-700',
    soft: 'bg-green-50',
    border: 'border-t-green-500',
    hoverBorder: 'hover:border-green-500',
    number: 'text-green-100',
    titleHover: 'group-hover:text-green-700',
  },
  orange: {
    gradient: 'from-orange-500 to-orange-600',
    soft: 'bg-orange-50',
    border: 'border-t-orange-500',
    hoverBorder: 'hover:border-orange-500',
    number: 'text-orange-100',
    titleHover: 'group-hover:text-orange-700',
  },
  rose: {
    gradient: 'from-rose-500 to-rose-700',
    soft: 'bg-rose-50',
    border: 'border-t-rose-500',
    hoverBorder: 'hover:border-rose-500',
    number: 'text-rose-100',
    titleHover: 'group-hover:text-rose-700',
  },
  purple: {
    gradient: 'from-purple-500 to-purple-700',
    soft: 'bg-purple-50',
    border: 'border-t-purple-500',
    hoverBorder: 'hover:border-purple-500',
    number: 'text-purple-100',
    titleHover: 'group-hover:text-purple-700',
  },
  teal: {
    gradient: 'from-teal-500 to-teal-700',
    soft: 'bg-teal-50',
    border: 'border-t-teal-500',
    hoverBorder: 'hover:border-teal-500',
    number: 'text-teal-100',
    titleHover: 'group-hover:text-teal-700',
  },
} as const;

const values = [
  {
    title: 'Honest Guidance',
    description: 'We provide accurate information based on current rules. We don\'t make false promises or guarantee approvals.',
    icon: Shield,
    color: 'blue',
  },
  {
    title: 'Customer First',
    description: 'Your needs come first. We take time to understand your situation and explain options clearly in your preferred language.',
    icon: Users,
    color: 'green',
  },
  {
    title: 'Transparent Pricing',
    description: 'No hidden fees. We say "Contact us for applicable charges" upfront so you know what to expect.',
    icon: Clock,
    color: 'orange',
  },
  {
    title: 'Data Safety',
    description: 'We NEVER ask for UPI PINs, OTPs, passwords, or banking credentials. Your sensitive data stays with you.',
    icon: Shield,
    color: 'rose',
  },
  {
    title: 'Local Commitment',
    description: 'We\'re part of the Bhanpura community. Our goal is to make digital services accessible to our neighbours.',
    icon: Building2,
    color: 'purple',
  },
  {
    title: 'Continuous Learning',
    description: 'Government portals and rules change. We stay updated so you get current, relevant guidance.',
    icon: Award,
    color: 'teal',
  },
] as const;

const teamInfo = {
  owner: businessConfig.owner.name,
  centreName: businessConfig.name,
  location: businessConfig.location.formatted,
  type: 'Private Digital Assistance Centre / Common Service Centre',
};

const infoRows = [
  { label: 'Centre Name', value: teamInfo.centreName, icon: Building2, gradient: 'from-blue-600 to-indigo-600' },
  { label: 'Owner', value: teamInfo.owner, icon: Users, gradient: 'from-orange-500 to-amber-500' },
  { label: 'Location', value: teamInfo.location, icon: MapPin, gradient: 'from-emerald-600 to-teal-600' },
  { label: 'Type', value: teamInfo.type, icon: Award, gradient: 'from-violet-600 to-purple-600' },
];

const disclaimers = [
  'We are a private digital assistance centre, not an official government office.',
  'We do not issue government documents, certificates, or approvals.',
  'We assist with form filling, document preparation, and process guidance only.',
  'Final decisions, approvals, fees, and timelines rest solely with respective government authorities.',
  'We are not affiliated with any government department or ministry.',
  'We do not use any government logos or claim official status.',
];

export function About() {
  return (
    <>
      <PageSEO
        title={`About CSC Centre Bhanpura | Local Digital Help in Kaithal`}
        description="Meet CSC Centre Bhanpura, a private digital assistance centre in Village Bhanpura, Kaithal, Haryana, offering practical guidance for online services."
        keywords={['about CSC Centre Bhanpura', 'digital assistance centre Kaithal', 'CSC centre Bhanpura Haryana', 'local online service help']}
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
          url: 'https://bhanpura-csc.vercel.app/about',
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

      <section
        id="about"
        className="relative overflow-hidden bg-gradient-to-b from-blue-50 via-white to-orange-50/30 py-20 md:py-24 scroll-mt-24"
        aria-labelledby="about-title"
      >
        <div className="pointer-events-none absolute inset-0" aria-hidden="true">
          <div className="absolute -left-24 -top-24 h-80 w-80 rounded-full bg-blue-200/40 blur-3xl" />
          <div className="absolute -bottom-24 -right-24 h-80 w-80 rounded-full bg-orange-200/40 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <SectionHeading
            as="h1"
            id="about-title"
            title="About Our Centre"
            subtitle="WHO WE ARE"
            description="CSC Centre Bhanpura is a private digital assistance centre serving Village Bhanpura and surrounding areas in Kaithal district, Haryana."
          />

          <div className="mb-16 grid items-start gap-8 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-7">
              <div className="relative overflow-hidden rounded-3xl border border-blue-100 bg-white p-6 shadow-xl shadow-blue-900/5 sm:p-8 lg:p-10">
                <div className="absolute left-0 top-0 h-full w-1.5 bg-gradient-to-b from-blue-600 via-blue-400 to-orange-400" aria-hidden="true" />
                <span className="inline-flex rounded-full bg-orange-100 px-4 py-2 text-xs font-bold uppercase tracking-widest text-orange-700">
                  Our Story
                </span>
                <h2 className="mt-4 text-2xl font-extrabold leading-tight text-blue-900 sm:text-3xl">
                  Your Local Digital Partner
                </h2>
                <p className="mt-4 text-lg leading-relaxed text-slate-600">
                  Established to bridge the digital divide in our community, {businessConfig.name} helps residents navigate online government services, applications, payments, and documentation — all without travelling to distant cities.
                </p>
                <p className="mt-4 leading-relaxed text-slate-600">
                  Our centre is owned and operated by <strong className="text-blue-800">{teamInfo.owner}</strong>. We understand the challenges of accessing digital services in rural areas — language barriers, complex portals, document requirements, and technical difficulties. That's why we offer patient, step-by-step assistance in Hindi, English, or Hinglish.
                </p>
<figure className="mt-8 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg">
                  <img
                    src="/csc-centre.png"
                    alt="CSC Centre Bhanpura building and storefront"
                    loading="lazy"
                    decoding="async"
                    width={768}
                    height={1364}
                    className="w-full object-contain"
                  />
                </figure>
<div className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2">
                  <figure className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg">
                    <img src="/csc-certificate.jpg" alt="CSC Centre Bhanpura registration certificate" loading="lazy" decoding="async" width={1200} height={906} className="h-80 w-full object-contain sm:h-96 md:h-[28rem]" />
                    <figcaption className="border-t border-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">Registration Certificate</figcaption>
                  </figure>
                  <figure className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-lg">
                    <img src="/csc-id-card.jpg" alt="CSC Centre Bhanpura identity card" loading="lazy" decoding="async" width={1000} height={902} className="h-80 w-full object-contain sm:h-96 md:h-[28rem]" />
                    <figcaption className="border-t border-slate-100 px-4 py-3 text-sm font-semibold text-slate-700">CSC ID Card</figcaption>
                  </figure>
                </div>
                <div className="mt-6 rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-amber-50 p-5 text-sm leading-relaxed text-orange-900">
                  We are a <strong>private digital assistance centre</strong>, not an official government office. We don't issue certificates or approvals — we help you understand the process, prepare your documents, and complete applications correctly.
                </div>
              </div>
            </div>

            <div className="space-y-6 lg:col-span-5">
              <div className="rounded-3xl border border-slate-200 bg-white p-6 shadow-xl shadow-blue-900/5 sm:p-8">
                <div className="mb-6 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-blue-50 text-blue-700">
                    <Building2 className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">At a Glance</p>
                    <h2 className="text-xl font-extrabold text-blue-900">Centre Information</h2>
                  </div>
                </div>
                <dl className="space-y-3">
                  {infoRows.map((row) => (
                    <div key={row.label} className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-slate-50/70 p-3.5">
                      <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br ${row.gradient} text-white shadow-sm`}>
                        <row.icon className="h-5 w-5" aria-hidden="true" />
                      </div>
                      <div className="min-w-0">
                        <dt className="text-xs font-medium text-slate-500">{row.label}</dt>
                        <dd className="text-sm font-semibold text-slate-900">{row.value}</dd>
                      </div>
                    </div>
                  ))}
                </dl>
              </div>

              <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-blue-900 via-blue-800 to-indigo-900 p-6 text-white shadow-xl sm:p-8">
                <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-orange-400/20 blur-2xl" aria-hidden="true" />
                <div className="relative">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-white/10 text-white ring-1 ring-white/20">
                    <MapPin className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold">Visit Our Centre</h3>
                  <p className="mt-2 text-sm leading-relaxed text-blue-100/80">{teamInfo.location}</p>
                  <div className="mt-5 flex flex-col gap-2.5">
                    <a
                      href={`tel:+91${businessConfig.contact.phone}`}
                      className="inline-flex items-center justify-center gap-2 rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-900 transition hover:bg-blue-50"
                    >
                      <Phone className="h-4 w-4" aria-hidden="true" />
                      {businessConfig.contact.phone}
                    </a>
                    <Link
                      to="/contact"
                      className="inline-flex items-center justify-center gap-2 rounded-xl border border-white/20 bg-white/10 px-5 py-3 text-sm font-semibold text-white transition hover:bg-white/15"
                    >
                      Contact Us
                      <ArrowRight className="h-4 w-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <section className="relative isolate mb-16 overflow-hidden bg-gradient-to-b from-white via-blue-50/60 to-orange-50/40 px-4 py-12 sm:px-6 lg:px-8">
            <div className="pointer-events-none absolute -left-24 -top-24 -z-10 h-80 w-80 rounded-full bg-blue-200/30 blur-3xl" aria-hidden="true" />
            <div className="pointer-events-none absolute -bottom-24 -right-24 -z-10 h-80 w-80 rounded-full bg-orange-200/30 blur-3xl" aria-hidden="true" />

            <SectionHeading
              id="values-section-title"
              title="Our Values"
              subtitle="What Drives Us"
              description="These principles guide every interaction at our centre."
            />
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 lg:gap-8">
              {values.map((value, index) => {
                const theme = COLOR_MAP[value.color];

                return (
                  <article
                    key={value.title}
                    className={`group relative flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 border-t-4 ${theme.border} bg-white p-7 shadow-md motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:-translate-y-2 ${theme.hoverBorder} motion-safe:hover:shadow-2xl`}
                  >
                    <span className={`pointer-events-none absolute right-5 top-4 text-5xl font-extrabold leading-none ${theme.number}`} aria-hidden="true">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div className={`pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full ${theme.soft} opacity-60 blur-3xl`} aria-hidden="true" />
                    <div className={`relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br ${theme.gradient} text-white shadow-lg motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:scale-110 motion-safe:group-hover:rotate-3`}>
                      <value.icon className="h-8 w-8" aria-hidden="true" />
                    </div>
                    <h3 className={`relative z-10 mt-5 text-xl font-bold text-blue-900 ${theme.titleHover}`}>{value.title}</h3>
                    <p className="relative z-10 mt-2 leading-relaxed text-slate-600">{value.description}</p>
                  </article>
                );
              })}
            </div>

            <div className="mt-8 flex flex-col items-center gap-5 rounded-2xl bg-gradient-to-r from-blue-900 to-blue-700 p-6 text-center text-white sm:flex-row sm:justify-between sm:text-left">
              <p className="font-semibold leading-relaxed">
                Hamara vaada: sahi jaankari, saaf daam, aapka data surakshit.
              </p>
              <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
                <a
                  href="https://wa.me/919541611393"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-green-500 px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-green-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
                >
                  Contact on WhatsApp
                </a>
                <a
                  href="tel:9541611393"
                  className="inline-flex w-full items-center justify-center rounded-xl bg-white px-5 py-3 text-sm font-bold text-blue-900 transition-colors hover:bg-blue-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white sm:w-auto"
                >
                  Call Us
                </a>
              </div>
            </div>
          </section>

          <SectionHeading
            title="Important Disclaimers"
            subtitle="Transparency"
            description="We believe in being upfront about what we can and cannot do."
          />
          <div className="relative overflow-hidden rounded-3xl border border-amber-200 bg-gradient-to-br from-amber-50 via-orange-50 to-white p-6 shadow-sm sm:p-8">
            <div className="flex items-start gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-amber-100 text-amber-700">
                <AlertCircle className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-2 text-xl font-extrabold text-amber-900">Please Read</h3>
            </div>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2" role="list">
              {disclaimers.map((disclaimer) => (
                <li
                  key={disclaimer}
                  className="flex items-start gap-2.5 rounded-2xl border border-amber-100 bg-white/70 p-3.5 text-sm leading-relaxed text-amber-900"
                >
                  <Star className="mt-0.5 h-4 w-4 shrink-0 text-amber-500" aria-hidden="true" />
                  <span>{disclaimer}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
    </>
  );
}
