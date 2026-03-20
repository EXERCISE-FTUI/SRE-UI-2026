import React from 'react';
import Link from 'next/link';
import type { News, Article } from '@/types/database';

interface SidebarProps {
  title: string;
  newsItems: (News | Article)[];
  baseRoute: string;
}

const SidebarNews: React.FC<SidebarProps> = ({ title, newsItems, baseRoute }) => {
  return (
    <aside className="flex flex-col w-full">
      <h2 className="text-3xl xl:text-4xl font-bold text-[#105D48] mb-6 whitespace-nowrap">
        {title}
      </h2>

      <div className="flex flex-col gap-6 xl:gap-8 2xl:gap-[32px]">
        {newsItems.map((item, index) => (
          <Link key={item.slug || index} href={`${baseRoute}/${item.slug || ''}`} className="block w-full">
            <div className="flex flex-row gap-4 2xl:gap-[21px] items-start w-full group cursor-pointer">
              <div className="w-[100px] xl:w-[130px] 2xl:w-[133px] shrink-0 aspect-[163/92] rounded-[7.39px] border border-[#D9D9D9] overflow-hidden shadow-sm">
                <img
                  src={item.cover_url || '/dummyNews.png'}
                  alt="News thumbnail"
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>

              <div className="flex-1 min-w-0 w-full">
                <h3 className="text-base xl:text-lg 2xl:text-[17px] font-extrabold text-[#105D48] line-clamp-4 leading-snug break-normal">
                  {item.title}
                </h3>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </aside>
  );
};

export default SidebarNews;