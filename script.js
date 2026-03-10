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


// Features section interaction (bullet buttons open a popup)
(() => {
  const featureButtons = Array.from(
    document.querySelectorAll("[data-feature-detail]")
  );
  const featureModal = document.querySelector("[data-feature-detail-modal]");
  const featureTitle = document.querySelector("[data-feature-detail-title]");
  const featureDesc = document.querySelector("[data-feature-detail-desc]");
  const featureDetailIcon = document.querySelector("[data-feature-detail-icon]");
  const featureModalCloseEls = Array.from(
    document.querySelectorAll("[data-feature-detail-close]")
  );

  if (
    !featureButtons.length ||
    !featureModal ||
    !featureTitle ||
    !featureDesc ||
    !featureDetailIcon
  ) {
    return;
  }

  const featureContent = {
    "business-zero": {
      title: "Zero Commission",
      desc: "Accept direct orders from nearby customers without paying marketplace commission and keep full earnings."
    },
    "business-reach": {
      title: "Reach Nearby Customers",
      desc: "Get discovered by people searching for products and services in your local area using PINCS-enabled listings."
    },
    "business-chat": {
      title: "WhatsApp & Chat Ordering",
      desc: "Let customers place and confirm orders directly via chat, keeping the full conversation history in one place."
    },
    "business-insights": {
      title: "Business Insights",
      desc: "Track profile visits, clicks on offers, and order activity to understand what is working best for your shop."
    },
    "business-storefront": {
      title: "Digital Storefront",
      desc: "Create a simple online presence with photos, timings, address code, and offers that customers can share."
    },
    "business-growth": {
      title: "Grow Your Business",
      desc: "Use better locations, direct orders, and repeat customers to increase revenue without extra commission costs."
    },
    map: {
      title: "Generate Code from Map Location",
      desc: "Drop a pin on the map or search an address to instantly convert it into a unique, shareable PINCS code."
    },
    delivery: {
      title: "Faster Delivery Process",
      desc: "Replace long, confusing addresses with short codes that guide drivers to the exact entrance faster."
    },
    login: {
      title: "Secure User Login",
      desc: "Save and manage your PINCS codes under a secure account so only you control how your locations are used."
    },
    share: {
      title: "Easy Copy & Share",
      desc: "Copy your PINCS code in one tap and paste it into chats, forms, or apps without retyping your address."
    },
    apps: {
      title: "E‑commerce & Delivery Apps",
      desc: "Use PINCS together with shopping and delivery apps so orders contain accurate, machine-readable locations."
    },
    accurate: {
      title: "Accurate Location Identification",
      desc: "Ensure every visit, pickup, and drop happens at the right spot, even when written address text is incomplete."
    }
  };

  const featureIcons = {
    "business-zero":
      '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M7 9h10"/><path d="M7 15h10"/><path d="M10 6v12"/><path d="M14 6v12"/></svg>',
    "business-reach":
      '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>',
    "business-chat":
      '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 11.5a8.5 8.5 0 0 1-12.44 7.53L3 21l1.97-5.56A8.5 8.5 0 1 1 21 11.5z"/></svg>',
    "business-insights":
      '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="20" x2="12" y2="10"/><line x1="18" y1="20" x2="18" y2="4"/><line x1="6" y1="20" x2="6" y2="16"/></svg>',
    "business-storefront":
      '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l1-5h16l1 5"/><path d="M4 10h16v10H4z"/><path d="M10 14h4"/></svg>',
    "business-growth":
      '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="3 17 9 11 13 15 21 7"/><polyline points="21 12 21 7 16 7"/></svg>',
    map:
      '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 10c0 7-9 13-9 13S3 17 3 10a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>',
    delivery:
      '<svg width="28" height="28" viewBox="0 0 24 24" fill="currentColor"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/></svg>',
    login:
      '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>',
    share:
      '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/></svg>',
    apps:
      '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>',
    accurate:
      '<svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2v4"/><path d="M12 18v4"/><path d="m4.93 4.93 2.83 2.83"/><path d="m16.24 16.24 2.83 2.83"/><path d="M2 12h4"/><path d="M18 12h4"/><path d="m4.93 19.07 2.83-2.83"/><path d="m16.24 7.76 2.83-2.83"/><circle cx="12" cy="12" r="3"/></svg>'
  };

  const closeModal = () => {
    featureModal.hidden = true;
    document.body.style.overflow = "";
  };

  const openModal = () => {
    featureModal.hidden = false;
    document.body.style.overflow = "hidden";
  };

  const setActiveFeature = (featureKey) => {
    const selected = featureContent[featureKey];
    if (!selected) return;

    featureDetailIcon.innerHTML = featureIcons[featureKey] || "";
    featureTitle.textContent = selected.title;
    featureDesc.textContent = selected.desc;

    openModal();
  };

  featureButtons.forEach((button) => {
    button.addEventListener("click", () => {
      setActiveFeature(button.dataset.featureDetail);
    });
  });

  featureModalCloseEls.forEach((el) => {
    el.addEventListener("click", closeModal);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !featureModal.hidden) {
      closeModal();
    }
  });
})();

