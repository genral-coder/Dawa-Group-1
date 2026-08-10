/* DAWA Group - Admin panel (لوحة التحكم)
   الأمان الحقيقي = Supabase Auth + RLS (التعديل مسموح فقط لحسابك). */

/* النصوص الافتراضية للموقع (نفس اللي في index.html). بقت هنا عشان "استيراد النصوص الافتراضية" */
const CONTENT_DEFAULTS = {
  "nav-home": { ar: "الرئيسية", en: "Home" },
  "nav-properties": { ar: "عقارات", en: "Properties" },
  "nav-finishing": { ar: "تشطيبات", en: "Finishing" },
  "nav-contracting": { ar: "مقاولات", en: "Contracting" },
  "nav-about": { ar: "من نحن", en: "About" },
  "nav-gallery": { ar: "المعرض", en: "Gallery" },
  "nav-contact": { ar: "تواصل معنا", en: "Contact" },
  "hero-badge": { ar: "إدارة هندسية متكاملة", en: "Full Engineering Services" },
  "hero-title1": { ar: "منزل أحلامك", en: "Your Dream Home" },
  "hero-title2": { ar: "يبدأ من هنا", en: "Starts Here" },
  "hero-text": { ar: "ضوه جروب - شريكك الموثوق في عالم العقارات والتشطيبات والمقاولات. نبني لك بيت الأحلام بأعلى خامات وجودة والتزام كامل بالمواعيد.", en: "DAWA Group - your trusted partner in real estate, finishing & contracting. We build your dream home with the finest materials, top quality, and full commitment to deadlines." },
  "hero-text2": { ar: "ضوه جروب - عقارات، تشطيبات ومقاولات", en: "DAWA Group - Real Estate, Finishing & Contracting" },
  "hero-cta1": { ar: "استكشف العقارات", en: "Explore Properties" },
  "hero-cta2": { ar: "تواصل معنا", en: "Contact Us" },
  "hero-scroll": { ar: "مرر للأسفل", en: "Scroll Down" },
  "svc-real-title": { ar: "عقارات", en: "Real Estate" },
  "svc-real-text": { ar: "شقق، فيلات، بنتهاوس وأراضي في أرقى المناطق بأفضل الأسعار.", en: "Apartments, villas, penthouses and land in the finest locations at the best prices." },
  "svc-finish-title": { ar: "تشطيبات", en: "Finishing" },
  "svc-finish-text": { ar: "تشطيب سوبر لوكس وعصري بأحدث الخامات العالمية وتصميم داخلي مميز.", en: "Super-lux and modern finishing with the latest materials and distinctive interior design." },
  "svc-con-title": { ar: "مقاولات", en: "Contracting" },
  "svc-con-text": { ar: "تنفيذ مشاريع كبرى بإدارة هندسية محترفة وضمانات تسليم موثقة.", en: "Full project execution with professional engineering management and guaranteed delivery." },
  "about-title": { ar: "من هي ضوه جروب؟", en: "Who is DAWA Group?" },
  "about-text": { ar: "شركة ضوه جروب للتطوير العقاري تعد من أهم الشركات التي لها خبرة في السوق العقاري، حيث قامت بطرح العديد من المشروعات الناجحة في مدينة بنها، وامتدت مشروعات الشركة من أجل التطوير العمراني إلى الشروق والتجمع الخامس حيث مشروع الحى الثاني والحى السادس والحى الخامس والحى السابع ببيت الوطن.", en: "DAWA Group for Real Estate Development is one of the most important companies with proven experience in the real estate market. It has launched numerous successful projects in Benha city, and its urban development projects have expanded to El Shorouk and the Fifth Settlement, including the Second District, Sixth District, Fifth District and Seventh District projects in Beit Elwatan." },
  "stat1": { ar: "سنة خبرة", en: "Years of Experience" },
  "stat2": { ar: "مشروع مكتمل", en: "Completed Projects" },
  "stat3": { ar: "عميل سعيد", en: "Happy Clients" },
  "stat4": { ar: "متر مربع تم تشطيبها", en: "m² Finished" },
  "realestate-title": { ar: "عقارات مميزة", en: "Premium Real Estate" },
  "realestate-desc": { ar: "نساعدك تختار العقار المثالي اللي يناسب ميزانيتك وأسلوب حياتك، بأسعار تنافسية وتقسيط مريح. فريقك الاستشاري من ضوه جروب يرافقك من المعاينة حتى توثيق العقد.", en: "We help you choose the perfect property for your budget and lifestyle, at competitive prices with flexible installments. Your Dawa consulting team accompanies you from the first viewing to contract notarization." },
  "realestate-btn": { ar: "تصفح العقارات", en: "Browse Properties" },
  "featured-title": { ar: "عقارات متاحة", en: "Available Properties" },
  "featured-sub": { ar: "اختيار العقار الصحيح يغير مجرى حياتك، والأهم أن ضوه توفر لك فرص استثمار لا تفوتها.", en: "The right property can change the course of your life, and Dawa offers you investment opportunities you won't want to miss." },
  "featured-btn": { ar: "اطلب عرض خاص", en: "Request a Custom Offer" },
  "finishing-title": { ar: "تشطيبات فاخرة", en: "Luxury Finishing" },
  "finishing-desc": { ar: "التشطيب هو الروح التي تبث الحياة في وحدتك. فريق ضوه يترجم أحلامك إلى تصميم حقيقي بخامات مختارة بعناية وهوية هندسية أصلية.", en: "Finishing is the soul that brings your home to life. Our team translates your dreams into a real design with carefully selected materials and a unique architectural identity." },
  "finishing-btn": { ar: "شاهد أعمالنا", en: "View Our Work" },
  "work-title": { ar: "أعمالنا من التشطيبات", en: "Our Finishing Work" },
  "work-sub": { ar: "منتجاتنا الحقيقية تتكلم عن نفسها - جودة تشطيب على أعلى مستوى لكل مشروع.", en: "Our work speaks for itself - high-quality finishing for every project." },
  "contracting-title": { ar: "مقاولات عامة", en: "General Contracting" },
  "contracting-desc": { ar: "من الإنشاءات الهيكلية حتى التشطيب النهائي، تدير ضوه مشروعك بأمانة وحرفية عالية. إدارة هندسية وجدولة زمنية وتقرير إنجاز يومي شفاف.", en: "From structural works to final finishing, DAWA runs your project with honesty and great craftsmanship - engineering management, a clear timeline, and a transparent daily progress report." },
  "contracting-btn": { ar: "اطلب عرض سعر", en: "Get a Quote" },
  "testi-title": { ar: "كلمات عملائنا", en: "Words from Our Clients" },
  "gallery-title": { ar: "معرض أعمالنا", en: "Our Gallery" },
  "contact-title": { ar: "تواصل معنا", en: "Contact Us" },
  "contact-sub": { ar: "اترك لنا رسالة وسنرد عليك في أقرب وقت، أو اتصل بنا مباشرة.", en: "Leave us a message and we'll get back to you soon, or call us directly." },
  "contact-send": { ar: "إرسال الطلب", en: "Send Request" },
  "contact-loc": { ar: "القاهرة، مصر", en: "Cairo, Egypt" },
  "footer-about": { ar: "ضوه جروب - شريكك الأمين في العالم العقاري. نبني لك بيتك بأعلى جودة والتزام وأمانة، من المعاينة الأولى حتى تسليم المفتاح.", en: "DAWA Group - your trusted partner in the real estate world. We build your home with quality, commitment and integrity, from first viewing to turnkey handover." },
  "footer-links-title": { ar: "روابط مفيدة", en: "Useful Links" },
  "footer-contact-title": { ar: "تواصل معنا", en: "Contact Us" },
  "footer-loc": { ar: "القاهرة الجديدة، مصر", en: "New Cairo, Egypt" },
  "footer-copy": { ar: "جميع الحقوق محفوظة.", en: "All rights reserved." },
  "crumb-props": { ar: " / عقارات", en: " / Properties" },
  "site-font": { ar: "default", en: "default" },
  "site-phone": { ar: "+20 111 781 6248", en: "+20 111 781 6248" },
  "site-email": { ar: "info@dawagroup.com", en: "info@dawagroup.com" },
  "site-whatsapp": { ar: "201117816248", en: "201117816248" },
  "site-facebook": { ar: "", en: "" },
  "site-instagram": { ar: "", en: "" }
};

