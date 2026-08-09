/* DAWA Group - Site data loader
   بيحاول يقرا البيانات من Supabase (لو مظبوط) وإلا يرجع للبيانات الافتراضية (js/data.js). */
(function () {
  let cached = null;

  function rowToProperty(p) {
    return {
      id: p.id,
      image: p.image,
      gallery: p.gallery || [],
      badge: { ar: p.badge_ar, en: p.badge_en },
      type: p.type || "sale",
      price: { ar: p.price_ar, en: p.price_en },
      title: { ar: p.title_ar, en: p.title_en },
      location: { ar: p.location_ar, en: p.location_en },
      area: { ar: p.area_ar, en: p.area_en },
      beds: p.beds,
      baths: p.baths,
      desc: { ar: p.desc_ar, en: p.desc_en },
      details: { ar: p.details_ar, en: p.details_en }
    };
  }

  function rowToPackage(p) {
    return {
      id: p.id,
      icon: p.icon,
      title: { ar: p.title_ar, en: p.title_en },
      price: { ar: p.price_ar, en: p.price_en },
      items: { ar: p.items_ar || [], en: p.items_en || [] },
      featured: !!p.featured
    };
  }

  function rowToTestimonial(t) {
    return {
      id: t.id,
      stars: t.stars || 5,
      name: { ar: t.name_ar, en: t.name_en },
      quote: { ar: t.quote_ar, en: t.quote_en },
      role: { ar: t.role_ar, en: t.role_en }
    };
  }

  function rowToCategory(c) {
    return {
      id: c.id,
      name: { ar: c.name_ar, en: c.name_en },
      images: c.images || []
    };
  }

  async function load() {
    const cfg = window.SUPABASE || {};
    if (!cfg.url || !cfg.anonKey) return null;
    const sb = window.supabase.createClient(cfg.url, cfg.anonKey);

    const out = { useDB: false, properties: [], packages: [], testimonials: [], categories: [], gallery: {}, content: {} };

    const props = await sb.from("properties").select("*").order("sort", { ascending: true });
    if (!props.error && props.data) {
      out.useDB = true;
      out.properties = props.data.map(rowToProperty);
    }
    const packs = await sb.from("packages").select("*").order("sort", { ascending: true });
    if (!packs.error && packs.data) {
      out.useDB = true;
      out.packages = packs.data.map(rowToPackage);
    }
    const tests = await sb.from("testimonials").select("*").order("sort", { ascending: true });
    if (!tests.error && tests.data) {
      out.useDB = true;
      out.testimonials = tests.data.map(rowToTestimonial);
    }
    const cats = await sb.from("categories").select("*").order("sort", { ascending: true });
    if (!cats.error && cats.data) {
      out.useDB = true;
      out.categories = cats.data.map(rowToCategory);
      out.categories.forEach((c) => {
        out.gallery[c.id] = { ar: c.name.ar, en: c.name.en, images: c.images };
      });
    }
    const cts = await sb.from("content").select("*");
    if (!cts.error && cts.data) {
      out.useDB = true;
      cts.data.forEach((c) => { out.content[c.key] = { ar: c.ar, en: c.en }; });
    }

    if (!out.useDB) return null;

    /* لو الجداول فاضية → نكمل بالبيانات الافتراضية عشان الموقع يفضل شغال */
    if (!out.properties.length) out.properties = window.DAWA_DATA.properties;
    if (!out.packages.length) out.packages = window.DAWA_DATA.packages;
    if (!out.testimonials.length) out.testimonials = window.DAWA_DATA.testimonials;

    return out;
  }

  async function get() {
    if (cached !== null) return cached;
    cached = (await load()) || {
      useDB: false,
      properties: window.DAWA_DATA.properties,
      packages: window.DAWA_DATA.packages,
      testimonials: window.DAWA_DATA.testimonials,
      categories: [],
      gallery: window.DAWA_DATA.gallery,
      content: {}
    };
    return cached;
  }

  window.SiteData = { get };
})();
