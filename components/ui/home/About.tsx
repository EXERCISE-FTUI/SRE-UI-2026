import Image from "next/image";

export default function About() {
  return (
    <section className="relative w-full overflow-hidden">
      
      {/* --- BACKGROUND IMAGE --- */}
      <Image 
        src="/aboutbg.svg" 
        alt="About Background" 
        fill 
        priority
        className="object-cover pointer-events-none z-0" 
      />

      {/* --- FADE TRANSITIONS --- */}
      {/* Top fade (White to Transparent) */}
      <div className="absolute inset-x-0 top-0 h-7 md:h-10 bg-gradient-to-b from-white to-transparent z-10 pointer-events-none"></div>
      
      {/* Bottom fade (Transparent to White) */}
      <div className="absolute inset-x-0 bottom-0 h-7 md:h-10 bg-gradient-to-t from-white to-transparent z-10 pointer-events-none"></div>

      {/* --- CONTENT CONTAINER --- */}
      <div className="relative z-20 w-full mx-auto px-6 lg:px-[140px] py-20 flex flex-col gap-16 lg:gap-12 text-[#1b4f43]">
        
        {/* --- CORE VALUES SECTION (Moved to Top) --- */}
        <div className="flex flex-col items-center lg:flex-row gap-6 lg:gap-25 w-full">
          <h2 
            className="max-md:text-4xl text-[50px] font-extrabold italic whitespace-nowrap text-center md:text-left"
            style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Our Core Value
          </h2>
          
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-start gap-2 text-xl font-bold italic text-[#1b4f43] lg:scale-120">
            <div className="bg-[#facc15] text-[25px] px-4 py-2 w-48 md:w-50 text-center" style={{ clipPath: 'polygon(15% 0%, 100% 0%, 85% 50%, 100% 100%, 15% 100%, 0% 50%)' }}>Engage</div>
            <div className="bg-[#facc15] text-[25px] px-4 py-2 w-48 md:w-50 text-center" style={{ clipPath: 'polygon(15% 0%, 100% 0%, 85% 50%, 100% 100%, 15% 100%, 0% 50%)' }}>Educate</div>
            <div className="bg-[#facc15] text-[25px] px-4 py-2 w-48 md:w-50 text-center" style={{ clipPath: 'polygon(15% 0%, 100% 0%, 85% 50%, 100% 100%, 15% 100%, 0% 50%)' }}>Impact</div>
          </div>
        </div>

        {/* --- VISION SECTION --- */}
        <div className="flex flex-col gap-4">
          <h2 
            className="text-4xl lg:text-[50px] font-bold italic"
            style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Our Vision
          </h2>
          <p className="text-lg lg:text-[25px] leading-relaxed text-gray-700">
            SRE UI as a sustainable organization with <span className="font-bold text-[#1b4f43]">focus on renewable energy</span> that <span className="font-bold text-[#1b4f43]">nurtures member growth, enables impactful collaborations</span>, and <span className="font-bold text-[#1b4f43]">advances positive influences for continuous change.</span>
          </p>
        </div>

        {/* --- MISSION SECTION --- */}
        <div className="flex flex-col gap-6">
          <h2 
            className="text-4xl lg:text-[50px] font-bold italic"
            style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            Our Mission
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-10 gap-8 items-stretch">
            
            {/* Left: Image */}
            <div className="relative w-full min-h-[300px] md:min-h-full md:col-span-3 rounded-xl overflow-hidden shadow-md border border-gray-100/50">
              <Image 
                src="/mission.svg" 
                alt="Solar Panels" 
                fill 
                className="object-cover z-0" 
              />
              <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#1b4f43] to-transparent z-10 pointer-events-none"></div>
            </div>

            {/* Right: Mission List Card */}
            <div className="md:col-span-7 bg-white/90 backdrop-blur-sm rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.06)] border border-gray-100 p-8">
              <ol className="flex flex-col lg:px-5 lg:gap-3 gap-4 list-decimal list-outside ml-4 text-gray-700 leading-relaxed">
                <li className="lg:text-[25px] lg:leading-tight pl-2">
                  <strong className="text-[#1b4f43]">Nurturing future leaders in renewable energy</strong> in their personal and professional development journey.
                </li>
                <li className="lg:text-[25px] lg:leading-tight pl-2">
                  <strong className="text-[#1b4f43]">Aligning members purpose</strong> to learn and engage in organizational activities.
                </li>
                <li className="lg:text-[25px] lg:leading-tight pl-2">
                  <strong className="text-[#1b4f43]">Empowering the youth to be aware and involved in renewable energy development movement.</strong>
                </li>
                <li className="lg:text-[25px] lg:leading-tight pl-2">
                  <strong className="text-[#1b4f43]">Promoting supportive and constructive environment</strong> to drive progress among communities and stakeholders.
                </li>
                <li className="lg:text-[25px] lg:leading-tight pl-2">
                  <strong className="text-[#1b4f43]">Elevating positive impact through programs and collaborations</strong> that benefit both our members and the broader society.
                </li>
              </ol>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}