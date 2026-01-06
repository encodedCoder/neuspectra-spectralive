/* ============================================
   SpectraLive - JavaScript
   AI-Powered Hyperspectral Imaging Platform
   ============================================ */

document.addEventListener("DOMContentLoaded", function () {
  // ============================================
  // Navigation Toggle (Mobile)
  // ============================================
  const navToggle = document.getElementById("navToggle");
  const navMenu = document.querySelector(".nav-menu");

  if (navToggle) {
    navToggle.addEventListener("click", function () {
      navToggle.classList.toggle("active");
      navMenu.classList.toggle("active");
    });

    // Close menu when clicking on a link
    document.querySelectorAll(".nav-menu a").forEach((link) => {
      link.addEventListener("click", () => {
        navToggle.classList.remove("active");
        navMenu.classList.remove("active");
      });
    });
  }

  // ============================================
  // Navbar Scroll Effect
  // ============================================
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", function () {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // ============================================
  // Smooth Scrolling for Anchor Links
  // ============================================
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        const navbarHeight = navbar.offsetHeight;
        const targetPosition = targetElement.offsetTop - navbarHeight;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // ============================================
  // Intersection Observer for Animations
  // ============================================
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Elements to animate
  const animateElements = document.querySelectorAll(
    ".process-card, .feature-card, .use-case-card, .team-card, .partner-placeholder"
  );

  animateElements.forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
  });

  // Add animate-in class styles
  const style = document.createElement("style");
  style.textContent = `
        .animate-in {
            opacity: 1 !important;
            transform: translateY(0) !important;
        }
    `;
  document.head.appendChild(style);

  // ============================================
  // Active Navigation Highlight
  // ============================================
  const sections = document.querySelectorAll("section[id]");

  window.addEventListener("scroll", () => {
    let current = "";
    const navbarHeight = navbar.offsetHeight;

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - navbarHeight - 100;
      const sectionHeight = section.offsetHeight;

      if (
        window.scrollY >= sectionTop &&
        window.scrollY < sectionTop + sectionHeight
      ) {
        current = section.getAttribute("id");
      }
    });

    document.querySelectorAll(".nav-menu a").forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active");
      }
    });
  });

  // Add active link styling
  const activeStyle = document.createElement("style");
  activeStyle.textContent = `
        .nav-menu a.active {
            color: #667eea;
        }
        .nav-menu a.active::after {
            width: 100%;
        }
    `;
  document.head.appendChild(activeStyle);

  // ============================================
  // Parallax Effect for Hero
  // ============================================
  const heroVisual = document.querySelector(".hero-visual");

  if (heroVisual && window.innerWidth > 768) {
    window.addEventListener("scroll", () => {
      const scrolled = window.scrollY;
      heroVisual.style.transform = `translateY(${scrolled * 0.3}px)`;
    });
  }

  // ============================================
  // Typing Effect for Hero (Optional Enhancement)
  // ============================================
  const gradientText = document.querySelector(".gradient-text");

  if (gradientText) {
    gradientText.style.opacity = "0";

    setTimeout(() => {
      gradientText.style.transition = "opacity 1s ease";
      gradientText.style.opacity = "1";
    }, 500);
  }

  // ============================================
  // Console Easter Egg
  // ============================================
  console.log(
    "%c🔬 SpectraLive",
    "font-size: 24px; font-weight: bold; color: #667eea;"
  );
  console.log(
    "%cAI-Powered Hyperspectral Imaging for Non-Invasive Diagnostics",
    "font-size: 12px; color: #9ca3af;"
  );
  console.log("%cA NeuSpectra Innovation", "font-size: 10px; color: #764ba2;");
});

// ============================================
// Utility Functions
// ============================================

// Debounce function for performance
function debounce(func, wait = 20, immediate = true) {
  let timeout;
  return function () {
    const context = this,
      args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
