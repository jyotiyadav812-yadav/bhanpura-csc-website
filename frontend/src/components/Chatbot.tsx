import { useEffect, useRef, useState } from 'react';
import { X, Send } from 'lucide-react';
import { chatbotData } from '../data/chatbotData';

interface ChatAction {
  label: string;
  href: string;
}

interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  actions?: ChatAction[];
}

const CHIPS = ['Services', 'Timing', 'Address', 'Contact', 'Kaise kaam karta hai', 'WhatsApp par baat karein'];

function normalize(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s\u0900-\u097F]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function hasAny(norm: string, keywords: string[]): boolean {
  return keywords.some((k) => norm.includes(k));
}

function getBotResponse(input: string): { text: string; actions?: ChatAction[] } {
  const norm = normalize(input);
  const digits = input.replace(/\D/g, '');

  const centre = chatbotData.centre;

  if (
    digits.length >= 12 ||
    norm.includes('otp') ||
    norm.includes('aadhaar number') ||
    norm.includes('aadhar number')
  ) {
    return {
      text: 'Kripya yahan Aadhaar, OTP ya bank details na share karein. Aisi jaankari ke liye centre se seedha baat karein.',
      actions: [
        { label: 'WhatsApp par puchein', href: centre.whatsappUrl },
        { label: 'Call karein', href: centre.phoneUrl },
      ],
    };
  }

  if (hasAny(norm, ['hi', 'hello', 'hey', 'namaste', 'hola', 'good morning', 'good evening', 'namaskar'])) {
    return {
      text: 'Namaste! Mai Bhanpura CSC Centre ka assistant hu. Aap services, timing, address ya contact ke baare mein puch sakte hain.',
    };
  }

  if (hasAny(norm, ['timing', 'time', 'kab', 'khula', 'open', 'band', 'hours', 'samay', 'samaya'])) {
    return { text: `Hamara centre khula hota hai: ${centre.timing}.` };
  }

  if (hasAny(norm, ['address', 'kahan', 'location', 'kaha', 'pata', 'map', 'jagah', 'where'])) {
    return {
      text: `${centre.name}\n${centre.address}\n\nGoogle Maps: ${centre.mapLink}`,
    };
  }

  if (hasAny(norm, ['whatsapp'])) {
    return {
      text: `WhatsApp: ${centre.whatsapp}\n${centre.whatsappUrl}`,
    };
  }

  if (hasAny(norm, ['phone', 'call', 'number', 'mobile'])) {
    return {
      text: `Phone: ${centre.phone}\nCall: ${centre.phoneUrl}`,
    };
  }

  if (hasAny(norm, ['email', 'mail'])) {
    return {
      text: `Email: ${centre.email}\n${centre.emailUrl}`,
    };
  }

  if (hasAny(norm, ['instagram', 'insta'])) {
    return {
      text: `${centre.instagramHandle}\n${centre.instagram}`,
    };
  }

  if (hasAny(norm, ['owner', 'malik', 'kaun', 'proprietor'])) {
    return { text: `Centre ka owner: ${centre.owner}.` };
  }

  if (
    hasAny(norm, ['govt', 'government', 'official', 'sarkari', 'sarkar', 'gov']) 
  ) {
    return {
      text: `${chatbotData.aboutNote}\n\n${chatbotData.aboutDisclaimers.join('\n')}\n\n${chatbotData.footerDisclaimer}`,
    };
  }

  const sensitiveFee = hasAny(norm, [
    'fee', 'fees', 'rate', 'rates', 'price', 'cost', 'charge', 'charges', 'kitna', 'kitne', 'kitne din', 'days', 'day',
  ]);
  const sensitiveDocs =
    (norm.includes('document') &&
      hasAny(norm, ['list', 'required', 'kaunse', 'konsa', 'chahiye', 'needed', 'documents ki'])) ||
    hasAny(norm, ['kitne din', 'kab tak', 'processing time', 'time lagega']);
  if (sensitiveFee || sensitiveDocs) {
    return {
      text: 'Iski sahi jaankari ke liye kripya centre se seedha sampark karein.',
      actions: [
        { label: 'WhatsApp par puchein', href: centre.whatsappUrl },
        { label: 'Call karein', href: centre.phoneUrl },
      ],
    };
  }

  const servicesList = chatbotData.services;
  const matchedService = servicesList.find((s) => {
    const nameNorm = normalize(s.name);
    if (norm.includes(nameNorm)) return true;
    const words = nameNorm.split(' ').filter((w) => w.length > 3);
    return words.length > 0 && words.every((w) => norm.includes(w));
  });

  if (matchedService) {
    return { text: `${matchedService.name}: ${matchedService.description}` };
  }

  if (
    hasAny(norm, ['service', 'form', 'payment', 'photo', 'passport', 'document', 'certificate', 'print', 'scan', 'pdf', 'services'])
  ) {
    const lines = chatbotData.serviceCategories
      .map((cat) => {
        const items = chatbotData.services
          .filter((s) => s.category === cat.id)
          .map((s) => `- ${s.name}`)
          .join('\n');
        return `${cat.name}:\n${items}`;
      })
      .join('\n\n');
    return { text: `Hamari services:\n\n${lines}\n\nKisi specific service ke baare mein puchhein.` };
  }

  if (hasAny(norm, ['how', 'kaise', 'process', 'steps', 'kadam', 'kaam kaise'])) {
    const steps = chatbotData.howItWorks
      .map((s, i) => `${i + 1}. ${s.title}: ${s.description}`)
      .join('\n');
    return { text: `Kaise kaam karta hai:\n${steps}` };
  }

  return {
    text: 'Iski sahi jaankari ke liye kripya centre se seedha sampark karein.',
    actions: [
      { label: 'WhatsApp par puchein', href: centre.whatsappUrl },
      { label: 'Call karein', href: centre.phoneUrl },
    ],
  };
}

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'init',
      role: 'assistant',
      text: 'Namaste! Mai Bhanpura CSC Centre ka assistant hu. Aap services, timing, address ya contact ke baare mein puch sakte hain.',
    },
  ]);
  const [input, setInput] = useState('');
  const [typing, setTyping] = useState(false);
  const [tooltip, setTooltip] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(0);

  useEffect(() => {
    try {
      if (sessionStorage.getItem('chatbotTooltipDismissed') === '1') return;
    } catch {
      // ignore
    }
    const t = setTimeout(() => setTooltip(true), 3000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && open) setOpen(false);
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [open]);

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, typing]);

  const dismissTooltip = () => {
    setTooltip(false);
    try {
      sessionStorage.setItem('chatbotTooltipDismissed', '1');
    } catch {
      // ignore
    }
  };

  const sendMessage = (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;
    const userMsg: ChatMessage = { id: `u-${++idRef.current}`, role: 'user', text: trimmed };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setTyping(true);
    setTimeout(() => {
      const resp = getBotResponse(trimmed);
      const botMsg: ChatMessage = {
        id: `b-${++idRef.current}`,
        role: 'assistant',
        text: resp.text,
        actions: resp.actions,
      };
      setMessages((prev) => [...prev, botMsg]);
      setTyping(false);
    }, 600);
  };

  const renderText = (text: string) => {
    return text.split('\n').map((line, li) => (
      <span key={li}>
        {li > 0 && <br />}
        {line.split(/(https?:\/\/[^\s]+|tel:[^\s]+|mailto:[^\s]+)/g).map((part, pi) => {
          if (/^(https?:\/\/|tel:|mailto:)/.test(part)) {
            return (
              <a
                key={pi}
                href={part}
                target={part.startsWith('http') ? '_blank' : undefined}
                rel={part.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="text-blue-600 underline break-all"
              >
                {part}
              </a>
            );
          }
          return <span key={pi}>{part}</span>;
        })}
      </span>
    ));
  };

  return (
    <>
      {tooltip && !open && (
        <div className="fixed bottom-20 right-6 z-40 bg-white text-gray-800 text-sm px-3 py-2 rounded-xl shadow-lg border border-gray-200 flex items-center gap-2">
          <span>Madad chahiye? Mujhse puchiye</span>
          <button
            type="button"
            onClick={dismissTooltip}
            className="text-gray-500 hover:text-gray-700"
            aria-label="Close tooltip"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="fixed bottom-6 right-6 z-40 max-sm:bottom-4 max-sm:right-4 bg-transparent border-0 p-0 shadow-none rounded-none outline-none cursor-pointer motion-safe:animate-float motion-reduce:animate-none hover:animate-none hover:scale-110 transition-transform focus-visible:ring-2 focus-visible:ring-blue-500"
          aria-label="Open chat"
        >
          <img
            src="/chatbot-icon.png"
            alt="Chat with assistant"
            className="w-14 h-14 md:w-16 md:h-16 object-contain bg-transparent drop-shadow-[0_0_6px_rgba(255,255,255,0.9)] drop-shadow-[0_4px_8px_rgba(0,0,0,0.35)]"
          />
        </button>
      )}

      {open && (
        <div
          role="dialog"
          aria-label="Chat assistant"
          className="fixed z-40 bg-white shadow-2xl flex flex-col bottom-24 right-6 w-[380px] h-[560px] max-h-[80vh] rounded-2xl max-sm:bottom-0 max-sm:right-0 max-sm:left-0 max-sm:w-full max-sm:h-[85vh] max-sm:rounded-t-2xl max-sm:rounded-b-none"
        >
          <div className="bg-gradient-to-br from-blue-600 to-blue-800 text-white px-4 py-3 rounded-t-2xl max-sm:rounded-t-2xl flex items-center justify-between">
            <div>
              <p className="font-semibold">Bhanpura CSC Assistant</p>
              <p className="text-xs text-blue-100">Aapki madad ke liye taiyar</p>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              className="text-white hover:text-blue-100"
              aria-label="Close chat"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gray-50">
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div
                  className={`max-w-[80%] rounded-2xl px-3 py-2 text-sm ${
                    m.role === 'user' ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-800'
                  }`}
                >
                  {renderText(m.text)}
                  {m.actions && m.actions.length > 0 && (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {m.actions.map((a) => (
                        <a
                          key={a.label}
                          href={a.href}
                          target={a.href.startsWith('http') ? '_blank' : undefined}
                          rel={a.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                          className="inline-block text-xs px-2 py-1 rounded-lg bg-white text-blue-700 border border-blue-200 hover:bg-blue-50"
                        >
                          {a.label}
                        </a>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
            {typing && (
              <div className="flex justify-start">
                <div className="bg-gray-200 text-gray-800 rounded-2xl px-3 py-2 text-sm">typing...</div>
              </div>
            )}
            <div ref={endRef} />
          </div>

          <div className="border-t border-gray-200 p-2">
            <div className="flex flex-wrap gap-2 mb-2">
              {CHIPS.map((chip) => (
                <button
                  key={chip}
                  type="button"
                  onClick={() => sendMessage(chip)}
                  className="text-xs px-2 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-200 hover:bg-blue-100"
                >
                  {chip}
                </button>
              ))}
            </div>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                sendMessage(input);
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type a message..."
                className="flex-1 px-3 py-2 text-sm border border-gray-300 rounded-xl focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="p-2 rounded-xl bg-blue-600 text-white disabled:opacity-50"
                aria-label="Send"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
            <p className="text-[10px] text-gray-400 mt-1 text-center">Kripya yahan Aadhaar, OTP ya bank details na likhein.</p>
          </div>
        </div>
      )}
    </>
  );
}

export default Chatbot;
