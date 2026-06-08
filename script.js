document.addEventListener("DOMContentLoaded", () => {
  // =========================================================================
  // 0. Title & Slogan cinematic reveal animations
  // =========================================================================

  // Title letter-by-letter shattered assembly reveal
  const title = document.querySelector(".gradient-text-animated");
  if (title) {
    const titleText = title.textContent.trim();
    title.innerHTML = "";
    [...titleText].forEach((char, index) => {
      const span = document.createElement("span");
      span.className = "title-char";
      span.textContent = char;
      
      // Calculate staggered delay starting from 0.2s, with 0.08s increment
      span.style.setProperty("--delay", `${0.2 + (index * 0.08)}s`);
      
      // Generate random offsets and rotations for the "shattered" look
      const randomX = (Math.random() - 0.5) * 120; // random shift X (-60px to +60px)
      const randomY = (Math.random() - 0.5) * 120 - 45; // random shift Y
      const randomZ = (Math.random() - 0.5) * 100; // random shift Z
      const randomRotX = (Math.random() - 0.5) * 180; // random rotation X
      const randomRotY = (Math.random() - 0.5) * 180; // random rotation Y
      const randomRotZ = (Math.random() - 0.5) * 90; // random rotation Z
      const randomScale = 0.2 + Math.random() * 0.5; // random scale (0.2 to 0.7)
      
      span.style.setProperty("--rx", `${randomX}px`);
      span.style.setProperty("--ry", `${randomY}px`);
      span.style.setProperty("--rz", `${randomZ}px`);
      span.style.setProperty("--rotX", `${randomRotX}deg`);
      span.style.setProperty("--rotY", `${randomRotY}deg`);
      span.style.setProperty("--rotZ", `${randomRotZ}deg`);
      span.style.setProperty("--scale", `${randomScale}`);
      
      title.appendChild(span);
    });
  }

  // Slogan letter-by-letter cinematic reveal
  const slogan = document.getElementById("hero-slogan");
  if (slogan) {
    const sloganText = slogan.textContent.trim();
    slogan.innerHTML = "";
    [...sloganText].forEach((char, index) => {
      const span = document.createElement("span");
      span.className = "char-fade";
      // Delay increments of 0.04s, starting after title has assembled (approx 1.8s)
      span.style.animationDelay = `${1.8 + (index * 0.04)}s`;
      span.textContent = char;
      slogan.appendChild(span);
    });
  }

  // =========================================================================
  // 1. Navigation & Mobile Hamburger Menu
  // =========================================================================
  const hamburger = document.querySelector(".hamburger");
  const navLinks = document.querySelector(".nav-links");
  const navItems = document.querySelectorAll(".nav-links a");

  // Toggle mobile menu
  hamburger.addEventListener("click", () => {
    hamburger.classList.toggle("open");
    navLinks.classList.toggle("open");
  });

  // Close mobile menu on clicking any navigation link
  navItems.forEach(item => {
    item.addEventListener("click", () => {
      hamburger.classList.remove("open");
      navLinks.classList.remove("open");
    });
  });

  // =========================================================================
  // 2. Scrollspy - Active Navigation Indicator on Scroll
  // =========================================================================
  const sections = document.querySelectorAll("section");
  
  function scrollspy() {
    let currentSectionId = "";
    const scrollPosition = window.scrollY + 120; // offset matching header/padding

    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.offsetHeight;
      if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
        currentSectionId = section.getAttribute("id");
      }
    });

    navItems.forEach(link => {
      link.classList.remove("active");
      if (link.getAttribute("href") === `#${currentSectionId}`) {
        link.classList.add("active");
      }
    });
  }

  window.addEventListener("scroll", scrollspy);
  scrollspy(); // Initial trigger

  // =========================================================================
  // 3. Smooth Scrolling for Navigation Links & Hints
  // =========================================================================
  const scrollTargets = document.querySelectorAll('a[href^="#"], .scroll-down-hint');
  
  scrollTargets.forEach(element => {
    element.addEventListener("click", (e) => {
      e.preventDefault();
      let targetId = "";
      
      if (element.classList.contains("scroll-down-hint")) {
        targetId = "story";
      } else {
        targetId = element.getAttribute("href").substring(1);
      }
      
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 79, // navbar height minus 1px border
          behavior: "smooth"
        });
      }
    });
  });

  // =========================================================================
  // 3. Interactive Cultural Story - Milestones & Hotspots Switcher
  // =========================================================================
  const milestoneItems = document.querySelectorAll(".milestone-item");
  const detailPanels = document.querySelectorAll(".story-detail-panel");
  const visualContainers = document.querySelectorAll(".story-visual-container");
  const badgeVal = document.getElementById("story-badge-value");
  const badgeTxt = document.getElementById("story-badge-label");

  const badgeConfig = {
    1: { value: "100%", text: "風土採集" },
    2: { value: "72hr", text: "九芎慢燻" },
    3: { value: "30day", text: "低溫熟成" }
  };

  milestoneItems.forEach(item => {
    item.addEventListener("click", () => {
      const step = item.getAttribute("data-step");
      
      // Toggle active milestone tab
      milestoneItems.forEach(mi => mi.classList.remove("active"));
      item.classList.add("active");
      
      // Toggle active detail text panel
      detailPanels.forEach(panel => {
        panel.classList.remove("active");
        if (panel.getAttribute("data-step-panel") === step) {
          panel.classList.add("active");
        }
      });
      
      // Toggle active visual container
      visualContainers.forEach(container => {
        container.classList.remove("active");
        if (container.getAttribute("data-step-visual") === step) {
          container.classList.add("active");
        }
      });
      
      // Update floating badge content dynamically
      if (badgeVal && badgeTxt && badgeConfig[step]) {
        badgeVal.textContent = badgeConfig[step].value;
        badgeTxt.textContent = badgeConfig[step].text;
      }
    });
  });

  // Hotspot click toggle logic for mobile and touch support
  const hotspots = document.querySelectorAll(".story-hotspot");
  hotspots.forEach(hotspot => {
    const anchor = hotspot.querySelector(".hotspot-anchor");
    if (anchor) {
      anchor.addEventListener("click", (e) => {
        e.stopPropagation();
        
        // Toggle current hotspot popup, close others in active container
        const wasActive = hotspot.classList.contains("active");
        hotspots.forEach(h => h.classList.remove("active"));
        
        if (!wasActive) {
          hotspot.classList.add("active");
        }
      });
    }
  });

  // Close hotspots if user clicks anywhere else
  document.addEventListener("click", () => {
    hotspots.forEach(h => h.classList.remove("active"));
  });

  // =========================================================================
  // 3.5 Interactive SWOT Matrix - Horizontal Tab Toggle
  // =========================================================================
  const swotCards = document.querySelectorAll(".swot-card[data-swot-card]");
  swotCards.forEach(card => {
    const pills = card.querySelectorAll(".swot-pill");
    const descItems = card.querySelectorAll(".swot-desc-item");
    
    pills.forEach(pill => {
      const triggerEvent = () => {
        const index = pill.getAttribute("data-pill");
        
        // Update active pill
        pills.forEach(p => p.classList.remove("active"));
        pill.classList.add("active");
        
        // Update active description
        descItems.forEach(item => {
          item.classList.remove("active");
          if (item.getAttribute("data-desc") === index) {
            item.classList.add("active");
          }
        });
      };
      
      pill.addEventListener("click", triggerEvent);
      pill.addEventListener("mouseenter", triggerEvent);
    });
  });

  // =========================================================================
  // 4. Interactive Scenarios - Tabs Toggle
  // =========================================================================
  const scenarioTabs = document.querySelectorAll(".scenario-tab");
  const scenarioContents = document.querySelectorAll(".scenario-content");

  scenarioTabs.forEach(tab => {
    tab.addEventListener("click", () => {
      const targetTab = tab.getAttribute("data-tab");
      
      scenarioTabs.forEach(t => t.classList.remove("active"));
      scenarioContents.forEach(c => c.classList.remove("active"));
      
      tab.classList.add("active");
      
      const targetContent = document.getElementById(`scenario-${targetTab}`);
      if (targetContent) {
        targetContent.classList.add("active");
      }
    });
  });

  // =========================================================================
  // 5. Interactive Image Gallery & Fullscreen Lightbox
  // =========================================================================
  const galleryImages = [
    {
      src: "img/Gemini_Generated_Image_3bz1g43bz1g43bz1.png",
      title: "海洋生態旨味編織",
      category: "Satoumi Vitality",
      desc: "採集黑潮礁岩海菜與日曬海鹽結晶，編織起極致的深海鹹鮮旨味。"
    },
    {
      src: "img/clear_cocktail_ritual.jpg",
      title: "極致澄澈酒液呈現",
      category: "Scientific Clarification",
      desc: "科學澄清與低溫減壓蒸餾技術，將渾濁釀造液化為剔透如水的精緻酒體。"
    },
    {
      src: "img/Gemini_Generated_Image_oac4yyoac4yyoac4.png",
      title: "部落柴薪煙燻工藝",
      category: "Smoked Woodcraft",
      desc: "炙烤飛魚乾碎屑與碳化木盒，將山海間的焦香完美封存於琥珀嗅覺中。"
    },
    {
      src: "img/story_ritual_kit.jpg",
      title: "限量文化體驗儀式套組",
      category: "Experiential Ritual Kit",
      desc: "構樹皮紙、火山岩座與海鹽晶體床，全面觸發觸覺、嗅覺與視覺的永續體驗。"
    }
  ];

  let currentGalleryIndex = 0;
  const galleryMainImg = document.getElementById("gallery-main-img");
  const galleryCaptionTitle = document.getElementById("gallery-caption-title");
  const galleryCaptionCat = document.getElementById("gallery-caption-cat");
  const galleryThumbnailsContainer = document.querySelector(".gallery-thumbnails");
  const prevBtn = document.getElementById("gallery-prev");
  const nextBtn = document.getElementById("gallery-next");
  
  // Lightbox elements
  const lightboxModal = document.getElementById("lightbox-modal");
  const lightboxImg = document.getElementById("lightbox-img");
  const lightboxClose = document.getElementById("lightbox-close");

  // Create thumbnails dynamically
  galleryThumbnailsContainer.innerHTML = "";
  galleryImages.forEach((imgData, index) => {
    const thumb = document.createElement("div");
    thumb.className = `gallery-thumb ${index === 0 ? "active" : ""}`;
    thumb.setAttribute("data-index", index);
    thumb.innerHTML = `<img src="${imgData.src}" alt="${imgData.title}" loading="lazy">`;
    galleryThumbnailsContainer.appendChild(thumb);
    
    thumb.addEventListener("click", () => {
      setGalleryImage(index);
    });
  });

  const thumbs = document.querySelectorAll(".gallery-thumb");

  function setGalleryImage(index) {
    currentGalleryIndex = index;
    const imgData = galleryImages[index];
    
    // Add fade out effect
    galleryMainImg.style.opacity = "0.5";
    setTimeout(() => {
      galleryMainImg.src = imgData.src;
      galleryMainImg.alt = imgData.title;
      galleryCaptionTitle.textContent = imgData.title;
      galleryCaptionCat.textContent = imgData.category;
      galleryMainImg.style.opacity = "1";
    }, 150);

    // Update active thumb
    thumbs.forEach(t => t.classList.remove("active"));
    thumbs[index].classList.add("active");
  }

  // Prev / Next button listeners
  prevBtn.addEventListener("click", () => {
    let index = currentGalleryIndex - 1;
    if (index < 0) index = galleryImages.length - 1;
    setGalleryImage(index);
  });

  nextBtn.addEventListener("click", () => {
    let index = (currentGalleryIndex + 1) % galleryImages.length;
    setGalleryImage(index);
  });

  // Lightbox triggers
  galleryMainImg.addEventListener("click", () => {
    lightboxImg.src = galleryImages[currentGalleryIndex].src;
    lightboxImg.alt = galleryImages[currentGalleryIndex].title;
    lightboxModal.classList.add("active");
    document.body.style.overflow = "hidden"; // Disable scroll when open
  });

  lightboxClose.addEventListener("click", () => {
    lightboxModal.classList.remove("active");
    document.body.style.overflow = ""; // Enable scroll
  });

  lightboxModal.addEventListener("click", (e) => {
    if (e.target === lightboxModal) {
      lightboxModal.classList.remove("active");
      document.body.style.overflow = "";
    }
  });

  // Auto slide gallery every 8 seconds
  let autoSlideInterval = setInterval(() => {
    let index = (currentGalleryIndex + 1) % galleryImages.length;
    setGalleryImage(index);
  }, 8000);

  // Pause auto slide on hover or interaction
  const galleryArea = document.querySelector(".gallery-container");
  galleryArea.addEventListener("mouseenter", () => clearInterval(autoSlideInterval));
  galleryArea.addEventListener("mouseleave", () => {
    autoSlideInterval = setInterval(() => {
      let index = (currentGalleryIndex + 1) % galleryImages.length;
      setGalleryImage(index);
    }, 8000);
  });


  // =========================================================================
  // 6. Product Details - Dynamic Panel Selector
  // =========================================================================
  const detailRows = document.querySelectorAll(".details-table tbody tr");
  
  const detailStrategies = {
    glass: {
      title: "杯體：極薄薄吹手工波紋硝子",
      strategy: "展現澄清（Clarification）後的清澈酒體，必須選用透光度極高、質地極薄的手工玻璃杯。",
      heritage: "杯身帶著隱晦的職人吹製波紋，當光線穿過清澈的酒體，會在桌面上投射出如太平洋日光折射般的流動水紋。"
    },
    coaster: {
      title: "杯墊座：手鑿火山岩與咾咕石底座",
      strategy: "玻璃杯不直接著地，而是嵌在一個手工鑿刻的黑色火山岩（或經合法整理的粗糙礁岩塊）底座上。",
      heritage: "回應了傳統女性手採螺貝、海菜的「岩礁環境」，以粗糙冰涼的質地與極薄玻璃的細緻感形成強烈衝突美學。"
    },
    package: {
      title: "外盒包裝：煙燻碳化木盒與手工構樹皮紙",
      strategy: "採用輕微火烤、帶有微弱碳化焦香的木盒，視覺與嗅覺上暗示了黑潮魚群（飛魚、鰹魚）接受柴薪煙燻的工藝脈絡。",
      heritage: "內襯使用台灣在地手工構樹皮紙，紙印上手工標註的採集海岸座標與潮汐時間，呈現「田野考古檔案室」的儀式感。"
    },
    cushion: {
      title: "緩衝防震：未精製傳統工藝纖維",
      strategy: "完全杜絕任何塑膠或現代發酵緩衝包材，固定器皿的緩衝材直接使用東海岸常見的傳統工藝植物纖維。",
      heritage: "採用粗編小米稻草、月桃葉鞘，或是手抄馬尼拉麻粗線。讓使用者在開箱時，嗅覺與觸覺第一時間被帶入原始的土地氣息。"
    },
    filling: {
      title: "盒內鋪墊：大顆粒日曬海鹽結晶床",
      strategy: "套組內部開槽底部，鋪墊著一層厚厚的、未精製的東海岸大顆粒日曬海鹽結晶。",
      heritage: "器皿宛如直接從海鹽堆中被「挖掘」誕生，點出海鹽在東海岸發酵與文化保存中的關鍵角色。"
    },
    accessory: {
      title: "侍酒配件：煙燻漂流木製微型木蓋",
      strategy: "供桌邊儀式使用，高溫噴槍輕微炙烤「煙燻飛魚乾碎屑」或「傳統柴薪」，釋放封存的煙燻海風嗅覺。",
      heritage: "在視覺極清澈與嗅覺極濃烈間建立感官橋樑，在木蓋被移開、煙燻散去的瞬間爆發出多層次 Umami 旨味。"
    }
  };

  const panelTitle = document.getElementById("panel-title");
  const panelStrategy = document.getElementById("panel-strategy");
  const panelHeritage = document.getElementById("panel-heritage");
  const panelBlock = document.getElementById("panel-block");

  detailRows.forEach(row => {
    row.addEventListener("click", () => {
      const itemKey = row.getAttribute("data-item");
      
      // Update active row
      detailRows.forEach(r => r.classList.remove("active"));
      row.classList.add("active");
      
      // Fetch details
      const details = detailStrategies[itemKey];
      if (details) {
        // Fade out transition
        panelBlock.classList.add("fade-out");
        
        setTimeout(() => {
          panelTitle.textContent = details.title;
          panelStrategy.textContent = details.strategy;
          panelHeritage.textContent = details.heritage;
          panelBlock.classList.remove("fade-out");
        }, 200);
      }
    });
  });


  // =========================================================================
  // 7. Back-to-Top Button
  // =========================================================================
  const backToTopBtn = document.getElementById("back-to-top");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add("show");
    } else {
      backToTopBtn.classList.remove("show");
    }
  });

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  });


  // =========================================================================
  // 9. Scroll Reveal Animations (Intersection Observer)
  // =========================================================================
  const revealElements = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
  
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("active");
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px"
  });

  revealElements.forEach(element => {
    revealObserver.observe(element);
  });


  // =========================================================================
  // 8. Contact Form Simulation
  // =========================================================================
  const contactForm = document.getElementById("satoumi-contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      
      const submitBtn = contactForm.querySelector("button[type='submit']");
      const originalText = submitBtn.textContent;
      
      submitBtn.disabled = true;
      submitBtn.textContent = "傳送中 / Sending...";
      
      // Simulate API call
      setTimeout(() => {
        alert("感謝您的聯絡！我們會盡快與您聯繫以探索里海的流動記憶。\n(Thank you for reaching out! We will contact you soon.)");
        contactForm.reset();
        submitBtn.disabled = false;
        submitBtn.textContent = originalText;
      }, 1500);
    });
  }
  initFerrofluid();
  initTowsRadar();
  initGlobalPlankton();
});


