import React, {
  useLayoutEffect,
  useRef,
  useState,
  useEffect,
} from "react";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const heroImage = "/images/herobg1.avif";

const journeyData = [
  {
    year: "2022",
    tag: "Origin",
    title: "Programming Foundation at University",
    description: "Began learning programming fundamentals & Problem Solving."
  },
  {
    year: "2023",
    tag: "Growth",
    title: "Built Academic Projects",
    description: "Started developing comprehensive python based applications."
  },
  {
    year: "2024",
    tag: "Experience",
    title: "AI Developer Internship",
    description: "Worked at Viswam AI contributing to Bhashaverse and Artificial Intelligence related workflows."
  },
  {
    year: "2025",
    tag: "Training",
    title: "Full Stack Development Training at matrimony.com",
    description: "Training Led by Industry Experts — From Core Fundamentals to Production-Ready Systems."
  },
  {
    year: "2026",
    tag: "Today",
    title: "Engineering Graduate",
    description: "Graduating with Hands-On Experience in Core Programming and Full-Stack Development."
  }
];

const AboutVisual = () => {
  const sectionRef = useRef(null);
  const timelineRef = useRef(null);

  const labelRef = useRef(null);
  const hintRef = useRef(null);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useLayoutEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();

      /*
       * ==========================================================
       * REDUCED MOTION
       * ==========================================================
       */

      mm.add(
        "(prefers-reduced-motion: reduce)",
        () => {
          gsap.set(
            [
              labelRef.current,
              ...statementWordsRef.current,
              hintRef.current,
            ],
            {
              opacity: 1,
              y: 0,
              filter: "blur(0px)",
            }
          );
        }
      );

      /*
       * ==========================================================
       * NORMAL MOTION
       * ==========================================================
       */

      mm.add(
        "(prefers-reduced-motion: no-preference)",
        () => {
          const resetAbout = () => {
            gsap.set(labelRef.current, {
              opacity: 0,
              y: 14,
            });

            gsap.set(hintRef.current, {
              opacity: 0,
              y: 14,
            });
          };

          resetAbout();

          const aboutTimeline = gsap.timeline({
            paused: true,
          });

          aboutTimeline
            .to(labelRef.current, {
              opacity: 1,
              y: 0,
              duration: 0.6,
              ease: "power3.out",
            })
            .to(
              hintRef.current,
              {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: "power3.out",
              },
              "-=0.3"
            );

          ScrollTrigger.create({
            trigger: section,
            start: "top 72%",
            end: "bottom top",

            onEnter: () => {
              aboutTimeline.restart();
            },

            onEnterBack: () => {
              aboutTimeline.restart();
            },

            onLeaveBack: () => {
              aboutTimeline.pause(0);
              resetAbout();
            },
          });
        }
      );

      return () => mm.revert();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="
        relative
        h-auto
        min-h-screen
        w-full
        overflow-hidden
        bg-black
        py-20
      "
    >
      {/* ==========================================================
          IMAGE
          ========================================================== */}

      <div
        data-about-visual-image
        className="
          absolute
          inset-0
          overflow-hidden
        "
      >
        <img
          src={heroImage}
          alt=""
          draggable="false"
          className="
            h-full
            w-full
            object-cover
            object-center
            opacity-[0.56]
            grayscale
            contrast-[1.05]
            will-change-transform
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-black/25
          "
        />

        <div
          className="
            absolute
            inset-0
            bg-gradient-to-b
            from-black/15
            via-transparent
            to-black/60
          "
        />
      </div>

      {/* ==========================================================
          RED ATMOSPHERE
          ========================================================== */}

      <div
        className="
          pointer-events-none
          absolute
          left-1/2
          top-1/2
          h-[65vw]
          w-[65vw]
          -translate-x-1/2
          -translate-y-1/2
          rounded-full
          bg-red-700/12
          blur-[150px]
        "
      />

      {/* ==========================================================
          LABEL
          ========================================================== */}

      <div
        ref={labelRef}
        data-about-visual-label
        className="
          absolute
          left-[5vw]
          top-[7vh]
          z-20
        "
      >
        <div className="flex items-center gap-3">
          <span
            className="
              font-[doner]
              text-[9px]
              tracking-[0.18em]
              text-white/35
            "
          >
            02
          </span>

          <span
            className="
              h-px
              w-7
              bg-white/20
            "
          />

          <span
            className="
              font-[doner]
              text-[9px]
              uppercase
              tracking-[0.22em]
              text-white/50
            "
          >
            Journey
          </span>
        </div>
      </div>

      {/* ==========================================================
          TIMELINE
          ========================================================== */}

      <div
        ref={timelineRef}
        className="
          relative
          z-20
          w-[90vw]
          mx-auto
          pt-20
          md:pt-24
          pb-20
        "
      >
        {/* Desktop Timeline */}
        <div className="hidden md:block">
          <div className="relative">
            {journeyData.map((item, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div
                  key={index}
                  className={`relative ${index < journeyData.length - 1 ? 'pb-24' : ''}`}
                >
                  {/* Connecting line to next dot */}
                  {index < journeyData.length - 1 && (
                    <div className="absolute left-1/2 top-[14px] -translate-x-1/2 w-px h-full bg-white/10" />
                  )}

                  <div className="grid grid-cols-[1fr_56px_1fr]">
                    {/* Left side */}
                    <div className={`flex ${isLeft ? 'justify-end pr-12' : 'justify-start pl-12'}`}>
                      {isLeft && (
                        <div className="max-w-[300px] text-right">
                          <div className="font-[doner] text-[10px] tracking-[0.16em] text-red-500/80 mb-2">
                            {item.year}
                          </div>
                          <div className="inline-block mb-2">
                            <span className="font-[doner] text-[9px] tracking-[0.12em] text-red-500/60 uppercase px-2 py-1 border border-red-500/20">
                              {item.tag}
                            </span>
                          </div>
                          <h3 className="font-[doner] text-lg font-semibold tracking-[-0.02em] text-white mb-2">
                            {item.title}
                          </h3>
                          <p className="text-white/50 text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      )}
                    </div>

                    {/* Center dot */}
                    <div className="flex justify-center">
                      <div className="w-3 h-3 rounded-full bg-black border-2 border-red-500/50 relative z-10 mt-2" />
                    </div>

                    {/* Right side */}
                    <div className={`flex ${!isLeft ? 'justify-start pl-12' : 'justify-end pr-12'}`}>
                      {!isLeft && (
                        <div className="max-w-[300px] text-left">
                          <div className="font-[doner] text-[10px] tracking-[0.16em] text-red-500/80 mb-2">
                            {item.year}
                          </div>
                          <div className="inline-block mb-2">
                            <span className="font-[doner] text-[9px] tracking-[0.12em] text-red-500/60 uppercase px-2 py-1 border border-red-500/20">
                              {item.tag}
                            </span>
                          </div>
                          <h3 className="font-[doner] text-lg font-semibold tracking-[-0.02em] text-white mb-2">
                            {item.title}
                          </h3>
                          <p className="text-white/50 text-sm leading-relaxed">
                            {item.description}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mobile Timeline */}
        <div className="md:hidden">
          <div className="relative">
            {journeyData.map((item, index) => (
              <div
                key={index}
                className={`relative pl-8 ${index < journeyData.length - 1 ? 'pb-16' : ''}`}
              >
                {/* Connecting line to next dot */}
                {index < journeyData.length - 1 && (
                  <div className="absolute left-3 top-[10px] -translate-x-1/2 w-px h-full bg-white/10" />
                )}

                {/* Mobile dot */}
                <div className="absolute left-3 top-1 w-3 h-3 -translate-x-1/2 rounded-full bg-black border-2 border-red-500/50 z-10" />

                <div className="font-[doner] text-[10px] tracking-[0.16em] text-red-500/80 mb-2">
                  {item.year}
                </div>
                <div className="inline-block mb-2">
                  <span className="font-[doner] text-[9px] tracking-[0.12em] text-red-500/60 uppercase px-2 py-1 border border-red-500/20">
                    {item.tag}
                  </span>
                </div>
                <h3 className="font-[doner] text-base font-semibold tracking-[-0.02em] text-white mb-2">
                  {item.title}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ==========================================================
          HINT
          ========================================================== */}

      <div
        ref={hintRef}
        data-about-visual-hint
        className="
          absolute
          bottom-[6vh]
          left-1/2
          z-20
          -translate-x-1/2
        "
      >
        <div className="flex items-center gap-3">
          <span
            className="
              h-px
              w-7
              bg-white/20
            "
          />

          <span
            className="
              font-[doner]
              text-[8px]
              uppercase
              tracking-[0.23em]
              text-white/35
            "
          >
            Keep scrolling
          </span>

          <span
            className="
              h-px
              w-7
              bg-white/20
            "
          />
        </div>
      </div>
    </div>
  );
};

export default AboutVisual;