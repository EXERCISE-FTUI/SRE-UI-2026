'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  FaTiktok,
  FaWhatsapp,
  FaInstagram,
  FaXTwitter,
  FaFacebook,
} from 'react-icons/fa6';

interface ArticleBodyProps {
  content: string;
  buttonText: string;
  buttonLink: string;
  title?: string;
}

const ArticleBody: React.FC<ArticleBodyProps> = ({ content, buttonText, buttonLink, title }) => {
  const pathname = usePathname();
  const [currentUrl, setCurrentUrl] = useState('');
  const isHtmlContent = /<[^>]+>/.test(content);
  const sanitizedContent = content.replace(/&nbsp;/gi, ' ').replace(/\u00A0/g, ' ').replace(/text-align:\s*left;?/gi, '');

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setCurrentUrl(window.location.origin + pathname);
    }
  }, [pathname]);

  const handleCopyLink = () => {
    if (!currentUrl) return;
    navigator.clipboard.writeText(currentUrl);
    alert('Link artikel berhasil disalin!');
  };

  const facebookHref = currentUrl
    ? `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`
    : '#';
  const xHref = currentUrl
    ? `https://twitter.com/intent/tweet?url=${encodeURIComponent(currentUrl)}&text=${encodeURIComponent(title || '')}`
    : '#';
  const whatsappHref = currentUrl
    ? `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title ?? ''} - ${currentUrl}`)}`
    : '#';

  return (
    <div className="flex flex-col mt-6 md:mt-8 lg:mt-10">
      {isHtmlContent ? (
        <div
          className="
            font-sans font-normal text-sm md:text-base lg:text-[20px] text-black 
            leading-relaxed text-justify mb-4 md:mb-6
            max-w-full overflow-hidden break-words
            [&_*]:max-w-full
            [&_img]:h-auto
            [&_pre]:overflow-x-auto
            [&_table]:block [&_table]:overflow-x-auto
            [&_p]:mb-4
            [&_p]:leading-[1.8]
            [&_p]:indent-8
            [&_h1]:text-center [&_h1]:!text-center
            [&_h1]:text-2xl [&_h1]:font-bold [&_h1]:mt-6 [&_h1]:mb-3
            [&_h2]:text-xl [&_h2]:font-bold [&_h2]:mt-5 [&_h2]:mb-2
            [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:mt-4 [&_h3]:mb-2
            [&_ul]:list-disc [&_ul]:ml-6 [&_ul]:mb-4
            [&_ol]:list-decimal [&_ol]:ml-6 [&_ol]:mb-4
            [&_strong]:font-semibold
          "
          dangerouslySetInnerHTML={{ __html: sanitizedContent }}
        />
      ) : (
        <p className="font-sans font-normal text-sm md:text-base lg:text-[20px] text-black leading-relaxed text-justify mb-4 md:mb-6 whitespace-pre-line">
          {sanitizedContent}
        </p>
      )}

      <div className="mt-8 md:mt-10 lg:mt-12 flex flex-col gap-6 md:gap-8">
        <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 lg:gap-6 flex-wrap">
          <p className="font-['Open_Sans'] font-semibold text-lg md:text-2xl lg:text-[29px] text-[#105D48] whitespace-nowrap">
            Share this article:
          </p>
          <div className="flex gap-3 md:gap-4 lg:gap-6 flex-wrap items-center">
            <button
              type="button"
              onClick={handleCopyLink}
              disabled={!currentUrl}
              className="text-xl md:text-2xl lg:text-3xl text-black cursor-pointer hover:scale-110 hover:text-[#105D48] transition-all duration-300"
              aria-label="Copy link for TikTok"
            >
              <FaTiktok />
            </button>
            <a
              href={whatsappHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl md:text-2xl lg:text-3xl text-black cursor-pointer hover:scale-110 hover:text-[#105D48] transition-all duration-300"
              aria-label="Share on WhatsApp"
              aria-disabled={!currentUrl}
            >
              <FaWhatsapp />
            </a>
            <button
              type="button"
              onClick={handleCopyLink}
              disabled={!currentUrl}
              className="text-xl md:text-2xl lg:text-3xl text-black cursor-pointer hover:scale-110 hover:text-[#105D48] transition-all duration-300"
              aria-label="Copy link for Instagram"
            >
              <FaInstagram />
            </button>
            <a
              href={xHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl md:text-2xl lg:text-3xl text-black cursor-pointer hover:scale-110 hover:text-[#105D48] transition-all duration-300"
              aria-label="Share on X"
              aria-disabled={!currentUrl}
            >
              <FaXTwitter />
            </a>
            <a
              href={facebookHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-xl md:text-2xl lg:text-3xl text-black cursor-pointer hover:scale-110 hover:text-[#105D48] transition-all duration-300"
              aria-label="Share on Facebook"
              aria-disabled={!currentUrl}
            >
              <FaFacebook />
            </a>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-[#FEF200] text-[#105D48] font-semibold px-4 md:px-6 lg:px-8 py-2 md:py-3 rounded-full cursor-pointer hover:scale-105 hover:shadow-lg hover:brightness-95 transition-all duration-300 text-sm md:text-base"
          >
            Back to top
          </button>

          <Link
            href={buttonLink}
            className="bg-[#FEF200] text-[#105D48] font-semibold px-4 md:px-6 lg:px-8 py-2 md:py-3 rounded-full cursor-pointer hover:scale-105 hover:shadow-lg hover:brightness-95 transition-all duration-300 text-sm md:text-base"
          >
            {buttonText}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ArticleBody;