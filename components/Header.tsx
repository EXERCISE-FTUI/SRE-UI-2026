import Image from 'next/image';
import Link from 'next/link';

export default function Header() {
  return (
    <header className="w-full h-20 md:h-[138px] flex items-center justify-center" style={{ backgroundColor: '#105D48' }}>
      <Link href="/">
        <Image
          src="/logoHeader.svg"
          alt="Company Logo"
          width={298.28}
          height={48.19}
          className="w-[200px] md:w-[298px] h-auto object-contain"
        />
      </Link>
    </header>
  );
}
