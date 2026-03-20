"use client";

import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
//import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

// Duplicated array to ensure infinite scrolling works perfectly
const SPONSORS = [
  { id: 1, src: "/nex_indonesia.svg", alt: "New Energy Nexus Indonesia" },
  { id: 2, src: "/harita.svg", alt: "Harita Nickel" },
  { id: 3, src: "/tripatra.svg", alt: "Tripatra" },
  { id: 4, src: "/pertamina.svg", alt: "Pertamina New & Renewable Energy" },
  { id: 5, src: "/nex_indonesia.svg", alt: "New Energy Nexus Indonesia" },
  { id: 6, src: "/harita.svg", alt: "Harita Nickel" },
  { id: 7, src: "/tripatra.svg", alt: "Tripatra" },
  { id: 8, src: "/pertamina.svg", alt: "Pertamina New & Renewable Energy" },
];

export default function Sponsors() {
  const [emblaRef] = useEmblaCarousel(
  { loop: true, align: "start" },
  [
    AutoScroll({
      speed: 1, 
      stopOnInteraction: false,
      stopOnMouseEnter: false,
    }),
  ]
);

  return (
    <section className="w-full py-20 flex flex-col items-center gap-12 bg-white overflow-hidden">
      <h2
        className="text-4xl md:text-5xl font-bold italic text-[#1b4f43]"
        style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
      >
        Our Sponsor
      </h2>

      {/* THE FIX: Added overflow-hidden to this specific container */}
      <div className="w-full max-w-6xl mx-auto px-6 cursor-grab active:cursor-grabbing overflow-hidden" ref={emblaRef}>
        <div className="flex items-center touch-pan-y">
          {SPONSORS.map((sponsor) => (
            
            <div 
              key={sponsor.id} 
              className="flex-[0_0_50%] md:flex-[0_0_33.33%] lg:flex-[0_0_25%] min-w-0 pl-6 flex justify-center items-center"
            >
              <div className="relative w-40 md:w-48 h-20 md:h-24 opacity-80 hover:opacity-100 transition-opacity duration-300">
                <Image
                  src={sponsor.src}
                  alt={sponsor.alt}
                  fill
                  className="object-contain"
                />
              </div>
            </div>

          ))}
        </div>
      </div>
    </section>
  );
}