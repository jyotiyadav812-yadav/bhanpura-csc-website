import { Outlet } from 'react-router-dom';
import { Navbar } from '../components/Navbar';
import { Footer } from '../components/Footer';
import { ScrollToTop } from '../components/ScrollToTop';
import { WhatsAppFloat } from '../components/WhatsAppFloat';
import { Chatbot } from '../components/Chatbot';
import { CanonicalUrl } from '../components/CanonicalUrl';

export function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <CanonicalUrl />
      <Navbar />
      <main className="flex-1 pt-16 lg:pt-20" id="main-content" role="main">
        <Outlet />
      </main>
      <Footer />
      <ScrollToTop />
      <WhatsAppFloat />
      <Chatbot />
    </div>
  );
}