/* مفاتيح بيانات الشركة (بتظهر كحقول مخصصة في تبويب "بيانات الشركة") */
const COMPANY_KEYS = [
  { k: "site-phone", l: "رقم الهاتف", ph: "+20 111 781 6248" },
  { k: "site-email", l: "الإيميل", ph: "info@dawagroup.com" },
  { k: "site-whatsapp", l: "رقم الواتساب (بدون + ولا مسافات)", ph: "201117816248" },
  { k: "site-facebook", l: "رابط الفيسبوك", ph: "https://facebook.com/..." },
  { k: "site-instagram", l: "رابط الانستغرام", ph: "https://instagram.com/..." }
];

/* الخطوط المتاحة لاختيارها من لوحة التحكم */
const FONT_OPTIONS = [
  { v: "default", l: "الخط الافتراضي" },
  { v: "cairo", l: "القاهرة - Cairo" },
  { v: "tajawal", l: "تجوّل - Tajawal" },
  { v: "almarai", l: "المراعي - Almarai" },
  { v: "rubik", l: "روبيك - Rubik" },
  { v: "el-messiri", l: "المصيري - El Messiri" },
  { v: "amiri", l: "أميري - Amiri" }
];

const FIELDS = {
  properties: [
    { k: "id", l: "المعرف id", t: "text", full: false },
    { k: "image", l: "الصورة الأساسية (ارفعها من جهازك)", t: "text", full: true, up: true },
    { k: "gallery", l: "صور المعرض (ارفعها أو كل صورة في سطر)", t: "arr", full: true, ups: "properties" },
    { k: "badge_ar", l: "الشارة عربي", t: "text" },
    { k: "badge_en", l: "الشارة إنجليزي", t: "text" },
    { k: "type", l: "النوع", t: "select", opts: ["sale", "rent", "other"] },
    { k: "price_ar", l: "السعر عربي", t: "text" },
    { k: "price_en", l: "السعر إنجليزي", t: "text" },
    { k: "title_ar", l: "العنوان عربي", t: "text" },
    { k: "title_en", l: "العنوان إنجليزي", t: "text" },
    { k: "location_ar", l: "الموقع عربي", t: "text" },
    { k: "location_en", l: "الموقع إنجليزي", t: "text" },
    { k: "area_ar", l: "المساحة عربي", t: "text" },
    { k: "area_en", l: "المساحة إنجليزي", t: "text" },
    { k: "beds", l: "الغرف", t: "number" },
    { k: "baths", l: "الحمامات", t: "number" },
    { k: "desc_ar", l: "الوصف عربي", t: "area", full: true },
    { k: "desc_en", l: "الوصف إنجليزي", t: "area", full: true },
    { k: "details_ar", l: "التفاصيل عربي", t: "area", full: true },
    { k: "details_en", l: "التفاصيل إنجليزي", t: "area", full: true },
    { k: "sort", l: "الترتيب", t: "number" }
  ],
  categories: [
    { k: "id", l: "المفتاح id", t: "text" },
    { k: "name_ar", l: "الاسم عربي", t: "text" },
    { k: "name_en", l: "الاسم إنجليزي", t: "text" },
    { k: "images", l: "صور القسم (ارفعها أو كل صورة في سطر)", t: "arr", full: true, ups: "categories" },
    { k: "sort", l: "الترتيب", t: "number" }
  ],
  packages: [
    { k: "id", l: "المعرف id", t: "text" },
    { k: "icon", l: "الأيقونة", t: "text" },
    { k: "title_ar", l: "الاسم عربي", t: "text" },
    { k: "title_en", l: "الاسم إنجليزي", t: "text" },
    { k: "price_ar", l: "السعر عربي", t: "text" },
    { k: "price_en", l: "السعر إنجليزي", t: "text" },
    { k: "items_ar", l: "العناصر عربي (كل عنصر في سطر)", t: "arr", full: true },
    { k: "items_en", l: "العناصر إنجليزي (كل عنصر في سطر)", t: "arr", full: true },
    { k: "featured", l: "باقة مميزة", t: "chk" },
    { k: "sort", l: "الترتيب", t: "number" }
  ],
  testimonials: [
    { k: "id", l: "المعرف id", t: "text" },
    { k: "name_ar", l: "الاسم عربي", t: "text" },
    { k: "name_en", l: "الاسم إنجليزي", t: "text" },
    { k: "role_ar", l: "الوظيفة عربي", t: "text" },
    { k: "role_en", l: "الوظيفة إنجليزي", t: "text" },
    { k: "stars", l: "النجوم (1-5)", t: "number" },
    { k: "quote_ar", l: "الرأي عربي", t: "area", full: true },
    { k: "quote_en", l: "الرأي إنجليزي", t: "area", full: true },
    { k: "sort", l: "الترتيب", t: "number" }
  ],
  banners: [
    { k: "id", l: "المعرف id", t: "text" },
    { k: "image", l: "صورة البانر (ارفعها من جهازك - يفضل نسبة 2.3)", t: "text", full: true, up: true },
    { k: "link", l: "رابط يفتح عند الضغط (اختياري)", t: "text", full: true },
    { k: "sort", l: "الترتيب", t: "number" }
  ]
};

