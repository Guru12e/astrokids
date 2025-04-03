"use client";
import Image from "next/image";
import Header from "./Header";
import { useEffect, useState } from "react";

const BlogFormatContent = ({ content }) => {
  const [recentPosts, setRecentPosts] = useState([]);

  useEffect(() => {
    const fetchRecentPosts = async () => {
      try {
        const response = await fetch("/api/getAllPosts");
        const data = await response.json();
        const sortedPosts = data
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, 3);
        setRecentPosts(sortedPosts);
      } catch (error) {
        console.log("Error fetching posts:", error);
      }
    };

    fetchRecentPosts();
  }, []);
  return (
    <div className="w-screen h-full">
      <Header />
      <div className="px-5 mt-12 flex flex-col md:flex-row gap-10">
        <div className="px-5 flex-2/3 w-full md:px-0">
          {content.map((block, index) => {
            switch (block.type) {
              case "title":
                return (
                  <h1
                    key={index}
                    className="text-3xl md:text-4xl font-bold text-[#02030B] mb-6 leading-[1.2] text-center capitalize"
                  >
                    <span className="text-[#2DB787]">
                      {block.content.split(" ")[0]}
                    </span>{" "}
                    {block.content.split(" ").slice(1).join(" ")}
                  </h1>
                );
              case "subtitle":
                return (
                  <h2
                    key={index}
                    className="text-2xl font-semibold text-[#2DB787] mt-8 mb-4 leading-[1.2] italic"
                  >
                    {block.content}
                  </h2>
                );
              case "para":
                return (
                  <p
                    key={index}
                    className="text-[#6F6C90] leading-relaxed mb-4 text-[16px] md:text-[18px]"
                  >
                    {block.content}
                  </p>
                );
              case "image":
                return (
                  <div key={index} className="my-6">
                    <div className="w-[80%] mx-auto aspect-video relative rounded-xl overflow-hidden">
                      <Image
                        src={`https://drive.usercontent.google.com/download?id=${block.image}`}
                        alt={block.content}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                    <p className="text-xl text-[#2DB787] mt-2 italic text-center">
                      {block.content}
                    </p>
                  </div>
                );
              case "points":
                return (
                  <ul
                    key={index}
                    className="pl-6 mb-6 space-y-4 text-[#6F6C90]"
                  >
                    {block.points.map((point, i) => (
                      <li key={i} className="text-[16px] md:text-[18px]">
                        <span className="font-semibold text-[#2DB787]">
                          {point.title}:
                        </span>{" "}
                        {point.content}
                      </li>
                    ))}
                  </ul>
                );
              case "points-points":
                return (
                  <div key={index} className="my-8">
                    {block.content.map((item, index) => (
                      <div
                        key={index}
                        className="mb-6 p-4 rounded-xl bg-gradient-to-br from-[#FFEB3B]/20 to-[#2DB787]/20"
                      >
                        <h3 className="text-xl font-semibold text-[#02030B] mb-2 leading-[1.2]">
                          {item.title}
                        </h3>

                        <p className="text-[#6F6C90] leading-relaxed mb-3 text-[16px] md:text-[18px]">
                          {item.content}
                        </p>

                        <h4 className="text-lg font-medium text-[#2DB787] mt-4 mb-2 italic">
                          {item.subtitle}
                        </h4>

                        <ul className="list-disc pl-6 space-y-2 text-[#6F6C90]">
                          {item.points.map((point, i) => (
                            <li key={i} className="text-[16px] md:text-[18px]">
                              {point}
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                );
              case "points-points-with-image":
                return (
                  <div key={index} className="my-8">
                    {block.content.map((item, index) => (
                      <div key={index} className="mb-6 relative">
                        <h3 className="text-xl font-semibold text-[#02030B] mb-2 leading-[1.2]">
                          {item.title}
                        </h3>

                        {item.image !== "none" && (
                          <div className="w-[60%] mx-auto mt-2 aspect-video relative mb-4 rounded-xl overflow-hidden">
                            <Image
                              src={`https://drive.usercontent.google.com/download?id=${item.image}`}
                              alt={item.title}
                              fill
                              className="object-cover transition-transform duration-300 hover:scale-105"
                            />
                          </div>
                        )}

                        <p className="text-[#6F6C90] leading-relaxed mb-3 text-[16px] md:text-[18px]">
                          {item.content}
                        </p>

                        <h4 className="text-lg font-medium text-[#2DB787] mt-4 mb-2 italic">
                          {item.subtitle}
                        </h4>

                        <ul className="list-disc pl-6 space-y-2 text-[#6F6C90]">
                          {item.points.map((point, i) => (
                            <li key={i}>
                              <p className="text-[16px] md:text-[18px] leading-relaxed">
                                {point}
                              </p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                );
              default:
                return null;
            }
          })}
        </div>
        <div className="w-full md:w-1/3 px-5">
          <h2 className="text-2xl font-semibold text-[#2DB787] mb-6 leading-[1.2] capitalize">
            Recent <span className="text-[#FFEB3B]">Posts</span>
          </h2>
          <div className="space-y-6">
            {recentPosts.length > 0 ? (
              recentPosts.map((post, index) => (
                <div
                  key={index}
                  className="p-4 rounded-xl bg-gradient-to-br from-[#FFEB3B]/20 to-[#2DB787]/20 transition-all hover:shadow-lg hover:brightness-110"
                >
                  {post.image && (
                    <div className="w-full aspect-video relative rounded-xl overflow-hidden mb-4">
                      <Image
                        src={post.image}
                        alt={post.title}
                        fill
                        className="object-cover transition-transform duration-300 hover:scale-105"
                      />
                    </div>
                  )}
                  <h3 className="text-lg font-semibold text-[#02030B] leading-[1.2] mb-2">
                    {post.title}
                  </h3>
                  <a
                    href={`/blog/${post.id}`}
                    className="text-[#2DB787] font-medium text-[16px] hover:underline flex items-center gap-1"
                  >
                    Read More
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <path d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  </a>
                </div>
              ))
            ) : (
              <p className="text-[#6F6C90] text-[16px]">
                Loading recent posts...
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogFormatContent;
