import React, { useEffect, useState } from "react";
import "./about.css";
import videoSrc from '../../assets/WebsiteVideo.mp4';

const images = [
  [
    "https://images.unsplash.com/photo-1531398574919-7ebcf655bb4c?q=80&w=5070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit officiis, architecto aut sequi laborum et laudantium eveniet.",
  ],
  [
    "https://images.unsplash.com/photo-1531959870249-9f9b729efcf4?q=80&w=4854&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Velit officiis, architecto aut sequi laborum et laudantium eveniet. Quisquam, minus, odio unde a incidunt sequi voluptas reiciendis earum eligendi natus omnis.",
  ],
  [
    "https://images.unsplash.com/photo-1564731071754-001b53a902fb?q=80&w=3870&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Velit officiis Quisquam, minus, odio unde a incidunt sequi voluptas reiciendis earum eligendi natus omnis.",
  ],
  [
    "https://images.unsplash.com/photo-1475372674317-8003c861cb6a?q=80&w=3774&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "Lorem Quisquam, minus, odio unde a incidunt sequi voluptas reiciendis earum eligendi natus omnis.",
  ],
  [
    "https://images.unsplash.com/photo-1628626969172-74f95362400f?q=80&w=3771&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "dolor sit amet consectetur Quisquam, minus, odio unde a incidunt sequi voluptas reiciendis earum eligendi natus omnis.",
  ],
];

const About = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    const aboutSection = document.getElementById("about");
    const totalScroll = aboutSection.scrollTop;
    const sectionHeight = aboutSection.scrollHeight - aboutSection.clientHeight;
    const scroll = totalScroll / sectionHeight;

    setScrollProgress(scroll);
  };

  useEffect(() => {
    const aboutSection = document.getElementById("about");
    aboutSection.addEventListener("scroll", handleScroll);

    return () => {
      aboutSection.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [transformStyle, setTransformStyle] = useState(
    'perspective(1200px) scaleX(0.5) scaleY(0.8) rotateX(28deg)'
  );

  useEffect(() => {
    const handleScroll = () => {
      const section = document.querySelector('#landing-image');
      if (section) {
        const rect = section.getBoundingClientRect();
        const windowHeight = window.innerHeight;

        if (rect.top < windowHeight && rect.bottom > 0) {
          const progress = Math.max(0, Math.min(1, 1 - rect.top / windowHeight));

          const perspective = 1200;
          const translateY = 20 * (1 - progress);
          const scaleX = 0.8 + 0.2 * progress;
          const scaleY = 0.8 + 0.2 * progress;
          const rotateX = 28 * (1 - progress);

          setTransformStyle(
            `perspective(${perspective}px) translateY(${translateY}px) scaleX(${scaleX}) scaleY(${scaleY}) rotateX(${rotateX}deg)`
          );
        } else if (rect.top > windowHeight) {
          setTransformStyle('perspective(1200px) scaleX(0.8) scaleY(0.8) rotateX(28deg)');
        } else if (rect.bottom < 0) {
          setTransformStyle('perspective(1200px) scaleX(1) scaleY(1) rotateX(0deg)');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="bg-gradient-to-b flex from-gray-800 to-black">
      <div className="w-full md:w-2/5 mt-40">
        <div className="title w-full items-center text-center font-light text-5xl">
          <span>FEATURES</span>
        </div>
        <div className=" h-screen flex items-center p-6 md:p-16 w-full">
          <div
            id="about"
            className="rounded-lg flex flex-col justify-evenly items-center scrollbar-hide overflow-y-scroll h-full p-4 w-full border"
          >
            {images.map((src, index) => (
              <div
                className="aboutdiv flex w-full items-center justify-center"
                key={index}
              >
                <div
                  className={
                    "border w-full rounded-3xl md:m-12 p-4 shadow-2xl bg-gradient-to-b from-gray-950 to-gray-800 flex flex-col justify-evenly items-center"
                  }
                  id={index + 1}
                >
                  <img
                    src={src[0]}
                    className="rounded-3xl objchild"
                    style={{ width: "250px", height: "250px" }}
                    alt={`Image ${index + 1}`}
                  />
                  <div className="AboutText flex w-4/5 h-60 text-center items-center">
                    <span> {src[1]}</span>
                  </div>
                </div>{" "}
              </div>
            ))}
          </div>
          <div className=" h-full w-1">
            <div className=" w-full h-full bg-gray-800">
              <div
                className="bg-gradient-to-b from-cyan-900 to-cyan-100 w-full"
                style={{ height: `${scrollProgress * 100}%` }}
              ></div>
            </div>
          </div>
        </div>
      </div>
      <div className="w-3/5 hidden md:flex items-center mt-40">
        <div
          id="landing-image"
          className="hidden md:flex w-full justify-center rounded-md bg-background "
          style={{
            transformStyle: 'preserve-3d',
            transformOrigin: 'center top',
            transform: transformStyle,
          }}
        >
          <video
            src={videoSrc}
            className="rounded-md w-full shadow-md duration-500 animate-in fade-in h-auto hover:shadow-lg"
            autoPlay
            muted
            loop
          />
        </div>
      </div>
    </div>
  );
};

export default About;
