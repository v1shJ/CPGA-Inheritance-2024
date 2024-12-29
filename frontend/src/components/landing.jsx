import React from "react";
import "./landingpages/button.css";
import "animate.css";
import MyNavbar from "./landingpages/navbar";
import About from "./landingpages/about";
import LandingPage from "./landingpages/LandingPage";
import Footer from "./Footer";
import Testimonials from "./landingpages/testimonials";
import FAQ from "./landingpages/FAQ";

const Landing = () => {
  return (
    <div>
      <div>
        <MyNavbar />
      </div>
      <div>
        <LandingPage />
      </div>
      <div>
        <About />
      </div>
      <div>
        <FAQ />
      </div>
      <div>
        <Testimonials />
      </div>
      <div>
        <Footer />
      </div>
    </div>
  );
};

export default Landing;