const TABLE_NAMES = { properties: "properties", categories: "categories", packages: "packages", testimonials: "testimonials", banners: "banners" };
const PK = { properties: "id", categories: "id", packages: "id", testimonials: "id", banners: "id" };
const CONFLICT = { properties: "id", categories: "id", packages: "id", testimonials: "id", banners: "id", content: "key" };

let sb = null;
let SESSION = null;
let currentEntity = "properties";
let currentEditId = null;
let ROW_CACHE = {};
let SB_URL = "";
let REVIEW_CACHE = {};
let MSG_CACHE = {};

function $id(s) { return document.getElementById(s); }

function escAttr(s) { return String(s == null ? "" : s).replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;"); }

/* ===== STORAGE (رفع الصور لـ Supabase Storage) ===== */
function pickUpload(folder, multi, onUrls) {
  const cfg = window.SUPABASE || {};
  if (!cfg.url || !sb) { toast("مفيش Supabase", false); return; }
  const inp = document.createElement("input");
  inp.type = "file";
  inp.accept = "image/*";
  inp.multiple = !!multi;
  inp.onchange = async () => {
    const files = Array.from(inp.files || []);
    if (!files.length) return;
    const urls = [];
    for (const f of files) {
      const path = (folder || "uploads") + "/" + Date.now() + "-" + Math.floor(Math.random() * 1000000) + "_" + f.name.replace(/[^a-zA-Z0-9.\-_]/g, "_");
      const resp = await sb.storage.from("images").upload(path, f, { upsert: true, contentType: f.type || "image/jpeg" });
      if (resp.error) { toast("فشل رفع الصورة: " + resp.error.message, false); continue; }
      urls.push(cfg.url.replace(/\/$/, "") + "/storage/v1/object/public/images/" + path);
    }
    if (urls.length && onUrls) onUrls(urls);
  };
  inp.click();
}

function toast(msg, ok) {
  const t = document.createElement("div");
  t.textContent = msg;
  t.style.cssText = "position:fixed;bottom:20px;left:50%;transform:translateX(-50%);z-index:999;background:" + (ok ? "#3fae6a" : "#e25563") + ";color:#fff;padding:10px 18px;border-radius:8px;font-size:13px;box-shadow:0 4px 14px rgba(0,0,0,.4)";
  document.body.appendChild(t);
  setTimeout(() => t.remove(), 3200);
}

/* ===== AUTH ===== */
async function initAuth() {
  const cfg = window.SUPABASE || {};
  if (!cfg.url || !cfg.anonKey) {
    $id("loginMsg").textContent = "مش لاقي إعدادات Supabase. افتح js/supabase-config.js وحط url و anonKey.";
    return;
  }
  sb = window.supabase.createClient(cfg.url, cfg.anonKey);
  const { data: { session } } = await sb.auth.getSession();
  if (session) showApp(session); else showLogin();
}

function showLogin() { SESSION = null; $id("appView").classList.add("hidden"); $id("loginView").classList.remove("hidden"); }
function showApp(session) {
  SESSION = session;
  $id("loginView").classList.add("hidden");
  $id("appView").classList.remove("hidden");
  const em = $id("appEmail");
  if (em) em.textContent = session.user.email || "";
  switchTab("home");
  loadTab("home");
}

async function doLogin() {
  const email = $id("loginEmail").value.trim();
  const pass = $id("loginPass").value;
  if (!sb) return;
  const { data, error } = await sb.auth.signInWithPassword({ email, password: pass });
  if (error) { $id("loginMsg").textContent = "خطأ: " + error.message; return; }
  $id("loginMsg").textContent = "";
  showApp(data.session);
}

async function doLogout() {
  await sb.auth.signOut();
  showLogin();
}

/* ===== TABS ===== */
document.querySelectorAll(".side-item").forEach((b) => {
  b.addEventListener("click", () => { switchTab(b.dataset.tab); loadTab(b.dataset.tab); });
});
function switchTab(t) {
  currentEntity = t;
  document.querySelectorAll(".side-item").forEach((b) => b.classList.toggle("active", b.dataset.tab === t));
  document.querySelectorAll(".tab").forEach((s) => s.classList.toggle("active", s.id === "tab-" + t));
}

function reloadPreview() {
  const f = $id("previewFrame");
  if (f) f.src = "index.html?v=" + Date.now();
}

/* ===== PREVIEW DEVICE SWITCH ===== */
function setPreviewW(btn, w) {
  document.querySelectorAll(".dv").forEach((b) => b.classList.remove("active"));
  if (btn) btn.classList.add("active");
  const f = $id("previewFrame");
  if (f) f.style.width = w === "100%" ? "100%" : w + "px";
}
function applyCustomW() {
  const sel = $id("previewW");
  const custom = $id("previewWCustom");
  if (!sel) return;
  if (sel.value === "custom") {
    if (custom) { custom.style.display = "block"; custom.focus(); }
    return;
  }
  if (custom) custom.style.display = "none";
  if (!sel.value) return;
  document.querySelectorAll(".dv").forEach((b) => b.classList.remove("active"));
  const f = $id("previewFrame");
  if (f) f.style.width = sel.value + "px";
}
function applyCustomNum() {
  const v = parseInt(($id("previewWCustom") && $id("previewWCustom").value) || "", 10);
  if (!v || v < 280 || v > 3000) return;
  document.querySelectorAll(".dv").forEach((b) => b.classList.remove("active"));
  const f = $id("previewFrame");
  if (f) f.style.width = v + "px";
}

/* ===== LISTS ===== */
async function loadTab(t) {
  if (t === "content") { await loadContentForm(); return; }
  if (t === "company") { await loadCompanyForm(); return; }
  if (t === "home") return;
  if (t === "messages") { await loadMessages(); return; }
  if (t === "reviews") { await loadReviews(); return; }
  const box = $id("cards-" + t);
  if (!box) return;
  box.innerHTML = '<div class="filler">... جارٍ التحميل</div>';
  const { data, error } = await sb.from(TABLE_NAMES[t]).select("*").order("sort", { ascending: true });
  if (error) { box.innerHTML = ""; toast("فشل التحميل: " + error.message, false); return; }
  ROW_CACHE[t] = {};
  (data || []).forEach((r) => { ROW_CACHE[t][r[PK[t]]] = r; });
  if (!data || !data.length) { box.innerHTML = '<div class="filler">مفيش بيانات. اضغط "استيراد" أو "إضافة".</div>'; return; }
  box.innerHTML = data.map((r) => cardHtml(t, r)).join("");
  if (t === "categories") wireDrag();
}

function cardHtml(t, r) {
  const pk = escAttr(r[PK[t]]);
  let thumb = "",
    title = "",
    sub = "",
    stars = "";
  if (t === "properties") { thumb = r.image || ""; title = r.title_ar || r.title_en || "بدون اسم"; sub = r.price_ar || r.price_en || ""; }
  else if (t === "banners") { thumb = r.image || ""; title = "بانر"; sub = r.link || "بدون رابط"; }
  else if (t === "categories") { thumb = (r.images && r.images[0]) || ""; title = r.name_ar || r.name_en || "بدون اسم"; sub = ((r.images || []).length || 0) + " صورة"; }
  else if (t === "packages") { thumb = ""; title = (r.icon || "📦") + "  " + (r.title_ar || r.title_en || ""); sub = r.price_ar || r.price_en || ""; }
  else { thumb = ""; title = r.name_ar || r.name_en || "رأي"; sub = ""; stars = '<div class="c-stars">' + "★".repeat(Math.min(r.stars || 5, 5)) + "</div>"; }
  const place = (t === "packages") ? (r.icon || "📦") : (t === "testimonials") ? (title.charAt(0)) : "🖼";
  const drag = t === "categories" ? ' draggable="true"' : "";
  const dragHint = t === "categories" ? '<div class="drag-hint">⠿ اسحب من هنا لترتيب</div>' : "";
  return '<div class="card-item c-' + t + '"' + drag + ' data-id="' + pk + '">' +
    (thumb ? '<div class="c-thumb-wrap"><img class="c-thumb" src="' + escAttr(thumb) + '" alt=""></div>'
      : '<div class="c-thumb-wrap c-thumb-off">' + place + "</div>") +
    '<div class="c-body"><div class="c-title">' + escAttr(title) + "</div>" +
    (sub ? '<div class="c-sub">' + escAttr(sub) + "</div>" : "") +
    stars +
    dragHint +
    '<div class="c-actions">' +
    '<button class="btn-ghost" onclick="openModal(\'' + t + '\',\'' + pk + '\')">تعديل</button>' +
    '<button class="btn-danger" onclick="delRow(\'' + t + '\',\'' + pk + '\')">حذف</button>' +
    "</div></div></div>";
}

/* ===== سحب وإفلات لترتيب الأقسام ===== */
function wireDrag() {
  const box = $id("cards-categories");
  if (!box) return;
  box.querySelectorAll(".card-item").forEach((el) => {
    el.addEventListener("dragstart", () => { el.classList.add("dragging"); });
    el.addEventListener("dragover", (e) => {
      e.preventDefault();
      const after = Array.from(box.querySelectorAll(".card-item:not(.dragging)")).find((c) => {
        const r = c.getBoundingClientRect();
        return e.clientY < r.top + r.height / 2;
      });
      if (after) box.insertBefore(el, after); else box.appendChild(el);
    });
    el.addEventListener("dragend", () => { el.classList.remove("dragging"); saveOrder(); });
  });
}
async function saveOrder() {
  const box = $id("cards-categories");
  if (!box) return;
  const ids = Array.from(box.querySelectorAll(".card-item")).map((c) => c.dataset.id);
  const rows = ids.map((id, i) => Object.assign({}, ROW_CACHE.categories[id] || {}, { id, sort: i + 1 }));
  const { error } = await sb.from("categories").upsert(rows, { onConflict: "id" });
  if (error) toast("فشل حفظ الترتيب: " + error.message, false); else { toast("اتحفظ الترتيب", true); reloadPreview(); }
}

function esc(s) { return String(s).replace(/'/g, "\\'").replace(/"/g, "&quot;"); }

async function delRow(t, id) {
  if (!confirm("متأكد تحذف دي؟")) return;
  const { error } = await sb.from(TABLE_NAMES[t]).delete().eq(PK[t], id);
  if (error) toast("فشل الحذف: " + error.message, false); else { toast("اتحذفت", true); loadTab(t); reloadPreview(); }
}

/* ===== IMPORT DEFAULTS ===== */
async function importDefaults(t) {
  if (!confirm("هيتم استيراد البيانات الحالية من الموقع (لو مش موجودة)؟")) return;
  let rows = [];
  if (t === "properties") {
    rows = window.DAWA_DATA.properties.map((p, i) => ({
      id: p.id, sort: i + 1, image: p.image, gallery: p.gallery || [],
      badge_ar: p.badge.ar, badge_en: p.badge.en, type: p.type,
      price_ar: p.price.ar, price_en: p.price.en, title_ar: p.title.ar, title_en: p.title.en,
      location_ar: p.location.ar, location_en: p.location.en, area_ar: p.area.ar, area_en: p.area.en,
      beds: p.beds, baths: p.baths, desc_ar: p.desc.ar, desc_en: p.desc.en,
      details_ar: p.details.ar, details_en: p.details.en
    }));
  } else if (t === "categories") {
    rows = Object.keys(window.DAWA_DATA.gallery).map((key, i) => {
      const g = window.DAWA_DATA.gallery[key];
      return { id: key, sort: i + 1, name_ar: g.ar, name_en: g.en, images: g.images || [] };
    });
  } else if (t === "packages") {
    rows = window.DAWA_DATA.packages.map((p, i) => ({
      id: p.id, sort: i + 1, icon: p.icon, title_ar: p.title.ar, title_en: p.title.en,
      price_ar: p.price.ar, price_en: p.price.en, items_ar: p.items.ar, items_en: p.items.en, featured: !!p.featured
    }));
  } else if (t === "testimonials") {
    rows = window.DAWA_DATA.testimonials.map((x, i) => ({
      id: x.id, sort: i + 1, stars: x.stars, name_ar: x.name.ar, name_en: x.name.en,
      role_ar: x.role.ar, role_en: x.role.en, quote_ar: x.quote.ar, quote_en: x.quote.en
    }));
  } else if (t === "banners") {
    rows = [
      { id: "bn-1", sort: 1, image: "assets/properties/real-1.jpg", link: "" },
      { id: "bn-2", sort: 2, image: "assets/properties/real-2.jpg", link: "" }
    ];
  } else if (t === "content") {
    rows = Object.keys(CONTENT_DEFAULTS).map((k) => ({ key: k, ar: CONTENT_DEFAULTS[k].ar, en: CONTENT_DEFAULTS[k].en }));
  }
  if (!rows.length) return;
  const { error } = await sb.from(TABLE_NAMES[t] || "content").upsert(rows, { onConflict: CONFLICT[t] });
  if (error) toast("فشل الاستيراد: " + error.message, false); else { toast("اتستورد " + rows.length + " صف", true); loadTab(t); reloadPreview(); }
}

/* ===== CONTENT FORM ===== */
const CONTENT_GROUPS = [
  { g: "واجهة الموقع (أول ما تفتح الصفحة)", ks: ["hero-badge", "hero-title1", "hero-title2", "hero-text", "hero-text2", "hero-cta1", "hero-cta2", "hero-scroll"] },
  { g: "القائمة العلوية", ks: ["nav-home", "nav-properties", "nav-finishing", "nav-contracting", "nav-about", "nav-gallery", "nav-contact"] },
  { g: "الخدمات", ks: ["svc-real-title", "svc-real-text", "svc-finish-title", "svc-finish-text", "svc-con-title", "svc-con-text"] },
  { g: "من نحن والإحصائيات", ks: ["about-title", "about-text", "stat1", "stat2", "stat3", "stat4"] },
  { g: "قسم العقارات", ks: ["realestate-title", "realestate-desc", "realestate-btn", "featured-title", "featured-sub", "featured-btn", "crumb-props"] },
  { g: "التشطيبات", ks: ["finishing-title", "finishing-desc", "finishing-btn", "work-title", "work-sub"] },
  { g: "المقاولات", ks: ["contracting-title", "contracting-desc", "contracting-btn"] },
  { g: "الآراء والمعرض", ks: ["testi-title", "gallery-title"] },
  { g: "التواصل", ks: ["contact-title", "contact-sub", "contact-send", "contact-loc"] },
  { g: "الفوتر (آخر الموقع)", ks: ["footer-about", "footer-links-title", "footer-contact-title", "footer-loc", "footer-copy"] },
  { g: "بيانات الشركة (اتبعها من تبويب بيانات الشركة)", ks: ["site-phone", "site-email", "site-whatsapp", "site-facebook", "site-instagram"] },
  { g: "الخطوط", ks: ["site-font"] }
];
function contentItemHtml(k, cur, def) {
  const item = document.createElement("div");
  item.className = "content-item";
  item.dataset.k = k;
  if (k === "site-font") {
    item.innerHTML =
      '<div class="ci-key">site-font - اختيار خط الموقع كله</div>' +
      '<div class="ci-row"><div style="flex:1;min-width:220px"><label>الخط</label>' +
      '<select data-cik="site-font" data-fontkey="1">' +
      FONT_OPTIONS.map((f) => '<option value="' + f.v + '"' + ((cur.en ?? def.en) === f.v ? " selected" : "") + ">" + f.l + "</option>").join("") +
      "</select>" +
      '<div class="ci-save"><button class="btn-gold small" onclick="saveOneContent(\'' + k + '\')">💾 حفظ هذا العنصر</button></div>' +
      "</div></div>";
    return item;
  }
  const curFont = (cur.font || "default");
  item.innerHTML =
    '<div class="ci-key">' + k + "</div>" +
    '<div class="ci-row">' +
    '<div style="flex:1;min-width:220px"><label>عربي</label><textarea data-cik="' + k + '" data-lang="ar">' + escAttr(cur.ar ?? def.ar) + "</textarea></div>" +
    '<div style="flex:1;min-width:220px"><label>English</label><textarea data-cik="' + k + '" data-lang="en">' + escAttr(cur.en ?? def.en) + "</textarea></div>" +
    '<div style="min-width:150px"><label>الخط (اختياري)</label><select data-cik="' + k + '" data-fontitem="1">' +
    FONT_OPTIONS.map((f) => '<option value="' + f.v + '"' + (curFont === f.v ? " selected" : "") + ">" + f.l + "</option>").join("") +
    "</select>" +
    '<div class="ci-save"><button class="btn-gold small" onclick="saveOneContent(\'' + k + '\')">💾 حفظ هذا النص</button></div>' +
    "</div>" +
    "</div>";
  return item;
}
async function loadContentForm() {
  const { data, error } = await sb.from("content").select("*");
  if (error) { toast("فشل تحميل النصوص: " + error.message, false); return; }
  const rows = {};
  (data || []).forEach((r) => { rows[r.key] = r; });
  const box = $id("contentForm");
  box.innerHTML = "";
  CONTENT_GROUPS.forEach((gr) => {
    const group = document.createElement("div");
    group.className = "content-group";
    const head = document.createElement("div");
    head.className = "cg-head";
    head.textContent = gr.g;
    group.appendChild(head);
    gr.ks.forEach((k) => {
      const def = CONTENT_DEFAULTS[k];
      if (!def) return;
      group.appendChild(contentItemHtml(k, rows[k] || {}, def));
    });
    box.appendChild(group);
  });
}

async function saveOneContent(k) {
  const item = document.querySelector('.content-item[data-k="' + k + '"]');
  if (!item) return;
  let ar = "",
    en = "",
    font = "";
  const fs = item.querySelector("[data-fontkey]");
  if (fs) { font = fs.value; ar = font; en = font; }
  else {
    const a = item.querySelector('[data-cik="' + k + '"][data-lang="ar"]');
    const e = item.querySelector('[data-cik="' + k + '"][data-lang="en"]');
    const f = item.querySelector('[data-cik="' + k + '"][data-fontitem]');
    ar = a ? a.value : "";
    en = e ? e.value : "";
    font = f ? (f.value === "default" ? "" : f.value) : "";
  }
  const { error } = await sb.from("content").upsert({ key: k, ar, en, font }, { onConflict: "key" });
  if (error) toast("فشل الحفظ: " + error.message, false); else { toast("اتحفظ وظهر على الموقع", true); reloadPreview(); }
}

async function saveAllContent() {
  const rows = [];
  document.querySelectorAll("#contentForm [data-cik]").forEach((el) => {
    const k = el.dataset.cik;
    let r = rows.find((x) => x.key === k);
    if (!r) { r = { key: k }; rows.push(r); }
    if (el.dataset.fontkey) { r.ar = el.value; r.en = el.value; }
    else if (el.dataset.fontitem) { r.font = el.value === "default" ? "" : el.value; }
    else if (el.dataset.lang) r[el.dataset.lang] = el.value;
  });
  const { error } = await sb.from("content").upsert(rows, { onConflict: "key" });
  if (error) toast("فشل الحفظ: " + error.message, false); else { toast("اتحفظ كل النصوص والخطوط", true); reloadPreview(); }
}

/* ===== COMPANY FORM ===== */
async function loadCompanyForm() {
  const keys = COMPANY_KEYS.map((x) => x.k);
  const { data, error } = await sb.from("content").select("*").in("key", keys);
  if (error) { toast("فشل تحميل بيانات الشركة: " + error.message, false); return; }
  const rows = {};
  (data || []).forEach((r) => { rows[r.key] = r; });
  COMPANY_KEYS.forEach((c) => {
    const el = $id("co-" + c.k.replace("site-", ""));
    if (el) el.value = (rows[c.k] && rows[c.k].en != null ? rows[c.k].en : "") || (CONTENT_DEFAULTS[c.k].en || "");
  });
}

async function saveCompany() {
  const rows = COMPANY_KEYS.map((c) => {
    const el = $id("co-" + c.k.replace("site-", ""));
    const v = el ? el.value.trim() : "";
    return { key: c.k, ar: v, en: v };
  });
  const { error } = await sb.from("content").upsert(rows, { onConflict: "key" });
  if (error) toast("فشل الحفظ: " + error.message, false); else { toast("اتحفظت بيانات الشركة", true); reloadPreview(); }
}

/* ===== MODAL ===== */
function openModal(t, id) {
  currentEntity = t;
  currentEditId = id || null;
  const titles = { properties: "عقار", categories: "قسم", packages: "باقة", testimonials: "رأي عميل", banners: "بانر" };
  $id("modalTitle").textContent = (currentEditId ? "تعديل" : "إضافة") + " - " + (titles[t] || t);
  const body = $id("modalBody");
  body.innerHTML = "";
  const fields = FIELDS[t];
  const row = (ROW_CACHE[t] && ROW_CACHE[t][id]) || {};
  fields.forEach((f) => {
    const val = row[f.k];
    const label = document.createElement("label");
    label.textContent = f.l;
    const wrap = document.createElement("div");
    if (f.full) wrap.className = "full";
    wrap.appendChild(label);
    let inp;
    if (f.t === "arr") {
      inp = document.createElement("textarea");
      inp.value = (Array.isArray(val) ? val.join("\n") : val) || "";
      inp.dataset.type = "arr";
    } else if (f.t === "area") {
      inp = document.createElement("textarea");
      inp.value = val ?? "";
      inp.dataset.type = "area";
    } else if (f.t === "chk") {
      wrap.className = "full chk";
      inp = document.createElement("input");
      inp.type = "checkbox";
      inp.checked = !!val;
      inp.dataset.type = "chk";
      wrap.appendChild(inp);
      wrap.removeChild(label);
      wrap.appendChild(label);
    } else if (f.t === "select") {
      inp = document.createElement("select");
      f.opts.forEach((o) => { const op = document.createElement("option"); op.value = o; op.textContent = o; if (o === val) op.selected = true; inp.appendChild(op); });
      inp.dataset.type = "select";
    } else {
      inp = document.createElement("input");
      inp.value = val ?? "";
      inp.type = f.t === "number" ? "number" : "text";
      inp.dataset.type = f.t === "number" ? "number" : "text";
    }
    inp.dataset.fk = f.k;
    inp.id = "fld-" + f.k;
    wrap.appendChild(inp);
    if (f.up) {
      let prev = null;
      if (val) {
        prev = document.createElement("img");
        prev.className = "up-preview";
        prev.src = val;
        wrap.appendChild(prev);
      }
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn-ghost btn-up";
      btn.textContent = "📤 رفع صورة من جهازك";
      btn.onclick = () => pickUpload(t, false, (urls) => {
        if (!urls[0]) return;
        inp.value = urls[0];
        if (prev) { prev.src = urls[0]; prev.style.display = "block"; }
        else {
          prev = document.createElement("img");
          prev.className = "up-preview";
          prev.src = urls[0];
          wrap.insertBefore(prev, btn);
        }
        toast("اترفعت الصورة", true);
      });
      wrap.appendChild(btn);
    }
    if (f.ups) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "btn-ghost btn-up";
      btn.textContent = "📤 رفع صور من جهازك";
      btn.onclick = () => pickUpload(f.ups, true, (urls) => {
        if (!urls.length) return;
        const cur = inp.value ? inp.value.split("\n").filter(Boolean) : [];
        cur.push(...urls);
        inp.value = cur.join("\n");
        toast("اترفعت " + urls.length + " صورة", true);
      });
      wrap.appendChild(btn);
    }
    body.appendChild(wrap);
  });
  $id("modal").classList.remove("hidden");
}

