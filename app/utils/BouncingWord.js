import React, { useEffect, useRef } from "react";

const BouncingWord = ({ text }) => {
  const targetRef = useRef(null);

  useEffect(() => {
    const container = targetRef.current;

    const handleScroll = () => {
      const letters = container.querySelectorAll(".bouncing-letter");
      const viewportHeight = (window.innerHeight - 20);

      letters.forEach((letter, index) => {
        //returns a DOMRec object with top and bottom dimension properties
        const rect = letter.getBoundingClientRect();
        const isInViewport = rect.top >= 0 && rect.bottom <= viewportHeight;

        if (isInViewport) {
          if (!letter.classList.contains("played")) {
            letter.classList.add("played");
            letter.style.animation = `bounce 0.5s ${index * 0.1}s forwards`; // forwards to keep the last keyframe state
          }
        } else {
          letter.classList.remove("played");
          letter.style.animation = "";
        }
      });
    };

    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initial check
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const letterElements = text.split("").map((letter, index) => (
    <span key={index} className="inline-block">
      {letter}
    </span>
  ));

  return (
    <div className="flex items-center justify-center" ref={targetRef}>
      {letterElements}
    </div>
  );
};
 
export default BouncingWord;
