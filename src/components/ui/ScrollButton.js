import React from "react";

const ScrollButton = () => {
  return (
    <div className="scroll-button">
      <button
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
      >
        Scrool to Top
      </button>
    </div>
  );
};

export default ScrollButton;