function closeModal() { $id("modal").classList.add("hidden"); currentEditId = null; }

async function saveModal() {
  if (currentEntity === "company") { await saveCompanyAdd(); return; }
  const t = currentEntity;
  const row = {};
  document.querySelectorAll("#modalBody [data-fk]").forEach((inp) => {
    const k = inp.dataset.fk;
    if (inp.dataset.type === "arr") row[k] = inp.value.split("\n").map((s) => s.trim()).filter(Boolean);
    else if (inp.dataset.type === "chk") row[k] = inp.checked;
    else if (inp.dataset.type === "number") row[k] = inp.value === "" ? null : Number(inp.value);
    else row[k] = inp.value.trim();
  });
  if (!row.id) row.id = (t === "properties" ? "p" : t === "categories" ? "cat" : t === "packages" ? "pack" : t === "banners" ? "bn" : "t") + "-" + Date.now().toString(36);
  const { error } = await sb.from(TABLE_NAMES[t]).upsert(row, { onConflict: CONFLICT[t] });
  if (error) toast("فشل الحفظ: " + error.message, false); else { toast("اتحفظ", true); closeModal(); loadTab(t); reloadPreview(); }
}

/* ===== الرسائل من فورم "تواصل معنا" ===== */
async function loadMessages() {
  const box = $id("messagesList");
  if (!box) return;
  box.innerHTML = '<div class="filler">... جارٍ التحميل</div>';
  const { data, error } = await sb.from("messages").select("*").order("created_at", { ascending: false });
  if (error) { box.innerHTML = '<div class="filler">فشل التحميل: ' + escAttr(error.message) + "</div>"; return; }
  MSG_CACHE = {};
  (data || []).forEach((m) => { MSG_CACHE[m.id] = m; });
  if (!data || !data.length) { box.innerHTML = '<div class="filler">مفيش رسايل لسه.</div>'; return; }
  box.innerHTML = data.map((m) => {
    const date = new Date(m.created_at).toLocaleString();
    const phone = (m.phone || "").replace(/\s+/g, "");
    const wa = phone.replace(/[^0-9]/g, "");
    const waLink = wa ? '<a class="btn-ghost small" target="_blank" href="https://wa.me/' + wa + '?text=' + encodeURIComponent("أهلاً " + (m.name || "") + "، وصلتنا رسالتك من موقع ضوه جروب.") + '">رد واتساب</a>' : "";
    const mail = m.email ? '<a class="btn-ghost small" target="_blank" href="mailto:' + escAttr(m.email) + '?subject=رد على رسالتك - ضوه جروب">رد إيميل</a>' : "";
    return '<div class="msg-item' + (m.status === "new" ? " msg-new" : "") + '">' +
      '<div class="msg-head"><b>' + escAttr(m.name || "بدون اسم") + "</b><span class='msg-date'>" + escAttr(date) + "</span></div>" +
      '<div class="msg-details">' + escAttr(m.details || "") + "</div>" +
      (m.phone ? '<div class="msg-meta">📞 ' + escAttr(m.phone) + "</div>" : "") +
      (m.email ? '<div class="msg-meta">✉ ' + escAttr(m.email) + "</div>" : "") +
      '<div class="msg-actions">' + waLink + mail +
      '<button class="btn-ghost small" onclick="markMsg(' + m.id + ',\'' + (m.status === "new" ? "done" : "new") + '\')">' + (m.status === "new" ? "✓ تم الرد" : "استرجاع") + "</button>" +
      '<button class="btn-danger" onclick="delMsg(' + m.id + ')">حذف</button>' +
      "</div></div>";
  }).join("");
}

