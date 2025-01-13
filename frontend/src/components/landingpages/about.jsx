import React, {useState } from "react";
import { motion } from "framer-motion";
import videoSrc from "../../assets/WebsiteVideo.mp4";
import placeholder from "../../assets/placeholder.png";

const FeatureCard = ({ image, description, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.1 }}
    className="w-full max-w-2xl mx-auto"
  >
    <div className="relative group rounded-2xl overflow-hidden border border-gray-800 bg-gradient-to-b from-gray-900 to-gray-800 p-6 transition-all duration-300 hover:border-cyan-900/50 hover:shadow-lg hover:shadow-cyan-900/20">
      <div className="absolute inset-0 bg-gradient-to-b from-cyan-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
      
      <div className="flex flex-col md:flex-row gap-6 items-center relative z-2">
        <div className="w-full md:w-1/2 overflow-hidden rounded-xl">
          <img
            src={placeholder}
            alt="Feature"
            className="w-full h-64 object-cover transform transition-transform duration-300 group-hover:scale-105"
          />
        </div>
        
        <div className="w-full md:w-1/2 space-y-4">
          <h3 className="text-xl font-semibold bg-gradient-to-r from-cyan-400 to-[#64ffda] bg-clip-text text-transparent">
            Feature {index + 1}
          </h3>
          <p className="text-gray-300 leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </div>
  </motion.div>
);

const VideoSection = ({ videoSrc }) => {
  const [isInView, setIsInView] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.8, rotateX: 40 }}
      animate={{ 
        opacity: isInView ? 1 : 0,
        scale: isInView ? 1 : 0.8,
        rotateX: isInView ? 0 : 40
      }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="sticky top-24 w-full max-w-3xl mx-auto"
      onViewportEnter={() => setIsInView(true)}
      onViewportLeave={() => setIsInView(false)}
    >
      <div className="relative rounded-2xl overflow-hidden shadow-2xl">
        <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 to-transparent"></div>
        <video
          src={videoSrc}
          className="w-full h-auto rounded-2xl"
          autoPlay
          muted
          loop
          playsInline
        />
      </div>
    </motion.div>
  );
};

const ScrollProgress = ({ progress }) => (
  <div className="fixed left-4 top-1/2 transform -translate-y-1/2 h-48 w-1">
    <div className="h-full w-full bg-gray-800/30 rounded-full">
      <div
        className="w-full bg-gradient-to-b from-cyan-400 to-[#64ffda] rounded-full transition-all duration-200"
        style={{ height: `${progress * 100}%` }}
      />
    </div>
  </div>
);

const About = () => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  const handleScroll = (e) => {
    const element = e.target;
    const scrolled = element.scrollTop;
    const height = element.scrollHeight - element.clientHeight;
    setScrollProgress(scrolled / height);
  };

  const features = [
    {
      image: {placeholder},
      description: "Master algorithmic problem-solving with our comprehensive learning paths and structured curriculum."
    },
    {
      image: {placeholder},
      description: "Practice with carefully curated problems that progressively build your competitive programming skills."
    },
    {
      image: {placeholder},
      description: "Get instant feedback and detailed explanations to understand complex algorithms and data structures."
    },
    {
      image: {placeholder},
      description: "Join a community of passionate programmers and learn from peer discussions and expert insights."
    },
    {
      image: {placeholder},
      description: "Track your progress with detailed analytics and performance metrics to identify areas for improvement."
    }
  ];

  return (
    <div id="about" className="min-h-96 bg-gradient-to-b from-gray-900 to-black">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-cyan-400 to-[#64ffda] bg-clip-text text-transparent">
            Why Choose Us
          </h2>
          <p className="mt-4 text-gray-400 max-w-2xl mx-auto">
            Discover how our platform can help you excel in competitive programming
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 items-start">
          <div 
            className="space-y-8 overflow-y-auto max-h-80 pr-4 scrollbar-hide"
            onScroll={handleScroll}
          >
            {features.map((feature, index) => (
              <FeatureCard
                key={index}
                image={feature.image}
                description={feature.description}
                index={index}
              />
            ))}
          </div>

          <div className="hidden lg:block">
            <VideoSection videoSrc={videoSrc} />
          </div>
        </div>
      </div>

      <ScrollProgress progress={scrollProgress} />
    </div>
  );
};

export default About;