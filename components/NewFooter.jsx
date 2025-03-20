import { ArrowUpRight } from "lucide-react";
import React from "react";
import {
  FaInstagram,
  FaLinkedin,
  FaXTwitter,
  FaYoutube,
} from "react-icons/fa6";
import { MdEmail, MdPhone } from "react-icons/md";

const NewFooter = () => {
  const footerItems = [
    {
      title: "Home",
      items: ["Why AstroKids", "How It Works", "Choose your plan", "blog"],
    },
    {
      title: "Plans",
      items: ["Choose your plan", "Plan benefits", "FAQ"],
    },
    {
      title: "Learn",
      items: ["Recent Articles", "Featured Stories"],
    },
    {
      title: "Contact",
      items: ["Contact details"],
    },
  ];

  const media = [
    {
      media: <FaLinkedin />,
      link: "https://www.linkedin.com/",
    },
    {
      media: <FaXTwitter />,
      link: "https://www.x.com/",
    },
    {
      media: <FaYoutube />,
      link: "https://www.youtube.com/",
    },
    {
      media: <FaInstagram />,
      link: "https://www.instagram.com/",
    },
  ];
  return (
    <div>
      <div className="bg-[#02030B] p-5 md:p-20 flex flex-col md:flex-row text-white gap-5">
        <div className="w-full md:w-2/5 flex flex-col justify-between items-start">
          <h1 className="font-bold text-2xl mb-5">
            astrokids<span className="text-xs px-0.5 text-[#5DF2CF]">✦</span>ai
          </h1>
          <p className="flex justify-center text-[18px] font-normal items-center gap-2">
            <MdEmail /> info@astrokids.ai
          </p>
          <p className="flex justify-center text-[18px] font-normal items-center gap-2">
            <MdPhone /> info@astrokids.ai
          </p>
          <p className="flex justify-center text-[18px] font-normal items-center gap-2">
            <MdPhone /> info@astrokids.ai
          </p>
          <div className="flex justify-center items-center text-[16px] font-[550] gap-2 mt-5 relative">
            <p>Contact Us</p>
            <ArrowUpRight />
            <div className="absolute w-full h-0.5 rounded-full bg-white bottom-0"></div>
          </div>
        </div>
        <div className="flex-3/5 flex flex-wrap w-full justify-between gap-5">
          {footerItems.map((item, index) => (
            <div key={index} className="flex-1/4 flex flex-col gap-3 md:gap-5">
              <h1 className="text-[18px] font-[550] text-[#9396A3]">
                {item.title}
              </h1>
              {item.items.map((i, ind) => (
                <p key={ind} className="text-[16px] font-[500]">
                  {i}
                </p>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="bg-[#02030B] flex flex-col md:flex-row justify-center items-center gap-5 text-white p-5 md:px-20 py-5">
        <div className="flex gap-5 flex-1">
          <p>© 2024 Astrokids ai</p>
          <p>Terms & Conditions</p>
        </div>
        <div className="flex gap-3">
          {media.map((m, index) => (
            <a
              key={index}
              href={m.link}
              className="hover:text-[#FFEB3B] bg-white/20 p-2 rounded-full text-[22px] transition-all"
            >
              {m.media}
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewFooter;