async function markMsg(id, status) {
  const { error } = await sb.from("messages").update({ status }).eq("id", id);
  if (error) toast("فشل: " + error.message, false); else { toast("تمام", true); loadMessages(); }
}
async function delMsg(id) {
  if (!confirm("تحذف الرسالة؟")) return;
  const { error } = await sb.from("messages").delete().eq("id", id);
  if (error) toast("فشل: " + error.message, false); else { toast("اتحذفت", true); loadMessages(); }
}

/* ===== آراء الجمهور (من الموقع) ===== */
async function loadReviews() {
  const box = $id("reviewsList");
  if (!box) return;
  box.innerHTML = '<div class="filler">... جارٍ التحميل</div>';
  const { data, error } = await sb.from("reviews").select("*").order("created_at", { ascending: false });
  if (error) { box.innerHTML = '<div class="filler">فشل التحميل: ' + escAttr(error.message) + "</div>"; return; }
  REVIEW_CACHE = {};
  (data || []).forEach((r) => { REVIEW_CACHE[r.id] = r; });
  if (!data || !data.length) { box.innerHTML = '<div class="filler">مفيش آراء لسه.</div>'; return; }
  box.innerHTML = data.map((r) => {
    const date = new Date(r.created_at).toLocaleString();
    return '<div class="msg-item' + (r.status === "pending" ? " msg-new" : "") + '">' +
      '<div class="msg-head"><b>' + escAttr(r.name) + "</b><span class='msg-date'>" + escAttr(date) + " · " + escAttr(r.status === "pending" ? "جديد" : "منشور") + "</span></div>" +
      '<div class="c-stars">' + "★".repeat(Math.min(r.stars || 5, 5)) + "</div>" +
      '<div class="msg-details">"' + escAttr(r.quote) + '"</div>' +
      (r.role ? '<div class="msg-meta">💼 ' + escAttr(r.role) + "</div>" : "") +
      '<div class="msg-actions">' +
      (r.status === "pending" ? '<button class="btn-gold small" onclick="approveReview(' + r.id + ')">نشر في الموقع</button>' : '<button class="btn-ghost small" onclick="unpublishReview(' + r.id + ')">إخفاء</button>') +
      '<button class="btn-danger" onclick="delReview(' + r.id + ')">حذف</button>' +
      "</div></div>";
  }).join("");
}

