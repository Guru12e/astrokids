"use client";
import BlogFormatContent from "@/components/BlogFormatContent";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { use } from "react";

export default function BlogPage({ params }) {
  const slug = use(params).slug;
  const router = useRouter();
  const [blogData, setBlogData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchBlogData = async () => {
      try {
        const res = await fetch(`/api/getPost?slug=${slug}`, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (res.status === 200) {
          const data = await res.json();
          setBlogData(data.content);
        } else {
          setTimeout(() => router.push("/resources"), 0);
        }
      } catch (error) {
        console.error("Error fetching blog data:", error);
        setTimeout(() => router.push("/resources"), 0);
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlogData();
  }, [slug, router]);

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
