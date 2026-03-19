import ArticleBody from '@/components/ArticleBody';
import ArticleHeader from '@/components/ArticleHeader';
import ReadOtherNews from '@/components/ReadOtherNews';
import SidebarNews from '@/components/SidebarNews';
import { getArticleBySlug, getRecommendedArticles } from '@/lib/data';
import { notFound } from 'next/navigation';

type ArticleDetailPageProps = {
  params: Promise<{ slug: string }>;
};

export default async function ArticleDetail({ params }: ArticleDetailPageProps) {
  const resolvedParams = await params;
  const [article, recommended] = await Promise.all([
    getArticleBySlug(resolvedParams.slug),
    getRecommendedArticles(),
  ]);

  if (!article) {
    notFound();
  }

  return (
    <main className="w-full max-w-[1600px] mx-auto px-4 md:px-8 lg:px-12 xl:px-24 2xl:px-[175px] py-8 md:py-10 lg:py-12">
      <div className="grid grid-cols-1 lg:grid-cols-10 gap-6 md:gap-8 lg:gap-10 2xl:gap-[60px]">
        <div className="lg:col-span-7 lg:border-r lg:border-[#D9D9D9] lg:pr-6 2xl:pr-8">
          <ArticleHeader
            title={article.title}
            createdAt={article.created_at}
            coverUrl={article.cover_url}
          />
          <ArticleBody
            buttonText="All Articles"
            buttonLink="/all-articles"
            content={article.content}
            title={article.title}
          />
        </div>

        <div className="lg:col-span-3">
          <SidebarNews title="NEW ARTICLE" newsItems={recommended} baseRoute="/article" />
        </div>
      </div>

      <ReadOtherNews title="READ OTHER ARTICLES" newsItems={recommended} baseRoute="/article" />
    </main>
  );
}