/* DAWA Group - main.js */

/* ===== LANGUAGE (AR text only / EN fixed layout) ===== */
let currentLang = localStorage.getItem("dawa-lang") || "en";

function applyLanguage() {
  const html = document.documentElement;
  /* layout direction stays LTR always - only the text changes */
  html.lang = currentLang;
  html.dir = "ltr";
  localStorage.setItem("dawa-lang", currentLang);

  document.querySelectorAll("[data-ar]").forEach((el) => {
    const val = currentLang === "ar" ? el.getAttribute("data-ar") : el.getAttribute("data-en");
    if (val !== null) el.textContent = val;
  });
  document.querySelectorAll("[data-ar-ph]").forEach((el) => {
    const val = currentLang === "ar" ? el.getAttribute("data-ar-ph") : el.getAttribute("data-en-ph");
    if (val !== null) el.placeholder = val;
  });

  const btn = document.getElementById("langToggle");
  if (btn) btn.textContent = currentLang === "ar" ? "EN" : "عربي";

  renderProperties();
  renderPackages();
  renderTestimonials();
  renderGallery();
}

function toggleLang() {
  currentLang = currentLang === "ar" ? "en" : "ar";
  applyLanguage();
}

document.addEventListener("DOMContentLoaded", () => {
  applyLanguage();

  /* burger */
  const burger = document.getElementById("burger");
  const navList = document.getElementById("navList");
  if (burger) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("open");
      navList.classList.toggle("active");
    });
    if (navList) navList.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        burger.classList.remove("open");
        navList.classList.remove("active");
      })
    );
  }

  /* navbar shrink */
  const nav = document.getElementById("mainNav");
  window.addEventListener("scroll", () => {
    nav.classList.toggle("scrolled", window.scrollY > 60);
  });

  /* top button */
  const topbtn = document.getElementById("topbtn");
  window.onscroll = () => {
    topbtn.style.display = window.scrollY > 800 ? "block" : "none";
  };
  if (topbtn) topbtn.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  initReveal();
  initCounters();
  initSlider();
  initCarousel("workTrack", "workPrev", "workNext");
  initCarousel("propertyGrid", "propsPrev", "propsNext");
  initContactForm();
  renderProperties();
  renderPackages();
  renderTestimonials();
  renderGallery();

  /* footer year */
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
});

/* ===== SCROLL REVEAL ===== */
function initReveal() {
  const els = document.querySelectorAll(".hidden, .hidden-right, .hidden-zoom");
  /* on mobile show everything immediately (no fancy reveal that can get stuck) */
  if (window.matchMedia("(max-width: 768px)").matches) {
    els.forEach((el) => el.classList.add("show"));
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  els.forEach((el) => observer.observe(el));
}

/* ===== COUNTERS ===== */
function initCounters() {
  const nums = document.querySelectorAll(".stat .num[data-count]");
  if (window.matchMedia("(max-width: 768px)").matches) {
    nums.forEach((el) => {
      el.textContent = parseInt(el.getAttribute("data-count"), 10) + (el.getAttribute("data-suffix") || "");
    });
    return;
  }
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.getAttribute("data-count"), 10);
      const suffix = el.getAttribute("data-suffix") || "";
      const duration = 1800;
      const start = performance.now();
      function step(now) {
        const p = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        el.textContent = Math.round(target * eased).toLocaleString("en-US") + suffix;
        if (p < 1) requestAnimationFrame(step);
      }
      requestAnimationFrame(step);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });
  nums.forEach((el) => observer.observe(el));
}

/* ===== PROPERTY CARDS ===== */
function renderProperties() {
  const grid = document.getElementById("propertyGrid");
  if (!grid) return;
  const lang = currentLang;
  grid.innerHTML = DAWA_DATA.properties.slice(0, 6).map((p) => `
    <div class="property-card hidden-zoom">
      <div class="img-wrap">
        <img src="${p.image}" alt="${p.title[lang]}">
        <span class="badge">${p.badge[lang]}</span>
      </div>
      <div class="info">
        <h3>${p.title[lang]}</h3>
        <div class="location">📍 ${p.location[lang]}</div>
        <div class="specs">
          <span>🛏 ${p.beds}</span>
          <span>🛁 ${p.baths}</span>
          <span>📐 ${p.area[lang]}</span>
        </div>
        <a class="card-link" href="property.html?id=${p.id}">${lang === "ar" ? "عرض التفاصيل" : "View Details"} ←</a>
      </div>
    </div>
  `).join("");
  initReveal();
}

