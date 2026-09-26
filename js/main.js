/**
 * Loud Pixel House — site behaviour
 * Reads content from LPH_CONFIG (js/config.js) and renders the
 * config-driven sections. No build step: plain DOM APIs only.
 */
(function () {
  "use strict";

  const cfg = window.LPH_CONFIG;
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const saveData = !!(navigator.connection && navigator.connection.saveData);

  document.addEventListener("DOMContentLoaded", () => {
    setYear();
    initNav();
    initHeroMedia();
    renderServices();
    renderPortfolio();
    renderProcess();
    renderPricing();
    renderFAQ();
    renderContactInfo();
    renderFooter();
    initContactForm();
  });

  // -- helpers --------------------------------------------------------------

  function el(tag, className, html) {
    const node = document.createElement(tag);
    if (className) node.className = className;
    if (html !== undefined) node.innerHTML = html;
    return node;
  }

  // -- footer year ------------------------------------------------------------

  function setYear() {
    const yearEl = document.getElementById("current-year");
    if (yearEl) yearEl.textContent = new Date().getFullYear();
  }

  // -- nav ----------------------------------------------------------------

  function initNav() {
    const header = document.querySelector(".site-header");
    const toggle = document.querySelector(".nav-toggle");
    const mobileNav = document.querySelector(".nav-links-mobile");

    if (header) {
      const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 8);
      onScroll();
      window.addEventListener("scroll", onScroll, { passive: true });
    }

    if (toggle && mobileNav) {
      toggle.addEventListener("click", () => {
        const expanded = toggle.getAttribute("aria-expanded") === "true";
        toggle.setAttribute("aria-expanded", String(!expanded));
        mobileNav.style.display = expanded ? "none" : "flex";
      });
      mobileNav.querySelectorAll("a").forEach((link) => {
        link.addEventListener("click", () => {
          toggle.setAttribute("aria-expanded", "false");
          mobileNav.style.display = "none";
        });
      });
    }
  }

  // -- hero -----------------------------------------------------------------

  function initHeroMedia() {
    const mount = document.querySelector("[data-hero-media]");
    if (!mount) return;

    if (prefersReducedMotion || saveData) {
      showHeroPoster(mount);
      return;
    }

    const video = document.createElement("video");
    video.autoplay = true;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    video.preload = "metadata";
    video.setAttribute("aria-hidden", "true");
    video.poster = "assets/video/hero-poster.jpg";

    const mobileSource = el("source");
    mobileSource.src = "assets/video/hero-mobile.mp4";
    mobileSource.type = "video/mp4";
    mobileSource.media = "(max-width: 719px)";

    const desktopSource = el("source");
    desktopSource.src = "assets/video/hero.mp4";
    desktopSource.type = "video/mp4";

    let failed = false;
    const onError = () => {
      if (failed) return;
      failed = true;
      video.remove();
      showHeroFallback(mount);
    };
    // A skipped or missing earlier <source> also fires "error"; only the last one failing means nothing can play.
    video.addEventListener("error", onError);
    desktopSource.addEventListener("error", onError);

    // If nothing plays within a couple of seconds (e.g. missing files),
    // fall back instead of leaving a black hero.
    const stallTimer = setTimeout(() => {
      if (video.readyState === 0) onError();
    }, 2500);
    video.addEventListener("loadeddata", () => clearTimeout(stallTimer));

    // Browser picks the first matching <source>, so the media-scoped one must come first.
    video.append(mobileSource, desktopSource);
    mount.appendChild(video);
  }

  function showHeroPoster(mount) {
    const img = el("img");
    img.src = "assets/video/hero-poster.jpg";
    img.alt = "";
    img.addEventListener("error", () => {
      img.remove();
      showHeroFallback(mount);
    });
    mount.appendChild(img);
  }

  // Animated pixel/glitch placeholder used until a real hero video is added.
  function showHeroFallback(mount) {
    const canvas = el("canvas");
    mount.appendChild(canvas);
    const ctx = canvas.getContext("2d");
    const cell = 26;
    let width, height, cols, rows;
    const palette = ["#161615", "#1E1E1C", "#FF8A00", "#F0281E", "#2A2A27"];

    function resize() {
      width = canvas.width = mount.clientWidth;
      height = canvas.height = mount.clientHeight;
      cols = Math.ceil(width / cell);
      rows = Math.ceil(height / cell);
    }
    resize();
    window.addEventListener("resize", resize);

    function frame() {
      ctx.fillStyle = "#0A0A0A";
      ctx.fillRect(0, 0, width, height);
      const active = Math.floor(cols * rows * 0.02);
      for (let i = 0; i < active; i++) {
        const x = Math.floor(Math.random() * cols) * cell;
        const y = Math.floor(Math.random() * rows) * cell;
        ctx.fillStyle = palette[Math.floor(Math.random() * palette.length)];
        ctx.globalAlpha = 0.5 + Math.random() * 0.4;
        ctx.fillRect(x, y, cell - 2, cell - 2);
      }
      ctx.globalAlpha = 1;
    }

    frame();
    if (!prefersReducedMotion) {
      setInterval(frame, 180);
    }
  }

  // -- services -------------------------------------------------------------

  function renderServices() {
    const grid = document.querySelector("[data-services-grid]");
    if (!grid) return;
    grid.innerHTML = "";
    cfg.services.forEach((service) => {
      const item = el("article", "service-item");
      item.innerHTML = `
        <span class="eyebrow-number pixel">${service.number}</span>
        <h3>${service.title}</h3>
        <p>${service.description}</p>
        <span class="service-tag">${service.tag}</span>
      `;
      grid.appendChild(item);
    });
  }

  // -- portfolio --------------------------------------------------------------

  function renderPortfolio() {
    const grid = document.querySelector("[data-work-grid]");
    if (!grid) return;
    grid.innerHTML = "";

    cfg.portfolio.forEach((item, index) => {
      const card = el("div", "work-item");
      card.setAttribute("role", "button");
      card.setAttribute("tabindex", "0");
      card.setAttribute("aria-label", `${item.title} — ${item.tag}`);

      const tag = el("span", "work-tag pixel", item.tag);
      card.appendChild(tag);

      const placeholder = el(
        "div",
        "work-placeholder",
        `<span class="pixel-icon">${"<span></span>".repeat(16)}</span><small>Add video ${index + 1}<br>assets/portfolio/</small>`
      );

      const video = el("video");
      video.muted = true;
      video.loop = true;
      video.playsInline = true;
      video.preload = "none";
      video.setAttribute("aria-hidden", "true");
      video.dataset.src = item.src;

      let loaded = false;
      let failed = false;

      function ensureSource() {
        if (loaded || failed) return;
        loaded = true;
        video.src = item.src;
      }

      video.addEventListener("error", () => {
        failed = true;
        video.remove();
        card.appendChild(placeholder);
      });

      const io = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) ensureSource();
        });
      }, { rootMargin: "200px" });
      io.observe(card);

      function play() {
        ensureSource();
        if (!failed) video.play().catch(() => {});
      }
      function pause() {
        if (!failed) video.pause();
      }

      card.addEventListener("mouseenter", play);
      card.addEventListener("mouseleave", pause);
      card.addEventListener("touchstart", play, { passive: true });
      card.addEventListener("focus", play);
      card.addEventListener("blur", pause);
      card.addEventListener("keydown", (evt) => {
        if (evt.key === "Enter" || evt.key === " ") {
          evt.preventDefault();
          video.paused ? play() : pause();
        }
      });

      card.appendChild(video);
      grid.appendChild(card);
    });
  }

  // -- process ----------------------------------------------------------------

  function renderProcess() {
    const list = document.querySelector("[data-process-list]");
    if (!list) return;
    list.innerHTML = "";
    cfg.process.forEach((step) => {
      const item = el("div", "process-step");
      item.innerHTML = `
        <span class="eyebrow-number pixel">${step.number}</span>
        <h3>${step.title}</h3>
        <p>${step.description}</p>
      `;
      list.appendChild(item);
    });
  }

  // -- pricing ------------------------------------------------------------

  function renderPricing() {
    const grid = document.querySelector("[data-pricing-grid]");
    const footnote = document.querySelector("[data-pricing-footnote]");
    if (grid) {
      grid.innerHTML = "";
      cfg.pricing.tiers.forEach((tier) => {
        const card = el("div", "price-card" + (tier.featured ? " is-featured" : ""));
        const features = tier.features.map((f) => `<li>${f}</li>`).join("");
        card.innerHTML = `
          <h3>${tier.title}</h3>
          <div class="price-amount">
            ${tier.priceQualifier && tier.priceQualifier !== "/mo" ? `<span class="price-qualifier">${tier.priceQualifier}</span>` : ""}
            <span>${tier.price}</span>
            ${tier.priceQualifier === "/mo" ? `<span class="price-qualifier">${tier.priceQualifier}</span>` : ""}
          </div>
          <p class="price-desc">${tier.description}</p>
          <ul class="price-features">${features}</ul>
        `;
        const cta = el("a", tier.featured ? "btn btn-primary" : "btn btn-outline-on-light");
        cta.href = "#contact";
        cta.textContent = tier.featured ? "Get a quote" : "Ask about this";
        card.appendChild(cta);
        grid.appendChild(card);
      });
    }
    if (footnote) {
      footnote.innerHTML = `
        <span>${cfg.pricing.note}</span>
        <strong>${cfg.pricing.customNote}</strong>
      `;
    }
  }

  // -- faq ------------------------------------------------------------------

  function renderFAQ() {
    const list = document.querySelector("[data-faq-list]");
    if (!list) return;
    list.innerHTML = "";
    cfg.faq.forEach((item, index) => {
      const details = el("details", "faq-item");
      if (index === 0) details.open = true;
      details.innerHTML = `
        <summary>
          <span>${item.q}</span>
          <span class="faq-icon" aria-hidden="true"></span>
        </summary>
        <div class="faq-answer">${item.a}</div>
      `;
      list.appendChild(details);
    });
  }

  // -- contact info / footer -------------------------------------------------

  function renderContactInfo() {
    const emailLinks = document.querySelectorAll("[data-contact-email]");
    emailLinks.forEach((link) => {
      link.href = `mailto:${cfg.brand.email}`;
      link.textContent = cfg.brand.email;
    });
    const igLinks = document.querySelectorAll("[data-contact-instagram]");
    igLinks.forEach((link) => {
      link.href = cfg.social.instagram;
    });
  }

  function renderFooter() {
    const social = document.querySelector("[data-footer-social]");
    if (social) {
      social.innerHTML = "";
      const links = [
        { label: "Instagram", href: cfg.social.instagram },
        { label: "TikTok", href: cfg.social.tiktok },
        { label: "YouTube", href: cfg.social.youtube }
      ];
      links.forEach((l) => {
        const a = el("a", "", l.label);
        a.href = l.href;
        a.target = "_blank";
        a.rel = "noopener";
        social.appendChild(a);
      });
    }
    const footerEmail = document.querySelector("[data-footer-email]");
    if (footerEmail) {
      footerEmail.href = `mailto:${cfg.brand.email}`;
      footerEmail.textContent = cfg.brand.email;
    }
  }

  // -- contact form -----------------------------------------------------------

  function initContactForm() {
    const form = document.getElementById("contact-form");
    if (!form) return;
    const status = document.getElementById("form-status");
    const mailtoFallback = document.querySelector("[data-mailto-fallback]");

    if (mailtoFallback) {
      mailtoFallback.href = `mailto:${cfg.brand.email}?subject=${encodeURIComponent("Project inquiry — Loud Pixel House")}`;
    }

    const endpoint = cfg.form.formspreeId && cfg.form.formspreeId.indexOf("TODO") === -1
      ? `https://formspree.io/f/${cfg.form.formspreeId}`
      : null;

    form.addEventListener("submit", async (evt) => {
      evt.preventDefault();
      const submitBtn = form.querySelector("button[type='submit']");

      if (!endpoint) {
        showStatus("error", "The contact form isn't connected yet — please email me directly using the link below.");
        return;
      }

      submitBtn.disabled = true;
      const originalLabel = submitBtn.textContent;
      submitBtn.textContent = "Sending…";

      try {
        const response = await fetch(endpoint, {
          method: "POST",
          headers: { Accept: "application/json" },
          body: new FormData(form)
        });
        if (response.ok) {
          showStatus("success", "Thanks — message sent. I'll get back to you within a couple of business days.");
          form.reset();
        } else {
          showStatus("error", "Something went wrong sending that. Please try emailing me directly.");
        }
      } catch (err) {
        showStatus("error", "Couldn't reach the form service. Please try emailing me directly.");
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalLabel;
      }
    });

    function showStatus(type, message) {
      if (!status) return;
      status.textContent = message;
      status.className = `form-status is-visible is-${type}`;
      status.setAttribute("role", "status");
    }
  }
})();
