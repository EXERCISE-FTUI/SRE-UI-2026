import React from 'react';
import Link from 'next/link';
import type { News, Article } from '@/types/database';

interface ReadOtherNewsProps {
  title: string;
  newsItems: (News | Article)[];
  baseRoute: string;
}

const ReadOtherNews: React.FC<ReadOtherNewsProps> = ({ title, newsItems, baseRoute }) => {
  return (
    <section className="w-full mt-24 pt-16 border-t border-[#D9D9D9]">
      <h2 className="font-['Open_Sans'] font-semibold text-[48.15px] text-[#105D48] text-left mb-12">
        {title}
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-[68px]">
        {newsItems.map((item, index) => (
          <Link
            key={item.slug || index}
            href={`${baseRoute}/${item.slug || ''}`}
            className="flex flex-col group cursor-pointer"
          >
            <div className="w-full aspect-[313/263] rounded-[14.2px] border border-[#D9D9D9] shadow-[0_8px_30px_rgb(0,0,0,0.12)] overflow-hidden relative group-hover:shadow-xl transition-shadow duration-300">
              <img
                src={item.cover_url || '/dummyNews.png'}
                alt={item.title}
                className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-500"
              />
            </div>

            <div className="mt-[35px] flex justify-center px-4">
              <p className="text-[20px] font-extrabold text-[#105D48] text-center leading-tight font-sans">
                {item.title}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ReadOtherNews;