export interface Service {
  id: string;
  category: ServiceCategory;
  name: string;
  description: string;
  icon: string;
  whatWeDo: string[];
  typicalDocuments: string[];
  disclaimer: string;
  priceNote: string;
}

export type ServiceCategory =
  | 'online-forms'
  | 'online-payments'
  | 'photo-passport'
  | 'document-services'
  | 'certificate-assistance'
  | 'general-digital';

export interface ServiceCategoryInfo {
  id: ServiceCategory;
  name: string;
  description: string;
  icon: string;
}

export interface EnquiryFormData {
  name: string;
  mobile: string;
  language: 'hindi' | 'english' | 'hinglish';
  serviceId: string;
  description: string;
  preferredContact: 'phone' | 'whatsapp' | 'email';
  privacyConsent: boolean;
}

export interface Enquiry extends EnquiryFormData {
  id: string;
  referenceId: string;
  status: EnquiryStatus;
  createdAt: string;
  updatedAt: string;
  adminNotes?: string;
  documents?: EnquiryDocument[];
}

export type EnquiryStatus =
  | 'received'
  | 'under-review'
  | 'awaiting-customer-info'
  | 'in-progress'
  | 'completed'
  | 'cancelled';

export interface EnquiryDocument {
  id: string;
  fileName: string;
  originalName: string;
  mimeType: string;
  size: number;
  uploadedAt: string;
  url: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface AdminUser {
  id: string;
  email: string;
  role: 'admin';
  createdAt: string;
}

export interface SEOMetadata {
  title: string;
  description: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}