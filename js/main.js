/* DAWA Group - main.js */

/* ===== LANGUAGE (AR text only / EN fixed layout) ===== */
let currentLang = localStorage.getItem("dawa-lang") || "ar";

const escAttr = (s) => String(s || "").replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");

/* خطوط قابلة للتطبيق على كل جملة لوحدها (من لوحة التحكم) */
const PER_FONTS = {
  cairo: { n: "'Cairo', sans-serif", u: "https://fonts.googleapis.com/css2?family=Cairo:wght@300;400;500;600;700;800;900&display=swap" },
  tajawal: { n: "'Tajawal', sans-serif", u: "https://fonts.googleapis.com/css2?family=Tajawal:wght@300;400;500;700;800;900&display=swap" },
  almarai: { n: "'Almarai', sans-serif", u: "https://fonts.googleapis.com/css2?family=Almarai:wght@300;400;700;800&display=swap" },
  rubik: { n: "'Rubik', sans-serif", u: "https://fonts.googleapis.com/css2?family=Rubik:wght@300;400;500;600;700;800&display=swap" },
  "el-messiri": { n: "'El Messiri', sans-serif", u: "https://fonts.googleapis.com/css2?family=El+Messiri:wght@400;500;600;700&display=swap" },
  amiri: { n: "'Amiri', serif", u: "https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&display=swap" }
};
function loadPerFont(k) {
  const f = PER_FONTS[k];
  if (!f || document.getElementById("pf-" + k)) return;
  const l = document.createElement("link");
  l.id = "pf-" + k;
  l.rel = "stylesheet";
  l.href = f.u;
  document.head.appendChild(l);
}

const DEFAULT_BANNERS = ["assets/properties/real-2.jpg"];

function siteText(key, ar, en) {
  const s = window.SITE && window.SITE.content && window.SITE.content[key];
  if (s) return currentLang === "ar" ? s.ar : s.en;
  return currentLang === "ar" ? ar : en;
}

