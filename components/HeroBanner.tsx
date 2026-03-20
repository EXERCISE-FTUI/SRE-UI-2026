import React from 'react';
import Link from 'next/link';

interface HeroBannerProps {
  title?: string;
  coverUrl?: string;
  href?: string;
}

const HeroBanner: React.FC<HeroBannerProps> = ({ title, coverUrl, href }) => {
  if (!title || !coverUrl || !href) {
    return null;
  }

  return (
    <div
      className="relative w-full h-[280px] md:h-[400px] lg:h-[500px] 2xl:h-[600px] rounded-[20px] overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `url(${coverUrl})` }}
    >

      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#1A4731] via-[#1A4731]/80 to-transparent" />

      {/* Content Overlay */}
      <div className="relative z-10 h-full flex flex-col justify-end p-4 md:p-6 lg:p-[5%]">
        <div className="relative flex h-[62%] flex-col lg:flex-row lg:items-end lg:justify-between gap-4 lg:gap-4">
          {/* Left: Title and Subtitle */}
          <div className="w-full h-full flex flex-col overflow-y-auto no-scrollbar">
            <h1
              className="
                mt-auto
                font-['Open_Sans'] font-bold 
                text-[clamp(30px, 4vw, 40px)]
                lg:text-[clamp(30px,4vw,45px)]
                text-[#F5F5F5] 
                max-w-[80%]
                line-clamp-3
                lg:line-clamp-4
              "
            >
              {title}
            </h1>
          </div>

          {/* Right: Read Now Button */}
          <Link href={href}>
            <button className="bg-[#FBD100] text-[#1F6444] font-['Open_Sans'] font-bold text-sm md:text-lg lg:text-xl 2xl:text-[45px] px-4 md:px-6 lg:px-8 2xl:px-12 py-2 md:py-3 lg:py-4 rounded-full hover:opacity-90 transition-opacity whitespace-nowrap w-fit lg:scale-90">
              Read Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default HeroBanner;
