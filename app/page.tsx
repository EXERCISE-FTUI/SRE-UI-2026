import Hero from "@/components/ui/home/Hero";
import NewsList from "@/components/ui/home/NewsList";
import About from "@/components/ui/home/About";
import SummitInfo from "@/components/ui/home/SummitInfo";
import Cta from "@/components/ui/home/Cta";
import WhatWeDo from "@/components/ui/home/WhatWeDo";
import Sponsors from "@/components/ui/home/Sponsors";
import PreviousEvent from "@/components/ui/home/PreviousEvent";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center w-full bg-white overflow-x-hidden">
      <Hero />
      <NewsList />
      <About />
      <WhatWeDo />
      <Sponsors />
    </main>
  );
}