async function approveReview(id) {
  const r = REVIEW_CACHE[id];
  if (!r) return;
  const tid = "t-" + Date.now().toString(36);
  const { data: tests, error: terr } = await sb.from("testimonials").select("id").eq("id", tid);
  if (terr) { toast("فشل: " + terr.message, false); return; }
  const insert = { id: tid, name_ar: r.name, name_en: r.name, role_ar: r.role || "", role_en: r.role || "", stars: r.stars || 5, quote_ar: r.quote, quote_en: r.quote, sort: 9999 };
  const { error } = await sb.from("testimonials").upsert(insert, { onConflict: "id" });
  if (error) { toast("فشل النشر: " + error.message, false); return; }
  await sb.from("reviews").update({ status: "approved" }).eq("id", id).then(({ error: e2 }) => { if (e2) toast("حصل خطأ: " + e2.message, false); });
  toast("اتنشر الرأي في الموقع", true);
  loadReviews();
  reloadPreview();
}
async function unpublishReview(id) {
  const { data, error } = await sb.from("reviews").update({ status: "pending" }).eq("id", id).select();
  if (error) { toast("فشل: " + error.message, false); return; }
  const r = (data && data[0]) || REVIEW_CACHE[id];
  if (r) {
    const { data: tests } = await sb.from("testimonials").select("id").eq("name_en", r.name).eq("quote_en", r.quote);
    if (tests && tests.length) await sb.from("testimonials").delete().eq("id", tests[0].id);
  }
  toast("اتخفي الرأي", true);
  loadReviews();
  reloadPreview();
}
async function delReview(id) {
  if (!confirm("تحذف الرأي نهائيًا؟")) return;
  const { error } = await sb.from("reviews").delete().eq("id", id);
  if (error) toast("فشل: " + error.message, false); else { toast("اتحذف", true); loadReviews(); }
}