/* ===== PACKAGES ===== */
function renderPackages() {
  const grid = document.getElementById("packageGrid");
  if (!grid) return;
  const lang = currentLang;
  grid.innerHTML = DAWA_DATA.packages.map((p) => `
    <div class="package hidden-zoom ${p.featured ? "featured-pack" : ""}">
      ${p.featured ? `<span class="pop">${lang === "ar" ? "الأكثر طلباً" : "Most Popular"}</span>` : ""}
      <div class="p-icon">${p.icon}</div>
      <h3>${p.title[lang]}</h3>
      <div class="p-price">${p.price[lang]}</div>
      <ul>${p.items[lang].map((i) => `<li>${i}</li>`).join("")}</ul>
      <a class="btn-gold" href="#contact">${lang === "ar" ? "اطلب عرض سعر" : "Get a Quote"}</a>
    </div>
  `).join("");
  initReveal();
}

/* ===== TESTIMONIALS ===== */
function renderTestimonials() {
  const grid = document.getElementById("testiGrid");
  if (!grid) return;
  const lang = currentLang;
  grid.innerHTML = DAWA_DATA.testimonials.map((t) => `
    <div class="testi hidden">
      <div class="stars">${"★".repeat(t.stars)}</div>
      <div class="quote">"${t.quote[lang]}"</div>
      <div class="who">
        <div class="avatar">${t.name[lang].charAt(0)}</div>
        <div>
          <div class="nm">${t.name[lang]}</div>
          <div class="rl">${t.role[lang]}</div>
        </div>
      </div>
    </div>
  `).join("");
  initReveal();
}

/* ===== GALLERY SLIDER ===== */
let currentGalleryKey = "finishing";
let currentIndex = 1;
let autoSlideInterval;

function renderGallery() {
  const buttons = document.querySelectorAll(".gallery-list button");
  buttons.forEach((b) => {
    const key = b.getAttribute("data-gallery");
    if (key === currentGalleryKey) b.id = "active";
    else b.removeAttribute("id");
  });
  switchGallery(currentGalleryKey);
}

function switchGallery(key) {
  currentGalleryKey = key;
  const wrapper = document.getElementById("sliderWrapper");
  if (!wrapper) return;
  const lang = currentLang;
  const gallery = DAWA_DATA.gallery[key];

  document.querySelectorAll(".gallery-list button").forEach((b) => {
    if (b.getAttribute("data-gallery") === key) b.id = "active";
    else b.removeAttribute("id");
  });

  const cats = document.querySelectorAll(".gallery-list button");
  cats.forEach((b) => {
    const k = b.getAttribute("data-gallery");
    const lbl = DAWA_DATA.gallery[k];
    b.setAttribute("data-ar", lbl.ar);
    b.setAttribute("data-en", lbl.en);
    b.textContent = lbl[lang];
  });

  wrapper.innerHTML = gallery.images.map((img, i) => `
    <div class="slider-item" style="background-image:url('${img}');background-size:cover;background-position:center;background-repeat:no-repeat;cursor:pointer;"
         onclick="openImageOverlay('${img}')"></div>
  `).join("");

  currentIndex = 0;
  updateSlider();
}

function sliderMetrics(wrapper, items) {
  if (!items.length) return { step: 0, visible: 1, max: 0, count: 0 };
  const a = items[0], b = items[1];
  let gap = 0;
  if (b) {
    const ar = a.getBoundingClientRect();
    const br = b.getBoundingClientRect();
    gap = Math.max(0, br.left - (ar.left + ar.width));
  }
  const step = a.getBoundingClientRect().width + gap;
  const visible = step ? Math.max(1, Math.round(wrapper.clientWidth / step)) : 1;
  const max = Math.max(items.length - visible, 0);
  return { step, visible, max, count: items.length };
}

function updateSlider() {
  const wrapper = document.getElementById("sliderWrapper");
  if (!wrapper) return;
  const items = wrapper.querySelectorAll(".slider-item");
  const m = sliderMetrics(wrapper, items);
  currentIndex = Math.max(0, Math.min(currentIndex, m.max));
  wrapper.style.transform = `translateX(${-currentIndex * m.step}px)`;
}

function goToNext() {
  const wrapper = document.getElementById("sliderWrapper");
  if (!wrapper) return;
  const m = sliderMetrics(wrapper, wrapper.querySelectorAll(".slider-item"));
  if (m.count <= m.visible) return;
  currentIndex = currentIndex >= m.max ? 0 : currentIndex + 1;
  updateSlider();
}
function goToPrev() {
  const wrapper = document.getElementById("sliderWrapper");
  if (!wrapper) return;
  const m = sliderMetrics(wrapper, wrapper.querySelectorAll(".slider-item"));
  currentIndex = currentIndex <= 0 ? m.max : currentIndex - 1;
  updateSlider();
}

