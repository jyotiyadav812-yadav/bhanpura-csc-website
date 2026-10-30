import { SectionHeading } from '../components/SectionHeading';
import { ContactButtons } from '../components/ContactButtons';
import { businessConfig } from '../config/business';
import { Helmet } from 'react-helmet-async';

const lastUpdated = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

export function Privacy() {
  return (
    <>
      <Helmet>
        <title>Privacy Policy | {businessConfig.name}</title>
        <meta name="description" content="Privacy Policy for Bhanpura CSC Centre - how we collect, use, and protect your information when you use our digital assistance services." />
        <meta property="og:title" content={`Privacy Policy | ${businessConfig.name}`} />
        <meta property="og:description" content="Privacy Policy for Bhanpura CSC Centre." />
        <meta property="og:type" content="website" />
      </Helmet>

      <section className="py-16 lg:py-24 bg-gradient-to-b from-primary-50 via-white to-secondary-50" aria-labelledby="privacy-title">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            id="privacy-title"
            title="Privacy Policy"
            subtitle="Your Data Protection"
            textAlign="left"
            description={`Last updated: ${lastUpdated}`}
          />

          <article className="prose prose-gray max-w-none space-y-8" role="article">
            <section aria-labelledby="intro">
              <h2 id="intro" className="text-xl font-bold text-gray-900 mb-3">1. Introduction</h2>
              <p className="text-gray-600 leading-relaxed">
                {businessConfig.name} ("we", "our", "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, and safeguard your information when you visit our website, use our services, or contact us.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We are a private digital assistance centre located at {businessConfig.location.formatted}, owned by {businessConfig.owner.name}. We are not a government agency.
              </p>
            </section>

            <section aria-labelledby="collection">
              <h2 id="collection" className="text-xl font-bold text-gray-900 mb-3">2. Information We Collect</h2>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Information You Provide</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Name, mobile number, email address when you submit an enquiry or contact form</li>
                <li>Service requirements and details you share for assistance</li>
                <li>Documents you provide for scanning, printing, or form filling (processed on-site, not stored)</li>
              </ul>
              <h3 className="text-lg font-semibold text-gray-900 mb-2 mt-4">Information We Do NOT Collect</h3>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>UPI PINs, OTPs, banking passwords, or card PINs — we NEVER ask for these</li>
                <li>Biometric data or Aadhaar numbers (unless you voluntarily provide for a specific service)</li>
                <li>Payment credentials — you enter these directly on secure payment gateways</li>
              </ul>
            </section>

            <section aria-labelledby="usage">
              <h2 id="usage" className="text-xl font-bold text-gray-900 mb-3">3. How We Use Your Information</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>To respond to your enquiries and provide requested services</li>
                <li>To contact you via phone, WhatsApp, or email regarding your request</li>
                <li>To improve our service offerings and customer experience</li>
                <li>To comply with legal obligations if required</li>
              </ul>
            </section>

            <section aria-labelledby="sharing">
              <h2 id="sharing" className="text-xl font-bold text-gray-900 mb-3">4. Information Sharing</h2>
              <p className="text-gray-600 leading-relaxed mb-3">We do not sell, rent, or trade your personal information. We may share information only in these cases:</p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>With your explicit consent for a specific service</li>
                <li>With government portals when you authorize us to submit forms on your behalf</li>
                <li>When required by law or legal process</li>
              </ul>
            </section>

            <section aria-labelledby="security">
              <h2 id="security" className="text-xl font-bold text-gray-900 mb-3">5. Data Security</h2>
              <p className="text-gray-600 leading-relaxed">
                We implement reasonable security measures to protect your information. Physical documents are returned to you after processing. Digital files from enquiry forms are stored securely and used only for the stated purpose.
              </p>
            </section>

            <section aria-labelledby="retention">
              <h2 id="retention" className="text-xl font-bold text-gray-900 mb-3">6. Data Retention</h2>
              <p className="text-gray-600 leading-relaxed">
                We retain enquiry records for a reasonable period to provide follow-up support. You can request deletion of your data by contacting us at {businessConfig.contact.email}.
              </p>
            </section>

            <section aria-labelledby="rights">
              <h2 id="rights" className="text-xl font-bold text-gray-900 mb-3">7. Your Rights</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Access your personal information we hold</li>
                <li>Request correction of inaccurate data</li>
                <li>Request deletion of your data (subject to legal requirements)</li>
                <li>Opt out of promotional communications</li>
              </ul>
            </section>

            <section aria-labelledby="cookies">
              <h2 id="cookies" className="text-xl font-bold text-gray-900 mb-3">8. Cookies & Analytics</h2>
              <p className="text-gray-600 leading-relaxed">
                Our website may use essential cookies for functionality. We do not use third-party advertising cookies or tracking pixels.
              </p>
            </section>

            <section aria-labelledby="contact-privacy">
              <h2 id="contact-privacy" className="text-xl font-bold text-gray-900 mb-3">9. Contact Us</h2>
              <p className="text-gray-600 leading-relaxed mb-3">For privacy-related questions or requests:</p>
              <address className="not-italic text-gray-600 space-y-1">
                <p><strong>{businessConfig.name}</strong></p>
                <p>{businessConfig.location.formatted}</p>
                <p>Phone: <a href={`tel:+91${businessConfig.contact.phone}`} className="text-primary-600 hover:underline">{businessConfig.contact.phone}</a></p>
                <p>Email: <a href={`mailto:${businessConfig.contact.email}`} className="text-primary-600 hover:underline">{businessConfig.contact.email}</a></p>
              </address>
            </section>

            <section aria-labelledby="changes">
              <h2 id="changes" className="text-xl font-bold text-gray-900 mb-3">10. Changes to This Policy</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update this policy occasionally. Changes will be posted on this page with an updated "Last updated" date. Continued use of our services constitutes acceptance of the updated policy.
              </p>
            </section>
          </article>

          <ContactButtons variant="default" className="mt-12" />
        </div>
      </section>
    </>
  );
}