/* ===== بيانات الشركة: إضافة قيمة جديدة ===== */
function openCompanyAdd() {
  currentEntity = "company";
  $id("modalTitle").textContent = "إضافة قيمة جديدة";
  const body = $id("modalBody");
  body.innerHTML =
    '<div class="full"><label>نوع القيمة</label><select id="coAddType">' +
    '<option value="site-phone">رقم هاتف</option>' +
    '<option value="site-email">إيميل</option>' +
    '<option value="site-whatsapp">رقم واتساب</option>' +
    '<option value="site-facebook">رابط فيسبوك</option>' +
    '<option value="site-instagram">رابط انستغرام</option>' +
    "</select></div>" +
    '<div class="full"><label>القيمة</label><input id="coAddVal" dir="ltr" placeholder="..." style="direction:ltr"></div>';
  $id("modal").classList.remove("hidden");
}
async function saveCompanyAdd() {
  const key = $id("coAddType").value;
  const val = $id("coAddVal").value.trim();
  if (!val) return;
  const field = $id("co-" + key.replace("site-", ""));
  const existing = (field ? field.value : "").trim();
  const merged = existing ? existing.split("\n") : [];
  if (!merged.includes(val)) merged.push(val);
  const next = merged.join("\n");
  if (field) field.value = next;
  const { error } = await sb.from("content").upsert({ key, ar: next, en: next }, { onConflict: "key" });
  if (error) toast("فشل الحفظ: " + error.message, false); else { toast("اتضافت", true); closeModal(); reloadPreview(); }
}

initAuth();