// =========================================================================
// WebGL 0. Ferrofluid Background & WebGL 1. TOWS 3D Radar Code
// =========================================================================

// --- WebGL 0. Ferrofluid Background ---
const initFerrofluid = () => {
  const container = document.getElementById("ferrofluid-canvas-container");
  const hero = document.getElementById("hero");
  if (!container || !hero) return;

  if (typeof window.ogl === "undefined") {
    console.warn("Ferrofluid Background: OGL library not found. Gracefully degrading.");
    return;
  }

  const config = {
    colors: ['#02070d', '#05111d', '#0b233a', '#0df2c9', '#e2b478', '#0df2c9', '#05111d', '#02070d'],
    speed: 0.12, // slow, organic oceanic movement
    scale: 1.3,
    turbulence: 0.75,
    fluidity: 0.08,
    rimWidth: 0.3,
    sharpness: 2.2,
    shimmer: 1.2,
    glow: 1.6,
    flowDirection: 'down',
    opacity: 0.9,
    mouseInteraction: true,
    mouseStrength: 1.1,
    mouseRadius: 0.28,
    mouseDampening: 0.15
  };

  const hexToRGB = hex => {
    const c = hex.replace('#', '').padEnd(6, '0');
    const r = parseInt(c.slice(0, 2), 16) / 255;
    const g = parseInt(c.slice(2, 4), 16) / 255;
    const b = parseInt(c.slice(4, 6), 16) / 255;
    return [r, g, b];
  };

  const prepColors = input => {
    const base = input.slice(0, 8);
    const count = base.length;
    const arr = [];
    for (let i = 0; i < 8; i++) arr.push(hexToRGB(base[Math.min(i, base.length - 1)]));
    const avg = [0, 0, 0];
    for (let i = 0; i < count; i++) {
      avg[0] += arr[i][0];
      avg[1] += arr[i][1];
      avg[2] += arr[i][2];
    }
    avg[0] /= count;
    avg[1] /= count;
    avg[2] /= count;
    return { arr, count, avg };
  };

  const flowVec = d => {
    switch (d) {
      case 'up': return [0, 1];
      case 'down': return [0, -1];
      case 'left': return [-1, 0];
      case 'right': return [1, 0];
      default: return [0, -1];
    }
  };

  const vertex = `
    attribute vec2 position;
    attribute vec2 uv;
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = vec4(position, 0.0, 1.0);
    }
  `;

  const fragment = `
    precision highp float;

    uniform vec3  iResolution;
    uniform vec2  iMouse;
    uniform float iTime;

    uniform vec3  uColor0;
    uniform vec3  uColor1;
    uniform vec3  uColor2;
    uniform vec3  uColor3;
    uniform vec3  uColor4;
    uniform vec3  uColor5;
    uniform vec3  uColor6;
    uniform vec3  uColor7;
    uniform int   uColorCount;

    uniform vec3  uMouseColor;
    uniform vec2  uFlow;
    uniform float uSpeed;
    uniform float uScale;
    uniform float uTurbulence;
    uniform float uFluidity;
    uniform float uRimWidth;
    uniform float uSharpness;
    uniform float uShimmer;
    uniform float uGlow;
    uniform float uOpacity;
    uniform float uMouseEnabled;
    uniform float uMouseStrength;
    uniform float uMouseRadius;

    varying vec2 vUv;

    float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    float noise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      vec2 u = f * f * (3.0 - 2.0 * f);
      return mix(mix(hash(i + vec2(0.0,0.0)), hash(i + vec2(1.0,0.0)), u.x),
                 mix(hash(i + vec2(0.0,1.0)), hash(i + vec2(1.0,1.0)), u.x), u.y);
    }

    float vn(vec2 p, float freq, float octave) {
      float v = 0.0;
      float amp = 0.5;
      vec2 shift = vec2(100.0);
      mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
      vec2 uv = p * freq;
      for (int i = 0; i < 4; i++) {
        v += amp * noise(uv);
        uv = rot * uv * 2.0 + shift;
        amp *= 0.5;
      }
      return v;
    }

    vec3 palette(float h) {
      float step = 1.0 / float(uColorCount - 1);
      if (h <= step) return mix(uColor0, uColor1, h / step);
      if (h <= 2.0 * step) return mix(uColor1, uColor2, (h - step) / step);
      if (h <= 3.0 * step) return mix(uColor2, uColor3, (h - 2.0 * step) / step);
      if (h <= 4.0 * step) return mix(uColor3, uColor4, (h - 3.0 * step) / step);
      if (h <= 5.0 * step) return mix(uColor4, uColor5, (h - 4.0 * step) / step);
      if (h <= 6.0 * step) return mix(uColor5, uColor6, (h - 5.0 * step) / step);
      return mix(uColor6, uColor7, (h - 6.0 * step) / (1.0 - 6.0 * step));
    }

    void mainImage(out vec4 fragColor, in vec2 fragCoord) {
      vec2 p = vUv;
      
      // Mouse interaction: calculates distance for wave perturbations
      float mDist = 999.0;
      vec2 m = iMouse / iResolution.xy;
      if (uMouseEnabled > 0.5) {
        mDist = distance(p, m);
      }

      // 1. Calculate rock reef heightmap using noise
      float spd = iTime * uSpeed;
      float rock = vn(p, 1.5 * uScale, uTurbulence);
      
      // Interactive tide pool disturbance
      if (mDist < uMouseRadius) {
        float influence = (1.0 - mDist / uMouseRadius);
        rock -= influence * uMouseStrength * 0.08;
      }

      // EPS for normal calculation to render 3D lighting
      vec2 eps = vec2(0.005, 0.0);
      float rock_dx = vn(p + eps.xy, 1.5 * uScale, uTurbulence) - rock;
      float rock_dy = vn(p + eps.yx, 1.5 * uScale, uTurbulence) - rock;
      vec3 normal = normalize(vec3(-rock_dx * 3.5, -rock_dy * 3.5, 0.08));

      // Virtual light source (sky light/moonlight reflection)
      vec3 lightDir = normalize(vec3(0.3, 0.5, 0.8));
      float diffuse = max(0.0, dot(normal, lightDir));
      float spec = pow(max(0.0, dot(reflect(-lightDir, normal), vec3(0.0, 0.0, 1.0))), 12.0);

      // 2. Tidal simulation (rising and falling tide cycle)
      float tideCycle = sin(iTime * 0.2) * 0.12 + 0.46;
      
      // Shore wave ripples moving along the tide line
      float waveRipple = sin(p.x * 4.0 - iTime * 0.6) * 0.03;
      float currentTide = tideCycle + waveRipple;
      
      // 3. Submersion depth
      float depth = currentTide - rock;

      // 4. Bioluminescent foam line (where waves crash on the rocks)
      float foamBase = exp(-pow(depth, 2.0) / 0.0008);
      float foamNoise = vn(p * 15.0 - vec2(0.0, iTime * 0.35), 4.0, 0.5);
      float foam = foamBase * (0.6 + 0.4 * foamNoise) * uGlow * 1.6;
      
      // 5. Compute color for water and rocks
      vec3 finalColor = vec3(0.0);
      float alpha = 0.0;

      // Wetness factor (1.0 when submerged or very close to tide level)
      float wetness = clamp(1.0 + depth * 4.0, 0.0, 1.0);
      if (depth > 0.0) wetness = 1.0;

      // Volcanic rock colors (charcoal/basalt dark gray)
      vec3 rockBase = mix(vec3(0.015, 0.02, 0.025), vec3(0.05, 0.055, 0.065), rock);
      
      // Micro-texture of the rock
      float micro = noise(p * 100.0);
      rockBase += vec3(0.015, 0.012, 0.01) * micro;
      
      // Lit rock color
      vec3 rockColor = rockBase * (0.25 + 0.75 * diffuse);
      
      // Specular highlights (stronger when wet)
      float rockSpecular = spec * (0.12 + 0.48 * wetness) * uShimmer;

      if (depth > 0.0) {
        // Water is present (submerged)
        float ripples = vn(p * 7.0 + vec2(iTime * 0.08, -iTime * 0.05), 3.0, 0.5);
        vec3 waterBase = mix(uColor0, uColor3, clamp(depth * 5.0 + ripples * 0.15, 0.0, 1.0));
        float waterGlow = (0.25 + 0.75 * ripples) * clamp(depth * 4.0, 0.0, 1.0) * uGlow;
        float plankton = pow(max(0.0, vn(p * 20.0 + vec2(0.0, iTime * 0.15), 5.0, 0.3) - 0.6) * 2.5, 4.0) * uShimmer;
        
        finalColor = waterBase * waterGlow + uColor3 * plankton;
        
        // Blend in tide line foam
        vec3 foamColor = mix(uColor3, uColor4, foamNoise);
        finalColor += foamColor * foam;
        
        alpha = clamp(max(finalColor.r, max(finalColor.g, finalColor.b)), 0.15, 1.0);
      } else {
        // Exposed wet volcanic reef
        finalColor = rockColor + vec3(0.65, 0.85, 1.0) * rockSpecular;
        
        // Dampened foam at the wet edge
        vec3 foamColor = mix(uColor3, uColor4, foamNoise);
        finalColor += foamColor * foam * 0.6;
        
        alpha = clamp(max(finalColor.r, max(finalColor.g, finalColor.b)), 0.08, 1.0);
      }

      // Add mouse cursor light ring (disturbing bioluminescent algae)
      if (mDist < uMouseRadius) {
        float mGlow = exp(-pow(mDist / uMouseRadius, 2.0) * 4.0) * uMouseStrength * 0.45;
        finalColor += mix(uColor3, uColor4, sin(iTime + p.x * 10.0) * 0.5 + 0.5) * mGlow;
        alpha = max(alpha, mGlow);
      }

      fragColor = vec4(finalColor, alpha * uOpacity);
    }

    void main() {
      vec4 color;
      mainImage(color, vUv * iResolution.xy);
      gl_FragColor = color;
    }
  `;

  const renderer = new ogl.Renderer({
    dpr: window.devicePixelRatio || 1,
    alpha: true,
    antialias: true
  });
  const gl = renderer.gl;
  const canvas = gl.canvas;
  gl.clearColor(0, 0, 0, 0);
  canvas.style.width = '100%';
  canvas.style.height = '100%';
  canvas.style.display = 'block';
  container.appendChild(canvas);

  const { arr, count, avg } = prepColors(config.colors);

  const uniforms = {
    iResolution: { value: [gl.drawingBufferWidth, gl.drawingBufferHeight, 1] },
    iMouse: { value: [0, 0] },
    iTime: { value: 0 },
    uColor0: { value: arr[0] },
    uColor1: { value: arr[1] },
    uColor2: { value: arr[2] },
    uColor3: { value: arr[3] },
    uColor4: { value: arr[4] },
    uColor5: { value: arr[5] },
    uColor6: { value: arr[6] },
    uColor7: { value: arr[7] },
    uColorCount: { value: count },
    uMouseColor: { value: avg },
    uFlow: { value: flowVec(config.flowDirection) },
    uSpeed: { value: config.speed },
    uScale: { value: config.scale },
    uTurbulence: { value: config.turbulence },
    uFluidity: { value: config.fluidity },
    uRimWidth: { value: config.rimWidth },
    uSharpness: { value: config.sharpness },
    uShimmer: { value: config.shimmer },
    uGlow: { value: config.glow },
    uOpacity: { value: config.opacity },
    uMouseEnabled: { value: config.mouseInteraction ? 1 : 0 },
    uMouseStrength: { value: config.mouseStrength },
    uMouseRadius: { value: config.mouseRadius }
  };

  const program = new ogl.Program(gl, { vertex, fragment, uniforms });
  const geometry = new ogl.Geometry(gl, {
    position: { size: 2, data: new Float32Array([-1, -1, 3, -1, -1, 3]) },
    uv: { size: 2, data: new Float32Array([0, 0, 2, 0, 0, 2]) }
  });
  const mesh = new ogl.Mesh(gl, { geometry, program });

  let targetMouse = [0, 0];
  let currentMouse = [0, 0];

  const onPointerMove = e => {
    const rect = container.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = rect.height - (e.clientY - rect.top);
    targetMouse = [x, y];
  };

  if (config.mouseInteraction) {
    container.addEventListener('pointermove', onPointerMove);
  }

  const resize = () => {
    const rect = container.getBoundingClientRect();
    renderer.setSize(rect.width, rect.height);
    uniforms.iResolution.value = [gl.drawingBufferWidth, gl.drawingBufferHeight, 1];
  };
  resize();

  const ro = new ResizeObserver(resize);
  ro.observe(container);

  let lastTime = 0;
  let rafId;

  const loop = t => {
    rafId = requestAnimationFrame(loop);
    if (!lastTime) {
      lastTime = t;
      return;
    }
    const dt = t - lastTime;
    lastTime = t;

    uniforms.iTime.value += dt * 0.001;

    if (config.mouseInteraction) {
      currentMouse[0] += (targetMouse[0] - currentMouse[0]) * config.mouseDampening;
      currentMouse[1] += (targetMouse[1] - currentMouse[1]) * config.mouseDampening;
      uniforms.iMouse.value = [currentMouse[0], currentMouse[1]];
    }

    try {
      renderer.render({ scene: mesh });
    } catch (e) {
      console.error(e);
    }
  };

  rafId = requestAnimationFrame(loop);

  return () => {
    if (rafId) cancelAnimationFrame(rafId);
    if (config.mouseInteraction) {
      container.removeEventListener('pointermove', onPointerMove);
    }
    ro.disconnect();
    if (canvas.parentElement === container) {
      container.removeChild(canvas);
    }
    program.remove();
    geometry.remove();
    mesh.remove();
  };
};


