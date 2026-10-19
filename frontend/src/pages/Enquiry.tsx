import { useState } from 'react';
import { AlertCircle, CheckCircle, Loader2, MessageSquare, Phone } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { ContactButtons } from '../components/ContactButtons';
import { services, serviceCategories } from '../data/services';
import { businessConfig } from '../config/business';
import { getWhatsAppUrl } from '../utils/helpers';
import { Helmet } from 'react-helmet-async';
import { cn } from '../utils/helpers';
interface FormData {
  name: string;
  mobile: string;
  service: string;
  message: string;
}

interface FormErrors {
  name?: string;
  mobile?: string;
  service?: string;
  message?: string;
  privacy?: string;
  general?: string;
}

export function Enquiry() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: '',
    service: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success'>('idle');
  const [privacyConsent, setPrivacyConsent] = useState(false);

  const whatsappUrl = getWhatsAppUrl(`Hello ${businessConfig.name}, I submitted an enquiry via the website. Please share the process and required information.`);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    else if (!/^[6-9]\d{9}$/.test(formData.mobile.replace(/\D/g, ''))) newErrors.mobile = 'Enter a valid 10-digit Indian mobile number';
    if (!formData.service) newErrors.service = 'Please select a service';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';
    if (!privacyConsent) newErrors.privacy = 'You must agree to the privacy policy';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitStatus('submitting');
    setTimeout(() => {
      setSubmitStatus('success');
    }, 300);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <>
      <Helmet>
        <title>Submit Enquiry | {businessConfig.name}</title>
        <meta name="description" content="Submit an enquiry at Bhanpura CSC Centre for digital services. Online form with name, mobile, service selection, and message. Client-side validation only." />
        <meta property="og:title" content={`Submit Enquiry | ${businessConfig.name}`} />
        <meta property="og:description" content="Submit an enquiry for digital services at Bhanpura CSC Centre." />
        <meta property="og:type" content="website" />
      </Helmet>

      <section className="py-16 lg:py-24 bg-gradient-to-b from-primary-50 via-white to-secondary-50" aria-labelledby="enquiry-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Submit an Enquiry"
            subtitle="Get Assistance"
            description="Fill out the form below and we'll contact you via WhatsApp or phone. All fields marked with * are required."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {submitStatus === 'success' ? (
                <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center" role="alert">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" aria-hidden="true" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Enquiry Submitted Successfully!</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Thank you for your enquiry. Online submission is coming soon — for now, please contact us directly on WhatsApp or call us for immediate assistance.
                  </p>
                  <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left max-w-md mx-auto">
                    <p className="text-sm text-gray-600 mb-2">Your Details</p>
                    <dl className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Name</dt>
                        <dd className="font-medium text-gray-900">{formData.name}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Mobile</dt>
                        <dd className="font-medium text-gray-900">{formData.mobile}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Service</dt>
                        <dd className="font-medium text-gray-900">{services.find(s => s.id === formData.service)?.name || formData.service}</dd>
                      </div>
                    </dl>
                  </div>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-5 h-5" aria-hidden="true" />
                      Contact on WhatsApp
                    </a>
                    <a
                      href={`tel:+91${businessConfig.contact.phone}`}
                      className="w-full sm:w-auto px-6 py-3 border-2 border-primary-600 text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <Phone className="w-5 h-5" aria-hidden="true" />
                      Call Us
                    </a>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitStatus('idle');
                      setFormData({ name: '', mobile: '', service: '', message: '' });
                      setPrivacyConsent(false);
                    }}
                    className="mt-6 text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    Submit Another Enquiry
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="bg-white border border-gray-100 rounded-2xl p-6 lg:p-8" noValidate>
                  <div className="space-y-6">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={cn(
                          'w-full px-4 py-3 border rounded-lg transition-colors',
                          errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                        )}
                        aria-invalid={errors.name ? 'true' : 'false'}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        disabled={submitStatus === 'submitting'}
                        required
                        autoComplete="name"
                      />
                      {errors.name && <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">{errors.name}</p>}
                    </div>

                    <div>
                      <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                        Mobile Number <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        type="tel"
                        id="mobile"
                        name="mobile"
                        value={formData.mobile}
                        onChange={handleChange}
                        placeholder="9XXXXXXXXX"
                        className={cn(
                          'w-full px-4 py-3 border rounded-lg transition-colors',
                          errors.mobile ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                        )}
                        aria-invalid={errors.mobile ? 'true' : 'false'}
                        aria-describedby={errors.mobile ? 'mobile-error' : undefined}
                        disabled={submitStatus === 'submitting'}
                        required
                        autoComplete="tel"
                      />
                      {errors.mobile && <p id="mobile-error" className="mt-1 text-sm text-red-600" role="alert">{errors.mobile}</p>}
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                        Service Required <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <select
                        id="service"
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className={cn(
                          'w-full px-4 py-3 border rounded-lg transition-colors appearance-none bg-white',
                          errors.service ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                        )}
                        aria-invalid={errors.service ? 'true' : 'false'}
                        aria-describedby={errors.service ? 'service-error' : undefined}
                        disabled={submitStatus === 'submitting'}
                        required
                      >
                        <option value="">Select a service</option>
                        {serviceCategories.map(category => (
                          <optgroup key={category.id} label={category.name}>
                            {services.filter(s => s.category === category.id).map(service => (
                              <option key={service.id} value={service.id}>
                                {service.name}
                              </option>
                            ))}
                          </optgroup>
                        ))}
                      </select>
                      {errors.service && <p id="service-error" className="mt-1 text-sm text-red-600" role="alert">{errors.service}</p>}
                    </div>

                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                        Describe Your Requirement <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        value={formData.message}
                        onChange={handleChange}
                        rows={5}
                        placeholder="Please describe what assistance you need, any specific forms, documents, or requirements..."
                        className={cn(
                          'w-full px-4 py-3 border rounded-lg transition-colors resize-y min-h-[120px]',
                          errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                        )}
                        aria-invalid={errors.message ? 'true' : 'false'}
                        aria-describedby={errors.message ? 'message-error' : 'message-hint'}
                        disabled={submitStatus === 'submitting'}
                        required
                      />
                      <p id="message-hint" className="mt-1 text-sm text-gray-500">Minimum 10 characters. Be as specific as possible.</p>
                      {errors.message && <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">{errors.message}</p>}
                    </div>

                    <div>
                      <label className="flex items-start gap-3 cursor-pointer">
                        <input
                          type="checkbox"
                          checked={privacyConsent}
                          onChange={e => {
                            setPrivacyConsent(e.target.checked);
                            if (errors.privacy) setErrors(prev => ({ ...prev, privacy: '' }));
                          }}
                          className="w-4 h-4 mt-0.5 text-primary-600 border-gray-300 rounded focus:ring-primary-500"
                          disabled={submitStatus === 'submitting'}
                        />
                        <span className="text-sm text-gray-600 leading-relaxed">
                          I agree to the <a href="/privacy" className="text-primary-600 hover:underline">Privacy Policy</a> and consent to my data being used to respond to this enquiry.
                        </span>
                      </label>
                      {errors.privacy && <p className="mt-1 text-sm text-red-600" role="alert">{errors.privacy}</p>}
                    </div>

                    {errors.general && (
                      <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700" role="alert">
                        <AlertCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                        <p>{errors.general}</p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitStatus === 'submitting'}
                       className={cn(
                         'btn btn-primary btn-block sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed',
                         submitStatus === 'submitting' ? 'opacity-70' : ''
                       )}
                    >
                      {submitStatus === 'submitting' ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                          Submitting...
                        </span>
                      ) : (
                        'Submit Enquiry'
                      )}
                    </button>
                    <p className="mt-4 text-sm text-gray-500 text-center">
                      Online submission coming soon. For immediate assistance, please contact us on WhatsApp or call.
                    </p>
                  </div>
                </form>
              )}
            </div>

            <aside className="lg:col-span-1">
              <div className="bg-white border border-gray-100 rounded-2xl p-6 h-fit sticky top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help Faster?</h3>
                <p className="text-gray-600 mb-6">Skip the form and get immediate assistance via WhatsApp or phone.</p>
                <ContactButtons variant="default" />
                <div className="mt-6 pt-6 border-t border-gray-100 space-y-3">
                  <a
                    href={`tel:+91${businessConfig.contact.phone}`}
                    className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    <Phone className="w-5 h-5" aria-hidden="true" />
                    Call: {businessConfig.contact.phone}
                  </a>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-semibold text-white bg-green-600 rounded-lg hover:bg-green-700 transition-colors"
                  >
                    <MessageSquare className="w-5 h-5" aria-hidden="true" />
                    WhatsApp Chat
                  </a>
                </div>
              </div>

              <div className="mt-6 bg-white border border-gray-100 rounded-2xl p-6">
                <h3 className="font-semibold text-gray-900 mb-4">Available Services</h3>
                <ul className="space-y-2 text-sm" role="list">
                  {serviceCategories.map(category => (
                    <li key={category.id}>
                      <p className="font-medium text-gray-900">{category.name}</p>
                      <ul className="pl-4 mt-1 space-y-1">
                        {services.filter(s => s.category === category.id).map(service => (
                          <li key={service.id} className="text-gray-600 hover:text-primary-600 cursor-default">{service.name}</li>
                        ))}
                      </ul>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}