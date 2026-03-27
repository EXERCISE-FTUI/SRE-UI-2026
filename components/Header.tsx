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

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const isRes = pathname.startsWith('/res');
  const [open, setOpen] = useState(false);
  const [resOpen, setResOpen] = useState(false);

  return (
    <header
      className="w-full h-14 md:h-[96px] flex items-center justify-center relative"
      style={{ backgroundColor: '#105D48' }}
    >
      {/* ── HOME layout ── */}
      {isHome && (
        <button
          onClick={() => setOpen(!open)}
          className="absolute left-4 flex flex-col gap-1 md:hidden"
        >
          <span className="w-6 h-[2px] bg-white"></span>
          <span className="w-6 h-[2px] bg-white"></span>
          <span className="w-6 h-[2px] bg-white"></span>
        </button>
      )}

      {isHome && (
        <Link
          href="/all-news"
          className="hidden md:block absolute left-10 px-4 py-2 border-[1.7px] border-white text-white rounded-full hover:bg-white hover:text-[#105D48] transition"
        >
          News
        </Link>
      )}

      {/* Logo — centered on home, left on /res */}
      <Link href="/" className={isRes ? 'absolute left-4 md:left-10' : ''}>
        <Image
          src="/logoHeader.svg"
          alt="Company Logo"
          width={298.28}
          height={48.19}
          className="w-[137px] md:w-[205px] h-auto object-contain"
        />
      </Link>

      {isHome && (
        <Link
          href="/all-articles"
          className="hidden md:block absolute right-10 px-4 py-2 border-[1.7px] border-white text-white rounded-full hover:bg-white hover:text-[#105D48] transition"
        >
          Articles
        </Link>
      )}

      {/* ── /res Desktop layout ── */}
      {isRes && (
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
      )}

      {isRes && (
        <div className="hidden lg:flex absolute right-10 gap-6">
          {competitions.map(({ label, href }) => (
            <Link
              key={label}
              href={href}
              className={`text-white text-xl font-semibold hover:underline transition ${
                pathname === href ? 'underline' : ''
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}

      {/* ── /res Mobile hamburger ── */}
      {isRes && (
        <button
          onClick={() => setResOpen(!resOpen)}
          className="absolute right-4 flex flex-col gap-1 lg:hidden"
        >
          <span className="w-6 h-[2px] bg-white"></span>
          <span className="w-6 h-[2px] bg-white"></span>
          <span className="w-6 h-[2px] bg-white"></span>
        </button>
      )}

      {/* ── /res Mobile dropdown ── */}
      {isRes && resOpen && (
        <div className="absolute top-14 left-0 w-full bg-[#105D48] flex flex-col items-start px-6 py-4 gap-3 md:hidden shadow-lg z-50">
          {/* Edit these links however you want */}
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
              className="text-white border-b border-white pb-2 w-full"
              onClick={() => setResOpen(false)}
            >
              {label}
            </Link>
          ))}
        </div>
      )}

      {/* ── Home mobile dropdown ── */}
      {isHome && open && (
        <div className="absolute top-14 left-0 w-full bg-[#105D48] flex flex-col items-start px-6 py-4 gap-3 md:hidden shadow-lg z-50">
          <Link href="/all-news" className="text-white border-b border-white pb-2 w-full" onClick={() => setOpen(false)}>
            News
          </Link>
          <Link href="/all-articles" className="text-white border-b border-white pb-2 w-full" onClick={() => setOpen(false)}>
            Articles
          </Link>
        </div>
      )}
    </header>
  );
}