// --- WebGL 1. TOWS 3D Radar Code ---
let mat4 = window.glMatrix ? window.glMatrix.mat4 : null;
let quat = window.glMatrix ? window.glMatrix.quat : null;
let vec2 = window.glMatrix ? window.glMatrix.vec2 : null;
let vec3 = window.glMatrix ? window.glMatrix.vec3 : null;

class Face {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
  }
}

class Vertex {
  constructor(x, y, z) {
    this.position = vec3.fromValues(x, y, z);
    this.normal = vec3.create();
    this.uv = vec2.create();
  }
}

class Geometry {
  constructor() {
    this.vertices = [];
    this.faces = [];
  }

  addVertex(...args) {
    for (let i = 0; i < args.length; i += 3) {
      this.vertices.push(new Vertex(args[i], args[i + 1], args[i + 2]));
    }
    return this;
  }

  addFace(...args) {
    for (let i = 0; i < args.length; i += 3) {
      this.faces.push(new Face(args[i], args[i + 1], args[i + 2]));
    }
    return this;
  }

  get lastVertex() {
    return this.vertices[this.vertices.length - 1];
  }

  subdivide(divisions = 1) {
    const midPointCache = {};
    let f = this.faces;

    for (let div = 0; div < divisions; ++div) {
      const newFaces = new Array(f.length * 4);

      f.forEach((face, ndx) => {
        const mAB = this.getMidPoint(face.a, face.b, midPointCache);
        const mBC = this.getMidPoint(face.b, face.c, midPointCache);
        const mCA = this.getMidPoint(face.c, face.a, midPointCache);

        const i = ndx * 4;
        newFaces[i + 0] = new Face(face.a, mAB, mCA);
        newFaces[i + 1] = new Face(face.b, mBC, mAB);
        newFaces[i + 2] = new Face(face.c, mCA, mBC);
        newFaces[i + 3] = new Face(mAB, mBC, mCA);
      });

      f = newFaces;
    }

    this.faces = f;
    return this;
  }