function applyLanguage() {
  const html = document.documentElement;
  /* layout direction stays LTR always - only the text changes */
  html.lang = currentLang;
  html.dir = "ltr";
  localStorage.setItem("dawa-lang", currentLang);

  document.querySelectorAll("[data-ar]").forEach((el) => {
    const key = el.getAttribute("data-key");
    const ar = el.getAttribute("data-ar");
    const en = el.getAttribute("data-en");
    const s = window.SITE && window.SITE.content && window.SITE.content[key];
    const val = siteText(key, ar, en);
    if (val !== null && val !== undefined) el.textContent = val;
    if (s && s.font && s.font !== "default") {
      loadPerFont(s.font);
      el.style.fontFamily = (PER_FONTS[s.font] || {}).n || "";
    } else if (key && !s) {
      el.style.fontFamily = "";
    }
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

/* ===== HERO BANNERS (dynamic from DB) ===== */
function renderBanners() {
  const wrap = document.querySelector(".hero-banner");
  if (!wrap) return;
  const S = window.SITE;
  const fromDB = S && S.useDB;
  if (!fromDB) return; /* بدون قاعدة بيانات: خلّي الصور الافتراضية في الـ HTML */
  let items = (S.banners && S.banners.length)
    ? S.banners.map((b) => ({ image: b.image, link: b.link || "" })).filter((b) => b.image)
    : DEFAULT_BANNERS.map((src) => ({ image: src, link: "" }));
  if (!items.length) return;
  const slide = (b, extraStyle) =>
    '<div class="b-slide" style="' + (b.link ? "cursor:pointer;" : "") + extraStyle + '"' +
    (b.link ? ' onclick="window.open(\'' + escAttr(b.link) + '\',\'_blank\')"' : "") +
    '><img src="' + escAttr(b.image) + '" alt="Dawa Group"></div>';
  if (items.length === 1) {
    wrap.innerHTML = slide(items[0], "animation:none;opacity:1");
    return;
  }
  const total = items.length * 8;
  wrap.innerHTML = items.map((b, i) => slide(b, "animation-duration:" + total + "s;animation-delay:" + (i * 8) + "s")).join("");
}

/* ===== COMPANY DATA (phone / email / whatsapp / social) ===== */
function companyVal(key) {
  const c = window.SITE && window.SITE.content;
  return (c && c[key] && c[key].en) ? c[key].en.trim() : "";
}
function companyList(key) {
  const v = companyVal(key);
  return v ? v.split("\n").map((s) => s.trim()).filter(Boolean) : [];
}
function applyCompanyData() {
  const phones = companyList("site-phone");
  const emails = companyList("site-email");
  const waList = companyList("site-whatsapp");
  const fb = companyVal("site-facebook");
  const tiktok = companyVal("site-tiktok");
  const renderList = (sel, items, hrefFn) => {
    document.querySelectorAll(sel).forEach((el) => {
      if (items.length === 1) {
        const v = items[0];
        el.textContent = v;
        const a = el.tagName === "A" ? el : el.closest("a");
        if (a) a.href = hrefFn(v);
      } else if (items.length > 1) {
        el.innerHTML = items.map((v) => '<a href="' + escAttr(hrefFn(v)) + '" style="display:block;text-decoration:none;color:inherit">' + escAttr(v) + "</a>").join("");
      }
    });
  };
  renderList("[data-c-phone]", phones, (v) => "tel:" + v.replace(/[^\d+]/g, ""));
  renderList("[data-c-email]", emails, (v) => "mailto:" + v);
  if (waList.length) {
    const href = "https://wa.me/" + waList[0].replace(/[^\d]/g, "");
    document.querySelectorAll("[data-c-wa]").forEach((el) => { if (el.tagName === "A") el.href = href; });
    if (waList.length > 1) {
      const row = document.querySelector(".contact-info-row");
      if (row) {
        waList.slice(1).forEach((w) => {
          const chip = document.createElement("div");
          chip.className = "contact-chip";
          const icon = '<span class="ic"><img src="assets/icons/whatsapp.svg" alt=""></span>';
          chip.innerHTML = icon + '<span class="tx"><a href="https://wa.me/' + w.replace(/[^\d]/g, "") + '" style="color:inherit;text-decoration:none">' + escAttr(w) + "</a></span>";
          row.appendChild(chip);
        });
      }
    }
  }
  const setHref = (sel, v) => { if (!v || v === "#") return; const el = document.querySelector(sel); if (el) el.href = v; };
  const blockEmpty = (sel) => {
    document.querySelectorAll(sel).forEach((el) => {
      el.addEventListener("click", (e) => {
        if (!el.getAttribute("href") || el.getAttribute("href") === "#") e.preventDefault();
      });
    });
  };
  setHref("[data-c-fb]", fb);
  setHref("[data-c-tiktok]", tiktok);
  blockEmpty("[data-c-fb]");
  blockEmpty("[data-c-tiktok]");
}

function openFbChooser(e) {
  if (e) e.preventDefault();
  const box = document.getElementById("fbChooser");
  if (box) box.style.display = "flex";
}

function closeFbChooser(e) {
  if (e && e.target && e.target.id !== "fbChooser" && !e.target.closest(".fb-chooser-box")) return;
  const box = document.getElementById("fbChooser");
  if (box) box.style.display = "none";
}

function initFbChooser() {
  const box = document.getElementById("fbChooser");
  if (box) {
    box.addEventListener("click", (e) => {
      if (e.target === box) box.style.display = "none";
    });
  }
}

document.addEventListener("DOMContentLoaded", async () => {
  window.SITE = await window.SiteData.get();
  applyLanguage();
  if (window.SiteFont) window.SiteFont.apply();
  renderBanners();
  applyCompanyData();
  initFbChooser();

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
  initReviewForm();
  renderProperties();
  renderPackages();
  renderTestimonials();
  renderGallery();

  /* footer year */
  const y = document.getElementById("year");
  if (y) y.textContent = new Date().getFullYear();
});

/* ===== SCROLL REVEAL ===== */
const REVEAL_MARGIN = 60;
function initReveal() {
  const els = document.querySelectorAll(".hidden, .hidden-right, .hidden-zoom");
  els.forEach((el) => el.classList.remove("show"));
  const shown = new Set();

  function revealNow() {
    const vh = window.innerHeight || document.documentElement.clientHeight;
    const limit = vh - REVEAL_MARGIN;
    els.forEach((el) => {
      if (shown.has(el)) return;
      const r = el.getBoundingClientRect();
      if (r.top < limit) {
        el.classList.add("show");
        shown.add(el);
      }
    });
  }

  window.addEventListener("scroll", revealNow, { passive: true });
  window.addEventListener("resize", revealNow);
  if (document.readyState === "loading") {
    window.addEventListener("load", revealNow);
  }
  setTimeout(revealNow, 200);
  setTimeout(revealNow, 600);
  /* safety net: never leave content invisible on any device */
  setTimeout(() => {
    els.forEach((el) => el.classList.add("show"));
  }, 6000);
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
  const props = (window.SITE && window.SITE.properties.length) ? window.SITE.properties : window.DAWA_DATA.properties;
  grid.innerHTML = props.map((p) => `
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
  const packs = (window.SITE && window.SITE.packages.length) ? window.SITE.packages : window.DAWA_DATA.packages;
  grid.innerHTML = packs.map((p) => `
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
  const tests = (window.SITE && window.SITE.testimonials.length) ? window.SITE.testimonials : window.DAWA_DATA.testimonials;
  grid.innerHTML = tests.map((t) => `
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
let currentIndex = 0;
let autoSlideInterval;

function galleryMap() {
  const db = window.SITE && window.SITE.gallery;
  if (db && Object.keys(db).length) return db;
  return window.DAWA_DATA.gallery;
}

function renderGallery() {
  const listEl = document.querySelector(".gallery-list");
  const map = galleryMap();
  const hiddenKeys = ["interiors", "exteriors"];
  const keys = Object.keys(map).filter((k) => hiddenKeys.indexOf(k) === -1);
  if (keys.length && !map[currentGalleryKey]) currentGalleryKey = keys[0];
  if (listEl) {
    const lang = currentLang;
    listEl.innerHTML = keys.map((k) => {
      const g = map[k];
      return `<button data-gallery="${escAttr(k)}" data-ar="${escAttr(g.ar)}" data-en="${escAttr(g.en)}">${g[lang]}</button>`;
    }).join("");
  }
  const buttons = document.querySelectorAll(".gallery-list button");
  buttons.forEach((b) => {
    const key = b.getAttribute("data-gallery");
    if (key === currentGalleryKey) b.id = "active";
    else b.removeAttribute("id");
    b.addEventListener("click", () => switchGallery(key));
  });
  switchGallery(currentGalleryKey);
}

function switchGallery(key) {
  currentGalleryKey = key;
  const wrapper = document.getElementById("sliderWrapper");
  if (!wrapper) return;
  const lang = currentLang;
  const gallery = galleryMap()[key];
  if (!gallery) return;

  document.querySelectorAll(".gallery-list button").forEach((b) => {
    if (b.getAttribute("data-gallery") === key) b.id = "active";
    else b.removeAttribute("id");
  });

  const cats = document.querySelectorAll(".gallery-list button");
  cats.forEach((b) => {
    const k = b.getAttribute("data-gallery");
    const lbl = galleryMap()[k];
    if (!lbl) return;
    b.setAttribute("data-ar", lbl.ar);
    b.setAttribute("data-en", lbl.en);
    b.textContent = lbl[lang];
  });

  wrapper.innerHTML = gallery.images.map((img) => `
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
function waNumber() {
  const v = companyVal("site-whatsapp");
  const first = v ? v.split("\n")[0].trim() : "";
  return first ? first.replace(/[^\d]/g, "") : "201067666612";
}
function postToTable(table, payload) {
  const cfg = window.SUPABASE || {};
  if (!cfg.url || !cfg.anonKey || !window.supabase) return Promise.reject("no-supabase");
  const client = window.supabase.createClient(cfg.url, cfg.anonKey);
  return client.from(table).insert(payload);
}
function initContactForm() {
  const form = document.getElementById("contactForm");
  if (!form) return;
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("cName").value;
    const phone = document.getElementById("cPhone").value;
    const email = document.getElementById("cEmail").value;
    const details = document.getElementById("cDetails").value;
    const msg = currentLang === "ar"
      ? `استفسار جديد من ${name}%0Aرقم الهاتف: ${phone}%0Aالتفاصيل: ${details}`
      : `New inquiry from ${name}%0APhone: ${phone}%0ADetails: ${details}`;
    const btn = form.querySelector("button");
    btn.textContent = currentLang === "ar" ? "جاري الإرسال..." : "Sending...";
    window.open(`https://wa.me/${waNumber()}?text=${msg}`, "_blank");
    const successEl = document.getElementById("contactSuccess");
    if (successEl) {
      successEl.style.display = "block";
      successEl.textContent = currentLang === "ar"
        ? successEl.getAttribute("data-ar")
        : successEl.getAttribute("data-en");
    }
    setTimeout(() => {
      btn.textContent = currentLang === "ar" ? "تم إرسال الطلب ✓" : "Request sent ✓";
      form.reset();
      setTimeout(() => { btn.textContent = currentLang === "ar" ? "إرسال الطلب" : "Send Request"; }, 3000);
    }, 800);
  });
}

/* ===== VISITOR REVIEW FORM ===== */
function initReviewForm() {
  const form = document.getElementById("reviewForm");
  if (!form) return;
  let stars = 5;
  const starsBox = document.getElementById("rvStars");
  if (starsBox) {
    starsBox.querySelectorAll("[data-s]").forEach((el) => {
      el.addEventListener("click", () => {
        stars = parseInt(el.dataset.s, 10);
        starsBox.querySelectorAll("[data-s]").forEach((s) => {
          const on = parseInt(s.dataset.s, 10) <= stars;
          s.classList.toggle("sel", on);
        });
      });
    });
  }
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = document.getElementById("rvName").value;
    const role = document.getElementById("rvRole").value;
    const quote = document.getElementById("rvQuote").value;
    const btn = form.querySelector("button");
    btn.textContent = currentLang === "ar" ? "جاري الإرسال..." : "Sending...";
    postToTable("reviews", { name, role: role || "", stars, quote, status: "pending" })
      .then(() => { btn.textContent = currentLang === "ar" ? "تم إرسال رأيك ✓" : "Review sent ✓"; })
      .catch(() => { btn.textContent = currentLang === "ar" ? "حدث خطأ، حاول تاني" : "Error, try again"; });
    form.reset();
    setTimeout(() => { btn.textContent = currentLang === "ar" ? "إرسال" : "Send"; }, 3000);
  });
}
