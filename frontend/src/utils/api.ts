import { API_BASE_URL } from '../config/api';

interface ApiErrorResponse {
  error?: string;
  errors?: Array<{ field: string; message: string }>;
}

async function post<T>(path: string, payload: unknown): Promise<T> {
  let response: Response;

  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload),
    });
  } catch {
    throw new Error('Backend se sampark nahi ho paya. Kripya thodi der baad try karein.');
  }

  const data = await response.json().catch(() => ({} as ApiErrorResponse));
  if (!response.ok) {
    const validationMessage = data.errors?.map(error => error.message).join(' ');
    throw new Error(validationMessage || data.error || 'Request submit nahi ho payi.');
  }

  return data as T;
}

export function submitContact(payload: {
  name: string;
  mobile: string;
  email?: string;
  subject: string;
  message: string;
  _hp?: string;
}): Promise<{ ok: boolean; id: number; emailSent?: boolean }> {
  return post('/api/contact', payload);
}

export function submitEnquiry(payload: {
  name: string;
  mobile: string;
  email?: string;
  service: string;
  message: string;
  privacyConsent: boolean;
  _hp?: string;
}): Promise<{ success: boolean }> {
  return post('/api/enquiries', payload);
}