  spherize(radius = 1) {
    this.vertices.forEach(vertex => {
      vec3.normalize(vertex.normal, vertex.position);
      vec3.scale(vertex.position, vertex.normal, radius);
    });
    return this;
  }

  get data() {
    return {
      vertices: this.vertexData,
      indices: this.indexData,
      normals: this.normalData,
      uvs: this.uvData
    };
  }

  get vertexData() {
    return new Float32Array(this.vertices.flatMap(v => Array.from(v.position)));
  }

  get normalData() {
    return new Float32Array(this.vertices.flatMap(v => Array.from(v.normal)));
  }

  get uvData() {
    return new Float32Array(this.vertices.flatMap(v => Array.from(v.uv)));
  }

  get indexData() {
    return new Uint16Array(this.faces.flatMap(f => [f.a, f.b, f.c]));
  }

  getMidPoint(ndxA, ndxB, cache) {
    const cacheKey = ndxA < ndxB ? `k_${ndxB}_${ndxA}` : `k_${ndxA}_${ndxB}`;
    if (Object.prototype.hasOwnProperty.call(cache, cacheKey)) {
      return cache[cacheKey];
    }
    const a = this.vertices[ndxA].position;
    const b = this.vertices[ndxB].position;
    const ndx = this.vertices.length;
    cache[cacheKey] = ndx;
    this.addVertex((a[0] + b[0]) * 0.5, (a[1] + b[1]) * 0.5, (a[2] + b[2]) * 0.5);
    return ndx;
  }
}

