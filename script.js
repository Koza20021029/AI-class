document.addEventListener("DOMContentLoaded", () => {
  // =========================================================================
  // 0. Cover Page Special Effects: Particle Sparkles & Mouse Parallax
  // =========================================================================
  const heroSection = document.getElementById("hero");
  const glow1Wrap = document.querySelector(".glow-1-wrap");
  const glow2Wrap = document.querySelector(".glow-2-wrap");
  const particlesContainer = document.querySelector(".hero-particles");

  // Mouse Parallax Effect (Desktop only for performance)
  if (heroSection && glow1Wrap && glow2Wrap && window.innerWidth > 768) {
    heroSection.addEventListener("mousemove", (e) => {
      const { clientX, clientY } = e;
      const width = window.innerWidth;
      const height = window.innerHeight;
      
      const moveX = (clientX / width) - 0.5;
      const moveY = (clientY / height) - 0.5;
      
      glow1Wrap.style.transform = `translate(${moveX * 60}px, ${moveY * 60}px)`;
      glow2Wrap.style.transform = `translate(${moveX * -40}px, ${moveY * -40}px)`;
    });
  }

  // Floating Sparkles Plankton Generator
  if (particlesContainer) {
    const particleCount = 32; // Increased count
    for (let i = 0; i < particleCount; i++) {
      createParticle();
    }
  }

  function createParticle() {
    const particle = document.createElement("div");
    particle.className = "hero-particle";
    
    // 35% chance to spawn a gold particle instead of cyan
    if (Math.random() < 0.35) {
      particle.classList.add("gold");
    }
    
    // Random sizes (4px to 12px)
    const size = Math.random() * 8 + 4;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Random positions along the width
    particle.style.left = `${Math.random() * 100}%`;
    
    // Random animation speed (10s to 22s)
    const duration = Math.random() * 12 + 10;
    particle.style.animationDuration = `${duration}s`;
    
    // Random delay (negative delay starts animation mid-cycle)
    particle.style.animationDelay = `${Math.random() * -22}s`;
    
    // Random horizontal drift
    const drift = Math.random() * 160 - 80; // -80px to 80px
    particle.style.setProperty("--drift", `${drift}px`);
    
    particlesContainer.appendChild(particle);
  }

  // Slogan letter-by-letter cinematic reveal
  const slogan = document.getElementById("hero-slogan");
  if (slogan) {
    const sloganText = slogan.textContent.trim();
    slogan.innerHTML = "";
    [...sloganText].forEach((char, index) => {
      const span = document.createElement("span");
      span.className = "char-fade";
      // Delay increments of 0.04s, starting after title animation
      span.style.animationDelay = `${0.7 + (index * 0.04)}s`;
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
      src: "img/Gemini_Generated_Image_3bz1g43bz1g43bz1 (1).png",
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
      src: "img/Gemini_Generated_Image_qa7z2iqa7z2iqa7z.png",
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
});
