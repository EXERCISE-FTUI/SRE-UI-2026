import ArticleBody from '@/components/ArticleBody';
import ArticleHeader from '@/components/ArticleHeader';
import ReadOtherNews from '@/components/ReadOtherNews';
import SidebarNews from '@/components/SidebarNews';
import { getNewsBySlug, getRecommendedNews } from '@/lib/data';
import { notFound } from 'next/navigation';

type NewsDetailPageProps = {
  params: Promise<{ slug: string }>;
};

const NewsDetailPage = async ({ params }: NewsDetailPageProps) => {
  const resolvedParams = await params;
  const news = await getNewsBySlug(resolvedParams.slug);

  if (!news) {
    notFound();
  }

  const recommendedNews = await getRecommendedNews();
  return (
    <main className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 xl:px-24 2xl:px-[175px] py-8 md:py-10 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 md:gap-8 lg:gap-10 2xl:gap-[60px]">
        <div className="lg:col-span-7 lg:border-r lg:border-[#D9D9D9] lg:pr-6 2xl:pr-8">
          <ArticleHeader
            title={news.title}
            createdAt={new Date(news.created_at)}
            coverUrl={news.cover_url}
          />
          <ArticleBody
            content={news.content}
            buttonText="All News"
            buttonLink="/all-news"
            title={news.title}
          />
        </div>

        <div className="lg:col-span-3">
          <SidebarNews title="NEW NEWS" newsItems={recommendedNews} baseRoute="/news" />
        </div>
      </div>

      <ReadOtherNews title="READ OTHER NEWS" newsItems={recommendedNews} baseRoute="/news" />
    </main>
  );
};

export default NewsDetailPage;