function initSlider() {
  const nextBtn = document.getElementById("next");
  const prevBtn = document.getElementById("prev");
  const sliderEl = document.getElementById("sliderWrapper");
  if (!nextBtn || !prevBtn) return;

  nextBtn.addEventListener("click", goToNext);
  prevBtn.addEventListener("click", goToPrev);

  /* reset on resize so the maths stays correct */
  window.addEventListener("resize", () => { if (sliderEl) updateSlider(); });

  /* touch swipe (phone / tablet) */
  let startX = null;
  if (sliderEl) {
    sliderEl.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      stop();
    }, { passive: true });
    sliderEl.addEventListener("touchend", (e) => {
      if (startX === null) return;
      const dx = e.changedTouches[0].clientX - startX;
      if (Math.abs(dx) > 40) (dx < 0 ? goToNext() : goToPrev());
      startX = null;
      start();
    }, { passive: true });
  }

  const stop = () => clearInterval(autoSlideInterval);
  const start = () => { stop(); autoSlideInterval = setInterval(goToNext, 4000); };
  [nextBtn, prevBtn, sliderEl].forEach((el) => {
    if (!el) return;
    el.addEventListener("mouseenter", stop);
    el.addEventListener("mouseleave", start);
    el.addEventListener("touchstart", stop);
  });
  start();
}

/* ===== GENERIC HORIZONTAL CAROUSEL (arrow navigated) ===== */
function initCarousel(trackId, prevId, nextId) {
  const track = document.getElementById(trackId);
  const viewport = track ? track.closest(".work-viewport") : null;
  const prev = document.getElementById(prevId);
  const next = document.getElementById(nextId);
  if (!track || !viewport) return;

  let idx = 0;
  let step = 1;

  function measure() {
    const item = track.querySelector(".w-item, .property-card");
    return item ? item.offsetWidth : 0;
  }
  function gapPx() {
    const c = track.children;
    if (c.length < 2) return 0;
    return c[1].offsetLeft - (c[0].offsetLeft + c[0].offsetWidth);
  }
  function combined() {
    return measure() + Math.max(gapPx(), 0);
  }
  function visibleCount() {
    const s = combined();
    if (!s) return 0;
    return Math.max(Math.floor((viewport.clientWidth + gapPx()) / s), 1);
  }
  function computeStep() {
    const v = visibleCount();
    step = Math.max(v, 1);
  }
  function maxIndex() {
    return Math.max(track.children.length - visibleCount(), 0);
  }
  function apply() {
    const max = maxIndex();
    idx = Math.max(0, Math.min(idx, max));
    track.style.transform = `translateX(${-idx * combined()}px)`;
    if (prev) prev.disabled = idx <= 0;
    if (next) next.disabled = idx >= max;
  }

  if (prev) prev.addEventListener("click", () => { computeStep(); idx -= step; apply(); });
  if (next) next.addEventListener("click", () => { computeStep(); idx += step; apply(); });
  window.addEventListener("resize", apply);
  window.addEventListener("load", () => { computeStep(); apply(); });
  requestAnimationFrame(apply);
  setTimeout(() => { computeStep(); apply(); }, 300);
}

function openImageOverlay(url) {
  const ov = document.getElementById("imageOverlay");
  const img = document.getElementById("overlayImage");
  if (!ov) return;
  img.src = url;
  ov.style.display = "flex";
}

function closeImageOverlay() {
  document.getElementById("imageOverlay").style.display = "none";
}

/* ===== CONTACT ===== */
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("cName").value;
    const phone = document.getElementById("cPhone").value;
    const details = document.getElementById("cDetails").value;
    const msg = currentLang === "ar"
      ? `استفسار جديد من ${name}%0Aرقم الهاتف: ${phone}%0Aالتفاصيل: ${details}`
      : `New inquiry from ${name}%0APhone: ${phone}%0ADetails: ${details}`;
    const btn = form.querySelector("button");
    btn.textContent = currentLang === "ar" ? "جاري الإرسال..." : "Sending...";
    window.open(`https://wa.me/201117816248?text=${msg}`, "_blank");
    setTimeout(() => {
      btn.textContent = currentLang === "ar" ? "تم إرسال الرسالة ✓" : "Message sent ✓";
      form.reset();
      setTimeout(() => { btn.textContent = currentLang === "ar" ? "إرسال" : "Send"; }, 3000);
    }, 800);
  });
}
