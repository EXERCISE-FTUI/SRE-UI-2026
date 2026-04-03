import Image from 'next/image';
import { Raleway, Open_Sans } from 'next/font/google';

const raleway = Raleway({ subsets: ['latin'] });
const openSans = Open_Sans({ subsets: ['latin'] });

// Registration windows per lomba
const registrationWindows: Record<string, { start: Date; end: Date }> = {
  REMCC: {
    start: new Date('2026-03-31'),
    end: new Date('2026-04-19'),
  },
  IBCC: {
    start: new Date('2026-04-12'),
    end: new Date('2026-05-06'),
  },
  REPPC: {
    start: new Date('2026-04-08'),
    end: new Date('2026-05-05'),
  },
};

const REGISTER_FORM_URL = 'https://forms.gle/1LUW2rNZxSb71TNi9';

function getRegisterState(lomba: string): 'coming_soon' | 'open' | 'closed' {
  const window = registrationWindows[lomba];
  if (!window) return 'closed';
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  if (today < window.start) return 'coming_soon';
  if (today > window.end) return 'closed';
  return 'open';
}

const timelineEvents: Record<
  string,
  { top: { label: string; date: string }[]; bottom: { label: string; date: string }[] }
> = {
  REPPC: {
    top: [
      { label: 'Preliminary Stage', date: '29 Apr - 12 May 2026' },
      { label: 'Semifinalist Announcement', date: '20 May 2026' },
      { label: 'Final Stage', date: '11 - 24 Jun 2026' },
    ],
    bottom: [
      { label: 'Open Registration', date: '8 Apr - 28 Apr 2026' },
      { label: 'Abstract Screening', date: '13 - 19 May 2026' },
      { label: 'Mentoring Session', date: '10 - 12 Jun 2026' },
    ],
  },
  IBCC: {
    top: [
      { label: 'Preliminary Stage', date: '2 - 12 May 2026' },
      { label: 'Semifinalist Announcement', date: '21 May 2026' },
      { label: 'Final Stage', date: '12 - 24 Jun 2026' },
    ],
    bottom: [
      { label: 'Open Registration', date: '12 Apr - 1 May 2026' },
      { label: 'Abstract Screening', date: '13 - 20 May 2026' },
      { label: 'Mentoring Semifinal', date: '29 May 2026' },
    ],
  },
  REMCC: {
    top: [
      { label: 'Case Release', date: '20 April 2026' },
      { label: 'Finalist Announcement', date: '28 April 2026' },
      { label: 'Final Pitching Day', date: '2 May 2026' },
    ],
    bottom: [
      { label: 'Open Registration', date: '31 March - 14 April 2026' },
      { label: '48 Hours Case Cracking', date: '21 - 22 April 2026' },
      { label: 'Abstract Screening', date: '23 - 27 April 2026' },
    ],
  },
};

const contacts: Record<string, { name: string; phone: string }[]> = {
  REPPC: [
    { name: 'Fajar Aditya', phone: '+6287882733365' },
    { name: 'Michael Christian', phone: '+628118682989' },
  ],
  IBCC: [
    { name: 'Annisa Fauziyyah', phone: '+6287845099825' },
    { name: 'Gus Rafa Aleano', phone: '+6281282287711' },
  ],
  REMCC: [
    { name: 'Akbar Sucipto', phone: '+6282258108805' },
    { name: 'Rahel Marsela', phone: '+628875475115' },
  ],
};


