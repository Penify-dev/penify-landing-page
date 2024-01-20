import { trackVideoStart } from "@/utils/gtag";
import React, { forwardRef, useEffect, useRef } from "react";

// used function expression for working of scrolling effect
const Tour = forwardRef<HTMLDivElement, { videoSrc: string }>(function (
  { videoSrc },
  ref
) {
  const videoRef = useRef<HTMLDivElement>(null);

  // whenever scrolled within video view, autoplay is true
  // whenever scrolled outside video view, autoplay is false
  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            trackVideoStart(true);
          } else {
            trackVideoStart(false);
          }
        });
      },
      { threshold: 0.2 }
    );

    const observe = () => {
      if (videoRef.current) {
        obs.observe(videoRef.current);
      }
    };

    const unobserve = () => {
      if (videoRef.current) {
        obs.unobserve(videoRef.current);
      }
    };

    observe();

    return () => {
      unobserve();
    };
  }, []);

  return (
    <section className="section tour" ref={ref}>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="tour__frame hovered">
              <div className="frame__top">
                <div className="mac__btns">
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle cx="6" cy="6" r="6" fill="#FF605C" />
                  </svg>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="6"
                      cy="6"
                      r="6"
                      fill="#FFBD44"
                      fillOpacity="0.866667"
                    />
                  </svg>
                  <svg
                    width="12"
                    height="12"
                    viewBox="0 0 12 12"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <circle
                      cx="6"
                      cy="6"
                      r="6"
                      fill="#00CA4E"
                      fillOpacity="0.866667"
                    />
                  </svg>
                </div>

                <div className="mac__title">
                  Snorkell.ai Documentation Generator
                </div>

                <div className="mac__code">
                  <svg
                    width="28"
                    height="18"
                    viewBox="0 0 28 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M8.99967 2.33331L2.33301 8.48715L8.99967 15.6666M18.9997 2.33331L25.6663 8.48715L18.9997 15.6666"
                      stroke="#445268"
                      strokeWidth="3.33333"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
              </div>
              
              <div className="frame__mid" ref={videoRef}>
                <iframe
                  loading="lazy"
                  src={videoSrc}
                  height="480"
                  title="Snorkell Trailer"
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
});

export default Tour;
