import React from "react";

const ScrollToTopButton = () => {
  return (
    <div className="scroll-button">
      <button
        onClick={() => {
          window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
        }}
      >
        Scroll to Top
      </button>
    </div>
  );
};

export default ScrollToTopButton;
