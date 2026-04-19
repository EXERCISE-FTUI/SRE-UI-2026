'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

const competitions = [
  { label: 'REMCC', href: '/res/REMCC' },
  { label: 'IBCC', href: '/res/IBCC' },
  { label: 'REPPC', href: '/res/REPPC' },
];

const events = [
  { label: 'Field Trip', href: '/events/field-trip' },
  { label: 'Workshop', href: '/events/workshop' },
  { label: 'Pentahelix Talks', href: '/events/pentahelix-talks' },
];

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isRes = pathname.startsWith('/res');
  const [open, setOpen] = useState(false);
  const [resOpen, setResOpen] = useState(false);
  const [eventsOpen, setEventsOpen] = useState(false);
  const [mobileEventsOpen, setMobileEventsOpen] = useState(false);

  return (
    <header
      className="w-full h-14 md:h-[96px] flex items-center justify-center relative"
      style={{ backgroundColor: '#105D48' }}
    >

      {/* ── HOME layout ── */}
      {isHome && (
        <>
          {/* Logo — left */}
          <Link href="/" className="absolute left-4 md:left-10">
            <Image
              src="/logoHeader.svg"
              alt="Company Logo"
              width={298.28}
              height={48.19}
              className="w-[137px] md:w-[205px] h-auto object-contain"
            />
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="absolute right-4 flex flex-col gap-1 lg:hidden"
          >
            <span className="w-6 h-[2px] bg-white"></span>
            <span className="w-6 h-[2px] bg-white"></span>
            <span className="w-6 h-[2px] bg-white"></span>
          </button>

          {/* Desktop nav — right side */}
          <div className="hidden lg:flex items-center gap-4 absolute right-10">
            <Link
              href="/all-articles"
              className="px-4 py-2 border-[1.7px] border-white text-white rounded-full hover:bg-white hover:text-[#105D48] transition"
            >
              Articles
            </Link>
            <Link
              href="/all-news"
              className="px-4 py-2 border-[1.7px] border-white text-white rounded-full hover:bg-white hover:text-[#105D48] transition"
            >
              News
            </Link>
            <Link
              href="/res/REMCC"
              className="px-4 py-2 border-[1.7px] border-white text-white rounded-full hover:bg-white hover:text-[#105D48] transition"
            >
              Competitions
            </Link>

            {/* Events dropdown */}
            <div className="relative">
              <button
                onClick={() => setEventsOpen(!eventsOpen)}
                className="px-4 py-2 border-[1.7px] border-white text-white rounded-full hover:bg-white hover:text-[#105D48] transition flex items-center gap-2"
              >
                Events
                <span className="text-xs">{eventsOpen ? '▲' : '▼'}</span>
              </button>

              {eventsOpen && (
                <div className="absolute top-12 right-0 bg-[#105D48] border border-white/20 rounded-xl shadow-lg z-50 min-w-[180px] flex flex-col overflow-hidden">
                  {events.map(({ label, href }) => (
                    <Link
                      key={label}
                      href={href}
                      className="px-5 py-3 text-white hover:bg-white/10 transition border-b border-white/10 last:border-none"
                      onClick={() => setEventsOpen(false)}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile dropdown */}
          {open && (
            <div className="absolute top-14 left-0 w-full bg-[#105D48] flex flex-col items-start px-6 py-4 gap-3 lg:hidden shadow-lg z-50">
              <Link href="/all-articles" className="text-white border-b border-white pb-2 w-full" onClick={() => setOpen(false)}>
                Articles
              </Link>
              <Link href="/all-news" className="text-white border-b border-white pb-2 w-full" onClick={() => setOpen(false)}>
                News
              </Link>
              <Link href="/res/REMCC" className="text-white border-b border-white pb-2 w-full" onClick={() => setOpen(false)}>
                Competitions
              </Link>

              {/* Events accordion in mobile */}
              <button
                className="text-white border-b border-white pb-2 w-full text-left flex justify-between items-center"
                onClick={() => setMobileEventsOpen(!mobileEventsOpen)}
              >
                Events
                <span className="text-xs">{mobileEventsOpen ? '▲' : '▼'}</span>
              </button>
              {mobileEventsOpen && (
                <div className="flex flex-col gap-2 w-full pl-4">
                  {events.map(({ label, href }) => (
                    <Link
                      key={label}
                      href={href}
                      className="text-white/80 border-b border-white/30 pb-2 w-full"
                      onClick={() => { setOpen(false); setMobileEventsOpen(false); }}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}

      {/* ── /res layout ── */}
      {isRes && (
        <>
          <Link href="/" className="absolute left-4 md:left-10">
            <Image
              src="/logoHeader.svg"
              alt="Company Logo"
              width={298.28}
              height={48.19}
              className="w-[137px] md:w-[205px] h-auto object-contain"
            />
          </Link>

          {/* Desktop: News + Articles */}
          <div className="hidden lg:flex items-center gap-4 absolute left-[280px]">
            <Link
              href="/all-news"
              className="px-6 py-2 border-[1px] font-bold border-white text-white text-xl rounded-full hover:bg-white hover:text-[#105D48] transition"
            >
              News
            </Link>
            <Link
              href="/all-articles"
              className="px-4 py-2 border-[1px] font-bold border-white text-white text-xl rounded-full hover:bg-white hover:text-[#105D48] transition"
            >
              Articles
            </Link>
          </div>

          {/* Desktop: Competition pills */}
          <div className="hidden lg:flex absolute right-10 gap-4">
            {competitions.map(({ label, href }) => (
              <Link
                key={label}
                href={href}
                className={`text-white text-xl font-semibold px-4 py-1.5 rounded-full border transition ${
                  pathname === href
                    ? 'bg-white/20 border-white/60'
                    : 'border-transparent hover:bg-white/10 hover:border-white/30'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* /res Mobile hamburger */}
          <button
            onClick={() => setResOpen(!resOpen)}
            className="absolute right-4 flex flex-col gap-1 lg:hidden"
          >
            <span className="w-6 h-[2px] bg-white"></span>
            <span className="w-6 h-[2px] bg-white"></span>
            <span className="w-6 h-[2px] bg-white"></span>
          </button>

          {/* /res Mobile dropdown */}
          {resOpen && (
            <div className="absolute top-14 left-0 w-full bg-[#105D48] flex flex-col items-start px-6 py-4 gap-3 lg:hidden shadow-lg z-50">
              <Link href="/all-news" className="text-white border-b border-white pb-2 w-full" onClick={() => setResOpen(false)}>
                News
              </Link>
              <Link href="/all-articles" className="text-white border-b border-white pb-2 w-full" onClick={() => setResOpen(false)}>
                Articles
              </Link>
              <p className="text-white/50 text-xs pt-1">Competitions</p>
              {competitions.map(({ label, href }) => (
                <Link
                  key={label}
                  href={href}
                  className={`pb-2 w-full border-b transition px-3 py-1 rounded-full ${
                    pathname === href
                      ? 'bg-white/20 text-white border-white/60'
                      : 'text-white border-white hover:bg-white/10'
                  }`}
                  onClick={() => setResOpen(false)}
                >
                  {label}
                </Link>
              ))}
            </div>
          )}
        </>
      )}

      {/* ── Neither home nor /res ── */}
      {/* ── Neither home nor /res ── */}
      {!isHome && !isRes && (
        <>
          {/* Logo — left */}
          <Link href="/" className="absolute left-4 md:left-10">
            <Image
              src="/logoHeader.svg"
              alt="Company Logo"
              width={298.28}
              height={48.19}
              className="w-[137px] md:w-[205px] h-auto object-contain"
            />
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            className="absolute right-4 flex flex-col gap-1 lg:hidden"
          >
            <span className="w-6 h-[2px] bg-white"></span>
            <span className="w-6 h-[2px] bg-white"></span>
            <span className="w-6 h-[2px] bg-white"></span>
          </button>

          {/* Desktop nav — right side */}
          <div className="hidden lg:flex items-center gap-4 absolute right-10">
            <Link
              href="/all-articles"
              className="px-4 py-2 border-[1.7px] border-white text-white rounded-full hover:bg-white hover:text-[#105D48] transition"
            >
              Articles
            </Link>
            <Link
              href="/all-news"
              className="px-4 py-2 border-[1.7px] border-white text-white rounded-full hover:bg-white hover:text-[#105D48] transition"
            >
              News
            </Link>
            <Link
              href="/res/REMCC"
              className="px-4 py-2 border-[1.7px] border-white text-white rounded-full hover:bg-white hover:text-[#105D48] transition"
            >
              Competitions
            </Link>

            {/* Events dropdown */}
            <div className="relative">
              <button
                onClick={() => setEventsOpen(!eventsOpen)}
                className="px-4 py-2 border-[1.7px] border-white text-white rounded-full hover:bg-white hover:text-[#105D48] transition flex items-center gap-2"
              >
                Events
                <span className="text-xs">{eventsOpen ? '▲' : '▼'}</span>
              </button>

              {eventsOpen && (
                <div className="absolute top-12 right-0 bg-[#105D48] border border-white/20 rounded-xl shadow-lg z-50 min-w-[180px] flex flex-col overflow-hidden">
                  {events.map(({ label, href }) => (
                    <Link
                      key={label}
                      href={href}
                      className="px-5 py-3 text-white hover:bg-white/10 transition border-b border-white/10 last:border-none"
                      onClick={() => setEventsOpen(false)}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Mobile dropdown */}
          {open && (
            <div className="absolute top-14 left-0 w-full bg-[#105D48] flex flex-col items-start px-6 py-4 gap-3 lg:hidden shadow-lg z-50">
              <Link href="/all-articles" className="text-white border-b border-white pb-2 w-full" onClick={() => setOpen(false)}>
                Articles
              </Link>
              <Link href="/all-news" className="text-white border-b border-white pb-2 w-full" onClick={() => setOpen(false)}>
                News
              </Link>
              <Link href="/res/REMCC" className="text-white border-b border-white pb-2 w-full" onClick={() => setOpen(false)}>
                Competitions
              </Link>

              {/* Events accordion in mobile */}
              <button
                className="text-white border-b border-white pb-2 w-full text-left flex justify-between items-center"
                onClick={() => setMobileEventsOpen(!mobileEventsOpen)}
              >
                Events
                <span className="text-xs">{mobileEventsOpen ? '▲' : '▼'}</span>
              </button>
              {mobileEventsOpen && (
                <div className="flex flex-col gap-2 w-full pl-4">
                  {events.map(({ label, href }) => (
                    <Link
                      key={label}
                      href={href}
                      className="text-white/80 border-b border-white/30 pb-2 w-full"
                      onClick={() => { setOpen(false); setMobileEventsOpen(false); }}
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              )}
            </div>
          )}
        </>
      )}

    </header>
  );
}