const lombaData = {
  IBCC: {
    badge: 'IBCC',
    subtitle: 'International Business Case Competition',
    description:
      'The International Business Case Competition is the core event of the ReEnergize Summit where participants are challenged to solve real-world business problems through professional collaboration. Participants are challenged to develop strategic solutions that help companies navigate technological disruption while achieving sustainable growth and global competitiveness.',
    themeQuote:
      '"Transforming Businesses for Sustainable Growth through Digital Innovation and Resilient Operation"',
    theme:
      'Participants are required to analyze an international business case that reflects contemporary challenges. Teams must develop comprehensive, data-driven, and actionable solutions within a structured competition framework that simulates professional consulting and corporate decision-making environments.',
  },
  REPPC: {
    badge: 'REPPC',
    subtitle: 'Renewable Energy Paper & Poster Competition',
    description:
      'The Renewable Energy Paper & Poster Competition (REPPC) is a competition designed to challenge participants to conduct scientific research and produce well-structured, analytical papers within the field of renewable energy and sustainable energy systems. REPPC emphasizes research depth, methodological clarity, and evidence-based argumentation.',
    themeQuote:
      '"Energizing Evolution: Pioneering Intelligent and Circular Systems for Sustainable Energy Independence"',
    theme:
      'Participants are expected to identify a relevant energy issue, formulate a clear research problem, apply appropriate analytical or experimental methods, and present findings that contribute to practical and scalable solutions. In addition to submitting a full research paper, participants must design a creative and informative scientific poster that visually communicates their core arguments, data, and conclusions in a concise and compelling manner.',
  },
  REMCC: {
    badge: 'REMCC',
    subtitle: 'Renewable Energy Mini Case Competition',
    description:
      'Renewable Energy Mini Case Competition (REMCC) is a simplified and fast-paced case competition designed as a preparatory platform before larger-scale business case events. In this competition, participants are given a focused case study related to renewable energy and industrial transition challenges.',
    themeQuote:
      '"Industrial Energy Transition: Shaping Competitive and Sustainable Industrial Systems"',
    theme:
      'Participants are challenged to design and implement an innovation that integrates economic feasibility, policy alignment, and technological readiness. The expected output is a strategic and actionable solution such as a decarbonization roadmap, low-carbon business model framework, or technology integration strategy supported by clear financial considerations, regulatory analysis, and implementation planning.',
  },
};

