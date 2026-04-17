import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  performanceImages,
  performanceImgPositions,
} from "../constants/index.js";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

const Performance = () => {
  const isMobile = useMediaQuery({ query: "(max-width: 1024px)" });
  const sectionRef = useRef(null);

  useGSAP(
    () => {
      // Text animation - fade in and move up on scroll
      gsap.fromTo(
        ".content p",
        { opacity: 0, y: 10 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: ".content p",
            start: "top bottom",
            end: "top center",
            scrub: true,
            invalidateOnRefresh: true,
          },
        },
      );

      if (isMobile) return;
      // Image timeline - only on desktop
      const tl = gsap.timeline({
        defaults: { ease: "power1.inOut", duration: 2, overwrite: "auto" },
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top bottom",
          end: "center center",
          scrub: true,
          invalidateOnRefresh: true,
        },
      });

      performanceImgPositions.forEach((pos) => {
        if (pos.id === "p5") {
          // p5 แสดง static ไม่มี animation
          gsap.set(".p5", { autoAlpha: 1 });
          return;
        }
        gsap.set(`.${pos.id}`, { y: 100, autoAlpha: 0 });

        const toVars = { y: 0, autoAlpha: 1 };
        if (pos.left !== undefined) toVars.left = `${pos.left}%`;
        if (pos.right !== undefined) toVars.right = `${pos.right}%`;
        if (pos.bottom !== undefined) toVars.bottom = `${pos.bottom}%`;
        if (pos.transform !== undefined) toVars.transform = pos.transform;

        tl.to(`.${pos.id}`, toVars, 0);
      });
      return () => {
        tl.scrollTrigger && tl.scrollTrigger.kill();
        tl.kill();
      };
    },
    { scope: sectionRef, dependencies: [isMobile] },
  );

  return (
    <section id="performance" ref={sectionRef}>
      <h2>Next-level graphics performance. Game on.</h2>

      <div className="wrapper">
        {performanceImages.map(({ id, src }) => (
          <img
            key={id}
            className={id}
            src={src}
            alt={id}
          />
        ))}
      </div>

      <div className="content">
        <p>
          Run the latest games with up to 8K resolution, or connect to an
          external display with up to 6K resolution.{" "}
          <span>
            The M2 Pro and M2 Max chips deliver up to 38% faster graphics
            performance than the previous generation,
          </span>{" "}
          so you can edit complex timelines in Final Cut Pro, render 3D models
          in Cinema 4D, and play graphics-intensive games with ease.
        </p>
      </div>
    </section>
  );
};

export default Performance;
