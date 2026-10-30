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
import { Helmet } from 'react-helmet-async';

const values = [
  {
    title: 'Honest Guidance',
    description: 'We provide accurate information based on current rules. We don\'t make false promises or guarantee approvals.',
    icon: Shield,
  },
  {
    title: 'Customer First',
    description: 'Your needs come first. We take time to understand your situation and explain options clearly in your preferred language.',
    icon: Users,
  },
  {
    title: 'Transparent Pricing',
    description: 'No hidden fees. We say "Contact us for applicable charges" upfront so you know what to expect.',
    icon: Clock,
  },
  {
    title: 'Data Safety',
    description: 'We NEVER ask for UPI PINs, OTPs, passwords, or banking credentials. Your sensitive data stays with you.',
    icon: Shield,
  },
  {
    title: 'Local Commitment',
    description: 'We\'re part of the Bhanpura community. Our goal is to make digital services accessible to our neighbours.',
    icon: Building2,
  },
  {
    title: 'Continuous Learning',
    description: 'Government portals and rules change. We stay updated so you get current, relevant guidance.',
    icon: Award,
  },
];

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

const valueThemes = [
  'bg-blue-50 text-blue-700',
  'bg-emerald-50 text-emerald-700',
  'bg-orange-50 text-orange-700',
  'bg-rose-50 text-rose-700',
  'bg-violet-50 text-violet-700',
  'bg-cyan-50 text-cyan-700',
];

export function About() {
  return (
    <>
      <Helmet>
        <title>About Our Centre | {businessConfig.name}</title>
        <meta name="description" content="Learn about Bhanpura CSC Centre - a private digital assistance centre in Village Bhanpura, Kaithal, Haryana. Owner: Harinder Singh. Services, values, and contact details." />
        <meta property="og:title" content={`About Our Centre | ${businessConfig.name}`} />
        <meta property="og:description" content="Learn about Bhanpura CSC Centre - a private digital assistance centre in Village Bhanpura, Kaithal." />
        <meta property="og:type" content="website" />
      </Helmet>

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
            description="Bhanpura CSC Centre is a private digital assistance centre serving Village Bhanpura and surrounding areas in Kaithal district, Haryana."
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

          <SectionHeading
            title="Our Values"
            subtitle="What Drives Us"
            description="These principles guide every interaction at our centre."
          />
          <div className="mb-16 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <article
                key={value.title}
                className="group relative h-full overflow-hidden rounded-3xl border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-200 hover:shadow-xl"
              >
                <span className="pointer-events-none absolute right-5 top-4 text-5xl font-black leading-none text-slate-100 transition-colors group-hover:text-blue-100" aria-hidden="true">
                  {String(index + 1).padStart(2, '0')}
                </span>
                <div className={`relative flex h-12 w-12 items-center justify-center rounded-2xl ${valueThemes[index % valueThemes.length]} shadow-sm`}>
                  <value.icon className="h-6 w-6" aria-hidden="true" />
                </div>
                <h3 className="relative mt-5 text-lg font-bold text-blue-900">{value.title}</h3>
                <p className="relative mt-2 leading-relaxed text-slate-600">{value.description}</p>
              </article>
            ))}
          </div>

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
