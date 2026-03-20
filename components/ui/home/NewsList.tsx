import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { getAllArticles, getRecommendedArticles } from '@/lib/data';

export default async function HomeArticles() {
  const articles = await getAllArticles();
  const recommended = await getRecommendedArticles();
  
  // Get top featured and the next 3 recent articles
  const topFeatured = recommended[0];
  const recentArticles = articles.slice(0, 3);

  return (
    <section className="w-full py-20 bg-white">
      <div className="mx-auto px-6 lg:px-[140px] flex flex-col gap-12">
        
        {/* --- HERO ARTICLE CARD --- */}
        {topFeatured && (
          <div className="relative w-full h-[400px] lg:h-[600px] rounded-3xl overflow-hidden shadow-lg group">
            {/* Background Image */}
            <Image
              src={topFeatured.cover_url || '/placeholder-hero.jpg'} // Fallback image if missing
              alt={topFeatured.title || 'Featured Article'}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
            
            {/* Dark Green Gradient Overlay */}
            <div className="absolute inset-x-0 bottom-0 h-3/4 bg-gradient-to-t from-[#105D48] via-[#105D48]/70 to-transparent z-10"></div>

            {/* Content Container */}
            <div className="absolute inset-0 p-8 md:p-10 flex flex-col justify-end z-20">
              <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
                
                {/* Text Content */}
                <div className="flex-1 max-w-3xl">
                  <h3 
                    className="text-white text-4xl md:text-5xl font-bold uppercase tracking-wide mb-2 line-clamp-2"
                    style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
                  >
                    {topFeatured.title || 'TITLE'}
                  </h3>
                  <p className="text-white/90 text-lg md:text-xl line-clamp-1">
                    {/* Assuming you have an excerpt field, otherwise fallback text */}
                    {/* If you have a real subtitle field, replace this string with it */}
                    Read the latest updates and insights from SRE UI.
                  </p>
                </div>

                {/* Read Now Button (Now with hover:scale-110) */}
                <Link
                  href={`/article/${topFeatured.slug}`}
                  className="bg-[#FBD100] text-[#105D48] font-bold text-lg px-8 py-3 rounded-full hover:bg-[#FBD100] transform hover:scale-110 transition-all duration-300 shrink-0 shadow-md"
                >
                  Read Now
                </Link>

              </div>
            </div>
          </div>
        )}

        {/* --- RECENT ARTICLES GRID --- */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-4">
          {recentArticles.map((article, index) => (
            <div key={index} className="flex flex-col items-center">
              
              {/* Card Image */}
              <Link 
                href={`/article/${article.slug}`} 
                className="w-full relative aspect-[4/3] bg-white rounded-2xl shadow-[0_4px_20px_rgb(0,0,0,0.15)] overflow-hidden mb-6 transition-all duration-300 hover:-translate-y-2 hover:scale-105 hover:shadow-[0_10px_30px_rgb(0,0,0,0.25)] group"
              >
                <Image
                  src={article.cover_url || '/placeholder.jpg'}
                  alt={article.title}
                  fill
                  className="object-cover transition-transform duration-500"
                />
              </Link>
              
              {/* Green Pill Underneath */}
              <div className="w-2/3 h-2.5 bg-[#105D48] rounded-full"></div>
            </div>
          ))}
        </div>

        {/* --- VIEW ALL LINK --- */}
        <div className="flex justify-center pt-4">
          <Link
            href="/all-articles"
            className="text-[#105D48] text-2xl font-bold hover:text-[#0b4031] transition-colors"
            style={{ fontFamily: "'SF Pro Display', -apple-system, BlinkMacSystemFont, sans-serif" }}
          >
            View All Articles
          </Link>
        </div>

      </div>
    </section>
  );
}