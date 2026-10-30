const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const FALLBACK_ACCESS_KEY = 'PASTE_ACCESS_KEY_YAHA';

export interface Web3FormsPayload {
  subject: string;
  name: string;
  mobile: string;
  email?: string;
  message: string;
  service?: string;
  botcheck?: string;
}

export function isWeb3FormsConfigured(): boolean {
  const key = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;
  return Boolean(key && key !== FALLBACK_ACCESS_KEY);
}

export async function submitWeb3Forms(payload: Web3FormsPayload): Promise<void> {
  if (!isWeb3FormsConfigured()) throw new Error('Web3Forms access key is not configured');
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY as string;
  const res = await fetch(WEB3FORMS_ENDPOINT, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      access_key: accessKey,
      from_name: 'Bhanpura CSC Website',
      ...payload,
    }),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok || !data?.success) throw new Error('request failed');
}
