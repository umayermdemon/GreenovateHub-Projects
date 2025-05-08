"use client";

import Image from "next/image";
import Link from "next/link";
import { ThumbsUp, ThumbsDown } from "lucide-react";
import { useState } from "react";

const dummyBlogs = [
  {
    id: "1",
    title: "Eco-Friendly Living Tips",
    images: ["/placeholder.jpg", "mnjksnj.jpg"],
    description:
      "Simple steps to start living sustainably and reduce your environmental impact.",
    author: { name: "Alice Johnson" },
    createdAt: "2025-05-01T00:00:00.000Z",
    Vote: [{ type: "UP" }, { type: "UP" }, { type: "DOWN" }],
  },
  {
    id: "2",
    title: "Climate Change Myths Busted",
    images: ["/placeholder.jpg"],
    description:
      "We bust common myths about climate change and bring clarity to the conversation.",
    author: { name: "Bob Green" },
    createdAt: "2025-04-28T00:00:00.000Z",
    Vote: [{ type: "UP" }, { type: "DOWN" }],
  },
  {
    id: "3",
    title: "Climate Change Myths Busted",
    images: ["/placeholder.jpg"],
    description:
      "We bust common myths about climate change and bring clarity to the conversation.",
    author: { name: "Bob Green" },
    createdAt: "2025-04-28T00:00:00.000Z",
    Vote: [{ type: "UP" }, { type: "DOWN" }],
  },
  {
    id: "4",
    title: "Climate Change Myths Busted",
    images: ["/placeholder.jpg"],
    description:
      "We bust common myths about climate change and bring clarity to the conversation.",
    author: { name: "Bob Green" },
    createdAt: "2025-04-28T00:00:00.000Z",
    Vote: [{ type: "UP" }, { type: "DOWN" }],
  },
  {
    id: "5",
    title: "Climate Change Myths Busted",
    images: ["/placeholder.jpg"],
    description:
      "We bust common myths about climate change and bring clarity to the conversation.",
    author: { name: "Bob Green" },
    createdAt: "2025-04-28T00:00:00.000Z",
    Vote: [{ type: "UP" }, { type: "DOWN" }],
  },
];
const FeaturedBlog = () => {
  const [feedback, setFeedback] = useState(
    dummyBlogs.map(() => ({ likes: 0, dislikes: 0 }))
  );

  const handleLike = (index: number) => {
    const newFeedback = [...feedback];
    newFeedback[index].likes += 1;
    setFeedback(newFeedback);
  };

  const handleDislike = (index: number) => {
    const newFeedback = [...feedback];
    newFeedback[index].dislikes += 1;
    setFeedback(newFeedback);
  };
  return (
    <section className="bg-gray-100 py-16">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-center text-3xl font-bold text-green-700 mb-8">
          Featured Blog
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {dummyBlogs.slice(0, 3).map((blog, idx) => (
            <div
              key={blog.id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative w-full h-48">
                <Image
                  src={blog.images[0] || "/placeholder.jpg"}
                  alt={blog.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-green-700 mb-2">
                  {blog.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {blog.description.slice(0, 100)}...
                </p>
                <div className="text-xs text-gray-500 mb-4">
                  By <span className="font-medium">{blog.author.name}</span> on{" "}
                  {new Date(blog.createdAt).toLocaleDateString()}
                </div>
                <div className="flex justify-between items-center">
                  <Link
                    href="#"
                    className="inline-block bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 text-sm">
                    Read More
                  </Link>

                  <div className="flex items-center gap-4 mt-4 text-sm text-gray-700">
                    <button
                      onClick={() => handleLike(idx)}
                      className="flex items-center gap-1 cursor-pointer hover:text-green-600">
                      <ThumbsUp size={16} />
                      <span>{feedback[idx].likes}</span>
                    </button>
                    <button
                      onClick={() => handleDislike(idx)}
                      className="flex items-center gap-1 cursor-pointer hover:text-red-600">
                      <ThumbsDown size={16} />
                      <span>{feedback[idx].dislikes}</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/blogs"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-full hover:bg-green-800 transition">
            View All Blogs
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedBlog;
