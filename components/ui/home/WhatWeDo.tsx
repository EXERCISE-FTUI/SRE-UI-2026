  "use client";

  import React, { useCallback, useEffect, useState } from "react";
  import useEmblaCarousel from "embla-carousel-react";
  import Autoplay from "embla-carousel-autoplay";
  import Image from "next/image";

  const EVENTS = [
    { id: 1, title: "Event 1", src: "/event1.svg" },
    { id: 2, title: "Event 2", src: "/event2.svg" },
    { id: 3, title: "Event 3", src: "/event3.svg" },
    { id: 4, title: "Event 4", src: "/event1.svg" },
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
        
        {/* Background Lines */}
        <div className="absolute left-0 top-[10%] w-[250px] h-[350px] md:w-[450px] md:h-[750px] -translate-x-[10%] pointer-events-none z-0">
          <Image src="/Line7.svg" alt="Green curve" fill className="object-contain object-left" />
        </div>
        <div className="absolute right-0 top-[5%] w-[250px] h-[350px] md:w-[450px] md:h-[600px] translate-x-[10%] pointer-events-none z-0">
          <Image src="/Line8.svg" alt="Yellow curve" fill className="object-contain object-right-top"/>
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

        {/* FIXED: Removed max-w-7xl and mx-auto so the carousel goes completely edge-to-edge on the monitor */}
        <div className="relative z-10 w-full cursor-grab active:cursor-grabbing overflow-hidden" ref={emblaRef}>
          
          <div className="flex items-center touch-pan-y py-16">
            {EVENTS.map((event, index) => {
              const isActive = index === selectedIndex;

              return (
                // Container width dictating how many items fit.
                <div 
                  key={index} 
                  className="flex-[0_0_75%] md:flex-[0_0_55%] lg:flex-[0_0_40%] min-w-0 flex justify-center items-center transition-all duration-500"
                >
                  {/* 1. w-[115%] to w-[125%] overlaps them smoothly.
                    2. scale-105 pushes the active one to the front, scale-[0.85] drops the sides back.
                  */}
                  <div 
                    className={`relative w-[115%] md:w-[125%] aspect-[16/9] bg-[#d1d5db] rounded-3xl overflow-hidden transition-all duration-500 ease-out ${
                      isActive ? "scale-105 opacity-100 z-30 shadow-[0_10px_40px_rgba(0,0,0,0.3)]" : "scale-[0.85] opacity-50 z-10 shadow-lg"
                    }`}
                  >
                    {/* FIXED: Added w-full h-full to force the SVGs to map properly to the container */}
                    <Image 
                      src={event.src} 
                      alt={event.title} 
                      fill 
                      className="object-cover w-full h-full z-0" 
                    />

                    <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#1b4f43] to-transparent z-10 pointer-events-none"></div>
                    
                    <h3 className="absolute bottom-6 left-8 text-white text-2xl md:text-3xl font-bold z-20">
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