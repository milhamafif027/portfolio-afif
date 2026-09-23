import Navbar from "./components/Navbar";
import HeroSection from "./landing-page/HeroSection";
import ProjectsSection from "./landing-page/ProjectsSection";
import ExperienceSection from "./landing-page/ExperienceSection";
import LeadershipSection from "./landing-page/LeadershipSection";
import Footer from "./components/Footer";

export default function Home() {
  return (
    <main className="min-h-screen bg-black text-white selection:bg-neutral-800 selection:text-white font-sans overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ProjectsSection />
      <ExperienceSection />
      <LeadershipSection />
      <Footer />
    </main>
  );
}
