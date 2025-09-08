"use client";
import BlogFormatContent from "@/components/BlogFormatContent";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function BlogPage() {
  const [blogData, setBlogData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const fetchBlogData = async () => {
      const storedBlog = localStorage.getItem("currentBlog");
      if (storedBlog) {
        setBlogData(JSON.parse(storedBlog).content);
        setIsLoading(false);
        return;
      } else {
        router.push("/resources");
      }
    };

    fetchBlogData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  if (!blogData) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <BlogFormatContent content={blogData} />
    </div>
  );
}
