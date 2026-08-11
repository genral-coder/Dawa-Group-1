/* DAWA Group - property details page */
let currentLang = localStorage.getItem("dawa-lang") || "ar";
let currentProp = null;

const PER_FONTS = {
  cairo: { n: "'Cairo', sans-serif" }, tajawal: { n: "'Tajawal', sans-serif" }, almarai: { n: "'Almarai', sans-serif" },
  rubik: { n: "'Rubik', sans-serif" }, "el-messiri": { n: "'El Messiri', sans-serif" }, amiri: { n: "'Amiri', serif" }
};

function applyCompanyData() {
  const c = window.SITE && window.SITE.content;
  const list = (k) => (c && c[k] && c[k].en ? c[k].en.split("\n").map((s) => s.trim()).filter(Boolean) : []);
  const phones = list("site-phone");
  const emails = list("site-email");
  const renderList = (sel, items, hrefFn) => {
    document.querySelectorAll(sel).forEach((el) => {
      if (items.length === 1) {
        const v = items[0];
        el.textContent = v;
        const a = el.tagName === "A" ? el : el.closest("a");
        if (a) a.href = hrefFn(v);
      } else if (items.length > 1) {
        el.innerHTML = items.map((v) => '<a href="' + hrefFn(v).replace(/"/g, "&quot;") + '" style="display:block;text-decoration:none;color:inherit">' + v.replace(/"/g, "&quot;") + "</a>").join("");
      }
    });
  };
  renderList("[data-c-phone]", phones, (v) => "tel:" + v.replace(/[^\d+]/g, ""));
  renderList("[data-c-email]", emails, (v) => "mailto:" + v);
}

function langText(obj) {
  return obj[currentLang];
}

function waNumber() {
  const c = window.SITE && window.SITE.content;
  const v = c && c["site-whatsapp"] ? c["site-whatsapp"].en : "";
  const first = v ? v.split("\n")[0].trim() : "";
  return first ? first.replace(/[^\d]/g, "") : "201117816248";
}

function findProperty() {
  const params = new URLSearchParams(window.location.search);
  const props = (window.SITE && window.SITE.properties.length) ? window.SITE.properties : window.DAWA_DATA.properties;
  const id = params.get("id") || props[0].id;
  return props.find((p) => p.id === id) || props[0];
}

function applyLang() {
  const html = document.documentElement;
  /* Keep direction LTR always - only the text changes */
  html.lang = currentLang;
  html.dir = "ltr";
  localStorage.setItem("dawa-lang", currentLang);

  document.querySelectorAll("[data-ar]").forEach((el) => {
    const key = el.getAttribute("data-key");
    const ar = el.getAttribute("data-ar");
    const en = el.getAttribute("data-en");
    const s = key && window.SITE && window.SITE.content && window.SITE.content[key];
    const val = s ? (currentLang === "ar" ? s.ar : s.en) : (currentLang === "ar" ? ar : en);
    if (val !== null && val !== undefined) el.textContent = val;
    if (s && s.font && s.font !== "default") {
      el.style.fontFamily = (PER_FONTS[s.font] || {}).n || "";
    } else if (key && !s) {
      el.style.fontFamily = "";
    }
  });

  const btn = document.getElementById("langToggle");
  if (btn) btn.textContent = currentLang === "ar" ? "EN" : "عربي";

  renderDetails();
  document.getElementById("year").textContent = new Date().getFullYear();
}

function toggleLang() {
  currentLang = currentLang === "ar" ? "en" : "ar";
  applyLang();
}

function setMainImage(i) {
  document.getElementById("mainImg").src = currentProp.gallery[i];
  document.querySelectorAll(".thumbs img").forEach((t, idx) => {
    t.classList.toggle("active", idx === i);
  });
}

function renderDetails() {
  const p = currentProp;
  const L = currentLang;

  document.title = p.title[L] + " | Dawa Group";

  const specs = [
    { k: L === "ar" ? "المساحة" : "Area", v: p.area[L] },
    { k: L === "ar" ? "غرف النوم" : "Bedrooms", v: p.beds },
    { k: L === "ar" ? "الحمامات" : "Bathrooms", v: p.baths },
    { k: L === "ar" ? "الموقع" : "Location", v: p.location[L] },
    { k: L === "ar" ? "نوع العقار" : "Property Type", v: p.badge[L] }
  ];

  const detailsEl = document.getElementById("details");
  detailsEl.innerHTML = `
    <div class="details-gallery hidden">
      <img class="main-img" id="mainImg" src="${p.gallery[0]}" alt="${p.title[L]}">
      <div class="thumbs">
        ${p.gallery.map((g, i) => `<img src="${g}" class="${i === 0 ? "active" : ""}" onclick="setMainImage(${i})" alt="view ${i + 1}">`).join("")}
      </div>
    </div>

    <div class="details-body">
      <div>
        <h1 style="font-size:2rem;margin-bottom:.5rem">${p.title[L]}</h1>
        <div style="color:var(--gold);font-weight:700;margin-bottom:1.5rem">${p.badge[L]}</div>

        <h2>${L === "ar" ? "الوصف" : "Description"}</h2>
        <p>${p.desc[L]}</p>
        <p>${p.details[L]}</p>

        <h2>${L === "ar" ? "المواصفات" : "Specifications"}</h2>
        <div class="specs-table">
          ${specs.map((s) => `<div class="spec-box"><div class="k">${s.k}</div><div class="v">${s.v}</div></div>`).join("")}
        </div>
      </div>

      <div class="side-card">
        <div class="price">${p.price[L]}</div>
        <div class="per">${L === "ar" ? "سعر شاملة جميع الرسوم" : "All-inclusive price"}</div>
        <div class="meta">
          <div><span>${L === "ar" ? "الموقع" : "Location"}</span><b>${p.location[L]}</b></div>
          <div><span>${L === "ar" ? "المساحة" : "Area"}</span><b>${p.area[L]}</b></div>
          <div><span>${L === "ar" ? "الغرف" : "Bedrooms"}</span><b>${p.beds}</b></div>
          <div><span>${L === "ar" ? "الحمامات" : "Bathrooms"}</span><b>${p.baths}</b></div>
        </div>
        <a class="btn-gold" href="index.html#contact">${L === "ar" ? "احجز معاينة" : "Book a Viewing"}</a>
        <a class="whatsapp" target="_blank"
           href="https://wa.me/${waNumber()}?text=${L === "ar" ? "أنا مهتم بالعقار: " + encodeURIComponent(p.title[L]) : "I'm interested in: " + encodeURIComponent(p.title[L])}">
          WhatsApp
        </a>
      </div>
    </div>

    <div class="section-btn-wrap">
      <a class="btn-gold" href="index.html">${L === "ar" ? "رجوع للرئيسية" : "Back to Home"}</a>
    </div>
  `;

  document.querySelectorAll(".hidden").forEach((el) => {
    el.classList.add("show");
  });
}

document.addEventListener("DOMContentLoaded", async () => {
  window.SITE = await window.SiteData.get();
  if (window.SiteFont) window.SiteFont.apply();
  applyCompanyData();
  currentProp = findProperty();
  applyLang();

  const nav = document.getElementById("mainNav");
  window.addEventListener("scroll", () => nav.classList.toggle("scrolled", window.scrollY > 60));

  const burger = document.getElementById("burger");
  const navList = document.getElementById("navList");
  if (burger && navList) {
    burger.addEventListener("click", () => {
      burger.classList.toggle("open");
      navList.classList.toggle("active");
    });
    navList.querySelectorAll("a").forEach((a) =>
      a.addEventListener("click", () => {
        burger.classList.remove("open");
        navList.classList.remove("active");
      })
    );
  }

  const topbtn = document.getElementById("topbtn");
  window.onscroll = () => {
    if (topbtn) topbtn.style.display = window.scrollY > 800 ? "block" : "none";
  };
  if (topbtn) {
    topbtn.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
  }
});