class IcosahedronGeometry extends Geometry {
  constructor() {
    super();
    const t = Math.sqrt(5) * 0.5 + 0.5;
    this.addVertex(
      -1, t, 0,
      1, t, 0,
      -1, -t, 0,
      1, -t, 0,
      0, -1, t,
      0, 1, t,
      0, -1, -t,
      0, 1, -t,
      t, 0, -1,
      t, 0, 1,
      -t, 0, -1,
      -t, 0, 1
    ).addFace(
      0, 11, 5,  0, 5, 1,   0, 1, 7,   0, 7, 10,  0, 10, 11,
      1, 5, 9,   5, 11, 4,  11, 10, 2, 10, 7, 6,  7, 1, 8,
      3, 9, 4,   3, 4, 2,   3, 2, 6,   3, 6, 8,   3, 8, 9,
      4, 9, 5,   2, 4, 11,  6, 2, 10,  8, 6, 7,   9, 8, 1
    );
  }
}

class DiscGeometry extends Geometry {
  constructor(steps = 4, radius = 1) {
    super();
    steps = Math.max(4, steps);
    const alpha = (2 * Math.PI) / steps;
    this.addVertex(0, 0, 0);
    this.lastVertex.uv[0] = 0.5;
    this.lastVertex.uv[1] = 0.5;

    for (let i = 0; i < steps; ++i) {
      const x = Math.cos(alpha * i);
      const y = Math.sin(alpha * i);
      this.addVertex(radius * x, radius * y, 0);
      this.lastVertex.uv[0] = x * 0.5 + 0.5;
      this.lastVertex.uv[1] = y * 0.5 + 0.5;

      if (i > 0) {
        this.addFace(0, i, i + 1);
      }
    }
    this.addFace(0, steps, 1);
  }
}

class ArcballControl {
  isPointerDown = false;
  orientation = quat.create();
  pointerRotation = quat.create();
  rotationVelocity = 0;
  rotationAxis = vec3.fromValues(1, 0, 0);
  pointerSnapDirection = vec3.fromValues(0, 0, -1);
  snapTargetDirection = null;
  EPSILON = 0.1;
  IDENTITY_QUAT = quat.create();

  constructor(canvas, updateCallback) {
    this.canvas = canvas;
    this.updateCallback = updateCallback || (() => null);

    this.pointerPos = vec2.create();
    this.previousPointerPos = vec2.create();
    this._rotationVelocity = 0;
    this._combinedQuat = quat.create();

    canvas.addEventListener('pointerdown', e => {
      vec2.set(this.pointerPos, e.clientX, e.clientY);
      vec2.copy(this.previousPointerPos, this.pointerPos);
      this.isPointerDown = true;
    });
    canvas.addEventListener('pointerup', () => {
      this.isPointerDown = false;
    });
    canvas.addEventListener('pointerleave', () => {
      this.isPointerDown = false;
    });
    canvas.addEventListener('pointermove', e => {
      if (this.isPointerDown) {
        vec2.set(this.pointerPos, e.clientX, e.clientY);
      }
    });

    canvas.style.touchAction = 'none';
  }

  update(deltaTime, targetFrameDuration = 16) {
    const timeScale = deltaTime / targetFrameDuration + 0.00001;
    let angleFactor = timeScale;
    let snapRotation = quat.create();

    if (this.isPointerDown) {
      const INTENSITY = 0.3 * timeScale;
      const ANGLE_AMPLIFICATION = 5 / timeScale;

      const midPointerPos = vec2.sub(vec2.create(), this.pointerPos, this.previousPointerPos);
      vec2.scale(midPointerPos, midPointerPos, INTENSITY);

      if (vec2.sqrLen(midPointerPos) > this.EPSILON) {
        vec2.add(midPointerPos, this.previousPointerPos, midPointerPos);

        const p = this.#project(midPointerPos);
        const q = this.#project(this.previousPointerPos);
        const a = vec3.normalize(vec3.create(), p);
        const b = vec3.normalize(vec3.create(), q);

        vec2.copy(this.previousPointerPos, midPointerPos);
        angleFactor *= ANGLE_AMPLIFICATION;
        this.quatFromVectors(a, b, this.pointerRotation, angleFactor);
      } else {
        quat.slerp(this.pointerRotation, this.pointerRotation, this.IDENTITY_QUAT, INTENSITY);
      }
    } else {
      const INTENSITY = 0.1 * timeScale;
      quat.slerp(this.pointerRotation, this.pointerRotation, this.IDENTITY_QUAT, INTENSITY);

      if (this.snapTargetDirection) {
        const SNAPPING_INTENSITY = 0.2;
        const a = this.snapTargetDirection;
        const b = this.pointerSnapDirection;
        const sqrDist = vec3.squaredDistance(a, b);
        const distanceFactor = Math.max(0.1, 1 - sqrDist * 10);
        angleFactor *= SNAPPING_INTENSITY * distanceFactor;
        this.quatFromVectors(a, b, snapRotation, angleFactor);
      }
    }

    const combinedQuat = quat.multiply(quat.create(), snapRotation, this.pointerRotation);
    this.orientation = quat.multiply(quat.create(), combinedQuat, this.orientation);
    quat.normalize(this.orientation, this.orientation);

    const RA_INTENSITY = 0.8 * timeScale;
    quat.slerp(this._combinedQuat, this._combinedQuat, combinedQuat, RA_INTENSITY);
    quat.normalize(this._combinedQuat, this._combinedQuat);

    const rad = Math.acos(this._combinedQuat[3]) * 2.0;
    const s = Math.sin(rad / 2.0);
    let rv = 0;
    if (s > 0.000001) {
      rv = rad / (2 * Math.PI);
      this.rotationAxis[0] = this._combinedQuat[0] / s;
      this.rotationAxis[1] = this._combinedQuat[1] / s;
      this.rotationAxis[2] = this._combinedQuat[2] / s;
    }

    const RV_INTENSITY = 0.5 * timeScale;
    this._rotationVelocity += (rv - this._rotationVelocity) * RV_INTENSITY;
    this.rotationVelocity = this._rotationVelocity / timeScale;

    this.updateCallback(deltaTime);
  }

  quatFromVectors(a, b, out, angleFactor = 1) {
    const axis = vec3.cross(vec3.create(), a, b);
    vec3.normalize(axis, axis);
    const d = Math.max(-1, Math.min(1, vec3.dot(a, b)));
    const angle = Math.acos(d) * angleFactor;
    quat.setAxisAngle(out, axis, angle);
    return { q: out, axis, angle };
  }

  #project(pos) {
    const r = 2;
    const w = this.canvas.clientWidth;
    const h = this.canvas.clientHeight;
    const s = Math.max(w, h) - 1;

    const x = (2 * pos[0] - w - 1) / s;
    const y = (2 * pos[1] - h - 1) / s;
    let z = 0;
    const xySq = x * x + y * y;
    const rSq = r * r;

    if (xySq <= rSq / 2.0) {
      z = Math.sqrt(rSq - xySq);
    } else {
      z = rSq / Math.sqrt(xySq);
    }
    return vec3.fromValues(-x, y, z);
  }
}

const discVertShaderSource = `#version 300 es
uniform mat4 uWorldMatrix;
uniform mat4 uViewMatrix;
uniform mat4 uProjectionMatrix;
uniform vec3 uCameraPosition;
uniform vec4 uRotationAxisVelocity;

in vec3 aModelPosition;
in vec3 aModelNormal;
in vec2 aModelUvs;
in mat4 aInstanceMatrix;

out vec2 vUvs;
out float vAlpha;
flat out int vInstanceId;

void main() {
    vec4 worldPosition = uWorldMatrix * aInstanceMatrix * vec4(aModelPosition, 1.);
    vec3 centerPos = (uWorldMatrix * aInstanceMatrix * vec4(0., 0., 0., 1.)).xyz;
    float radius = length(centerPos.xyz);

    if (gl_VertexID > 0) {
        vec3 rotationAxis = uRotationAxisVelocity.xyz;
        float rotationVelocity = min(.15, uRotationAxisVelocity.w * 15.);
        vec3 stretchDir = normalize(cross(centerPos, rotationAxis));
        vec3 relativeVertexPos = normalize(worldPosition.xyz - centerPos);
        float strength = dot(stretchDir, relativeVertexPos);
        float invAbsStrength = min(0., abs(strength) - 1.);
        strength = rotationVelocity * sign(strength) * abs(invAbsStrength * invAbsStrength * invAbsStrength + 1.);
        worldPosition.xyz += stretchDir * strength;
    }

    worldPosition.xyz = radius * normalize(worldPosition.xyz);
    gl_Position = uProjectionMatrix * uViewMatrix * worldPosition;
    vAlpha = smoothstep(0.5, 1., normalize(worldPosition.xyz).z) * .9 + .1;
    vUvs = aModelUvs;
    vInstanceId = gl_InstanceID;
}
`;

