import { useState } from 'react';
import { MapPin, Phone, CheckCircle, AlertCircle, Navigation, MapPin as MapPinIcon } from 'lucide-react';
import { FaWhatsapp, FaInstagram } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';
import { SectionHeading } from '../components/SectionHeading';
import { businessConfig } from '../config/business';
import { getWhatsAppUrl, getDefaultWhatsAppMessage } from '../utils/helpers';
import { Helmet } from 'react-helmet-async';
import { cn } from '../utils/helpers';

const MAP_EMBED_URL = "https://www.google.com/maps?q=29.7802515,76.3262961(Bhanpura+CSC+Centre)&z=17&output=embed";
const MAP_LINK = "https://maps.app.goo.gl/JgaFfhiGEEunbvQ7A";
const DIRECTIONS_LINK = "https://www.google.com/maps/dir/?api=1&destination=29.7802515,76.3262961";
interface FormData {
  name: string;
  mobile: string;
  email: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  mobile?: string;
  email?: string;
  subject?: string;
  message?: string;
  general?: string;
}

export function Contact() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: '',
    email: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'submitting' | 'success'>('idle');

  const whatsappUrl = getWhatsAppUrl(getDefaultWhatsAppMessage());
  const phoneUrl = `tel:+91${businessConfig.contact.phone}`;
  const emailUrl = `mailto:${businessConfig.contact.email}`;

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    else if (!/^[6-9]\d{9}$/.test(formData.mobile.replace(/\D/g, ''))) newErrors.mobile = 'Enter a valid 10-digit Indian mobile number';
    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email address';
    if (!formData.subject.trim()) newErrors.subject = 'Subject is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 10) newErrors.message = 'Message must be at least 10 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitStatus('submitting');
    setTimeout(() => {
      setSubmitStatus('success');
      setFormData({ name: '', mobile: '', email: '', subject: '', message: '' });
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
        <title>Contact & Location | {businessConfig.name}</title>
        <meta name="description" content="Contact Bhanpura CSC Centre - Village Bhanpura, Kaithal, Haryana. Phone: 9541611393, WhatsApp: 9541611393, Email: digitalbhanpura@gmail.com. Visit us or send a message." />
        <meta property="og:title" content={`Contact & Location | ${businessConfig.name}`} />
        <meta property="og:description" content="Contact Bhanpura CSC Centre - Village Bhanpura, Kaithal, Haryana." />
        <meta property="og:type" content="website" />
      </Helmet>

      <section className="py-16 lg:py-24 bg-gradient-to-b from-primary-50 via-white to-secondary-50" aria-labelledby="contact-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            title="Contact & Location"
            subtitle="Get in Touch"
            description="Visit our centre, call us, WhatsApp us, or send a message below. We're here to help with your digital service needs."
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-20 items-stretch">
            <article className="hl-card theme-blue" aria-label="Visit Our Centre">
              <div className="hl-icon">
                <MapPin className="w-7 h-7" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Visit Our Centre</h3>
              <address className="not-italic text-gray-700 leading-relaxed">
                <p className="font-medium text-gray-900">{businessConfig.name}</p>
                <a href={MAP_LINK} target="_blank" rel="noopener noreferrer" className="hover:underline text-blue-700">
                  {businessConfig.location.formatted}
                </a>
              </address>
              <p className="text-sm text-gray-600">Walk-ins welcome during working hours. Contact us first to confirm availability.</p>
            </article>

            <article className="hl-card theme-green" aria-label="Call Us">
              <div className="hl-icon">
                <Phone className="w-7 h-7" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Call Us</h3>
              <a href={phoneUrl} className="text-xl font-bold text-green-700 hover:underline">{businessConfig.contact.phone}</a>
              <p className="text-sm text-gray-600">Tap to call directly from your phone</p>
            </article>

            <article className="hl-card theme-green" aria-label="WhatsApp">
              <div className="hl-icon">
                <FaWhatsapp className="w-7 h-7" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">WhatsApp</h3>
              <a href="https://wa.me/919541611393" target="_blank" rel="noopener noreferrer" className="text-xl font-bold text-green-700 hover:underline">{businessConfig.contact.whatsapp}</a>
              <p className="text-sm text-gray-600">Message anytime</p>
              <div className="mt-auto pt-4">
                <a
                  href="https://wa.me/919541611393"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-whatsapp btn-sm w-full"
                  aria-label="Chat on WhatsApp"
                >
                  <FaWhatsapp className="w-5 h-5" aria-hidden="true" />
                  <span>Chat on WhatsApp</span>
                </a>
              </div>
            </article>

            <article className="hl-card theme-rose" aria-label="Email">
              <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-red-50 border border-red-100 mb-4">
                <SiGmail className="w-7 h-7 text-[#EA4335]" aria-hidden="true" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Email</h3>
              <a href={emailUrl} className="text-base font-bold text-red-600 hover:underline break-all">{businessConfig.contact.email}</a>
              <p className="text-sm text-gray-600">Send us an email</p>
              <div className="mt-auto pt-4">
                <a
                  href={emailUrl}
                  className="btn btn-sm w-full text-white bg-[#EA4335] hover:bg-red-600"
                  aria-label="Send Email"
                >
                  <SiGmail className="w-5 h-5" aria-hidden="true" />
                  <span>Send Email</span>
                </a>
              </div>
            </article>

<article className="hl-card theme-purple sm:col-span-2 lg:col-span-4" aria-label="Follow us on Instagram">
              <div className="flex flex-col sm:flex-row sm:items-center gap-5">
                <div className="w-14 h-14 rounded-2xl flex items-center justify-center flex-shrink-0 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400 shadow-lg">
                  <FaInstagram className="w-7 h-7 text-white" aria-hidden="true" />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-900">Follow us on Instagram</h3>
                  <p className="font-semibold text-purple-700 break-words">{businessConfig.social.instagramHandle}</p>
                  <p className="text-sm text-gray-600">Naye updates, services aur offers ke liye hamein Instagram par follow karein.</p>
                </div>
                <a
                  href={businessConfig.social.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-6 py-3 text-sm sm:text-base font-semibold text-white bg-gradient-to-r from-purple-600 via-pink-500 to-orange-400 rounded-full shadow-lg hover:opacity-90 hover:shadow-xl transition-all duration-300 whitespace-nowrap flex-shrink-0 self-start sm:self-auto"
                  aria-label="Follow on Instagram"
                >
                  <FaInstagram className="w-5 h-5" aria-hidden="true" />
                  <span>Follow on Instagram</span>
                </a>
              </div>
            </article>
          </div>

          <section className="mb-12" aria-labelledby="map-heading">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="lg:grid lg:grid-cols-3 lg:gap-8">
                <div className="lg:col-span-1">
                  <h3 id="map-heading" className="text-2xl font-bold text-gray-900 mb-2">Find Us on Map</h3>
                  <p className="text-gray-600 mb-6">Bhanpura CSC Centre, Near Shiv Mandir, Yadav Chopal, Village Bhanpura, Kaithal</p>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <MapPin className="w-5 h-5 text-primary-600 flex-shrink-0" aria-hidden="true" />
                      <span>Bhanpura CSC Centre</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <MapPin className="w-5 h-5 text-primary-600 flex-shrink-0" aria-hidden="true" />
                      <span>Near Shiv Mandir, Yadav Chopal, Village Bhanpura, Kaithal, Haryana 136027</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm text-gray-600">
                      <MapPin className="w-5 h-5 text-primary-600 flex-shrink-0" aria-hidden="true" />
                      <span>9:00 AM to 1:00 PM and 4:00 PM to 8:00 PM</span>
                    </div>
                  </div>
                  <div className="mt-6 flex flex-col sm:flex-row gap-3">
                    <a
                      href={DIRECTIONS_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-primary btn-block sm:w-auto"
                    >
                      <Navigation className="w-5 h-5" aria-hidden="true" />
                      <span>Get Directions</span>
                    </a>
                    <a
                      href={MAP_LINK}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn btn-outline btn-block sm:w-auto border-primary-600 text-primary-600 hover:bg-primary-50"
                    >
                      <MapPinIcon className="w-5 h-5" aria-hidden="true" />
                      <span>Open in Google Maps</span>
                    </a>
                  </div>
                </div>
                <div className="lg:col-span-2 mt-6 lg:mt-0">
                  <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-md">
                    <iframe
                      title="Bhanpura CSC Centre Location"
                      src={MAP_EMBED_URL}
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      allowFullScreen
                      className="w-full h-80 md:h-[420px] border-0"
                    />
                  </div>
                </div>
              </div>
            </div>
          </section>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Send Us a Message</h2>
              <p className="text-gray-600 mb-6">Fill out the form below and we'll get back to you. For faster response, use WhatsApp or call.</p>

              {errors.general && (
                    <div className="mb-4 flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700" role="alert">
                      <AlertCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                      <p>{errors.general}</p>
                    </div>
                  )}

                  {submitStatus === 'success' ? (
                <div className="bg-green-50 border border-green-200 rounded-xl p-6 text-center" role="alert">
                  <CheckCircle className="w-12 h-12 text-green-600 mx-auto mb-3" aria-hidden="true" />
                  <h3 className="text-xl font-semibold text-green-800 mb-2">Message Sent!</h3>
                  <p className="text-green-700 mb-4">Thank you for contacting us. We'll respond soon. For urgent queries, please call or WhatsApp us.</p>
                  <button
                    type="button"
                    onClick={() => setSubmitStatus('idle')}
                    className="px-6 py-2 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Name <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        className={cn(
                          'w-full px-4 py-3 border rounded-lg transition-colors',
                          errors.name ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                        )}
                        aria-invalid={errors.name ? 'true' : 'false'}
                        aria-describedby={errors.name ? 'name-error' : undefined}
                        disabled={submitStatus === 'submitting'}
                        required
                      />
                      {errors.name && <p id="name-error" className="mt-1 text-sm text-red-600" role="alert">{errors.name}</p>}
                    </div>
                    <div>
                      <label htmlFor="mobile" className="block text-sm font-medium text-gray-700 mb-1">
                        Mobile <span className="text-red-500" aria-hidden="true">*</span>
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
                      />
                      {errors.mobile && <p id="mobile-error" className="mt-1 text-sm text-red-600" role="alert">{errors.mobile}</p>}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email (Optional)
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="you@example.com"
                      className={cn(
                        'w-full px-4 py-3 border rounded-lg transition-colors',
                        errors.email ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                      )}
                      aria-invalid={errors.email ? 'true' : 'false'}
                      aria-describedby={errors.email ? 'email-error' : undefined}
                      disabled={submitStatus === 'submitting'}
                    />
                    {errors.email && <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">{errors.email}</p>}
                  </div>

                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <select
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className={cn(
                        'w-full px-4 py-3 border rounded-lg transition-colors appearance-none bg-white',
                        errors.subject ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                      )}
                      aria-invalid={errors.subject ? 'true' : 'false'}
                      aria-describedby={errors.subject ? 'subject-error' : undefined}
                      disabled={submitStatus === 'submitting'}
                      required
                    >
                      <option value="">Select a subject</option>
                      <option value="general-enquiry">General Enquiry</option>
                      <option value="service-request">Service Request</option>
                      <option value="form-assistance">Form Filling Assistance</option>
                      <option value="payment-help">Payment Guidance</option>
                      <option value="photo-services">Photo Services</option>
                      <option value="document-services">Document Services</option>
                      <option value="certificate-guidance">Certificate Guidance</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.subject && <p id="subject-error" className="mt-1 text-sm text-red-600" role="alert">{errors.subject}</p>}
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Message <span className="text-red-500" aria-hidden="true">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      rows={5}
                      placeholder="Describe your requirement or query..."
                      className={cn(
                        'w-full px-4 py-3 border rounded-lg transition-colors resize-y min-h-[120px]',
                        errors.message ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                      )}
                      aria-invalid={errors.message ? 'true' : 'false'}
                      aria-describedby={errors.message ? 'message-error' : 'message-hint'}
                      disabled={submitStatus === 'submitting'}
                      required
                    />
                    <p id="message-hint" className="mt-1 text-sm text-gray-500">Minimum 10 characters.</p>
                    {errors.message && <p id="message-error" className="mt-1 text-sm text-red-600" role="alert">{errors.message}</p>}
                  </div>

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
                        <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24" aria-hidden="true">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        Sending...
                      </span>
                    ) : (
                      'Send Message'
                    )}
                  </button>
                  <p className="text-sm text-gray-500 text-center sm:text-left">This form is for enquiries only. No backend submission — we'll contact you via WhatsApp or phone.</p>
                </form>
              )}
            </div>

            <div className="bg-white border border-gray-100 rounded-2xl p-8 h-fit sticky top-24">
              <h3 className="text-xl font-bold text-gray-900 mb-6">Quick Contact</h3>
              <div className="space-y-4">
                <a
                  href={phoneUrl}
                  className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  aria-label="Call us"
                >
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <Phone className="w-5 h-5 text-green-600" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Call Now</p>
                    <p className="font-medium text-gray-900">{businessConfig.contact.phone}</p>
                  </div>
                </a>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  aria-label="WhatsApp chat"
                >
                  <div className="w-10 h-10 rounded-full bg-green-100 flex items-center justify-center">
                    <FaWhatsapp className="w-5 h-5 text-[#25D366]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">WhatsApp Chat</p>
                    <p className="font-medium text-gray-900">Quick Reply</p>
                  </div>
                </a>
                <a
                  href={emailUrl}
                  className="flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors"
                  aria-label="Email us"
                >
                  <div className="w-10 h-10 rounded-full bg-primary-100 flex items-center justify-center">
                    <SiGmail className="w-5 h-5 text-[#EA4335]" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Email Us</p>
                    <p className="font-medium text-gray-900 truncate">{businessConfig.contact.email}</p>
                  </div>
                </a>
              </div>
              <div className="mt-6 pt-6 border-t border-gray-100">
                <h4 className="font-semibold text-gray-900 mb-3">Centre Address</h4>
                <address className="not-italic text-gray-600 text-sm space-y-1">
                  <p className="font-medium">{businessConfig.name}</p>
                  <p>{businessConfig.location.formatted}</p>
                </address>
                <div className="mt-4">
                  <div className="rounded-xl overflow-hidden aspect-video min-h-[200px]">
                    <iframe
                      title="Bhanpura CSC Centre Location"
                      src={MAP_EMBED_URL}
                      className="w-full h-full border-0"
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}