// About cards interaction
(() => {
  const aboutCards = Array.from(document.querySelectorAll("[data-about-feature]"));
  const aboutModal = document.querySelector("[data-about-modal]");
  const aboutModalCloseEls = Array.from(document.querySelectorAll("[data-about-modal-close]"));
  const aboutModalTitle = document.querySelector("[data-about-modal-title]");
  const aboutModalDesc = document.querySelector("[data-about-modal-desc]");
  const aboutModalPoints = document.querySelector("[data-about-modal-points]");
  const aboutModalIcon = document.querySelector("[data-about-modal-icon]");

  if (
    !aboutCards.length ||
    !aboutModal ||
    !aboutModalTitle ||
    !aboutModalDesc ||
    !aboutModalPoints ||
    !aboutModalIcon
  ) {
    return;
  }

  const aboutContent = {
    "short-code": {
      title: "Shortened Address Codes",
      desc: "Generate unique, short location codes from any address to simplify sharing and navigation.",
      points: [
        "Create compact codes from long addresses in seconds.",
        "Share codes quickly on chat, checkout, and order forms.",
        "Improve address recall for repeat customers and families."
      ]
    },
    "reliable-confirmation": {
      title: "Reliable Address Confirmation",
      desc: "Ensure accurate and confirmed location identification reducing error in deliveries and visits.",
      points: [
        "Lower failed deliveries caused by unclear address text.",
        "Give delivery partners clearer destination references.",
        "Reduce re-delivery calls and manual support effort."
      ]
    },
    "global-use": {
      title: "Universal Application",
      desc: "Use PINCS codes for E-Commerce, food deliveries, taxis, and more in any industry worldwide.",
      points: [
        "Useful for courier and food apps.",
        "Fits websites and mobile apps.",
        "Simple for users and businesses."
      ]
    },
    universal: {
      title: "Universal Application",
      desc: "Use PINCS codes for E-commerce, food deliveries, taxis, and more in any industry worldwide.",
      points: [
        "Scales for local and global operations.",
        "Simple for support and routing teams.",
        "Compatible with logistics workflows."
      ]
    }
  };

  const openModal = () => {
    aboutModal.hidden = false;
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    aboutModal.hidden = true;
    document.body.style.overflow = "";
  };

  const renderFeature = (featureKey) => {
    const selected = aboutContent[featureKey];
    if (!selected) return;

    aboutModalTitle.textContent = selected.title;
    aboutModalDesc.textContent = selected.desc;
    aboutModalPoints.innerHTML = selected.points.map((item) => `<li>${item}</li>`).join("");

    const cardIcon = document.querySelector(`[data-about-feature="${featureKey}"] .about-card-icon`);
    aboutModalIcon.innerHTML = cardIcon ? cardIcon.innerHTML : "";

    openModal();
  };

  aboutCards.forEach((card) => {
    card.addEventListener("click", () => {
      renderFeature(card.dataset.aboutFeature);
    });

    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        renderFeature(card.dataset.aboutFeature);
      }
    });
  });

  aboutModalCloseEls.forEach((el) => {
    el.addEventListener("click", closeModal);
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !aboutModal.hidden) {
      closeModal();
    }
  });
})();


