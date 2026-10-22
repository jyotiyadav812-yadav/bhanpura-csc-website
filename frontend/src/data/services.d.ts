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

export const serviceCategories: ServiceCategoryInfo[];
export const services: Service[];

export function getServicesByCategory(category: ServiceCategory): Service[];
export function getServiceById(id: string): Service | undefined;
export function getPopularServices(): Service[];