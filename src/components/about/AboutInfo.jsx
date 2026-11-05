import { useState, useEffect } from "react";

const heroImage = "/images/herobg1.avif";

const AboutInfo = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const shouldShowExpanded = isExpanded || isMobile;
  return (
    <div className={`relative w-full bg-[#080808] text-[#F1F0EC] ${isMobile ? 'h-auto min-h-screen' : (isExpanded ? 'h-auto min-h-screen overflow-y-auto' : 'h-screen overflow-hidden')}`}>
      {/* =====================================================
          RIGHT SIDE LABEL
      ====================================================== */}

      <div
        data-about-info-side
        data-about-vertical
        className="
          absolute
          right-[2.2vw]
          top-1/2
          z-30
          hidden
          -translate-y-1/2
          items-center
          lg:flex
        "
      >
        <div className="flex h-[72vh] items-center gap-4">
          <div className="h-full w-px bg-white/[0.10]" />

          <span
            className="
              rotate-90
              whitespace-nowrap
              font-[doner]
              text-[9px]
              uppercase
              tracking-[0.24em]
              text-white/[0.42]
            "
          >
            About
          </span>
        </div>
      </div>

      {/* =====================================================
          LEFT CONTENT
      ====================================================== */}

      <div
        className="
          relative
          z-20
          flex
          h-full
          w-full
          flex-col
          justify-start

          px-[6vw]
          pt-[8vh]
          pb-[6vh]

          lg:w-[56%]
          lg:px-[5vw]
          lg:pr-[4vw]
          min-h-screen
        "
      >
        {/* ===================================================
            LABEL
        ==================================================== */}

        <div
          data-about-info-label
          data-about-label
          className="
            mb-8
            flex
            items-center
            gap-3
          "
        >
          <span
            className="
              font-[doner]
              text-[9px]
              tracking-[0.18em]
              text-white/[0.32]
            "
          >
            01
          </span>

          <span
            className="
              h-px
              w-7
              bg-red-500/[0.65]
            "
          />

          <span
            className="
              font-[doner]
              text-[9px]
              uppercase
              tracking-[0.24em]
              text-white/[0.48]
            "
          >
            About
          </span>
        </div>

        {/* ===================================================
            MAIN STATEMENT
        ==================================================== */}

        <div
          data-about-info-title
          data-about-text
          className="
            max-w-[880px]

            font-[Arial]
            font-normal

            text-[clamp(2.15rem,3.65vw,4.45rem)]
            leading-[1.03]
            tracking-[-0.048em]

            text-[#F1F0EC]
          "
        >
          Madhan Mohan Reddy Peram
        </div>

        {/* ===================================================
            SINGLE SUPPORTING PARAGRAPH
        ==================================================== */}

        <p
          data-about-info-paragraph
          data-about-description
          className="
            mt-5
            max-w-[600px]

            font-[doner]
            text-[11px]
            leading-[1.75]
            tracking-[0.01em]

            text-white/[0.52]

            sm:text-xs
            md:text-[13px]
          "
        >
          Engineer by logic, developer by passion and innovator by curiosity. 
          <br />
          Crafting intelligent applications through AI & Modern Web Technologies.
        </p>

        {/* ===================================================
            HORIZONTAL META
        ==================================================== */}

        <div
          data-about-info-meta
          data-about-meta
          className="
            mt-10

            flex
            items-center
            whitespace-nowrap
            overflow-hidden

            font-[doner]
            text-[8px]
            uppercase
            tracking-[0.18em]
            text-white/[0.42]

            sm:text-[9px]
          "
        >
          <span
            className="
              transition-colors
              duration-300
              hover:text-white/[0.85]
            "
          >
            ENGINEERING
          </span>

          <span className="mx-4 h-3 w-px shrink-0 bg-red-500/[0.65]" />

          <span
            className="
              transition-colors
              duration-300
              hover:text-white/[0.85]
            "
          >
            TECHNOLOGY
          </span>

          <span className="mx-4 h-3 w-px shrink-0 bg-red-500/[0.65]" />

          <span
            className="
              transition-colors
              duration-300
              hover:text-white/[0.85]
            "
          >
            CUDDAPAH, ANDHRA PRADESH, INDIA
          </span>

          <span className="mx-4 h-3 w-px shrink-0 bg-red-500/[0.65]" />

          <span
            className="
              text-white/[0.62]
              transition-colors
              duration-300
              hover:text-white/[0.9]
            "
          >
            AVAILABLE WORLDWIDE
          </span>
        </div>

        {/* ===================================================
            EDUCATIONAL BACKGROUND (EXPANDABLE)
        ==================================================== */}

        {shouldShowExpanded && (
          <div
            className="
              mt-4
              space-y-4
              border-t
              border-white/[0.1]
              pt-5
              pb-4
            "
          >
            <div className="text-[#F1F0EC]/60 font-[doner] text-[9px] uppercase tracking-[0.18em mb-6">
              Educational Background
            </div>

            {/* Education Item 1 */}
            <div className="border-l-2 border-red-500/30 pl-4">
              <h3 className="font-[doner] text-xs uppercase tracking-[0.14em] text-white mb-2">
                Bachelor of Technology
              </h3>
              <p className="text-white/[0.7] text-[11px] mb-1">
                Kalasalingam University
              </p>
              <p className="text-white/[0.5] text-[10px] leading-relaxed mb-2">
                Pursuing an intensive Computer Science & Engineering curriculum focusing on Artificial Intelligence & Machine Learning.
              </p>
              <div className="flex gap-4 text-[9px] text-white/[0.4]">
                <span>2022-2026</span>
                <span>•</span>
                <span>CGPA: 8.25 / 10</span>
              </div>
            </div>

            {/* Education Item 2 */}
            <div className="border-l-2 border-red-500/30 pl-4">
              <h3 className="font-[doner] text-xs uppercase tracking-[0.14em] text-white mb-2">
                Higher Secondary Education
              </h3>
              <p className="text-white/[0.7] text-[11px] mb-1">
                Narayana Junior College
              </p>
              <p className="text-white/[0.5] text-[10px] leading-relaxed mb-2">
                Completed rigorous pre-university curriculum with focus on Mathematics, Physics and Chemistry with building strong mathematical modeling and analytical reasoning skills.
              </p>
              <div className="flex gap-4 text-[9px] text-white/[0.4]">
                <span>2020-2022</span>
                <span>•</span>
                <span>Percentage: 84.20  / 100</span>
              </div>
            </div>

            {/* Education Item 3 */}
            <div className="border-l-2 border-red-500/30 pl-4">
              <h3 className="font-[doner] text-xs uppercase tracking-[0.14em] text-white mb-2">
                Secondary School Education
              </h3>
              <p className="text-white/[0.7] text-[11px] mb-1">
                Swamy Vivekananda E.M & T.M High School
              </p>
              <p className="text-white/[0.5] text-[10px] leading-relaxed mb-2">
                Graduated with near-perfect academic distinction, demonstrating consistent commitment to academic discipline, analytical excellence and teamwork.
              </p>
              <div className="flex gap-4 text-[9px] text-white/[0.4]">
                <span>2019-2020</span>
                <span>•</span>
                <span>Percentage: 99.33 / 100</span>
              </div>
            </div>

            {/* Continuous Learning Card (Mobile Only) */}
            {isMobile && (
              <div className="border border-white/[0.15] p-4 bg-white/[0.02] mb-4">
                <h3 className="font-[doner] text-xs uppercase tracking-[0.14em] text-white mb-2">
                  Continuous Learning
                </h3>
                <p className="text-white/[0.5] text-[10px] leading-relaxed">
                  Always exploring new technologies and participating in hackathons to expand my knowledge and practical experience.
                </p>
              </div>
            )}

            {/* ===================================================
                LESS BUTTON (AT BOTTOM)
            ==================================================== */}

            {!isMobile && (
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="
                  mt-6
                  inline-flex
                  items-center
                  gap-3
                  font-[doner]
                  text-[10px]
                  uppercase
                  tracking-[0.16em]
                  text-[#F1F0EC]/80
                  transition-colors
                  duration-300
                  hover:text-[#F1F0EC]
                  sm:text-[11px]
                "
              >
                <span>
                  Less
                </span>

                <span
                  className="
                    transition-transform
                    duration-300
                  "
                  style={{
                    transform: 'rotate(45deg)'
                  }}
                >
                  ↓
                </span>
              </button>
            )}
          </div>
        )}

        {/* ===================================================
            MORE BUTTON (WHEN COLLAPSED)
        ==================================================== */}

        {!isExpanded && !isMobile && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="
              mt-8
              inline-flex
              items-center
              gap-3
              font-[doner]
              text-[10px]
              uppercase
              tracking-[0.16em]
              text-[#F1F0EC]/80
              transition-colors
              duration-300
              hover:text-[#F1F0EC]
              sm:text-[11px]
            "
          >
            <span>
              More
            </span>

            <span
              className="
                transition-transform
                duration-300
              "
            >
              ↗
            </span>
          </button>
        )}
      </div>

      {/* =====================================================
          RIGHT PORTRAIT
          
          DO NOT TOUCH THIS.
      ====================================================== */}

      <div
        data-about-info-portrait
        data-about-info-image
        className="
          absolute
          right-0
          top-0
          hidden
          h-full
          w-[46%]
          overflow-hidden
          lg:block
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

            opacity-90
            saturate-[0.9]
            contrast-[1.02]
            brightness-[0.92]

            will-change-transform
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            inset-y-0
            left-0
            w-[38%]
            bg-gradient-to-r
            from-[#080808]
            via-[#080808]/60
            to-transparent
          "
        />

        <div
          className="
            pointer-events-none
            absolute
            inset-0
            bg-red-900/8
            mix-blend-screen
          "
        />
      </div>
    </div>
  );
};

export default AboutInfo;