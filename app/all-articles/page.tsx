export const dynamic = 'force-dynamic';
import React from 'react';
import Image from 'next/image';
import HeroBanner from '@/components/HeroBanner';
import NewsList from '@/components/NewsList';
import { getAllArticles, getRecommendedArticles } from '@/lib/data';

const AllArticlePage = async () => {
  const articles = await getAllArticles();
  const recommended = await getRecommendedArticles();
  const topFeatured = recommended[0];

  return (
    <main className="relative min-h-screen bg-[#FFFFFF] font-['Open_Sans'] overflow-hidden">
      {/* Ornament 1: Top-left, behind content */}
      <div className="absolute top-0 left-[2%] -z-10">
        <Image
          src="/HiasanAll1.svg"
          alt="Ornament 1"
          width={300}
          height={300}
          className="w-auto h-auto opacity-80"
        />
      </div>

      {/* Ornament 2: Middle-right */}
      <div className="absolute top-1/2 right-[2%] -translate-y-1/2">
        <Image
          src="/HiasanAll2.svg"
          alt="Ornament 2"
          width={250}
          height={250}
          className="w-auto h-auto opacity-80"
        />
      </div>

      {/* Ornament 3: Bottom-left */}
      <div className="absolute bottom-0 left-[-5%]">
        <Image
          src="/HiasanAll3.svg"
          alt="Ornament 3"
          width={280}
          height={280}
          className="w-auto h-auto opacity-80"
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-8 lg:px-12 py-8 md:py-12 lg:py-16">
        {/* Page Title */}
        <h1 className="font-['SF_Pro_Display'] font-bold text-3xl md:text-4xl lg:text-5xl 2xl:text-[80px] text-[#105D48] text-center mb-6 md:mb-8 lg:mb-12">
          All Articles
        </h1>

        {/* Hero Banner Component */}
        <HeroBanner
          title={topFeatured?.title}
          coverUrl={topFeatured?.cover_url}
          href={topFeatured?.slug ? `/article/${topFeatured.slug}` : undefined}
        />
        <NewsList items={articles} baseRoute="/article" />

      </div>
    </main>
  );
};

export default AllArticlePage;
