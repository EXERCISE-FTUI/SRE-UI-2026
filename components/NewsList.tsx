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
    <div className="flex flex-col gap-4 md:gap-6 lg:gap-8 2xl:gap-[123px] mt-8 md:mt-10 lg:mt-12 2xl:mt-[100px]">
      {items.map((item, index) => (
        <Link 
          key={item.slug || index} 
          href={`${baseRoute}/${item.slug || ''}`}
          className="flex flex-col lg:flex-row lg:items-start gap-4 md:gap-6 lg:gap-8 2xl:gap-[123px] w-full group cursor-pointer"
        >
          {/* Left Part: Image & Green Line */}
          <div className="flex flex-col items-center gap-1 md:gap-5 2xl:gap-[25px] w-full lg:w-[30%] lg:max-w-[300px] 2xl:max-w-[441px]">
            {/* Image */}
            <div className="relative w-full aspect-[6/5] rounded-[20px] overflow-hidden">
              <Image
                src={item.cover_url || '/dummyNews.png'}
                alt={item.title}
                fill
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              />
            </div>
            
            {/* Green Line */}
            <div className="w-[70%] h-3 md:h-4 rounded-full bg-[#105D48]" />
          </div>

          {/* Right Part: Text Box */}
          <div className="flex-1 min-h-[150px] md:min-h-[200px] lg:min-h-[250px] rounded-[30px] border border-[#D9D9D9] bg-white shadow-[0_8px_30px_rgb(0,0,0,0.08)] flex items-center justify-center p-4 md:p-6 2xl:p-[41px]">
            <p className="font-['Open_Sans'] text-base md:text-lg lg:text-xl 2xl:text-[36px] text-[#105D48] leading-[1.5]">
              {item.title}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default NewsList;
