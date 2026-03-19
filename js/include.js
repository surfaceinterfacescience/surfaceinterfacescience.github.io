function setupAnalytics() {
  if (window.__sisAnalyticsLoaded) {
    return;
  }

  window.__sisAnalyticsLoaded = true;

  const script = document.createElement("script");
  script.async = true;
  script.src = "https://www.googletagmanager.com/gtag/js?id=G-L5GC46ESKQ";
  document.head.appendChild(script);

  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    window.dataLayer.push(arguments);
  };

  window.gtag("js", new Date());
  window.gtag("config", "G-L5GC46ESKQ");
}

async function includePartials() {
  const includeTargets = document.querySelectorAll("[data-include]");

  await Promise.all(
    Array.from(includeTargets).map(async (target) => {
      const path = target.getAttribute("data-include");
      const response = await fetch(path);
      if (!response.ok) {
        throw new Error(`Unable to load ${path}`);
      }
      target.innerHTML = await response.text();
    })
  );
}

function setupNavigation() {
  const currentPage = document.body.dataset.page;
  const menu = document.querySelector(".nav-links");
  const toggle = document.querySelector(".nav-toggle");
  const dropdown = document.querySelector(".nav-dropdown");
  const dropdownToggle = document.querySelector(".nav-dropdown-toggle");

  if (currentPage) {
    document.querySelectorAll("[data-nav]").forEach((link) => {
      if (link.dataset.nav === currentPage) {
        link.classList.add("is-active");
      }
    });

    if (["techniques", "stm", "photoemission"].includes(currentPage) && dropdownToggle) {
      dropdownToggle.classList.add("is-active");
    }
  }

  if (toggle && menu) {
    toggle.addEventListener("click", () => {
      const isOpen = menu.classList.toggle("is-open");
      toggle.setAttribute("aria-expanded", String(isOpen));
    });
  }

  if (dropdown && dropdownToggle) {
    dropdownToggle.addEventListener("click", () => {
      const isOpen = dropdown.classList.toggle("open");
      dropdownToggle.setAttribute("aria-expanded", String(isOpen));
    });
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  setupAnalytics();
  await includePartials();
  setupNavigation();
});
