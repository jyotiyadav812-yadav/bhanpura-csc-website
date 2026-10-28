import { businessConfig } from '../config/business';
import { serviceCategories, services } from '../data/services';

const MAP_LINK = 'https://maps.app.goo.gl/JgaFfhiGEEunbvQ7A';

export const chatbotData = {
  centre: {
    name: businessConfig.name,
    type: businessConfig.type,
    owner: businessConfig.owner.name,
    address: businessConfig.location.formatted,
    timing: businessConfig.workingHours.details,
    timingDisplay: businessConfig.workingHours.display,
    phone: businessConfig.contact.phone,
    whatsapp: businessConfig.contact.whatsapp,
    whatsappUrl: 'https://wa.me/919541611393',
    email: businessConfig.contact.email,
    emailUrl: `mailto:${businessConfig.contact.email}`,
    phoneUrl: `tel:+91${businessConfig.contact.phone}`,
    instagram: businessConfig.social.instagram,
    instagramHandle: businessConfig.social.instagramHandle,
    mapLink: MAP_LINK,
  },
  aboutIntro:
    'Bhanpura CSC Centre is a private digital assistance centre serving Village Bhanpura and surrounding areas in Kaithal district, Haryana.',
  aboutText:
    'Established to bridge the digital divide in our community, Bhanpura CSC Centre helps residents navigate online government services, applications, payments, and documentation — all without travelling to distant cities.',
  aboutOwnerText:
    'Our centre is owned and operated by Harinder Singh. We understand the challenges of accessing digital services in rural areas — language barriers, complex portals, document requirements, and technical difficulties. That\'s why we offer patient, step-by-step assistance in Hindi, English, or Hinglish.',
  aboutNote:
    'We are a private digital assistance centre, not an official government office. We don\'t issue certificates or approvals — we help you understand the process, prepare your documents, and complete applications correctly.',
  aboutDisclaimers: [
    'We are a private digital assistance centre, not an official government office.',
    'We do not issue government documents, certificates, or approvals.',
    'We assist with form filling, document preparation, and process guidance only.',
    'Final decisions, approvals, fees, and timelines rest solely with respective government authorities.',
    'We are not affiliated with any government department or ministry.',
    'We do not use any government logos or claim official status.',
  ],
  footerDisclaimer: 'Not an official government website. We are a private digital assistance centre.',
  howItWorks: [
    {
      title: 'Visit or Contact Us',
      description: 'Walk into our centre at Village Bhanpura, Kaithal, or reach out via phone or WhatsApp. No appointment needed for most services.',
    },
    {
      title: 'Explain Your Requirement',
      description: 'Tell us what you need — filling a form, making a payment, getting a photo, scanning documents, certificate guidance, or any other digital assistance.',
    },
    {
      title: 'We Assist You Step by Step',
      description: 'Our team helps you complete the task — filling online forms, guiding through payment gateways, capturing photos, scanning/printing documents, or preparing certificate applications.',
    },
    {
      title: 'Receive Confirmation & Follow-up',
      description: 'You get acknowledgment receipts, printed documents, digital files, or application reference numbers. We\'re available for status checks and further assistance.',
    },
  ],
  serviceCategories,
  services,
};

export default chatbotData;
