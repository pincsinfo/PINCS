/**
 * Create PINCS page - Interactive map and form handling
 * Production-ready with Leaflet.js for map interactions
 */
(function () {
  "use strict";

  // Default center: Hyderabad, India
  const DEFAULT_LAT = 17.385;
  const DEFAULT_LNG = 78.4867;
  const DEFAULT_ZOOM = 12;

  let map = null;
  let marker = null;

  function createRedIcon() {
    return L.divIcon({
      className: "pincs-marker",
      html: `<svg viewBox="0 0 24 24" fill="#e32929" width="40" height="40"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5z"/></svg>`,
      iconSize: [40, 40],
      iconAnchor: [20, 40],
    });
  }

  const mapEl = document.getElementById("map");
  const mapPlaceholder = document.getElementById("map-placeholder");
  const createForm = document.getElementById("create-pincs-form");
  const btnSearch = document.getElementById("btn-search");
  const btnSelectMap = document.getElementById("btn-select-map");
  const searchInput = document.getElementById("search-address");
  const cityInput = document.getElementById("city-area");
  const stateInput = document.getElementById("state");
  const pincodeInput = document.getElementById("pincode");

  // Initialize map
  function initMap() {
    if (!mapEl || typeof L === "undefined") return;

    map = L.map("map", {
      center: [DEFAULT_LAT, DEFAULT_LNG],
      zoom: DEFAULT_ZOOM,
      zoomControl: false,
    });

    // Zoom control in top-right for better layout
    L.control.zoom({ position: "topright" }).addTo(map);

    // Light tiles for design consistency (CartoDB Positron)
    L.tileLayer("https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>',
      subdomains: "abcd",
      maxZoom: 20,
    }).addTo(map);

    // Red marker icon (matches site brand)
    const redIcon = createRedIcon();

    map.on("click", function (e) {
      const { lat, lng } = e.latlng;
      setMarker(lat, lng, redIcon);
      updateFormFromCoords(lat, lng);
      hidePlaceholder();
    });

    map.whenReady(function () {
      // Small delay to ensure map tiles are visible
      setTimeout(hidePlaceholder, 800);
    });
  }

  function setMarker(lat, lng, icon) {
    if (!map) return;
    if (marker) map.removeLayer(marker);
    marker = L.marker([lat, lng], { icon }).addTo(map);
  }

  function hidePlaceholder() {
    if (mapPlaceholder) mapPlaceholder.classList.add("is-hidden");
  }

  function showPlaceholder() {
    if (mapPlaceholder) mapPlaceholder.classList.remove("is-hidden");
  }

  // No backend: map click only updates marker; user enters address manually
  function updateFormFromCoords(/* lat, lng */) {}

  // No backend: address search disabled; user selects on map or enters details manually
  function handleSearch() {
    searchInput.removeAttribute("aria-invalid");
    if (mapEl) {
      mapEl.focus();
      mapEl.scrollIntoView({ behavior: "smooth", block: "center" });
    }
  }

  function handleSelectOnMap() {
    if (mapPlaceholder && !mapPlaceholder.classList.contains("is-hidden")) {
      showPlaceholder();
    }
    mapEl?.focus();
    mapEl?.scrollIntoView({ behavior: "smooth", block: "center" });
    // Announce for screen readers
    const announcer = document.createElement("div");
    announcer.setAttribute("role", "status");
    announcer.setAttribute("aria-live", "polite");
    announcer.className = "sr-only";
    announcer.textContent = "Click on the map to select a location.";
    document.body.appendChild(announcer);
    setTimeout(() => announcer.remove(), 3000);
  }

  function validateForm() {
    let valid = true;
    const fields = [cityInput, stateInput, pincodeInput];
    fields.forEach((el) => {
      if (!el.value.trim()) {
        el.setAttribute("aria-invalid", "true");
        valid = false;
      } else {
        el.removeAttribute("aria-invalid");
      }
    });
    if (pincodeInput.value.trim().length !== 6 || !/^\d{6}$/.test(pincodeInput.value.trim())) {
      pincodeInput.setAttribute("aria-invalid", "true");
      valid = false;
    }
    return valid;
  }

  function handleGenerate(e) {
    e.preventDefault();
    validateForm();
  }

  function bindEvents() {
    if (btnSearch) btnSearch.addEventListener("click", handleSearch);
    if (btnSelectMap) btnSelectMap.addEventListener("click", handleSelectOnMap);
    if (createForm) createForm.addEventListener("submit", handleGenerate);
    if (searchInput) {
      searchInput.addEventListener("keydown", function (e) {
        if (e.key === "Enter") {
          e.preventDefault();
          handleSearch();
        }
      });
    }
  }

  function initNavToggle() {
    const toggle = document.querySelector(".nav-toggle");
    const navbar = document.querySelector(".navbar");
    if (!toggle || !navbar) return;

    toggle.addEventListener("click", function () {
      const isOpen = navbar.classList.contains("is-open");
      navbar.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", !isOpen);
    });

    navbar.querySelectorAll("a").forEach((a) => {
      a.addEventListener("click", () => {
        navbar.classList.remove("is-open");
        toggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  function init() {
    initMap();
    bindEvents();
    initNavToggle();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
