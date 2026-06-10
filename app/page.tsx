import Header from "./components/Header";
import AboutSection from "./components/AboutSection";
import Footer from "./components/Footer";
import HeroSection from "./components/HeroSection";
import LineupSection from "./components/LineupSection";
import PassesSection from "./components/PassesSection";
import StayInTouchSection from "./components/StayInTouchSection";

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <HeroSection />
        <LineupSection />
        <PassesSection />
        <AboutSection />
        <StayInTouchSection />
      </main>
      <Footer />
    </>
  );
}
