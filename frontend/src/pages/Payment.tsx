import { useState, useEffect } from 'react';
import { Loader2, CheckCircle, AlertCircle, Phone, MessageSquare, CreditCard } from 'lucide-react';
import { SectionHeading } from '../components/SectionHeading';
import { ContactButtons } from '../components/ContactButtons';
import { businessConfig } from '../config/business';
import { PageSEO } from '../components/PageSEO';
import { SchemaMarkup } from '../components/SchemaMarkup';
import { cn, getWhatsAppUrl } from '../utils/helpers';
import { createPaymentOrder, verifyPayment } from '../utils/api';

interface FormData {
  name: string;
  mobile: string;
  email: string;
  amount: number;
  service: string;
  description: string;
}

interface FormErrors {
  name?: string;
  mobile?: string;
  email?: string;
  amount?: string;
  service?: string;
  general?: string;
}

export function Payment() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    mobile: '',
    email: '',
    amount: 0,
    service: '',
    description: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'creating_order' | 'verifying' | 'success' | 'failed'>('idle');
  const [razorpayOrder, setRazorpayOrder] = useState<{
    id: string;
    amount: number;
    currency: string;
    key_id: string;
  } | null>(null);

  const whatsappUrl = getWhatsAppUrl(`Hello ${businessConfig.name}, I made a payment on the website. Please confirm my payment and share the next steps.`);

  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.onload = () => {
      window.Razorpay = (window as any).Razorpay;
    };
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
      delete (window as any).Razorpay;
    };
  }, []);

  const validateForm = () => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.mobile.trim()) newErrors.mobile = 'Mobile number is required';
    else if (!/^[6-9]\d{9}$/.test(formData.mobile.replace(/\D/g, ''))) newErrors.mobile = 'Enter a valid 10-digit Indian mobile number';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Enter a valid email address';
    if (!formData.amount || formData.amount <= 0) newErrors.amount = 'Enter a valid amount';
    if (!formData.service.trim()) newErrors.service = 'Please select a service';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleCreateOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setSubmitStatus('creating_order');
    setErrors(prev => ({ ...prev, general: '' }));

    try {
      const response = await createPaymentOrder({
        amount: formData.amount,
        currency: 'INR',
        name: formData.name.trim(),
        mobile: formData.mobile.replace(/\D/g, ''),
        email: formData.email.trim() || undefined,
        service: formData.service.trim(),
        description: formData.description.trim() || undefined,
      });
      setRazorpayOrder(response.order);
    } catch (error) {
      setSubmitStatus('idle');
      setErrors(prev => ({
        ...prev,
        general: error instanceof Error ? error.message : 'Order nahi ban sya. Kripya thodi der baad try karein.',
      }));
    }
  };

  const openRazorpayCheckout = () => {
    if (!razorpayOrder || !(window as any).Razorpay) return;

    setSubmitStatus('verifying');

    const options = {
      key: razorpayOrder.key_id,
      amount: razorpayOrder.amount,
      currency: razorpayOrder.currency,
      name: businessConfig.name,
      description: formData.description || `Payment for ${formData.service}`,
      image: 'https://bhanpura-csc.vercel.app/og-image.jpg',
      order_id: razorpayOrder.id,
      handler: async (response: any) => {
        try {
          const verifyResponse = await verifyPayment({
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
          });

          if (verifyResponse.success) {
            setSubmitStatus('success');
          } else {
            setSubmitStatus('failed');
          }
        } catch (error) {
          setSubmitStatus('failed');
        }
      },
      prefill: {
        name: formData.name.trim(),
        contact: formData.mobile.replace(/\D/g, ''),
        email: formData.email.trim() || undefined,
      },
      theme: {
        color: '#3b82f6',
      },
      modal: {
        escape: true,
        ondismiss: () => {
          setSubmitStatus('idle');
        },
      },
    };

    const rzp = new (window as any).Razorpay(options);
    rzp.open();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  return (
    <>
      <PageSEO
        title={`Online Payment | ${businessConfig.name}`}
        description="Make a secure online payment for CSC services at Bhanpura CSC Centre. Pay via UPI, card, net banking, or wallet using Razorpay."
        keywords={['CSC online payment Bhanpura', 'Razorpay payment Kaithal', 'Bhanpura CSC payment gateway', 'online service payment']}
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
          url: 'https://bhanpura-csc.vercel.app/payment',
          priceRange: '₹',
        }}
      />

      <section className="py-16 lg:py-24 bg-gradient-to-b from-primary-50 via-white to-secondary-50" aria-labelledby="payment-title">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeading
            as="h1"
            id="payment-title"
            title="Make a Payment"
            subtitle="Secure Online Payment"
            description="Pay for CSC services securely using UPI, credit/debit card, net banking, or wallet. Powered by Razorpay."
          />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              {submitStatus === 'success' ? (
                <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center" role="alert">
                  <CheckCircle className="w-16 h-16 text-green-600 mx-auto mb-4" aria-hidden="true" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Successful!</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Thank you for your payment. We have received it and will process your service request soon.
                  </p>
                  <div className="bg-gray-50 rounded-xl p-6 mb-6 text-left max-w-md mx-auto">
                    <p className="text-sm text-gray-600 mb-2">Payment Details</p>
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
                        <dt className="text-gray-500">Amount</dt>
                        <dd className="font-medium text-gray-900">₹{formData.amount}</dd>
                      </div>
                      <div className="flex justify-between">
                        <dt className="text-gray-500">Service</dt>
                        <dd className="font-medium text-gray-900">{formData.service}</dd>
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
                      setRazorpayOrder(null);
                      setFormData({ name: '', mobile: '', email: '', amount: 0, service: '', description: '' });
                      setErrors({});
                    }}
                    className="mt-6 text-primary-600 hover:text-primary-700 font-medium text-sm"
                  >
                    Make Another Payment
                  </button>
                </div>
              ) : submitStatus === 'failed' ? (
                <div className="bg-white border border-gray-100 rounded-2xl p-8 text-center" role="alert">
                  <AlertCircle className="w-16 h-16 text-red-600 mx-auto mb-4" aria-hidden="true" />
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">Payment Failed</h3>
                  <p className="text-gray-600 mb-6 max-w-md mx-auto">
                    Your payment could not be completed. Please try again or contact us for assistance.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                    <button
                      type="button"
                      onClick={() => {
                        setSubmitStatus('idle');
                        setRazorpayOrder(null);
                      }}
                      className="w-full sm:w-auto px-6 py-3 bg-primary-600 text-white font-medium rounded-lg hover:bg-primary-700 transition-colors flex items-center justify-center gap-2"
                    >
                      <CreditCard className="w-5 h-5" aria-hidden="true" />
                      Try Again
                    </button>
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-full sm:w-auto px-6 py-3 border-2 border-primary-600 text-primary-600 font-medium rounded-lg hover:bg-primary-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <MessageSquare className="w-5 h-5" aria-hidden="true" />
                      Contact on WhatsApp
                    </a>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleCreateOrder} className="bg-white border border-gray-100 rounded-2xl p-6 lg:p-8" noValidate>
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
                        disabled={submitStatus === 'creating_order' || submitStatus === 'verifying'}
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
                        disabled={submitStatus === 'creating_order' || submitStatus === 'verifying'}
                        required
                        autoComplete="tel"
                      />
                      {errors.mobile && <p id="mobile-error" className="mt-1 text-sm text-red-600" role="alert">{errors.mobile}</p>}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address <span className="text-red-500" aria-hidden="true">*</span>
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
                        disabled={submitStatus === 'creating_order' || submitStatus === 'verifying'}
                        required
                        autoComplete="email"
                      />
                      {errors.email && <p id="email-error" className="mt-1 text-sm text-red-600" role="alert">{errors.email}</p>}
                    </div>

                    <div>
                      <label htmlFor="amount" className="block text-sm font-medium text-gray-700 mb-1">
                        Amount (₹) <span className="text-red-500" aria-hidden="true">*</span>
                      </label>
                      <div className="flex items-center">
                        <span className="ml-3 text-gray-500">₹</span>
                        <input
                          type="number"
                          id="amount"
                          name="amount"
                          value={formData.amount}
                          onChange={handleChange}
                          placeholder="0"
                          min="1"
                          step="1"
                          className={cn(
                            'w-full pl-8 pr-4 py-3 border rounded-lg transition-colors',
                            errors.amount ? 'border-red-500 focus:border-red-500 focus:ring-red-500' : 'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                          )}
                          disabled={submitStatus === 'creating_order' || submitStatus === 'verifying'}
                          required
                        />
                      </div>
                      {errors.amount && <p id="amount-error" className="mt-1 text-sm text-red-600" role="alert">{errors.amount}</p>}
                      <p className="mt-1 text-sm text-gray-500">Enter the amount in rupees.</p>
                    </div>

                    <div>
                      <label htmlFor="service" className="block text-sm font-medium text-gray-700 mb-1">
                        Service <span className="text-red-500" aria-hidden="true">*</span>
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
                        disabled={submitStatus === 'creating_order' || submitStatus === 'verifying'}
                        required
                      >
                        <option value="">Select a service</option>
                        <option value="Online Form Filling Assistance">Online Form Filling Assistance</option>
                        <option value="Application Submission Guidance">Application Submission Guidance</option>
                        <option value="Job & Education Form Assistance">Job & Education Form Assistance</option>
                        <option value="Online Payment Guidance">Online Payment Guidance</option>
                        <option value="Passport-Size Photo Services">Passport-Size Photo Services</option>
                        <option value="Digital Photo Preparation & Formatting">Digital Photo Preparation & Formatting</option>
                        <option value="Passport Application Guidance">Passport Application Guidance</option>
                        <option value="Printing Services">Printing Services</option>
                        <option value="Scanning Services">Scanning Services</option>
                        <option value="PDF Creation & Conversion">PDF Creation & Conversion</option>
                        <option value="Document Formatting">Document Formatting</option>
                        <option value="File Size Reduction">File Size Reduction</option>
                        <option value="Birth Certificate Process Guidance">Birth Certificate Process Guidance</option>
                        <option value="Other Certificate Application Guidance">Other Certificate Application Guidance</option>
                        <option value="General Digital Assistance">General Digital Assistance</option>
                        <option value="Enquiry-Based Service Requests">Enquiry-Based Service Requests</option>
                      </select>
                      {errors.service && <p id="service-error" className="mt-1 text-sm text-red-600" role="alert">{errors.service}</p>}
                    </div>

                    <div>
                      <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-1">
                        Description / Purpose
                      </label>
                      <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        rows={3}
                        placeholder="e.g., Payment for Aadhaar card form filling, passport photo, etc."
                        className={cn(
                          'w-full px-4 py-3 border rounded-lg transition-colors resize-y min-h-[100px]',
                          'border-gray-300 focus:border-primary-500 focus:ring-primary-500'
                        )}
                        disabled={submitStatus === 'creating_order' || submitStatus === 'verifying'}
                      />
                    </div>

                    {errors.general && (
                      <div className="flex flex-col gap-3 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700" role="alert">
                        <div className="flex items-center gap-2">
                          <AlertCircle className="w-5 h-5 flex-shrink-0" aria-hidden="true" />
                          <p>{errors.general}</p>
                        </div>
                        <div className="flex gap-3">
                          <a href={whatsappUrl} target="_blank" rel="noopener noreferrer" className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-semibold">WhatsApp</a>
                          <a href={`tel:+91${businessConfig.contact.phone}`} className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg text-sm font-semibold">Call</a>
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={submitStatus === 'creating_order' || submitStatus === 'verifying'}
                      className={cn(
                        'btn btn-primary btn-block sm:w-auto disabled:opacity-50 disabled:cursor-not-allowed w-full',
                        submitStatus === 'creating_order' || submitStatus === 'verifying' ? 'opacity-70' : ''
                      )}
                    >
                      {submitStatus === 'creating_order' ? (
                        <span className="flex items-center justify-center gap-2">
                          <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                          Creating Order...
                        </span>
                      ) : (
                        <span className="flex items-center justify-center gap-2">
                          <CreditCard className="w-5 h-5" aria-hidden="true" />
                          Pay ₹{formData.amount} Now
                        </span>
                      )}
                    </button>
                    <p className="mt-4 text-sm text-gray-500 text-center">
                      Secure payment powered by Razorpay. We accept UPI, credit/debit cards, net banking, and wallets.
                    </p>
                  </div>
                </form>
              )}
            </div>

            <aside className="lg:col-span-1">
              <div className="bg-white border border-gray-100 rounded-2xl p-6 h-fit lg:sticky lg:top-24">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Need Help?</h3>
                <p className="text-gray-600 mb-6">Stuck during payment? Contact us directly via WhatsApp or phone.</p>
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
                <h3 className="font-semibold text-gray-900 mb-4">Payment Methods</h3>
                <ul className="space-y-2 text-sm" role="list">
                  <li className="flex items-center gap-3 text-gray-600">
                    <span className="w-6 h-6 rounded-full bg-green-100 flex items-center justify-center text-green-600 font-bold">UPI</span>
                    PhonePe, Google Pay, Paytm, BHIM
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <span className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-bold">Card</span>
                    Visa, Mastercard, RuPay
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <span className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-600 font-bold">Net Banking</span>
                    All major Indian banks
                  </li>
                  <li className="flex items-center gap-3 text-gray-600">
                    <span className="w-6 h-6 rounded-full bg-orange-100 flex items-center justify-center text-orange-600 font-bold">Wallet</span>
                    Paytm Wallet, etc.
                  </li>
                </ul>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </>
  );
}
