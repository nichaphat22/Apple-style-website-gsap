import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useMediaQuery } from "react-responsive";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const Showcase = () => {
  const isTablet = useMediaQuery({query:'(max-width: 1024px)'});

  useGSAP(() => {
    if(!isTablet){
      const timeline = gsap.timeline({
        scrollTrigger: {
          trigger: '#showcase',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
          pin: true,
        }
      });
      timeline.to('.mask img', {
        scale: 1.1
      }).to('.content', {opacity: 1, y: 0, ease: 'power1.in'});
    }
  }, [isTablet])
  return (
    <section id="showcase">
      <div className="media">
        <video src="/videos/game.mp4" loop muted autoPlay playsInline />

        <div className="mask">
          <img src="/mask-logo.svg" />
        </div>
      </div>

      <div className="content">
        <div className="wrapper">
          <div className="lg:max-w-md">
            <h2>RocKet Chip</h2>

            <div className="space-y-5 mt-7 pe-10">
              <p>
                Introducing {" "}
                <span className="text-white">
                  M4, the next generation of Apple silicon 
                </span>
                . M4 powers
              </p>

              <p>
                It delivers incredible performance and efficiency, with a powerful 8-core CPU, an advanced 10-core GPU, and a 16-core Neural Engine. With M4, you can experience lightning-fast performance, stunning graphics, and seamless multitasking like never before.
              </p>

              <p>
                A brand new architecture designed by Apple, M4 is built to handle the most demanding tasks with ease. Whether you're editing 4K video, playing graphics-intensive games, or running multiple apps simultaneously, M4 delivers the power and efficiency you need to get things done.
              </p>

              <p className="text-primary">Learn more about Apple Intelligence</p>
            </div>
          </div>

          <div className="max-w-3xs space-y-14">
            <div className="space-y-2">
              <p>Up to</p>
              <h3>4x faster</h3>
              <p>pro rendering performance then M2</p>
            </div>

            <div className="space-y-2">
              <p>Up to</p>
              <h3>1.5x faster</h3>
              <p>CPU performance then M2</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Showcase;
