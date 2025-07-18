import React from "react";
import * as motion from "motion/react-client";
import recommendations from "@/data/recommendation.json";

const Recommendation = () => {
  return (
    <motion.section
      className="bento-card p-4 col-span-1 md:col-span-3 space-y-2 group"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl font-bold mb-6 border-b border-gray-800 pb-2">
        Recommendations
      </h2>
      <div className="space-y-6">
        {recommendations.map((rec, idx) => (
          <blockquote
            key={idx}
            className="border-l-4 border-yellow-500 pl-4 text-gray-300 italic"
          >
            <p>“{rec.text}”</p>
            <footer className="mt-2 text-sm text-gray-400">
              — {rec.author}
            </footer>
          </blockquote>
        ))}
      </div>
    </motion.section>
  );
};

export default Recommendation;
