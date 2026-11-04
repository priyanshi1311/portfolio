/* ==========================================================
   PRIYANSHI - DEVELOPER PORTFOLIO JAVASCRIPT
   Pure Vanilla JS (No Framework / Zero Build Step)
   ========================================================== */

document.addEventListener('DOMContentLoaded', () => {
  // Initialize Lucide icons if loaded
  if (window.lucide) {
    window.lucide.createIcons();
  }

  /* --------------------------------------------------------
     0. Theme Switcher (Dark & Light Mode Toggle)
     -------------------------------------------------------- */
  const navbar = document.getElementById('navbar');
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const mobileThemeToggleBtn = document.getElementById('mobileThemeToggleBtn');
  const themeIcon = document.getElementById('themeIcon');
  const mobileThemeIcon = document.getElementById('mobileThemeIcon');

  function updateThemeUI(theme) {
    const isDark = theme === 'dark';
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.setAttribute('data-theme', 'dark');
      if (themeIcon) {
        themeIcon.setAttribute('data-lucide', 'sun');
        themeIcon.className = 'w-4 h-4 text-amber-400 transition-transform duration-300';
      }
      if (mobileThemeIcon) {
        mobileThemeIcon.setAttribute('data-lucide', 'sun');
        mobileThemeIcon.className = 'w-4 h-4 text-amber-400';
      }
      if (themeToggleBtn) themeToggleBtn.setAttribute('title', 'Switch to Light Theme');
      if (mobileThemeToggleBtn) mobileThemeToggleBtn.setAttribute('title', 'Switch to Light Theme');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.setAttribute('data-theme', 'light');
      if (themeIcon) {
        themeIcon.setAttribute('data-lucide', 'moon');
        themeIcon.className = 'w-4 h-4 text-indigo-600 transition-transform duration-300';
      }
      if (mobileThemeIcon) {
        mobileThemeIcon.setAttribute('data-lucide', 'moon');
        mobileThemeIcon.className = 'w-4 h-4 text-indigo-600';
      }
      if (themeToggleBtn) themeToggleBtn.setAttribute('title', 'Switch to Dark Theme');
      if (mobileThemeToggleBtn) mobileThemeToggleBtn.setAttribute('title', 'Switch to Dark Theme');
    }

    if (navbar && window.scrollY > 20) {
      if (isDark) {
        navbar.classList.add('bg-[#0b0f19]/90', 'border-white/10');
        navbar.classList.remove('bg-white/90', 'border-slate-200');
      } else {
        navbar.classList.add('bg-white/90', 'border-slate-200');
        navbar.classList.remove('bg-[#0b0f19]/90', 'border-white/10');
      }
    }

    if (window.lucide) {
      window.lucide.createIcons();
    }
  }

  function toggleTheme() {
    const isCurrentlyDark = document.documentElement.classList.contains('dark');
    const newTheme = isCurrentlyDark ? 'light' : 'dark';
    localStorage.setItem('portfolio_theme', newTheme);
    updateThemeUI(newTheme);
  }

  const savedTheme = localStorage.getItem('portfolio_theme') || 
    (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  updateThemeUI(savedTheme);

  if (themeToggleBtn) themeToggleBtn.addEventListener('click', toggleTheme);
  if (mobileThemeToggleBtn) mobileThemeToggleBtn.addEventListener('click', toggleTheme);

  /* --------------------------------------------------------
     1. Sticky Navbar & Active Section Spy
     -------------------------------------------------------- */
  const navLinks = document.querySelectorAll('.nav-link');
  const sections = document.querySelectorAll('section[id]');

  window.addEventListener('scroll', () => {
    const isDark = document.documentElement.classList.contains('dark');
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled', 'backdrop-blur-md', 'shadow-sm', 'border-b');
      if (isDark) {
        navbar.classList.add('bg-[#0b0f19]/90', 'border-white/10');
        navbar.classList.remove('bg-white/90', 'border-slate-200');
      } else {
        navbar.classList.add('bg-white/90', 'border-slate-200');
        navbar.classList.remove('bg-[#0b0f19]/90', 'border-white/10');
      }
      navbar.classList.remove('bg-transparent');
    } else {
      navbar.classList.remove('scrolled', 'bg-white/90', 'bg-[#0b0f19]/90', 'backdrop-blur-md', 'shadow-sm', 'border-b', 'border-slate-200', 'border-white/10');
      navbar.classList.add('bg-transparent');
    }

    let currentSection = '';
    const scrollPos = window.scrollY + 140;

    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      if (scrollPos >= top && scrollPos < top + height) {
        currentSection = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const href = link.getAttribute('href');
      if (href === `#${currentSection}`) {
        link.classList.add('text-indigo-600', 'bg-indigo-50', 'font-semibold');
        link.classList.remove('text-slate-600');
      } else {
        link.classList.remove('text-indigo-600', 'bg-indigo-50', 'font-semibold');
        link.classList.add('text-slate-600');
      }
    });
  });

  /* --------------------------------------------------------
     2. Mobile Hamburger Drawer
     -------------------------------------------------------- */
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileMenu = document.getElementById('mobileMenu');

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Close when clicking a link
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });
  }

  /* --------------------------------------------------------
     3. Copy Developer Snippet Button
     -------------------------------------------------------- */
  const copyCodeBtn = document.getElementById('copyCodeBtn');
  const codeContent = document.getElementById('codeContent');

  if (copyCodeBtn && codeContent) {
    copyCodeBtn.addEventListener('click', () => {
      const textToCopy = `// Priyanshi's Developer Profile
const engineer: Developer = {
  name: "Priyanshi",
  role: "Full Stack Developer",
  education: "B.Tech CSE @ COER (8.02 GPA)",
  coreStack: ["React", "Node.js", "PostgreSQL", "Prisma"],
  focus: ["Scalable Architectures", "AI Integration"],
  status: "Open to Opportunities 🚀"
};`;

      navigator.clipboard.writeText(textToCopy).then(() => {
        const originalHtml = copyCodeBtn.innerHTML;
        copyCodeBtn.innerHTML = `
          <svg class="w-3.5 h-3.5 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
          <span class="text-emerald-400 font-mono text-[11px]">Copied</span>
        `;
        setTimeout(() => {
          copyCodeBtn.innerHTML = originalHtml;
          if (window.lucide) window.lucide.createIcons();
        }, 2000);
      });
    });
  }

  /* --------------------------------------------------------
     4. Copy Email Address Button
     -------------------------------------------------------- */
  const copyEmailBtn = document.getElementById('copyEmailBtn');
  if (copyEmailBtn) {
    copyEmailBtn.addEventListener('click', () => {
      navigator.clipboard.writeText('Priyanshi13bhati@gmail.com').then(() => {
        const originalHtml = copyEmailBtn.innerHTML;
        copyEmailBtn.innerHTML = `
          <svg class="w-4 h-4 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        `;
        setTimeout(() => {
          copyEmailBtn.innerHTML = originalHtml;
          if (window.lucide) window.lucide.createIcons();
        }, 2000);
      });
    });
  }

  /* --------------------------------------------------------
     5. Skills Category Filter
     -------------------------------------------------------- */
  const skillFilterBtns = document.querySelectorAll('.skill-filter-btn');
  const skillCategorySections = document.querySelectorAll('.skill-category-group');

  skillFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      skillFilterBtns.forEach(b => {
        b.classList.remove('bg-indigo-600', 'text-white', 'shadow-sm', 'scale-105');
        b.classList.add('bg-white', 'text-slate-600', 'border-slate-200');
      });
      btn.classList.add('bg-indigo-600', 'text-white', 'shadow-sm', 'scale-105');
      btn.classList.remove('bg-white', 'text-slate-600');

      const filter = btn.getAttribute('data-filter');

      skillCategorySections.forEach(section => {
        const cat = section.getAttribute('data-category');
        if (filter === 'all' || filter === cat) {
          section.style.display = 'block';
        } else {
          section.style.display = 'none';
        }
      });
    });
  });

  /* --------------------------------------------------------
     6. Projects Filter
     -------------------------------------------------------- */
  const projectFilterBtns = document.querySelectorAll('.project-filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  projectFilterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      projectFilterBtns.forEach(b => {
        b.classList.remove('bg-indigo-600', 'text-white', 'shadow-sm', 'scale-105');
        b.classList.add('bg-white', 'text-slate-600', 'border-slate-200');
      });
      btn.classList.add('bg-indigo-600', 'text-white', 'shadow-sm', 'scale-105');
      btn.classList.remove('bg-white', 'text-slate-600');

      const category = btn.getAttribute('data-category');

      projectCards.forEach(card => {
        const cardCat = card.getAttribute('data-category') || '';
        if (category === 'all' || cardCat === category || cardCat.includes(category)) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  /* --------------------------------------------------------
     7. Deep-Dive Project Modal Data & Controller
     -------------------------------------------------------- */
  const projectModal = document.getElementById('projectModal');
  const closeModalBtn = document.getElementById('closeModalBtn');
  const modalCloseFooterBtn = document.getElementById('modalCloseFooterBtn');

  const projectDetails = {
    ecoverse: {
      title: "EcoVerse",
      subtitle: "AI-Powered Campus Sustainability Platform",
      category: "Full Stack",
      description: "An intelligent campus sustainability platform designed to track environmental metrics, deliver Groq AI-driven conservation recommendations, and visualize real-time green zones via interactive geo-mapping.",
      features: [
        "Real-time sustainability metrics tracking across campus facilities",
        "Analytics dashboards with interactive visual trend charts",
        "Secure REST APIs protected by JWT authentication & role guards",
        "AI-powered recommendations engine utilizing Groq AI LLM inference",
        "Interactive campus eco-maps powered by Leaflet.js"
      ],
      techStack: ["React", "Tailwind CSS", "Node.js", "Express", "PostgreSQL", "Prisma", "Groq AI", "Leaflet.js", "JWT"],
      liveUrl: "https://eco-verse-ai-based-environmental-si.vercel.app/",
      githubUrl: "https://github.com/priyanshi1311"
    },
    cognimation: {
      title: "Cognimation",
      subtitle: "Generative AI Learning Assistant",
      category: "AI & GenAI",
      description: "An immersive multimodal learning companion that transforms speech into vibrant generative illustrations and 3D scene elements, fostering multi-sensory educational experiences.",
      features: [
        "Voice-to-image synthesis turning spoken prompts into concept art",
        "AI-powered intelligent learning dialogues and question answering",
        "Interactive 3D visuals embedded via Spline 3D canvas",
        "Real-time voice interaction leveraging browser Web Speech API"
      ],
      techStack: ["React.js", "Python", "Flask", "Stability AI", "Spline 3D", "Web Speech API"],
      githubUrl: "https://github.com/priyanshi1311"
    },
    aromatic: {
      title: "Aromatic Cafe",
      subtitle: "Cafe & Restaurant Booking Website",
      category: "Web App",
      description: "A digital dining experience website featuring an artisanal menu presentation, interactive table reservation engine, and an exclusive banquet & party hall booking showcase.",
      features: [
        "Gourmet culinary menu showcase with vivid photography & categorization",
        "Instant table reservation flow with date/time party selection",
        "Specialty party hall & celebratory venue booking portal",
        "Mobile-optimized customer experience with smooth booking confirmation"
      ],
      techStack: ["React.js", "Tailwind CSS", "Node.js", "Express", "REST APIs"],
      liveUrl: "https://aromatic-cafe.onrender.com/",
      githubUrl: "https://github.com/priyanshi1311"
    },
    iotmart: {
      title: "IoT Mart",
      subtitle: "IoT E-Commerce Project",
      category: "IoT / System",
      description: "A tailored e-commerce catalog engineered specifically for smart home automation devices, microcontrollers, environmental sensors, and embedded robotics hardware.",
      features: [
        "Curated catalog for IoT sensors, smart relays, dev boards, and modules",
        "Component specification sheets and pinout compatibility details",
        "Dynamic cart management and product search filtering",
        "Clean architectural separation between catalog engine and UI"
      ],
      techStack: ["React.js", "Node.js", "Express", "MongoDB", "Tailwind CSS"],
      liveUrl: "https://iotmart-sdee.onrender.com/",
      githubUrl: "https://github.com/priyanshi1311"
    },
    xyphx: {
      title: "Xyphx – ShowMySkills System",
      subtitle: "Open Source Collaborative Platform & Internship Project",
      category: "Open Source",
      description: "An open-source peer talent verification and developer competency tracking repository built as a collaborative community initiative.",
      features: [
        "Modular skill verification system designed for developer communities",
        "Open-source collaborative architecture adhering to GitHub pull-request standards",
        "Structured repository layout with reusable interface primitives",
        "Live production deployment with real-time portfolio skill validation"
      ],
      techStack: ["JavaScript", "React", "Node.js", "Open Source", "Git"],
      liveUrl: "https://showmyskills.xyphx.com/",
      githubUrl: "https://github.com/xyphx/ShowMySkills-system.git"
    },
    vijayfoods: {
      title: "Vijay Foods",
      subtitle: "Premium Pure Indian Spices E-Commerce & Admin Platform",
      category: "Full Stack",
      description: "A production-ready e-commerce web platform and comprehensive administrative backoffice designed for Vijay Foods, delivering farm-fresh, FSSAI-certified pure Indian spices with an end-to-end shopping experience.",
      features: [
        "Interactive product catalog featuring authentic spices (Red Chilli, Turmeric, Coriander)",
        "Complete shopping cart, wishlist, and dynamic checkout flow with responsive UI",
        "Order status tracking system and dealer network registration portal",
        "Full-featured Admin Dashboard for inventory tracking, customer analytics, and dealer orders",
        "High-performance Vite build with instant mobile and desktop responsiveness"
      ],
      techStack: ["React.js", "Tailwind CSS", "Vite", "JavaScript", "REST APIs", "E-Commerce", "Admin CMS"],
      liveUrl: "https://vijayfoods.vercel.app/",
      githubUrl: "https://github.com/priyanshi1311/vijayfoods.git"
    }
  };

  const openProjectModal = (projectId) => {
    const data = projectDetails[projectId];
    if (!data || !projectModal) return;

    document.getElementById('modalCategory').innerText = data.category;
    document.getElementById('modalTitle').innerText = data.title;
    document.getElementById('modalSubtitle').innerText = data.subtitle;
    document.getElementById('modalDescription').innerText = data.description;

    const featuresContainer = document.getElementById('modalFeatures');
    featuresContainer.innerHTML = '';
    data.features.forEach(feat => {
      const item = document.createElement('div');
      item.className = 'flex items-start gap-2 p-2.5 rounded-lg bg-slate-50 border border-slate-200 text-xs text-slate-700';
      item.innerHTML = `
        <svg class="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path></svg>
        <span>${feat}</span>
      `;
      featuresContainer.appendChild(item);
    });

    const techContainer = document.getElementById('modalTechStack');
    techContainer.innerHTML = '';
    data.techStack.forEach(t => {
      const pill = document.createElement('span');
      pill.className = 'px-3 py-1 rounded-lg bg-indigo-50 border border-indigo-100 text-xs font-mono text-indigo-700 font-medium';
      pill.innerText = t;
      techContainer.appendChild(pill);
    });

    const liveBtn = document.getElementById('modalLiveBtn');
    if (data.liveUrl) {
      liveBtn.href = data.liveUrl;
      liveBtn.style.display = 'inline-flex';
    } else {
      liveBtn.style.display = 'none';
    }

    const githubBtn = document.getElementById('modalGithubBtn');
    if (data.githubUrl) {
      githubBtn.href = data.githubUrl;
      githubBtn.style.display = 'inline-flex';
    } else {
      githubBtn.style.display = 'none';
    }

    projectModal.classList.add('active');
  };

  document.querySelectorAll('.open-project-modal-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const id = btn.getAttribute('data-project');
      openProjectModal(id);
    });
  });

  const closeProjectModal = () => {
    if (projectModal) projectModal.classList.remove('active');
  };

  if (closeModalBtn) closeModalBtn.addEventListener('click', closeProjectModal);
  if (modalCloseFooterBtn) modalCloseFooterBtn.addEventListener('click', closeProjectModal);
  if (projectModal) {
    projectModal.addEventListener('click', (e) => {
      if (e.target === projectModal) closeProjectModal();
    });
  }

  /* --------------------------------------------------------
     8. ATS Resume Modal & Download Controller
     -------------------------------------------------------- */
  const resumeModal = document.getElementById('resumeModal');
  const openResumeBtns = document.querySelectorAll('.open-resume-btn');
  const closeResumeBtn = document.getElementById('closeResumeBtn');
  const printResumeBtn = document.getElementById('printResumeBtn');
  const downloadResumeTxtBtn = document.getElementById('downloadResumeTxtBtn');

  openResumeBtns.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (resumeModal) resumeModal.classList.add('active');
    });
  });

  const closeResume = () => {
    if (resumeModal) resumeModal.classList.remove('active');
  };

  if (closeResumeBtn) closeResumeBtn.addEventListener('click', closeResume);
  if (resumeModal) {
    resumeModal.addEventListener('click', (e) => {
      if (e.target === resumeModal) closeResume();
    });
  }

  if (printResumeBtn) {
    printResumeBtn.addEventListener('click', () => {
      window.print();
    });
  }

  if (downloadResumeTxtBtn) {
    downloadResumeTxtBtn.addEventListener('click', () => {
      const resumeContent = `===============================================================
PRIYANSHI - FULL STACK DEVELOPER
===============================================================
Email: Priyanshi13bhati@gmail.com
Location: Greater Noida, India
LinkedIn: https://www.linkedin.com/in/priyanshi-1311pr
GitHub: https://github.com/priyanshi1311

PROFESSIONAL SUMMARY:
I am a final-year Computer Science Engineering student at COER University, Roorkee. I enjoy building scalable, responsive, and user-friendly applications using modern technologies. My interests include Full Stack Development, AI integration, and open-source collaboration.

EDUCATION:
- B.Tech in Computer Science & Engineering (2023 - 2027)
  COER University, Roorkee | Cumulative GPA: 8.02 / 10
- Senior Secondary (2021 - 2023)
  Radisson The School, Neemka, Jewar

TECHNICAL SKILLS:
- Programming: JavaScript (ES6+), Java, C
- Frontend: React.js, Tailwind CSS, Vite, HTML5, Modern CSS3
- Backend: Node.js, Express.js, REST APIs, JWT Authentication
- Databases: PostgreSQL, MongoDB, Prisma ORM, SQL
- Tools: Git, GitHub, VS Code, Postman

EXPERIENCE:
1. Software Development Intern | XyphX (October 10, 2026 – Present | Remote)
   - Working on flagship project "Show My Skills" (https://showmyskills.xyphx.com/)
   - Developing modular developer skill verification systems using React.js and JavaScript
   - Contributing to open-source repository architecture adhering to PR standards
   - Integrating client-side views with backend endpoints for real-time skill tracking

2. Software Development Intern | JSL Works Pvt. Ltd. (June 10, 2026 – July 24, 2026 | Remote)
   - Built full-stack features using React.js and Node.js
   - Designed and consumed production REST APIs
   - Implemented analytics and reporting features
   - Integrated PostgreSQL with Prisma ORM for type-safe relational schemas
   - Embedded AI capabilities into platform features

3. Java Developer Intern | Codec Technologies (June 2025 – August 2025 | Remote)
   - Developed core Java backend modules using OOP principles
   - Handled server requests with Java Servlets
   - Built authentication and user management workflows
   - Executed MySQL database operations and schema queries

PROJECTS:
1. EcoVerse - AI-Powered Campus Sustainability Platform (Live: https://eco-verse-ai-based-environmental-si.vercel.app/)
   Tech: React, Tailwind CSS, Node.js, Express, PostgreSQL, Prisma, Groq AI, Leaflet.js
2. Cognimation - Generative AI Learning Assistant
   Tech: React.js, Python, Flask, Stability AI, Spline 3D, Web Speech API
3. Aromatic Cafe - Cafe & Restaurant Booking Website (Live: https://aromatic-cafe.onrender.com/)
   Tech: React.js, Tailwind CSS, Node.js, Express, REST APIs
4. IoT Mart - IoT E-Commerce Project (Live: https://iotmart-sdee.onrender.com/)
   Tech: React.js, Node.js, Express, MongoDB, Tailwind CSS
5. Vijay Foods - Premium Pure Indian Spices E-Commerce & Admin Platform (Live: https://vijayfoods.vercel.app/ | GitHub: https://github.com/priyanshi1311/vijayfoods.git)
   Tech: React.js, Tailwind CSS, Vite, REST APIs, Admin CMS, E-Commerce
6. Xyphx ShowMySkills System - Open Source & Internship Project (Live: https://showmyskills.xyphx.com/ | GitHub: https://github.com/xyphx/ShowMySkills-system.git)
   Tech: JavaScript, React, Node.js, Open Source

ACHIEVEMENTS:
- Finalist, Code Crafter 3.0 Hackathon (CT University, 2026)
- National Participant, National Hackathon 4.0 (COER University)
- 3rd Prize Winner, Robosync Robotics Fest (COER University)
- Certified, AI/ML Workshop (IIT Roorkee, 2024)
- Certified Developer, Frontend Bootcamp (DevTown)
- Participant, Drone Technical Bootcamp
===============================================================`;

      const blob = new Blob([resumeContent], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'Priyanshi_FullStack_Resume.txt';
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  }

  /* --------------------------------------------------------
     9. Contact Form & Celebratory Feedback
     -------------------------------------------------------- */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const sendAnotherBtn = document.getElementById('sendAnotherBtn');

  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.innerHTML = `<span>Sending Message...</span>`;

      setTimeout(() => {
        contactForm.classList.add('hidden');
        if (formSuccess) formSuccess.classList.remove('hidden');

        // Confetti effect
        if (window.confetti) {
          try {
            window.confetti({
              particleCount: 80,
              spread: 70,
              origin: { y: 0.6 }
            });
          } catch (err) {}
        }
      }, 600);
    });
  }

  if (sendAnotherBtn && contactForm && formSuccess) {
    sendAnotherBtn.addEventListener('click', () => {
      formSuccess.classList.add('hidden');
      contactForm.classList.remove('hidden');
      contactForm.reset();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = false;
      submitBtn.innerHTML = `
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path></svg>
        <span>Send Message</span>
      `;
    });
  }

  // Keyboard shortcut Esc to close open modals
  window.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeProjectModal();
      closeResume();
    }
  });
});

