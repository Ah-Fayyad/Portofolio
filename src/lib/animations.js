export const transitions = {
  spring: { type: "spring", damping: 26, stiffness: 220 },
  smooth: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  gentle: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }
};

export const fadeIn = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: transitions.smooth
  }
};

export const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: transitions.smooth
  }
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.96 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: transitions.smooth
  }
};

export const staggerContainer = (staggerChildren = 0.1, delayChildren = 0.05) => ({
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren,
      delayChildren
    }
  }
});
