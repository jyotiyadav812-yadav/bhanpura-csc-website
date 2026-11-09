import { SectionHeading } from '../components/SectionHeading';
import { ContactButtons } from '../components/ContactButtons';
import { businessConfig } from '../config/business';
import { PageSEO } from '../components/PageSEO';

const lastUpdated = new Date().toLocaleDateString('en-IN', { day: '2-digit', month: 'long', year: 'numeric' });

export function Terms() {
  const whatsappUrl = `https://wa.me/91${businessConfig.contact.whatsappInternational}?text=${encodeURIComponent(`Hello ${businessConfig.name}, I have a question about your terms and conditions.`)}`;

  return (
    <>
      <PageSEO
        title={`Terms & Conditions | ${businessConfig.name}`}
        description="Review the terms for using the Bhanpura CSC Centre website and its private digital assistance services in Kaithal, Haryana."
        keywords={['Bhanpura CSC Centre terms', 'digital assistance terms and conditions', 'website terms Kaithal']}
      />

      <section className="py-16 lg:py-24 bg-gradient-to-b from-primary-50 via-white to-secondary-50" aria-labelledby="terms-title">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            as="h1"
            id="terms-title"
            title="Terms & Conditions"
            subtitle="Service Agreement"
            textAlign="left"
            description={`Last updated: ${lastUpdated}`}
          />

          <article className="prose prose-gray max-w-none space-y-8" role="article">
            <section aria-labelledby="acceptance">
              <h2 id="acceptance" className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                By accessing our website, visiting our centre at {businessConfig.location.formatted}, or using our services, you agree to these Terms & Conditions. If you do not agree, please do not use our services.
              </p>
            </section>

            <section aria-labelledby="services-desc">
              <h2 id="services-desc" className="text-xl font-bold text-gray-900 mb-3">2. Nature of Services</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                {businessConfig.name} is a <strong>private digital assistance centre</strong>. We provide assistance with:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Online form filling and application submission guidance</li>
                <li>Online payment process guidance (we NEVER ask for PINs, OTPs, or passwords)</li>
                <li>Passport-size photo capture and digital photo formatting</li>
                <li>Document printing, scanning, PDF creation, conversion, and formatting</li>
                <li>Certificate application guidance and document checklists</li>
                <li>General digital assistance and portal navigation help</li>
              </ul>
              <p className="text-gray-600 leading-relaxed mt-3">
                We are <strong>not a government office</strong>. We do not issue certificates, approvals, or official documents. Final decisions rest solely with respective government authorities.
              </p>
            </section>

            <section aria-labelledby="no-guarantee">
              <h2 id="no-guarantee" className="text-xl font-bold text-gray-900 mb-3">3. No Guarantee of Outcomes</h2>
              <p className="text-gray-600 leading-relaxed">
                We assist with form filling, document preparation, and process guidance only. We <strong>do not guarantee</strong> approval, issuance, or success of any application. Government authorities have sole discretion over approvals, timelines, and requirements.
              </p>
            </section>

            <section aria-labelledby="customer-responsibility">
              <h2 id="customer-responsibility" className="text-xl font-bold text-gray-900 mb-3">4. Customer Responsibilities</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Provide accurate, complete, and truthful information</li>
                <li>Bring required original documents for verification</li>
                <li>Enter your own payment credentials (UPI PIN, OTP, passwords) — we never ask for these</li>
                <li>Verify all information before submission</li>
                <li>Retain original documents for official purposes</li>
                <li>Comply with all applicable laws and portal terms of use</li>
              </ul>
            </section>

            <section aria-labelledby="fees">
              <h2 id="fees" className="text-xl font-bold text-gray-900 mb-3">5. Fees & Charges</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Service charges apply for specific tasks (form filling, printing, scanning, photos, etc.). We do not publish fixed prices as charges vary by service complexity, document count, and time required.
              </p>
              <p className="text-gray-600 leading-relaxed">
                <strong>"Contact us for applicable charges"</strong> — please enquire for a quote before availing any service. Government fees (if any) are payable directly to the respective authority.
              </p>
            </section>

            <section aria-labelledby="data-handling">
              <h2 id="data-handling" className="text-xl font-bold text-gray-900 mb-3">6. Data Handling</h2>
              <p className="text-gray-600 leading-relaxed mb-3">
                Personal information you provide (name, mobile, email, service details) is used solely to deliver the requested service and communicate with you. See our <a href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</a> for details.
              </p>
              <p className="text-gray-600 leading-relaxed">
                We <strong>NEVER</strong> ask for, store, or share UPI PINs, OTPs, banking passwords, card PINs, or any sensitive credentials. You enter payment details directly on secure payment gateways.
              </p>
            </section>

            <section aria-labelledby="limitation">
              <h2 id="limitation" className="text-xl font-bold text-gray-900 mb-3">7. Limitation of Liability</h2>
              <p className="text-gray-600 leading-relaxed">
                To the maximum extent permitted by law, {businessConfig.name} and its owner {businessConfig.owner.name} shall not be liable for:
              </p>
              <ul className="list-disc pl-6 space-y-2 text-gray-600">
                <li>Application rejections, delays, or outcomes by government authorities</li>
                <li>Errors in government portals or third-party systems</li>
                <li>Loss of documents you provide (we recommend keeping originals)</li>
                <li>Technical issues beyond our control</li>
                <li>Any indirect, incidental, or consequential damages</li>
              </ul>
            </section>

            <section aria-labelledby="intellectual-property">
              <h2 id="intellectual-property" className="text-xl font-bold text-gray-900 mb-3">8. Intellectual Property</h2>
              <p className="text-gray-600 leading-relaxed">
                All content on this website (text, images, logos, code) is owned by or licensed to {businessConfig.name}. You may not reproduce, distribute, or modify our content without permission.
              </p>
            </section>

            <section aria-labelledby="external-links">
              <h2 id="external-links" className="text-xl font-bold text-gray-900 mb-3">9. External Links</h2>
              <p className="text-gray-600 leading-relaxed">
                Our website and communications may contain links to government portals and third-party websites. We are not responsible for their content, privacy practices, or availability.
              </p>
            </section>

            <section aria-labelledby="governing-law">
              <h2 id="governing-law" className="text-xl font-bold text-gray-900 mb-3">10. Governing Law</h2>
              <p className="text-gray-600 leading-relaxed">
                These terms are governed by the laws of India. Disputes shall be subject to the jurisdiction of courts in Kaithal, Haryana.
              </p>
            </section>

            <section aria-labelledby="changes-terms">
              <h2 id="changes-terms" className="text-xl font-bold text-gray-900 mb-3">11. Changes to Terms</h2>
              <p className="text-gray-600 leading-relaxed">
                We may update these terms occasionally. Continued use of our services after changes constitutes acceptance. Check this page periodically for updates.
              </p>
            </section>

            <section aria-labelledby="contact-terms">
              <h2 id="contact-terms" className="text-xl font-bold text-gray-900 mb-3">12. Contact Information</h2>
              <address className="not-italic text-gray-600 space-y-1">
                <p><strong>{businessConfig.name}</strong></p>
                <p>{businessConfig.location.formatted}</p>
                <p>Phone: <a href={`tel:+91${businessConfig.contact.phone}`} className="text-primary-600 hover:underline">{businessConfig.contact.phone}</a></p>
                <p>WhatsApp: <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="text-primary-600 hover:underline">{businessConfig.contact.whatsapp}</a></p>
                <p>Email: <a href={`mailto:${businessConfig.contact.email}`} className="text-primary-600 hover:underline">{businessConfig.contact.email}</a></p>
              </address>
            </section>
          </article>

          <ContactButtons variant="default" className="mt-12" />
        </div>
      </section>
    </>
  );
}