// NAV SCROLL
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 50);
});

// MOBILE MENU
const menuToggle = document.getElementById('menuToggle');
const navLinks = document.getElementById('navLinks');
menuToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => navLinks.classList.remove('open'));
});

// SCROLL REVEAL
const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
reveals.forEach(el => observer.observe(el));

// COUNTER ANIMATION
function animateCounter(el, target, suffix = '') {
  let start = 0;
  const duration = 2000;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { start = target; clearInterval(timer); }
    el.textContent = Math.floor(start) + suffix;
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const nums = entry.target.querySelectorAll('.stat-number');
      nums.forEach(num => {
        const text = num.textContent;
        if (text.includes('%')) animateCounter(num, parseInt(text), '%');
        else if (text.includes('x')) animateCounter(num, parseInt(text), 'x');
        else if (text.includes('+')) animateCounter(num, parseInt(text), '+');
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsSection = document.querySelector('.hero-stats');
if (statsSection) statsObserver.observe(statsSection);

// SCROLL TO TOP BUTTON
const scrollTopBtn = document.getElementById('scrollTop');
window.addEventListener('scroll', () => {
  scrollTopBtn.classList.toggle('visible', window.scrollY > 400);
});
scrollTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// SERVICE MODAL LOGIC
const serviceData = {
  landing: {
    icon: '🚀',
    title: 'Landing Page Website',
    desc: 'Ideal for startups launching a new product, or businesses promoting a specific event. A highly focused, fast-loading single page designed exclusively to convert visitors into paying customers or solid leads.',
    price: 'From ₹2,999',
    features: [
      '1 High-converting page',
      'Mobile-first responsive design',
      'Strategic CTA placements',
      'Functional contact form',
      'Basic SEO setup',
      'Fast loading speed optimization',
      '5-Day delivery'
    ]
  },
  business: {
    icon: '🌐',
    title: 'Business Website',
    desc: 'The perfect digital storefront for local shops, creative agencies, and growing businesses. Establish deep trust and brand authority with a fully custom, multi-page experience that guides users straight to your contact page.',
    price: 'From ₹8,999',
    features: [
      '3 to 5 Custom-designed pages',
      'Premium responsive UI/UX',
      'Smooth scroll & hover animations',
      'Essential on-page SEO',
      'Google Maps & WhatsApp integration',
      '30 Days free post-launch support'
    ]
  },
  webapp: {
    icon: '⚡',
    title: 'Custom Web Application',
    desc: 'Tailor-made solutions for businesses with complex operational needs. Whether you need an internal staff dashboard, a custom booking system, or a full SaaS platform, we build robust, scalable architectures from the ground up.',
    price: 'From ₹39,999',
    features: [
      'Secure user authentication & login',
      'Custom Admin Dashboard',
      'Seamless API integrations',
      'Scalable MongoDB Database',
      'Payment gateway setup (Razorpay/Stripe)',
      '60 Days free technical support'
    ]
  },
  uiux: {
    icon: '🎨',
    title: 'UI/UX Design',
    desc: 'Premium Figma-first web design. Every layout, color, and font is strategically chosen to maximize conversion rates.',
    price: 'From ₹4,999',
    features: [
      'In-depth competitor & market research',
      'Wireframing & interactive prototyping',
      'High-fidelity UI design in Figma',
      'Comprehensive Design System (Colors/Fonts)',
      'Conversion Rate Optimization (CRO) focus',
      'Developer-ready organized handoff'
    ]
  },
  seo: {
    icon: '🔍',
    title: 'SEO Optimization',
    desc: 'Crucial for any business struggling to get organic traffic. We conduct deep technical audits, aggressive page-speed optimizations, and precise keyword targeting so you dominate Google search results and beat your competitors.',
    price: 'From ₹3,999',
    features: [
      'Comprehensive keyword research',
      'Complete on-page SEO optimization',
      'Aggressive page speed improvements',
      'Meta tags & schema markup setup',
      'Google Search Console integration'
    ]
  },
  revamp: {
    icon: '🛠️',
    title: 'Website Redesign',
    desc: 'Is your current website losing you money? We tear down outdated, clunky interfaces and rebuild them using modern, lightning-fast technologies. Expect dramatic improvements in mobile responsiveness and conversion rates.',
    price: 'From ₹7,999',
    features: [
      'Complete modern UI/UX overhaul',
      'Seamless responsive mobile upgrade',
      'Fix broken layouts & old code',
      'Improved conversion pathways',
      'Zero-downtime migration'
    ]
  }
};

const serviceCards = document.querySelectorAll('.service-card');
const modalOverlay = document.getElementById('serviceModal');
const modalCloseBtn = document.getElementById('serviceModalClose');

const modalIcon = document.getElementById('modalIcon');
const modalTitle = document.getElementById('modalTitle');
const modalDesc = document.getElementById('modalDescription');
const modalFeatures = document.getElementById('modalFeatures');
const modalPrice = document.getElementById('modalPrice');

function openModal(serviceKey) {
  const data = serviceData[serviceKey];
  if (!data) return;

  modalIcon.textContent = data.icon;
  modalTitle.textContent = data.title;
  modalDesc.textContent = data.desc;
  modalPrice.textContent = data.price;
  
  modalFeatures.innerHTML = '';
  data.features.forEach(feature => {
    const li = document.createElement('li');
    li.textContent = feature;
    modalFeatures.appendChild(li);
  });

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  modalOverlay.classList.remove('active');
  document.body.style.overflow = '';
}

serviceCards.forEach(card => {
  card.addEventListener('click', () => {
    const serviceKey = card.getAttribute('data-service');
    openModal(serviceKey);
  });
});

if (modalCloseBtn && modalOverlay) {
  modalCloseBtn.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', (e) => {
    if (e.target === modalOverlay) closeModal();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modalOverlay.classList.contains('active')) closeModal();
  });
}

// CONTACT FORM — WEB3FORMS SUBMISSION
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', async function(e) {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = 'Sending...';
    submitBtn.disabled = true;

    const formData = new FormData(contactForm);

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: formData
      });
      const result = await response.json();

      if (result.success) {
        showToast('✅ Message sent! We will get back to you soon.', 'success');
        contactForm.reset();
      } else {
        showToast('❌ Something went wrong. Please try again.', 'error');
      }
    } catch (err) {
      showToast('❌ Network error. Please try again.', 'error');
    } finally {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }
  });
}

// TOAST NOTIFICATION
function showToast(message, type) {
  const existing = document.querySelector('.toast-notification');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = 'toast-notification toast-' + type;
  toast.textContent = message;
  document.body.appendChild(toast);

  requestAnimationFrame(() => toast.classList.add('toast-visible'));
  setTimeout(() => {
    toast.classList.remove('toast-visible');
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}
