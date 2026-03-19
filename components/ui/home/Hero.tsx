import Image from "next/image";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[80vh] flex items-center justify-center bg-[#1b4f43] overflow-hidden">
      <Image 
        src="/herobg.svg" 
        alt="Wind turbines background" 
        fill 
        priority
        className="object-cover opacity-30 mix-blend-soft-light pointer-events-none z-0" 
      />

      <div className="absolute inset-x-0 top-0 h-[60%] bg-gradient-to-b from-[#105D48] to-transparent z-10 pointer-events-none"></div>

      <div className="absolute inset-x-0 bottom-0 h-[60%] bg-gradient-to-t from-[#FEF200]/30 to-transparent z-10 pointer-events-none"></div>

      <div className="absolute left-0 bottom-0 translate-y-[5%] flex justify-start z-20 pointer-events-none">
        <img 
          src="/srehero1.png" 
          alt="SRE Watermark" 
          className="w-[90%] opacity-50 select-none" 
        />
      </div>

      <div className="relative z-40 w-full max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-6 md:gap-8">
        <h1 className="text-white text-3xl md:text-5xl lg:text-6xl font-bold leading-snug">
          Society of Renewable Energy <br />
          Universitas Indonesia <br />
          2025/26
        </h1>
        
        <p className="text-white/90 text-lg md:text-xl lg:text-2xl max-w-5xl leading-relaxed">
          <span className="font-bold">SRE UI</span> is a student-driven organization that champions renewable energy through engagement, education, and impact. As a hub for ideas, collaboration, and innovation, SRE UI connects academic insight with real-world action to shape a more sustainable energy future.
        </p>
      </div>
    </section>
  );
}