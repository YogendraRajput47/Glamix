import { gsap } from "gsap";

export const animateNavbar = (logoRef, containerRef, iconsRef) => {
  const tl = gsap.timeline();

  tl.fromTo(
    logoRef.current,
    {
      opacity: 0,
      y: -20,
    },
    {
      opacity: 1,
      y: 0,
      duration: 1,
      delay: 0.3,
    }
  );

  tl.fromTo(
    containerRef.current?.querySelectorAll(".nav-links") || [],
    {
      opacity: 0,
      y: -20,
    },
    {
      opacity: 1,
      y: 0,
      stagger: 0.2,
    }
  );

  tl.fromTo(
    iconsRef.current,
    {
      opacity: 0,
      y: -20,
    },
    {
      opacity: 1,
      y: 0,
    }
  );
};
