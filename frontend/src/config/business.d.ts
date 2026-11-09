export interface BusinessLocation {
  village: string;
  district: string;
  state: string;
  pincode: string;
  country: string;
  formatted: string;
}

export interface BusinessOwner {
  name: string;
}

export interface BusinessContact {
  phone: string;
  whatsapp: string;
  email: string;
  whatsappInternational: string;
}

export interface BusinessWorkingHours {
  configured: boolean;
  details: string;
  display: string;
  morning: string;
  evening: string;
}

export interface BusinessSocial {
  instagram: string;
  instagramHandle: string;
}

export interface BusinessConfig {
  name: string;
  type: string;
  address: string;
  location: BusinessLocation;
  owner: BusinessOwner;
  contact: BusinessContact;
  workingHours: BusinessWorkingHours;
  mapDirectionsUrl: string;
  social: BusinessSocial;
}

export const businessConfig: BusinessConfig;