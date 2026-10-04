import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyOrderBarSpacer } from "@/components/StickyOrderBar";
import { Hero } from "@/sections/Hero";
import { Differentials } from "@/sections/Differentials";
import { Experiences } from "@/sections/Experiences";
import { FirstExperience } from "@/sections/FirstExperience";
import { Favorites } from "@/sections/Favorites";
import { Oven } from "@/sections/Oven";
import { About } from "@/sections/About";
import { NazarClub } from "@/sections/NazarClub";
import { Testimonials } from "@/sections/Testimonials";
import { FinalCTA } from "@/sections/FinalCTA";

export default function HomePage() {
  return (
    <>
      <Header theme="navy" />
      <main id="conteudo">
        <Hero />
        <Differentials />
        <Experiences />
        <FirstExperience />
        <Favorites />
        <Oven />
        <About />
        <NazarClub />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
      <StickyOrderBarSpacer />
    </>
  );
}