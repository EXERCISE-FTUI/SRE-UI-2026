import Image from "next/image";
import Link from "next/link";
import { FaInstagram, FaLinkedin, FaYoutube } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="w-full bg-gradient-to-r from-[#105D48] to-[#228D72] py-6 lg:py-10">
      <div className="max-w-[1600px] mx-auto px-4 lg:px-12">
        <p className="text-white font-bold font-['SF_Pro_Display'] font-sans tracking-wide text-base md:text-lg lg:text-2xl xl:text-[28px] mb-6 lg:mb-10 text-center lg:text-left">
          © 2026 Society of Renewable Energy Universitas Indonesia
        </p>

        <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-8 lg:gap-10">
          {/* Logo Section */}
          <div className="flex justify-center lg:justify-start w-full lg:w-auto">
            <Image
              src="/logoFooter.svg"
              alt="Society of Renewable Energy Universitas Indonesia footer logo"
              width={603}
              height={120}
              className="w-[70%] md:w-[80%] max-w-[400px] lg:max-w-[603px] h-auto"
            />
          </div>

          {/* Social Links and Info Section */}
          <div className="flex flex-col items-center lg:items-start gap-6 w-full lg:w-auto">
            {/* Instagram Link */}
            <Link
              href="https://www.instagram.com/sreui.chapter/"
              className="flex items-center gap-4 hover:opacity-80 transition-opacity"
            >
              <span className="bg-white rounded-full w-10 h-10 md:w-12 md:h-12 lg:w-16 lg:h-16 flex items-center justify-center flex-shrink-0">
                <FaInstagram className="text-[#105D48] text-lg md:text-2xl lg:text-4xl" />
              </span>
              <span className="text-white font-bold text-sm md:text-lg lg:text-3xl">sreui.chapter</span>
            </Link>

            {/* LinkedIn and YouTube Section */}
            <div className="flex flex-col md:flex-row items-center gap-4">
              <div className="bg-white rounded-full px-4 py-3 md:px-5 md:py-3 lg:px-6 lg:py-4 flex gap-4 lg:gap-6 items-center">
                <Link
                  href="https://www.linkedin.com/company/society-of-renewable-energy-universitas-indonesia/"
                  className="hover:opacity-80 transition-opacity"
                  aria-label="LinkedIn"
                >
                  <FaLinkedin className="text-[#105D48] text-lg md:text-2xl lg:text-4xl" />
                </Link>
                <Link
                  href="https://www.youtube.com/@SRE_UI"
                  className="hover:opacity-80 transition-opacity"
                  aria-label="YouTube"
                >
                  <FaYoutube className="text-[#105D48] text-lg md:text-2xl lg:text-4xl" />
                </Link>
              </div>
              <span className="text-white font-sans text-xs md:text-sm lg:text-base max-w-[200px] leading-tight whitespace-pre-line text-center md:text-left">
                {"Society of Renewable Energy\nUniversitas Indonesia"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
