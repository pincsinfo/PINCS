// Simple, production-safe JS for the responsive navigation

(() => {
  const navToggle = document.querySelector(".nav-toggle");
  const navbar = document.querySelector(".navbar");

  if (!navToggle || !navbar) return;

  const closeNav = () => {
    navbar.classList.remove("is-open");
    navToggle.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
  };

  const openNav = () => {
    navbar.classList.add("is-open");
    navToggle.classList.add("is-open");
    navToggle.setAttribute("aria-expanded", "true");
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navbar.classList.contains("is-open");
    if (isOpen) {
      closeNav();
    } else {
      openNav();
    }
  });

  // Close menu when clicking a nav link (for better UX on mobile)
  navbar.addEventListener("click", (event) => {
    const target = event.target;
    if (target instanceof HTMLElement && target.tagName === "A") {
      closeNav();
    }
  });

  // Close nav on resize to desktop
  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) {
      closeNav();
    }
  });
})();

// Navbar scroll effect - add border/shadow when scrolling
(() => {
  const siteHeader = document.querySelector(".site-header");
  if (!siteHeader) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      siteHeader.classList.add("scrolled");
    } else {
      siteHeader.classList.remove("scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll);
  // Check initial scroll position
  handleScroll();
})();

// Current year in footer (production-safe)
(() => {
  const year = String(new Date().getFullYear());
  document.querySelectorAll("[data-current-year]").forEach((el) => {
    el.textContent = year;
  });
})();

