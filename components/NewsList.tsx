import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import type { News, Article } from '@/types/database';

interface NewsListProps {
  items: (News | Article)[];
  baseRoute: string;
}

const NewsList: React.FC<NewsListProps> = ({ items, baseRoute }) => {
  return (
    <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 2xl:gap-[123px] max-md:gap-y-10 mt-8 md:mt-10 lg:mt-[60px] 2xl:mt-[70px] max-md:mt-10">
      {items.map((item, index) => (
        <Link
          key={item.slug || index}
          href={`${baseRoute}/${item.slug || ''}`}
          className="flex flex-col lg:flex-row lg:items-stretch w-full h-auto lg:h-[300px] gap-4 md:gap-6 lg:gap-8 2xl:gap-y-[123px] 2xl:gap-x-[80px] max-md:gap-2 group cursor-pointer"
        >
          {/* Left */}
          <div className="flex flex-col items-center gap-2 w-full lg:w-[30%] h-full">

            <div className="relative w-full aspect-[16/9] lg:h-full flex justify-center">
              <div className="relative w-full h-full rounded-[20px] overflow-hidden">
                <Image
                  src={item.cover_url || '/dummyNews.png'}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>

              <div className="absolute max-2xl:hidden bottom-[-10px] lg:bottom-[-35px] w-[70%] h-3 rounded-full bg-[#105D48]" />
            </div>

          </div>

          {/* Right */}
          <div className="flex-1 h-full rounded-[30px] border border-[#D9D9D9] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center justify-center py-4 px-4 md:px-6 lg:px-8">
            <p className="text-[#105D48] text-lg md:text-xl lg:text-[25px] line-clamp-3 lg:line-clamp-4 text-left lg:text-justify font-semibold">
              {item.title}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NewsList;
