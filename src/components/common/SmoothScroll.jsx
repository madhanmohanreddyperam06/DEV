// src/components/SmoothScroll.jsx
import { ReactLenis, useLenis } from 'lenis/react'
import { useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const SmoothScrollWrapper = ({ children }) => {
  const lenis = useLenis()

  useEffect(() => {
    // Sync Lenis with GSAP ScrollTrigger
    if (lenis) {
      lenis.on('scroll', ScrollTrigger.update)
      ScrollTrigger.refresh()
    }
  }, [lenis])

  return <>{children}</>
}

const SmoothScroll = ({ children }) => {
  return (
    <ReactLenis
      root
      options={{
        lerp: 0.1,           // Higher = more responsive (0.1 is balanced)
        duration: 1.2,       // Shorter duration for snappier feel
        smoothWheel: true,
        smoothTouch: true,
        wheelMultiplier: 1,  // Normal wheel sensitivity
        touchMultiplier: 2,  // Better feel on mobile
        infinite: false,
        orientation: 'vertical',
        gestureOrientation: 'vertical',
        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Custom exponential ease
      }}
    >
      <SmoothScrollWrapper>
        {children}
      </SmoothScrollWrapper>
    </ReactLenis>
  )
}

export default SmoothScroll