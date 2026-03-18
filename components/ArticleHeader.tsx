import React from 'react';

interface ArticleHeaderProps {
  title: string;
  createdAt: Date;
  coverUrl: string;
}

const ArticleHeader: React.FC<ArticleHeaderProps> = ({ title, createdAt, coverUrl }) => {
  const date = new Date(createdAt);
  const formattedDate = Number.isNaN(date.getTime())
    ? '-'
    : date.toLocaleDateString('en-GB');

  return (
    <div className="flex flex-col">
      <h1 className="font-['Open_Sans'] font-extrabold text-xl md:text-3xl lg:text-[45px] text-[#105D48] leading-snug">
        {title}
      </h1>

      <div className="mt-2 md:mt-4 flex flex-col gap-1 font-['Open_Sans'] font-semibold text-sm md:text-base lg:text-[19px] text-[#105D48]">
        <p>{formattedDate}</p>
      </div>

      <div className="mt-4 md:mt-6 lg:mt-8">
        <img
          src={coverUrl || '/dummyTitle.png'}
          alt="Article main"
          className="w-full h-[200px] md:h-[350px] lg:h-[500px] rounded-none object-cover"
        />
      </div>
    </div>
  );
};

export default ArticleHeader;