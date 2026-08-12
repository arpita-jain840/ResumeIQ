import Navbar from '../components/landing/Navbar';
import HeroSection from '../components/landing/HeroSection';
import TrustedTechnologies from '../components/landing/TrustedTechnologies';
import AiFeaturesGrid from '../components/landing/AiFeaturesGrid';
import HowItWorks from '../components/landing/HowItWorks';
import DashboardPreview from '../components/landing/DashboardPreview';

function LandingPage() {
  return (
    <>
      <Navbar />
      <main className="pt-24">
        <HeroSection />
        <TrustedTechnologies />
        <AiFeaturesGrid />
        <HowItWorks />
        <DashboardPreview />
      </main>
    </>
  );
}

export default LandingPage;
