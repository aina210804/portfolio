/* =============================================
   PORTFOLIO — Raharimalala Hanitriniaina
   Interactive JavaScript
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {
  // =============================================
  // Theme Toggle
  // =============================================
  const themeToggle = document.getElementById('themeToggle');
  const html = document.documentElement;
  
  // Load saved theme
  const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
  html.setAttribute('data-theme', savedTheme);
  themeToggle.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

  themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('portfolio-theme', newTheme);
    themeToggle.textContent = newTheme === 'dark' ? '☀️' : '🌙';
  });

  // =============================================
  // Navbar Scroll Effect
  // =============================================
  const navbar = document.getElementById('navbar');
  let lastScroll = 0;

  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
  });

  // Active nav link
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    const scrollPos = window.scrollY + 150;
    
    sections.forEach(section => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');
      
      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);

  // =============================================
  // Mobile Menu
  // =============================================
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('navLinks');
  const navOverlay = document.getElementById('navOverlay');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    navLinksContainer.classList.toggle('open');
    navOverlay.classList.toggle('active');
    document.body.style.overflow = navLinksContainer.classList.contains('open') ? 'hidden' : '';
  }

  hamburger.addEventListener('click', toggleMenu);
  navOverlay.addEventListener('click', toggleMenu);

  // Close menu on link click
  navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      if (navLinksContainer.classList.contains('open')) {
        toggleMenu();
      }
    });
  });

  // =============================================
  // Typing Effect
  // =============================================
  const typedTextEl = document.getElementById('typedText');
  const phrases = [
    'Développeuse Full-Stack',
    'Designer UI/UX',
    'Créatrice de marques',
    'Étudiante en informatique'
  ];
  let phraseIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingSpeed = 80;

  function type() {
    const currentPhrase = phrases[phraseIndex];
    
    if (isDeleting) {
      typedTextEl.textContent = currentPhrase.substring(0, charIndex - 1);
      charIndex--;
      typingSpeed = 40;
    } else {
      typedTextEl.textContent = currentPhrase.substring(0, charIndex + 1);
      charIndex++;
      typingSpeed = 80;
    }

    if (!isDeleting && charIndex === currentPhrase.length) {
      isDeleting = true;
      typingSpeed = 2000; // Pause before deleting
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      phraseIndex = (phraseIndex + 1) % phrases.length;
      typingSpeed = 400; // Pause before next phrase
    }

    setTimeout(type, typingSpeed);
  }

  // Start typing after a short delay
  setTimeout(type, 1000);

  // =============================================
  // Scroll Reveal (Intersection Observer)
  // =============================================
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('revealed');
        revealObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  });

  revealElements.forEach(el => revealObserver.observe(el));

  // =============================================
  // Skill Bars & Language Bars Animation
  // =============================================
  const skillBars = document.querySelectorAll('.skill-bar-fill, .language-bar-fill');

  const barObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const width = entry.target.getAttribute('data-width');
        entry.target.style.width = width + '%';
        barObserver.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.5
  });

  skillBars.forEach(bar => barObserver.observe(bar));

  // =============================================
  // Particles Canvas
  // =============================================
  const canvas = document.getElementById('particles-canvas');
  const ctx = canvas.getContext('2d');
  let particles = [];
  let animationId;

  function resizeCanvas() {
    const hero = document.querySelector('.hero');
    canvas.width = hero.offsetWidth;
    canvas.height = hero.offsetHeight;
  }

  class Particle {
    constructor() {
      this.reset();
    }

    reset() {
      this.x = Math.random() * canvas.width;
      this.y = Math.random() * canvas.height;
      this.size = Math.random() * 2 + 0.5;
      this.speedX = (Math.random() - 0.5) * 0.5;
      this.speedY = (Math.random() - 0.5) * 0.5;
      this.opacity = Math.random() * 0.5 + 0.1;
    }

    update() {
      this.x += this.speedX;
      this.y += this.speedY;

      if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
      if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
    }

    draw() {
      const theme = html.getAttribute('data-theme');
      const color = theme === 'dark' ? `rgba(255, 107, 53, ${this.opacity})` : `rgba(37, 99, 235, ${this.opacity * 0.6})`;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fillStyle = color;
      ctx.fill();
    }
  }

  function initParticles() {
    particles = [];
    const count = Math.min(80, Math.floor((canvas.width * canvas.height) / 15000));
    for (let i = 0; i < count; i++) {
      particles.push(new Particle());
    }
  }

  function connectParticles() {
    const theme = html.getAttribute('data-theme');
    const maxDist = 120;
    
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < maxDist) {
          const opacity = (1 - dist / maxDist) * 0.15;
          const color = theme === 'dark' 
            ? `rgba(255, 107, 53, ${opacity})` 
            : `rgba(37, 99, 235, ${opacity})`;
          ctx.beginPath();
          ctx.strokeStyle = color;
          ctx.lineWidth = 0.5;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }
  }

  function animateParticles() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    particles.forEach(p => {
      p.update();
      p.draw();
    });
    
    connectParticles();
    animationId = requestAnimationFrame(animateParticles);
  }

  // Init particles
  resizeCanvas();
  initParticles();
  animateParticles();

  window.addEventListener('resize', () => {
    resizeCanvas();
    initParticles();
  });

  // =============================================
  // Contact Form (handled via EmailJS in index.html)
  // =============================================

  // =============================================
  // Smooth Scroll for anchor links
  // =============================================
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
});
