(function () {
  const STORAGE_KEY = "theme";
  const root = document.documentElement;
  const toggleBtn = document.getElementById("theme-toggle");

  function getIcon(theme) {
    return theme === "dark" ? "fa-sun" : "fa-moon";
  }

  function applyTheme(theme) {
    root.setAttribute("data-theme", theme);
    if (toggleBtn) {
      const icon = toggleBtn.querySelector("i");
      icon.classList.remove("fa-sun", "fa-moon");
      icon.classList.add(getIcon(theme));
      toggleBtn.setAttribute(
        "aria-label",
        theme === "dark" ? "Switch to light mode" : "Switch to dark mode",
      );
    }
  }

  function getPreferredTheme() {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "light" || saved === "dark") return saved;
    return window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  }

  applyTheme(getPreferredTheme());

  if (toggleBtn) {
    toggleBtn.addEventListener("click", function () {
      const current =
        root.getAttribute("data-theme") === "dark" ? "dark" : "light";
      const next = current === "dark" ? "light" : "dark";
      applyTheme(next);
      localStorage.setItem(STORAGE_KEY, next);
    });
  }
})();

(function () {
  const burgerBtn = document.getElementById("burger-toggle");
  const menu = document.getElementById("menu");
  if (!burgerBtn || !menu) return;

  function closeMenu() {
    menu.classList.remove("active");
    burgerBtn.setAttribute("aria-expanded", "false");
    burgerBtn.setAttribute("aria-label", "Open menu");
    const icon = burgerBtn.querySelector("i");
    icon.classList.remove("fa-xmark");
    icon.classList.add("fa-bars");
  }

  function openMenu() {
    menu.classList.add("active");
    burgerBtn.setAttribute("aria-expanded", "true");
    burgerBtn.setAttribute("aria-label", "Close menu");
    const icon = burgerBtn.querySelector("i");
    icon.classList.remove("fa-bars");
    icon.classList.add("fa-xmark");
  }

  burgerBtn.addEventListener("click", function () {
    if (menu.classList.contains("active")) {
      closeMenu();
    } else {
      openMenu();
    }
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", closeMenu);
  });

  document.addEventListener("click", function (e) {
    if (
      menu.classList.contains("active") &&
      !menu.contains(e.target) &&
      !burgerBtn.contains(e.target)
    ) {
      closeMenu();
    }
  });

  window.addEventListener("resize", function () {
    if (window.innerWidth > 768) {
      closeMenu();
    }
  });
})();

(function () {
  const revealEls = document.querySelectorAll(".reveal");
  if (!revealEls.length) return;
  if (!("IntersectionObserver" in window)) {
    revealEls.forEach((el) => el.classList.add("active"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
          obs.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -80px 0px",
    },
  );

  revealEls.forEach((el) => observer.observe(el));
})();

(function () {
  const downloadBtn = document.querySelector(".btn-download");
  if (!downloadBtn) return;

  downloadBtn.addEventListener("click", function (e) {
    e.preventDefault();

    const link = document.createElement("a");
    link.href = "./image/My Resume.pdf";
    link.download = "Naing Vannath - Resume.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  });
})();
