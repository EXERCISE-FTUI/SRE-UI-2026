'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';

export default function Header() {
  const pathname = usePathname();
  const isHome = pathname === '/';
  const [open, setOpen] = useState(false);

  return (
    <header
      className="w-full h-14 md:h-[96px] flex items-center justify-center relative"
      style={{ backgroundColor: '#105D48' }}
    >
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

      <Link href="/">
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

      {isHome && open && (
        <div className="absolute top-15 left-0 w-full bg-[#105D48] flex flex-col items-start px-6 py-4 gap-3 md:hidden shadow-lg z-50">
          <Link
            href="/all-news"
            className="text-white border-b border-white pb-2 w-full"
            onClick={() => setOpen(false)}
          >
            News
          </Link>
          <Link
            href="/all-articles"
            className="text-white border-b border-white pb-2 w-full"
            onClick={() => setOpen(false)}
          >
            Articles
          </Link>
        </div>
      )}
    </header>
  );
}