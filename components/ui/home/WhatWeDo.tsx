"use client";

import React, { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

const EVENTS = [
  { id: 1, title: "SRE GREEN 2026 Main Event", src: "/main_event.jpg" },
  { id: 2, title: "Internal Training", src: "/internal_training.jpg" },
  { id: 3, title: "Roadshow SRE GREEN 2026", src: "/roadshow.jpg" },
  { id: 4, title: "Bi-Weekly Meeting", src: "/meeting.jpg" },
  { id: 5, title: "SRE UI NETWORKING", src: "/networking.jpg" },
  { id: 6, title: "SRE UI NETWORKING", src: "/networking2.jpg" },
];

export default function WhatWeDo() {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true, align: "center" },
    [Autoplay({ delay: 3000, stopOnInteraction: false })]
  );

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

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

  useEffect(() => {
    const checkScreen = () => {
      setIsMobile(window.innerWidth < 1200);
    };

    checkScreen();
    window.addEventListener("resize", checkScreen);

    return () => window.removeEventListener("resize", checkScreen);
  }, []);

  return (
    <section className="relative isolate w-full py-20 flex flex-col items-center gap-12 bg-white overflow-hidden">
      <div className="absolute max-md:hidden left-[-100px] top-[10%] w-[250px] h-[350px] md:w-[450px] md:h-[750px] -translate-x-[10%] pointer-events-none z-0">
        <Image src="/Line7.svg" alt="Green curve" fill className="object-contain object-left" />
      </div>
      <div className="absolute max-md:hidden right-0 top-[5%] w-[250px] h-[350px] md:w-[450px] md:h-[600px] translate-x-[0%] pointer-events-none z-0">
        <Image src="/Line8.svg" alt="Yellow curve" fill className="object-contain object-right-top" />
      </div>

      <div
        className="relative z-10 flex flex-col items-center text-4xl md:text-5xl font-bold"
        style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
      >
        <div className="bg-gradient-to-r from-[#105D48] to-[#FEF200] text-white px-6 py-1">
          Our Impact
        </div>
        <div className="text-[#1b4f43] mt-2">
          in Action
        </div>
      </div>

      <div
        ref={emblaRef}
        className="relative z-10 w-full cursor-grab active:cursor-grabbing overflow-hidden pointer-events-none"
        style={{
          clipPath: isMobile ? "none" : "inset(0 130px 0 130px)"
        }}
      >

        <div className="flex items-center touch-pan-y py-16">
          {EVENTS.map((event, index) => {
            const isActive =
              index === selectedIndex &&
              emblaApi?.canScrollNext();
            const isLeft = index === (selectedIndex - 1 + EVENTS.length) % EVENTS.length;
            const isRight = index === (selectedIndex + 1) % EVENTS.length;

            return (
              <div
                key={index}
                className={`
                  relative flex-[0_0_55%] md:flex-[0_0_45%] lg:flex-[0_0_33.333%] min-w-0 flex justify-center items-center
                  ${isActive ? "z-30" : "z-10"}
                `}
              >
                <div
                  className={`
                    relative w-[150%] md:w-[160%] h-56 md:h-72 rounded-3xl overflow-hidden shadow-2xl
                    transition-all duration-500 ease-in-out 
                    ${isActive ? "scale-100 opacity-100 z-30 translate-x-0" : ""}
                    ${isLeft ? "scale-[0.85] opacity-100 brightness-75 z-10 translate-x-16 md:translate-x-24" : ""}
                    ${isRight ? "scale-[0.85] opacity-100 brightness-75 z-10 -translate-x-16 md:-translate-x-24" : ""}
                  `}
                >
                  <Image
                    src={event.src}
                    alt={event.title}
                    fill
                    className="object-cover z-10"
                  />

                  <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#1b4f43] to-transparent z-10 pointer-events-none"></div>

                  <h3 className="absolute bottom-6 left-6 text-white text-2xl md:text-3xl font-bold z-20">
                    {event.title}
                  </h3>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section >
  );
}