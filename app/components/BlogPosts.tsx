import React from "react";
import * as motion from "motion/react-client";
import posts from "@/data/blogPost.json";

const BlogPosts = () => {
  return (
    <motion.section
      className="bento-card p-4 col-span-1 md:col-span-4 space-y-2 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <h2 className="text-2xl font-bold mb-6 border-b border-gray-800 pb-2">
        Blog Posts
      </h2>
      <div className="space-y-6">
        {posts.map((post, idx) => (
          <a
            key={idx}
            href={post.link}
            className="block p-4 bg-gray-800 rounded hover:bg-gray-700 transition"
          >
            <h3 className="text-lg font-semibold">{post.title}</h3>
            <p className="text-sm text-gray-400 mt-1">{post.summary}</p>
          </a>
        ))}
      </div>
    </motion.section>
  );
};

export default BlogPosts;
