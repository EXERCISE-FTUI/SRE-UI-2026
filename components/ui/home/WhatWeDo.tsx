"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

// Added the src property to map your SVG files to the cards
const EVENTS = [
  { id: 1, title: "Event 1", src: "/event1.svg" },
  { id: 2, title: "Event 2", src: "/event2.svg" },
  { id: 3, title: "Event 3", src: "/event3.svg" },
  { id: 4, title: "Event 4", src: "/event1.svg" }, // Re-using images to keep the loop smooth
  { id: 5, title: "Event 1", src: "/event2.svg" },
  { id: 6, title: "Event 2", src: "/event3.svg" },
  { id: 7, title: "Event 3", src: "/event1.svg" },
  { id: 8, title: "Event 4", src: "/event2.svg" },
];

export default function WhatWeDo() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setSelectedIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    onSelect();
    emblaApi.on("select", onSelect);
    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <section className="relative w-full py-20 flex flex-col items-center gap-12 bg-white overflow-hidden">
      
      <div className="absolute left-0 top-[10%] w-[300px] h-[400px] md:w-[500px] md:h-[600px] -translate-x-[20%] pointer-events-none z-0">
        <Image src="/Line 7.svg" alt="Green curve" fill className="object-contain object-left" />
      </div>
      <div className="absolute right-0 top-[-5%] w-[300px] h-[400px] md:w-[500px] md:h-[600px] translate-x-[20%] pointer-events-none z-0">
        <Image src="/Line 8.svg" alt="Yellow curve" fill className="object-contain object-right-top" />
      </div>

      <div 
        className="relative z-10 flex flex-col items-center text-4xl md:text-5xl font-bold"
        style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
      >
        <div className="bg-gradient-to-r from-[#105D48] to-[#FEF200] text-white px-6 py-1">
          What
        </div>
        <div className="text-[#1b4f43] mt-2">
          We do
        </div>
      </div>

      <div className="relative z-10 w-full max-w-6xl mx-auto cursor-grab active:cursor-grabbing overflow-hidden" ref={emblaRef}>
        
        <div className="flex items-center touch-pan-y py-16">
          {EVENTS.map((event, index) => {
            const isActive = index === selectedIndex;

            return (
              // 33.333% ensures exactly 3 containers fit side-by-side
              <div 
                key={index} 
                className="flex-[0_0_55%] md:flex-[0_0_45%] lg:flex-[0_0_33.333%] min-w-0 flex justify-center items-center transition-all duration-500"
              >
                {/* w-[160%] forces the card to be wider than its 33% container, creating the deep overlap.
                  h-72 locks the height so it remains a wide landscape rectangle.
                */}
                <div 
                  className={`relative w-[150%] md:w-[160%] h-56 md:h-72 bg-[#d1d5db] rounded-3xl overflow-hidden shadow-2xl transition-all duration-500 ease-in-out ${
                    isActive ? "scale-100 opacity-100 z-30" : "scale-[0.85] opacity-60 z-10"
                  }`}
                >
                  {/* The Background Image */}
                  <Image 
                    src={event.src} 
                    alt={event.title} 
                    fill 
                    className="object-cover z-0" 
                  />

                  {/* The Green Gradient Overlay */}
                  <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#1b4f43] to-transparent z-10 pointer-events-none"></div>
                  
                  {/* The Title */}
                  <h3 className="absolute bottom-6 left-6 text-white text-2xl md:text-3xl font-bold z-20">
                    {event.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
    </section>
  );
}