const discFragShaderSource = `#version 300 es
precision highp float;

uniform sampler2D uTex;
uniform int uItemCount;
uniform int uAtlasSize;

out vec4 outColor;

in vec2 vUvs;
in float vAlpha;
flat in int vInstanceId;

void main() {
    int itemIndex = vInstanceId % uItemCount;
    int cellsPerRow = uAtlasSize;
    int cellX = itemIndex % cellsPerRow;
    int cellY = itemIndex / cellsPerRow;
    vec2 cellSize = vec2(1.0) / vec2(float(cellsPerRow));
    vec2 cellOffset = vec2(float(cellX), float(cellY)) * cellSize;

    ivec2 texSize = textureSize(uTex, 0);
    float imageAspect = float(texSize.x) / float(texSize.y);
    float containerAspect = 1.0;
    float scale = max(imageAspect / containerAspect, containerAspect / imageAspect);
    
    vec2 st = vec2(vUvs.x, 1.0 - vUvs.y);
    st = (st - 0.5) * scale + 0.5;
    st = clamp(st, 0.0, 1.0);
    st = st * cellSize + cellOffset;
    
    outColor = texture(uTex, st);
    outColor.a *= vAlpha;
}
`;

function createShader(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  const success = gl.getShaderParameter(shader, gl.COMPILE_STATUS);
  if (success) return shader;
  console.error(gl.getShaderInfoLog(shader));
  gl.deleteShader(shader);
  return null;
}

function createProgram(gl, shaderSources, transformFeedbackVaryings, attribLocations) {
  const program = gl.createProgram();
  [gl.VERTEX_SHADER, gl.FRAGMENT_SHADER].forEach((type, ndx) => {
    const shader = createShader(gl, type, shaderSources[ndx]);
    if (shader) gl.attachShader(program, shader);
  });
  if (transformFeedbackVaryings) {
    gl.transformFeedbackVaryings(program, transformFeedbackVaryings, gl.SEPARATE_ATTRIBS);
  }
  if (attribLocations) {
    for (const attrib in attribLocations) {
      gl.bindAttribLocation(program, attribLocations[attrib], attrib);
    }
  }
  gl.linkProgram(program);
  const success = gl.getProgramParameter(program, gl.LINK_STATUS);
  if (success) return program;
  console.error(gl.getProgramInfoLog(program));
  gl.deleteProgram(program);
  return null;
}

function makeVertexArray(gl, bufLocNumElmPairs, indices) {
  const va = gl.createVertexArray();
  gl.bindVertexArray(va);
  for (const [buffer, loc, numElem] of bufLocNumElmPairs) {
    if (loc === -1) continue;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, numElem, gl.FLOAT, false, 0, 0);
  }
  if (indices) {
    const indexBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);
    gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(indices), gl.STATIC_DRAW);
  }
  gl.bindVertexArray(null);
  return va;
}

function resizeCanvasToDisplaySize(canvas) {
  const dpr = Math.min(2, window.devicePixelRatio);
  const displayWidth = Math.round(canvas.clientWidth * dpr);
  const displayHeight = Math.round(canvas.clientHeight * dpr);
  const needResize = canvas.width !== displayWidth || canvas.height !== displayHeight;
  if (needResize) {
    canvas.width = displayWidth;
    canvas.height = displayHeight;
  }
  return needResize;
}

function makeBuffer(gl, sizeOrData, usage) {
  const buf = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buf);
  gl.bufferData(gl.ARRAY_BUFFER, sizeOrData, usage);
  gl.bindBuffer(gl.ARRAY_BUFFER, null);
  return buf;
}

function createAndSetupTexture(gl, minFilter, magFilter, wrapS, wrapT) {
  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, wrapS);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, wrapT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, minFilter);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, magFilter);
  return texture;
}

function generateTowsAtlas(items) {
  const canvas = document.createElement('canvas');
  const ctx = canvas.getContext('2d');
  const cellSize = 512;
  const atlasSize = 2;
  canvas.width = atlasSize * cellSize;
  canvas.height = atlasSize * cellSize;

  items.forEach((item, i) => {
    const col = i % atlasSize;
    const row = Math.floor(i / atlasSize);
    const x = col * cellSize;
    const y = row * cellSize;

    ctx.fillStyle = '#030c15';
    ctx.fillRect(x, y, cellSize, cellSize);

    const cx = x + cellSize / 2;
    const cy = y + cellSize / 2;
    const radius = cellSize * 0.4;

    const bgGrad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    bgGrad.addColorStop(0, 'rgba(8, 26, 43, 0.9)');
    bgGrad.addColorStop(0.7, 'rgba(3, 12, 21, 0.95)');
    bgGrad.addColorStop(1, 'rgba(2, 7, 13, 1)');
    ctx.fillStyle = bgGrad;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.fill();

    ctx.strokeStyle = i % 2 === 0 ? '#0df2c9' : '#e2b478';
    ctx.lineWidth = 8;
    ctx.shadowColor = ctx.strokeStyle;
    ctx.shadowBlur = 25;
    ctx.beginPath();
    ctx.arc(cx, cy, radius - 10, 0, Math.PI * 2);
    ctx.stroke();
    
    ctx.shadowBlur = 0;
    ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
    ctx.lineWidth = 2;
    ctx.setLineDash([8, 12]);
    ctx.beginPath();
    ctx.arc(cx, cy, radius + 20, 0, Math.PI * 2);
    ctx.stroke();
    ctx.setLineDash([]);

    const label = item.title.split(' ')[0];
    ctx.fillStyle = '#f8fafc';
    ctx.font = 'bold 120px Outfit, Noto Sans TC, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    ctx.shadowColor = i % 2 === 0 ? 'rgba(13, 242, 201, 0.6)' : 'rgba(226, 180, 120, 0.6)';
    ctx.shadowBlur = 30;
    ctx.fillText(label, cx, cy - 10);
    
    ctx.shadowBlur = 0;
    ctx.fillStyle = 'rgba(248, 250, 252, 0.7)';
    ctx.font = 'normal 32px Noto Serif TC, serif';
    const subLabel = item.title.split(' ')[1] || '戰略';
    ctx.fillText(subLabel, cx, cy + 85);
  });

  return canvas;
}

class InfiniteGridMenu {
  TARGET_FRAME_DURATION = 1000 / 60;
  SPHERE_RADIUS = 2;

  #time = 0;
  #deltaTime = 0;
  #deltaFrames = 0;
  #frames = 0;

  camera = {
    matrix: mat4.create(),
    near: 0.1,
    far: 40,
    fov: Math.PI / 4,
    aspect: 1,
    position: vec3.fromValues(0, 0, 3),
    up: vec3.fromValues(0, 1, 0),
    matrices: {
      view: mat4.create(),
      projection: mat4.create(),
      inversProjection: mat4.create()
    }
  };

  nearestVertexIndex = null;
  smoothRotationVelocity = 0;
  scaleFactor = 1.0;
  movementActive = false;

  constructor(canvas, items, onActiveItemChange, onMovementChange, onInit = null, scale = 1.0) {
    this.canvas = canvas;
    this.items = items || [];
    this.onActiveItemChange = onActiveItemChange || (() => {});
    this.onMovementChange = onMovementChange || (() => {});
    this.scaleFactor = scale;
    this.camera.position[2] = 3 * scale;
    this.#init(onInit);
  }

  resize() {
    this.viewportSize = vec2.set(this.viewportSize || vec2.create(), this.canvas.clientWidth, this.canvas.clientHeight);
    const gl = this.gl;
    const needsResize = resizeCanvasToDisplaySize(gl.canvas);
    if (needsResize) {
      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    }
    this.#updateProjectionMatrix(gl);
  }

  run(time = 0) {
    this.#deltaTime = Math.min(32, time - this.#time);
    this.#time = time;
    this.#deltaFrames = this.#deltaTime / this.TARGET_FRAME_DURATION;
    this.#frames += this.#deltaFrames;
    this.#animate(this.#deltaTime);
    this.#render();
    this.rafId = requestAnimationFrame(t => this.run(t));
  }

  #init(onInit) {
    this.gl = this.canvas.getContext('webgl2', { antialias: true, alpha: true });
    const gl = this.gl;
    if (!gl) {
      throw new Error('No WebGL 2 context!');
    }

    this.viewportSize = vec2.fromValues(this.canvas.clientWidth, this.canvas.clientHeight);
    this.drawBufferSize = vec2.clone(this.viewportSize);

