import { MapPin, Shield, Users, Award, Clock, Star, Building2, AlertCircle } from 'lucide-react';
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
      <Helmet>
        <title>About Our Centre | {businessConfig.name}</title>
        <meta name="description" content="Learn about Bhanpura CSC Centre - a private digital assistance centre in Village Bhanpura, Kaithal, Haryana. Owner: Harinder Singh. Services, values, and contact details." />
        <meta property="og:title" content={`About Our Centre | ${businessConfig.name}`} />
        <meta property="og:description" content="Learn about Bhanpura CSC Centre - a private digital assistance centre in Village Bhanpura, Kaithal." />
        <meta property="og:type" content="website" />
      </Helmet>

      <section className="about-hero py-16 lg:py-24" aria-labelledby="about-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="about-badge">WHO WE ARE</span>
            <h1 id="about-title" className="about-title">About Our Centre</h1>
            <div className="about-title-line" />
            <p className="text-slate-600 text-lg mt-4 max-w-2xl mx-auto">Bhanpura CSC Centre is a private digital assistance centre serving Village Bhanpura and surrounding areas in Kaithal district, Haryana.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center mb-16">
            <div className="about-text-block">
              <h2 className="text-3xl mb-4">Your Local Digital Partner</h2>
              <p className="text-gray-600 text-lg mb-4">
                Established to bridge the digital divide in our community, {businessConfig.name} helps residents navigate online government services, applications, payments, and documentation — all without travelling to distant cities.
              </p>
              <p className="text-gray-600 mb-4">
                Our centre is owned and operated by <strong>{teamInfo.owner}</strong>. We understand the challenges of accessing digital services in rural areas — language barriers, complex portals, document requirements, and technical difficulties. That's why we offer patient, step-by-step assistance in Hindi, English, or Hinglish.
              </p>
              <div className="about-note">
                We are a <strong>private digital assistance centre</strong>, not an official government office. We don't issue certificates or approvals — we help you understand the process, prepare your documents, and complete applications correctly.
              </div>
            </div>
            <div className="info-card">
              <h3 className="text-xl">Centre Information</h3>
              <dl className="space-y-2">
                <div className="info-row">
                  <div className="info-icon blue">
                    <Building2 className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Centre Name</dt>
                    <dd className="text-gray-900">{teamInfo.centreName}</dd>
                  </div>
                </div>
                <div className="info-row">
                  <div className="info-icon orange">
                    <Users className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Owner</dt>
                    <dd className="text-gray-900">{teamInfo.owner}</dd>
                  </div>
                </div>
                <div className="info-row">
                  <div className="info-icon green">
                    <MapPin className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Location</dt>
                    <dd className="text-gray-900">{teamInfo.location}</dd>
                  </div>
                </div>
                <div className="info-row">
                  <div className="info-icon purple">
                    <Award className="w-5 h-5" aria-hidden="true" />
                  </div>
                  <div>
                    <dt className="text-sm font-medium text-gray-500">Type</dt>
                    <dd className="text-gray-900">{teamInfo.type}</dd>
                  </div>
                </div>
              </dl>
            </div>
          </div>

          <SectionHeading
            title="Our Values"
            subtitle="What Drives Us"
            description="These principles guide every interaction at our centre."
          />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
            {values.map((value, index) => (
              <article key={index} className="color-card about-card">
                <div className="card-icon">
                  <value.icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </article>
            ))}
          </div>

          <SectionHeading
            title="Important Disclaimers"
            subtitle="Transparency"
            description="We believe in being upfront about what we can and cannot do."
          />
          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-8 mb-0" role="alert">
            <AlertCircle className="w-6 h-6 text-amber-600 mb-4" aria-hidden="true" />
            <h3 className="text-xl font-semibold text-amber-800 mb-4">Please Read</h3>
            <ul className="space-y-2 text-amber-700" role="list">
              {disclaimers.map((disclaimer, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Star className="w-5 h-5 flex-shrink-0 mt-0.5" aria-hidden="true" />
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