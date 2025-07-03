import Hero from '@/components/hero';
import HowItWorks from '@/components/how-it-works';
import Benefits from '@/components/benefits';
import Faq from '@/components/faq';
import PersonalizedTips from '@/components/personalized-tips';
import CtaSection from '@/components/cta-section';

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <HowItWorks />
      <Benefits />
      <PersonalizedTips />
      <Faq />
      <CtaSection />
    </div>
  );
}