export default async function LombaPage({ params }: { params: Promise<{ lomba: string }> }) {
  const { lomba } = await params;

  const currentLomba = lombaData[lomba as keyof typeof lombaData];
  const events = timelineEvents[lomba] ?? timelineEvents['REPPC'];
  const registerState = getRegisterState(lomba);

  if (!currentLomba) return <h1>Lomba Not Found</h1>;

  const registerButton = () => {
    if (registerState === 'open') {
      return (
        <a
          href={REGISTER_FORM_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-center w-48 sm:w-64 md:w-80 h-12 sm:h-16 md:h-20 rounded-full font-semibold text-white text-lg sm:text-xl md:text-3xl transition hover:opacity-90"
          style={{ background: 'linear-gradient(135deg, #7dc142, #34a853)' }}
        >
          Register Now!
        </a>
      );
    }
    if (registerState === 'coming_soon') {
      return (
        <div
          className="flex items-center justify-center w-48 sm:w-64 md:w-80 h-12 sm:h-16 md:h-20 rounded-full font-semibold text-white text-lg sm:text-xl md:text-3xl cursor-not-allowed select-none"
          style={{ background: 'linear-gradient(135deg, #a0a0a0, #6b6b6b)' }}
          title="Registration has not opened yet"
        >
          Coming Soon
        </div>
      );
    }
    // closed
    return (
      <div
        className="flex items-center justify-center w-48 sm:w-64 md:w-80 h-12 sm:h-16 md:h-20 rounded-full font-semibold text-white text-lg sm:text-xl md:text-3xl cursor-not-allowed select-none"
        style={{ background: 'linear-gradient(135deg, #a0a0a0, #6b6b6b)' }}
        title="Registration is closed"
      >
        Closed
      </div>
    );
  };

  return (
    <div className={`relative min-h-screen bg-white overflow-x-hidden overflow-y-hidden ${raleway.className}`}>
      {/* Decoration right side */}
      <div className="absolute right-[-200] top-[575px] w-[220px] sm:w-[260px] md:w-[300px] pointer-events-none">
        <Image
          src="/WigglyThingy.png"
          alt=""
          width={500}
          height={600}
          className="object-contain w-[1200px] h-auto"
        />
      </div>

      {/* Top windmill image */}
      <div
        className="absolute top-0 left-0 w-full h-[580px] bg-cover bg-center bg-no-repeat opacity-[35%]"
        style={{ backgroundImage: "url('/dummyTitle.png')" }}
      />
      <div className="absolute top-0 left-0 w-full h-[580px] bg-gradient-to-b from-transparent via-transparent to-white" />

      {/* Bottom Hill image */}
      <div
        className="absolute bottom-[-100px] left-0 w-full h-[400px] bg-cover bg-center bg-no-repeat opacity-[50%]"
        style={{ backgroundImage: "url('/BackgroundCompetitionsBottom.png')" }}
      />
      <div className="absolute bottom-[-100px] left-0 w-full h-[400px] bg-gradient-to-t from-transparent via-transparent to-white" />

      {/* Page content */}
      <div className="relative z-10 max-w-7xl mx-auto mt-20 md:mt-40 px-6 sm:px-8 md:px-16 pt-10 md:pt-20 pb-[420px]">

        {/* Badge */}
        <div className="inline-block bg-white/10 backdrop-blur-md border border-gray-200 rounded-full px-16 sm:px-20 py-3 sm:py-4 mb-3 shadow-[8px_11px_6px_rgba(0,0,0,0.4)] -rotate-2">
          <span className="bg-gradient-to-r from-[#257069] to-[#8DEFA4] bg-clip-text text-transparent font-extrabold text-3xl sm:text-4xl tracking-wide">
            {currentLomba.badge}
          </span>
        </div>

        {/* Title */}
        <div className="mb-6 sm:mb-8">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
            style={{
              background: 'linear-gradient(90deg, #105D48 0%, #8DEFA4 88%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            {currentLomba.subtitle}
          </h1>
        </div>

        {/* Description */}
        <p className={`${openSans.className} text-gray-700 text-lg sm:text-xl md:text-2xl leading-relaxed text-justify mb-16 sm:mb-24`}>
          {currentLomba.description}
        </p>

        {/* Theme badge */}
        <div className="inline-block bg-gradient-to-r from-[#257069] to-[#8DEFA4] rounded-full px-4 sm:px-6 py-2 sm:py-3 mb-5 sm:mb-6 -rotate-4">
          <span className="text-white font-semibold text2xl sm:text-4xl">Theme</span>
        </div>

        {/* Theme quote */}
        <p className={`${openSans.className} text-[#7dc142] text-2xl sm:text-3xl md:text-4xl font-semibold italic text-center leading-relaxed mb-10 sm:mb-14`}>
          {currentLomba.themeQuote}
        </p>

        {/* Theme description */}
        <p className={`${openSans.className} text-gray-700 text-lg sm:text-xl md:text-2xl leading-relaxed text-justify mb-16 sm:mb-24`}>
          {currentLomba.theme}
        </p>

        {/* Timeline */}
        <div className="mb-16 sm:mb-24">
          <div className="flex items-center gap-4 mb-6 justify-center sm:justify-start">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-[#7dc142] whitespace-nowrap">
              Timeline Overview
            </h2>
            <div className="hidden sm:block flex-1 h-[2px] bg-gradient-to-r from-[#105D48] to-[#7dc142]" />
            <Image
              src="/robot.png"
              alt="Robot mascot"
              width={250}
              height={250}
              className="hidden sm:block object-contain sm:w-[110px] md:w-[130px] h-auto"
            />
          </div>

          <div className="border border-gray-200 rounded-2xl p-4 sm:p-8 bg-white/80 backdrop-blur-sm shadow-sm overflow-x-auto">
            <svg width="100%" viewBox="0 0 680 280" xmlns="http://www.w3.org/2000/svg">

              <line x1="60" y1="135" x2="620" y2="135" stroke="#7dc142" strokeWidth="1.5" strokeDasharray="6 5" />

              {[60, 172, 284, 396, 508, 620].map((x, i) => (
                <path
                  key={i}
                  d={`M${x},${135 - 14} L${x + 4},${135 - 4} L${x + 14},${135} L${x + 4},${135 + 4} L${x},${135 + 14} L${x - 4},${135 + 4} L${x - 14},${135} L${x - 4},${135 - 4} Z`}
                  fill="#105D48"
                />
              ))}

              {/* Top labels */}
              <text x="172" y="65" textAnchor="middle" fill="#7dc142" fontWeight="700" fontSize="13">{events.top[0].label}</text>
              <text x="172" y="83" textAnchor="middle" fill="#6b7280" fontSize="11">{events.top[0].date}</text>

              <text x="396" y="65" textAnchor="middle" fill="#7dc142" fontWeight="700" fontSize="13">{events.top[1].label}</text>
              <text x="396" y="83" textAnchor="middle" fill="#6b7280" fontSize="11">{events.top[1].date}</text>

              <text x="610" y="65" textAnchor="middle" fill="#7dc142" fontWeight="700" fontSize="13">{events.top[2].label}</text>
              <text x="610" y="83" textAnchor="middle" fill="#6b7280" fontSize="11">{events.top[2].date}</text>

              {/* Bottom labels */}
              <text x="64" y="176" textAnchor="middle" fill="#7dc142" fontWeight="700" fontSize="13">{events.bottom[0].label}</text>
              <text x="64" y="194" textAnchor="middle" fill="#6b7280" fontSize="11">{events.bottom[0].date}</text>

              <text x="284" y="176" textAnchor="middle" fill="#7dc142" fontWeight="700" fontSize="13">{events.bottom[1].label}</text>
              <text x="284" y="194" textAnchor="middle" fill="#6b7280" fontSize="11">{events.bottom[1].date}</text>

              <text x="508" y="176" textAnchor="middle" fill="#7dc142" fontWeight="700" fontSize="13">{events.bottom[2].label}</text>
              <text x="508" y="194" textAnchor="middle" fill="#6b7280" fontSize="11">{events.bottom[2].date}</text>

            </svg>
          </div>
        </div>

        {/* Contact */}
        <div className="mb-12 text-center">
          <h3 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-[#105D48] mb-8">
            For further information
          </h3>
          <div className="flex flex-col sm:flex-row justify-center gap-6 sm:gap-12 md:gap-20 mb-10">
            {(contacts[lomba] ?? contacts['REPPC']).map((c, i) => (
              <div key={i} className="px-6 py-4">
                <p className={`${openSans.className} font-bold text-gray-800 text-lg sm:text-xl md:text-2xl`}>{c.name}</p>
                <p className={`${openSans.className} text-gray-600 text-lg sm:text-xl md:text-2xl`}>{c.phone}</p>
              </div>
            ))}
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-6 md:gap-8 mb-16">
            {registerButton()}
            <a
              href="https://drive.google.com/drive/folders/1lDOkvVq2oD2SpvyfkFnahaB5hkOB4vIn"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center w-48 sm:w-64 md:w-80 h-12 sm:h-16 md:h-20 rounded-full font-semibold text-white text-lg sm:text-xl md:text-3xl transition hover:opacity-90"
              style={{ background: 'linear-gradient(135deg, #34a853, #105D48)' }}
            >
              Guidebook
            </a>
          </div>

          {/* Logo */}
          <div className="flex justify-center mb-16 sm:mb-20">
            <Image
              src="/ResLogoCompetition.png"
              alt="SRe Logo"
              width={420}
              height={225}
              className="object-contain w-[240px] sm:w-[320px] md:w-[420px]"
            />
          </div>
        </div>

      </div>
    </div>
  );
}