    this.discProgram = createProgram(gl, [discVertShaderSource, discFragShaderSource], null, {
      aModelPosition: 0,
      aModelNormal: 1,
      aModelUvs: 2,
      aInstanceMatrix: 3
    });

    this.discLocations = {
      aModelPosition: gl.getAttribLocation(this.discProgram, 'aModelPosition'),
      aModelUvs: gl.getAttribLocation(this.discProgram, 'aModelUvs'),
      aInstanceMatrix: gl.getAttribLocation(this.discProgram, 'aInstanceMatrix'),
      uWorldMatrix: gl.getUniformLocation(this.discProgram, 'uWorldMatrix'),
      uViewMatrix: gl.getUniformLocation(this.discProgram, 'uViewMatrix'),
      uProjectionMatrix: gl.getUniformLocation(this.discProgram, 'uProjectionMatrix'),
      uCameraPosition: gl.getUniformLocation(this.discProgram, 'uCameraPosition'),
      uScaleFactor: gl.getUniformLocation(this.discProgram, 'uScaleFactor'),
      uRotationAxisVelocity: gl.getUniformLocation(this.discProgram, 'uRotationAxisVelocity'),
      uTex: gl.getUniformLocation(this.discProgram, 'uTex'),
      uFrames: gl.getUniformLocation(this.discProgram, 'uFrames'),
      uItemCount: gl.getUniformLocation(this.discProgram, 'uItemCount'),
      uAtlasSize: gl.getUniformLocation(this.discProgram, 'uAtlasSize')
    };

    this.discGeo = new DiscGeometry(56, 1);
    this.discBuffers = this.discGeo.data;
    this.discVAO = makeVertexArray(
      gl,
      [
        [makeBuffer(gl, this.discBuffers.vertices, gl.STATIC_DRAW), this.discLocations.aModelPosition, 3],
        [makeBuffer(gl, this.discBuffers.uvs, gl.STATIC_DRAW), this.discLocations.aModelUvs, 2]
      ],
      this.discBuffers.indices
    );

    this.icoGeo = new IcosahedronGeometry();
    this.icoGeo.subdivide(1).spherize(this.SPHERE_RADIUS);
    this.instancePositions = this.icoGeo.vertices.map(v => v.position);
    this.DISC_INSTANCE_COUNT = this.icoGeo.vertices.length;
    this.#initDiscInstances(this.DISC_INSTANCE_COUNT);

    this.worldMatrix = mat4.create();
    this.#initTexture();

    this.control = new ArcballControl(this.canvas, deltaTime => this.#onControlUpdate(deltaTime));
    this.#updateCameraMatrix();
    this.#updateProjectionMatrix(gl);
    this.resize();

    if (onInit) onInit(this);
  }

  #initTexture() {
    const gl = this.gl;
    this.tex = createAndSetupTexture(gl, gl.LINEAR, gl.LINEAR, gl.CLAMP_TO_EDGE, gl.CLAMP_TO_EDGE);
    const itemCount = Math.max(1, this.items.length);
    this.atlasSize = Math.ceil(Math.sqrt(itemCount));
    const canvas = generateTowsAtlas(this.items);

    gl.bindTexture(gl.TEXTURE_2D, this.tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
    gl.generateMipmap(gl.TEXTURE_2D);
  }

  #initDiscInstances(count) {
    const gl = this.gl;
    this.discInstances = {
      matricesArray: new Float32Array(count * 16),
      matrices: [],
      buffer: gl.createBuffer()
    };
    for (let i = 0; i < count; ++i) {
      const instanceMatrixArray = new Float32Array(this.discInstances.matricesArray.buffer, i * 16 * 4, 16);
      instanceMatrixArray.set(mat4.create());
      this.discInstances.matrices.push(instanceMatrixArray);
    }
    gl.bindVertexArray(this.discVAO);
    gl.bindBuffer(gl.ARRAY_BUFFER, this.discInstances.buffer);
    gl.bufferData(gl.ARRAY_BUFFER, this.discInstances.matricesArray.byteLength, gl.DYNAMIC_DRAW);
    const mat4AttribSlotCount = 4;
    const bytesPerMatrix = 16 * 4;
    for (let j = 0; j < mat4AttribSlotCount; ++j) {
      const loc = this.discLocations.aInstanceMatrix + j;
      gl.enableVertexAttribArray(loc);
      gl.vertexAttribPointer(loc, 4, gl.FLOAT, false, bytesPerMatrix, j * 4 * 4);
      gl.vertexAttribDivisor(loc, 1);
    }
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    gl.bindVertexArray(null);
  }

  #animate(deltaTime) {
    const gl = this.gl;
    this.control.update(deltaTime, this.TARGET_FRAME_DURATION);

    let positions = this.instancePositions.map(p => vec3.transformQuat(vec3.create(), p, this.control.orientation));
    const scale = 0.25;
    const SCALE_INTENSITY = 0.6;
    positions.forEach((p, ndx) => {
      const s = (Math.abs(p[2]) / this.SPHERE_RADIUS) * SCALE_INTENSITY + (1 - SCALE_INTENSITY);
      const finalScale = s * scale;
      const matrix = mat4.create();
      mat4.multiply(matrix, matrix, mat4.fromTranslation(mat4.create(), vec3.negate(vec3.create(), p)));
      mat4.multiply(matrix, matrix, mat4.targetTo(mat4.create(), [0, 0, 0], p, [0, 1, 0]));
      mat4.multiply(matrix, matrix, mat4.fromScaling(mat4.create(), [finalScale, finalScale, finalScale]));
      mat4.multiply(matrix, matrix, mat4.fromTranslation(mat4.create(), [0, 0, -this.SPHERE_RADIUS]));
      mat4.copy(this.discInstances.matrices[ndx], matrix);
    });

    gl.bindBuffer(gl.ARRAY_BUFFER, this.discInstances.buffer);
    gl.bufferSubData(gl.ARRAY_BUFFER, 0, this.discInstances.matricesArray);
    gl.bindBuffer(gl.ARRAY_BUFFER, null);
    this.smoothRotationVelocity = this.control.rotationVelocity;
  }

  #render() {
    const gl = this.gl;
    gl.useProgram(this.discProgram);

    gl.enable(gl.CULL_FACE);
    gl.enable(gl.DEPTH_TEST);

    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    gl.uniformMatrix4fv(this.discLocations.uWorldMatrix, false, this.worldMatrix);
    gl.uniformMatrix4fv(this.discLocations.uViewMatrix, false, this.camera.matrices.view);
    gl.uniformMatrix4fv(this.discLocations.uProjectionMatrix, false, this.camera.matrices.projection);
    gl.uniform3f(
      this.discLocations.uCameraPosition,
      this.camera.position[0],
      this.camera.position[1],
      this.camera.position[2]
    );
    gl.uniform4f(
      this.discLocations.uRotationAxisVelocity,
      this.control.rotationAxis[0],
      this.control.rotationAxis[1],
      this.control.rotationAxis[2],
      this.smoothRotationVelocity * 1.1
    );

    gl.uniform1i(this.discLocations.uItemCount, this.items.length);
    gl.uniform1i(this.discLocations.uAtlasSize, this.atlasSize);
    gl.uniform1f(this.discLocations.uFrames, this.#frames);
    gl.uniform1f(this.discLocations.uScaleFactor, this.scaleFactor);
    gl.uniform1i(this.discLocations.uTex, 0);
    gl.activeTexture(gl.TEXTURE0);
    gl.bindTexture(gl.TEXTURE_2D, this.tex);

    gl.bindVertexArray(this.discVAO);
    gl.drawElementsInstanced(
      gl.TRIANGLES,
      this.discBuffers.indices.length,
      gl.UNSIGNED_SHORT,
      0,
      this.DISC_INSTANCE_COUNT
    );
  }

  #updateCameraMatrix() {
    mat4.targetTo(this.camera.matrix, this.camera.position, [0, 0, 0], this.camera.up);
    mat4.invert(this.camera.matrices.view, this.camera.matrix);
  }

  #updateProjectionMatrix(gl) {
    this.camera.aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
    const height = this.SPHERE_RADIUS * 0.35;
    const distance = this.camera.position[2];
    if (this.camera.aspect > 1) {
      this.camera.fov = 2 * Math.atan(height / distance);
    } else {
      this.camera.fov = 2 * Math.atan(height / this.camera.aspect / distance);
    }
    mat4.perspective(
      this.camera.matrices.projection,
      this.camera.fov,
      this.camera.aspect,
      this.camera.near,
      this.camera.far
    );
    mat4.invert(this.camera.matrices.inversProjection, this.camera.matrices.projection);
  }

  #onControlUpdate(deltaTime) {
    const timeScale = deltaTime / this.TARGET_FRAME_DURATION + 0.0001;
    let damping = 5 / timeScale;
    let cameraTargetZ = 3 * this.scaleFactor;
    const isMoving = this.control.isPointerDown || Math.abs(this.smoothRotationVelocity) > 0.01;

    if (isMoving !== this.movementActive) {
      this.movementActive = isMoving;
      this.onMovementChange(isMoving);
    }

    if (!this.control.isPointerDown) {
      const nearestVertexIndex = this.#findNearestVertexIndex();
      const itemIndex = nearestVertexIndex % Math.max(1, this.items.length);
      this.onActiveItemChange(itemIndex);
      const snapDirection = vec3.normalize(vec3.create(), this.#getVertexWorldPosition(nearestVertexIndex));
      this.control.snapTargetDirection = snapDirection;
    } else {
      cameraTargetZ += this.control.rotationVelocity * 80 + 2.5;
      damping = 7 / timeScale;
    }

    this.camera.position[2] += (cameraTargetZ - this.camera.position[2]) / damping;
    this.#updateCameraMatrix();
  }

  #findNearestVertexIndex() {
    const n = this.control.pointerSnapDirection;
    const inversOrientation = quat.conjugate(quat.create(), this.control.orientation);
    const nt = vec3.transformQuat(vec3.create(), n, inversOrientation);
    let maxD = -1;
    let nearestVertexIndex;
    for (let i = 0; i < this.instancePositions.length; ++i) {
      const d = vec3.dot(nt, this.instancePositions[i]);
      if (d > maxD) {
        maxD = d;
        nearestVertexIndex = i;
      }
    }
    return nearestVertexIndex;
  }

  #getVertexWorldPosition(index) {
    const nearestVertexPos = this.instancePositions[index];
    return vec3.transformQuat(vec3.create(), nearestVertexPos, this.control.orientation);
  }

  destroy() {
    if (this.rafId) cancelAnimationFrame(this.rafId);
  }
}

