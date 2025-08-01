/**
 *
 * Lightweight GSAP powered scroll animations
 * Documentation and setup guide: https://github.com/austin-thesing/quick-web-animations
 *
 * Core Requirements: GSAP base library (no additional plugins needed)
 *
 */

class ScrollAnimations {
  constructor() {
    // Global configuration variables
    this.defaultDuration = 0.4;
    this.movementDistance = "2rem";

    // Cache window width for performance
    this._windowWidth = window.innerWidth;

    // Set viewport detection parameters
    this.intersectionThreshold = this._windowWidth <= 768 ? 0.1 : 0.2;
    this.rootMargin = this._windowWidth <= 768 ? "0px" : "-72px";

    // Pre-define animation configurations for better performance
    this.defaultAnimations = {
      "fade-in": {
        opacity: 0,
        duration: this.defaultDuration,
      },
      "slide-up": {
        y: this.movementDistance,
        opacity: 0,
        duration: this.defaultDuration,
      },
      "slide-down": {
        y: `-${this.movementDistance}`,
        opacity: 0,
        duration: this.defaultDuration,
      },
      "slide-left": {
        x: `-${this.movementDistance}`,
        opacity: 0,
        duration: this.defaultDuration,
      },
      "slide-right": {
        x: this.movementDistance,
        opacity: 0,
        duration: this.defaultDuration,
      },
      "scale-in": {
        scale: 0.85,
        opacity: 0,
        duration: this.defaultDuration,
      },
    };

    // Initialize immediately if document is already loaded
    if (document.readyState === "complete") {
      this.init();
    } else {
      // Use requestIdleCallback for better performance if available
      const initMethod = window.requestIdleCallback || setTimeout;
      initMethod(() => this.init(), { timeout: 100 });
    }
  }

  // Helper method to safely parse numeric attributes with type coercion
  safelyParseNumber(value, defaultValue) {
    if (!value) return defaultValue;
    const parsed = +value;
    return parsed >= 0 ? parsed : defaultValue;
  }

  init() {
    // Create a single IntersectionObserver instance
    this.observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            this.animateElement(entry.target);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: this.intersectionThreshold,
        rootMargin: this.rootMargin,
      }
    );

    // Use more specific selector for better performance
    const animatedElements = document.querySelectorAll("[anim]:not([data-anim-initialized])");

    // Process elements in chunks for better performance
    const processElements = (elements, startIndex = 0) => {
      const chunk = 10;
      const endIndex = Math.min(startIndex + chunk, elements.length);

      for (let i = startIndex; i < endIndex; i++) {
        const element = elements[i];
        const animation = element.getAttribute("anim");

        if (this.defaultAnimations[animation]) {
          element.setAttribute("data-anim-initialized", "true");
          // Set will-change for better performance
          element.style.willChange = "transform, opacity";
          this.observer.observe(element);
        } else {
          console.warn(`Invalid animation type "${animation}" on element:`, element);
        }
      }

      if (endIndex < elements.length) {
        requestAnimationFrame(() => processElements(elements, endIndex));
      }
    };

    if (animatedElements.length > 0) {
      processElements(animatedElements);
    }
  }

  animateElement(element) {
    const animation = element.getAttribute("anim");
    const animProps = this.defaultAnimations[animation];

    // Get duration and delay from attributes - optimized parsing
    const duration = this.safelyParseNumber(element.getAttribute("anim-duration"), animProps.duration);
    const delay = this.safelyParseNumber(element.getAttribute("anim-delay"), 0);

    // Create optimized animation configuration
    const config = {
      opacity: 1,
      x: 0,
      y: 0,
      scale: animation === "scale-in" ? 1 : animProps.scale || 1,
      duration,
      delay,
      ease: "power2.out",
      force3D: true,
      onComplete: () => {
        // Clean up will-change after animation
        element.style.willChange = "auto";
      },
    };

    // Set initial state with optimized property application
    gsap.set(element, {
      opacity: animProps.opacity,
      x: animProps.x || 0,
      y: animProps.y || 0,
      scale: animation === "scale-in" ? 0.85 : 1,
      immediateRender: true,
    });

    // Run the animation with optimized configuration
    gsap.to(element, config);
  }
}

// Initialize animations with optimized loading strategy
if (document.readyState === "loading") {
  window.addEventListener("load", initAnimations);
} else {
  initAnimations();
}

function initAnimations() {
  if (typeof Webflow === "undefined") {
    new ScrollAnimations();
  } else {
    Webflow.push(() => new ScrollAnimations());
  }
}
