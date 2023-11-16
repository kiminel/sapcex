import { useState, useEffect, useRef } from "react";
import { Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";

const CountOnScroll = ({ numberToCount }) => {
  const [count, setCount] = useState(0);
  const targetRef = useRef(null);

  const theme = useTheme();
  const isMediumScreen = useMediaQuery(theme.breakpoints.down("md"));
  const variant = isMediumScreen ? "h2" : "h1";

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const observer = new IntersectionObserver(([entry]) => {
      //targetRef.current enters the viewport
      if (entry.isIntersecting) {
        let startTimestamp = null;
        const duration = 2000;

        //counting animation that will trigger repeatedly as the animation progress
        const step = (timestamp) => {
          //if the startTimestamp is falsy, the animation has triggered and the timestamp is updated
          if (!startTimestamp) startTimestamp = timestamp;
          //control time in milliseconds
          const progress = timestamp - startTimestamp;
          setCount(
            Math.min(
              Math.ceil((numberToCount * progress) / duration),
              numberToCount
            )
          );
          if (progress < duration) {
            requestAnimationFrame(step);
          }
        };
        //call process outside of the step-function to initiate animation loop
        requestAnimationFrame(step);
      }
    }, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (observer && targetRef.current) {
        observer.unobserve(targetRef.current);
      }
    };
  }, [numberToCount]);

  return (
    <div ref={targetRef}>
      <Typography variant={variant}>{count}</Typography>
    </div>
  );
};

export default CountOnScroll;