function initTowsRadar() {
  const canvas = document.getElementById("tows-radar-canvas");
  const container = document.getElementById("tows-radar-container");
  const fallbackEl = document.getElementById("tows-radar-fallback");
  if (!canvas) return;

  const towsItems = [
    {
      title: 'SO 成長戰略',
      description: '結合慢食與里海浪潮，以採集風土為故事線，直擊評審與消費者對生態文資深度的偏好。',
      link: '#features'
    },
    {
      title: 'WO 扭轉戰略',
      description: '導入科學澄清與油脂排比去腥技術，將原料季節不穩定的劣勢化為當代技術的創新亮點。',
      link: '#scenarios'
    },
    {
      title: 'ST 防禦戰略',
      description: '嚴格遵循部落季節採集與休養禁忌，建立契作共享機制，從源頭防範流於「文化掠奪」之批判。',
      link: '#story'
    },
    {
      title: 'WT 消除戰略',
      description: '定位為高端餐飲限量體驗套組，規避大規模量產的法規限制，從根本上減輕生態採集總體壓力。',
      link: '#details'
    }
  ];

  const badgeEl = document.getElementById("tows-active-badge");
  const titleEl = document.getElementById("tows-active-title");
  const descEl = document.getElementById("tows-active-desc");
  const linkEl = document.getElementById("tows-active-link");

  let activeIndex = -1;

  const handleActiveItem = index => {
    if (index === activeIndex) return;
    activeIndex = index;
    const item = towsItems[index];

    if (badgeEl && titleEl && descEl && linkEl) {
      // Fade out
      badgeEl.classList.add("fade-out");
      titleEl.classList.add("fade-out");
      descEl.classList.add("fade-out");

      setTimeout(() => {
        const label = item.title.split(' ')[0];
        badgeEl.textContent = label;
        if (label === 'WO' || label === 'WT') {
          badgeEl.className = "tows-badge-label gold";
        } else {
          badgeEl.className = "tows-badge-label";
        }
        titleEl.textContent = item.title;
        descEl.textContent = item.description;
        linkEl.setAttribute("href", item.link);

        // Fade in
        badgeEl.classList.remove("glow-text"); // ensure no conflicts
        badgeEl.classList.remove("fade-out");
        titleEl.classList.remove("fade-out");
        descEl.classList.remove("fade-out");
      }, 300);
    }
  };

  // Check for library loads and WebGL support
  const hasLibraries = typeof window.glMatrix !== "undefined" && typeof window.ogl !== "undefined";
  
  const isWebGL2Supported = () => {
    try {
      const c = document.createElement("canvas");
      return !!(window.WebGL2RenderingContext && (c.getContext("webgl2") || c.getContext("experimental-webgl2")));
    } catch (e) {
      return false;
    }
  };

  const useFallback = !hasLibraries || !isWebGL2Supported();

  if (useFallback) {
    console.warn("TOWS Radar: WebGL 2 or libraries (glMatrix/OGL) not available. Falling back to 2D buttons list.");
    if (container && fallbackEl) {
      container.classList.add("fallback-active");
      
      const fallbackBtns = fallbackEl.querySelectorAll(".tows-fallback-btn");
      fallbackBtns.forEach(btn => {
        btn.addEventListener("click", () => {
          const index = parseInt(btn.getAttribute("data-index"), 10);
          handleActiveItem(index);
          
          fallbackBtns.forEach(b => b.classList.remove("active"));
          btn.classList.add("active");
        });
      });
      
      // Initialize first item
      handleActiveItem(0);
    }
    return () => {};
  }

  const handleMovement = isMoving => {
    // Optional interactive styles
  };

  const radarMenu = new InfiniteGridMenu(
    canvas,
    towsItems,
    handleActiveItem,
    handleMovement,
    menu => menu.run(),
    1.0
  );

  const resize = () => {
    radarMenu.resize();
  };
  window.addEventListener("resize", resize);
  
  return () => {
    window.removeEventListener("resize", resize);
    radarMenu.destroy();
  };
}

// --- WebGL Global Marine Bioluminescent Plankton Background ---
const initGlobalPlankton = () => {
  const canvas = document.createElement("canvas");
  canvas.id = "global-plankton-canvas";
  // Insert at the beginning of body so it stays behind all content
  document.body.insertBefore(canvas, document.body.firstChild);

  const ctx = canvas.getContext("2d");
  let particles = [];
  const particleCount = 45;

  const resize = () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  };
  window.addEventListener("resize", resize, { passive: true });
  resize();

  class Plankton {
    constructor() {
      this.reset();
      this.y = Math.random() * canvas.height; // distributed initially
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = canvas.height + 15;
      this.size = Math.random() * 2.2 + 0.8;
      this.speedY = Math.random() * 0.35 + 0.15;
      this.speedX = Math.random() * 0.2 - 0.1;
      this.waveSpeed = Math.random() * 0.015 + 0.005;
      this.waveAmplitude = Math.random() * 10 + 5;
      this.angle = Math.random() * Math.PI * 2;
      this.opacity = Math.random() * 0.35 + 0.15;
      // 70% Cyan accent color, 30% Gold accent color
      this.color = Math.random() < 0.7 ? "13, 242, 201" : "226, 180, 120";
    }

    update(mouse) {
      this.y -= this.speedY;
      this.angle += this.waveSpeed;
      this.x += Math.sin(this.angle) * 0.15 + this.speedX;

      // Mouse gentle repulsion
      if (mouse.x > 0 && mouse.y > 0) {
        const dx = this.x - mouse.x;
        const dy = this.y - mouse.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        if (dist < 130) {
          const force = (130 - dist) / 130;
          this.x += (dx / dist) * force * 1.8;
          this.y += (dy / (dist + 0.0001)) * force * 1.8;
        }
      }

      if (this.y < -15 || this.x < -15 || this.x > canvas.width + 15) {
        this.reset();
      }
    }

    draw() {
      ctx.beginPath();
      const grad = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.size * 2);
      grad.addColorStop(0, `rgba(${this.color}, ${this.opacity})`);
      grad.addColorStop(0.5, `rgba(${this.color}, ${this.opacity * 0.35})`);
      grad.addColorStop(1, "rgba(0, 0, 0, 0)");
      ctx.fillStyle = grad;
      ctx.arc(this.x, this.y, this.size * 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  for (let i = 0; i < particleCount; i++) {
    particles.push(new Plankton());
  }

  let mouse = { x: -1000, y: -1000 };
  window.addEventListener("pointermove", e => {
    mouse.x = e.clientX;
    mouse.y = e.clientY;
  }, { passive: true });

  window.addEventListener("pointerleave", () => {
    mouse.x = -1000;
    mouse.y = -1000;
  }, { passive: true });

  const loop = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(p => {
      p.update(mouse);
      p.draw();
    });
    requestAnimationFrame(loop);
  };
  loop();
};
