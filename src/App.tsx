import Hero from './components/Hero';
import ProcessingPanel from './components/ProcessingPanel';
import MethodsSection from './components/MethodsSection';
import UseCasesSection from './components/UseCasesSection';
import HowItWorksSection from './components/HowItWorksSection';
import Footer from './components/Footer';

export default function App() {
  return (
    <div className="min-h-screen font-sans antialiased">
      <Hero />
      <ProcessingPanel />
      <MethodsSection />
      <UseCasesSection />
      <HowItWorksSection />
      <Footer />
    </div>
  );
}
