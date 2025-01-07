import React from "react";
import "./loader.css";

export function Loader() {
  return (
    <div className="flex flex-col items-center justify-center gap-4">
    <div className="wrapper">
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="circle"></div>
      <div className="shadow"></div>
      <div className="shadow"></div>
      <div className="shadow"></div>
    </div>
    <div>
      <h1 className="text-cyan-400 text-xl">Loading...</h1>
    </div>
    </div>
  );
}
