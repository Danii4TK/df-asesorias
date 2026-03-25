/* ================================================
   DF Asesorías - Daniel Flores Muñoz
   JavaScript Principal
   ================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---- Año actual en footer ---- */
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* =============================================
     NAVBAR: scroll y hamburger
     ============================================= */
  const navbar    = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navLinks  = document.getElementById('navLinks');
  const navItems  = document.querySelectorAll('.nav-link:not(.btn-nav-cta)');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveNav();
    toggleBackToTop();
  });

  hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('open');
    hamburger.classList.toggle('active');
    // Animación hamburger → X
    const spans = hamburger.querySelectorAll('span');
    if (navLinks.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translateY(10px)';
      spans[1].style.opacity   = '0';
      spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    }
  });

  // Cerrar menú al hacer click en un link
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      hamburger.classList.remove('active');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity   = '';
      spans[2].style.transform = '';
    });
  });

  /* =============================================
     ACTIVE NAV LINK según scroll
     ============================================= */
  const sections = document.querySelectorAll('section[id]');

  function updateActiveNav() {
    let currentSection = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        currentSection = section.getAttribute('id');
      }
    });
    navItems.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${currentSection}`) {
        link.classList.add('active');
      }
    });
  }

  /* =============================================
     COUNTER ANIMATION — Hero stats
     ============================================= */
  const counters    = document.querySelectorAll('.stat-number');
  let countersStarted = false;

  function animateCounters() {
    if (countersStarted) return;
    const heroSection = document.querySelector('.hero');
    if (!heroSection) return;

    const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
    if (window.scrollY + window.innerHeight > heroSection.offsetTop) {
      countersStarted = true;
      counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'), 10);
        if (isNaN(target)) { return; }
        const duration = 1800;
        const step = target / (duration / 16);
        let current = 0;

        const update = () => {
          current += step;
          if (current < target) {
            counter.textContent = Math.floor(current);
            requestAnimationFrame(update);
          } else {
            counter.textContent = target;
          }
        };
        setTimeout(update, 300);
      });
    }
  }

  // Trigger on page load (hero is visible)
  setTimeout(animateCounters, 600);
  window.addEventListener('scroll', animateCounters);

  /* =============================================
     SKILL BARS ANIMATION
     ============================================= */
  const skillFills = document.querySelectorAll('.skill-fill');
  let skillsAnimated = false;

  function animateSkills(entries, observer) {
    entries.forEach(entry => {
      if (entry.isIntersecting && !skillsAnimated) {
        skillsAnimated = true;
        skillFills.forEach(fill => {
          const width = fill.getAttribute('data-width');
          setTimeout(() => {
            fill.style.width = width + '%';
          }, 200);
        });
        observer.disconnect();
      }
    });
  }

  const skillsObserver = new IntersectionObserver(animateSkills, { threshold: 0.3 });
  const skillsBox = document.querySelector('.skills-box');
  if (skillsBox) skillsObserver.observe(skillsBox);

  /* =============================================
     REVEAL ON SCROLL — Elementos genéricos
     ============================================= */
  const revealElements = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || i * 80;
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, parseInt(delay));
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  revealElements.forEach(el => revealObserver.observe(el));

  /* =============================================
     TIMELINE REVEAL
     ============================================= */
  const timelineItems = document.querySelectorAll('.timeline-item');

  const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, i * 150);
        timelineObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.2 });

  timelineItems.forEach(item => timelineObserver.observe(item));

  /* =============================================
     SERVICE CARDS — stagger animation
     ============================================= */
  const serviceCards = document.querySelectorAll('.service-card');

  const serviceObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const delay = entry.target.getAttribute('data-delay') || 0;
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, parseInt(delay));
        serviceObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });

  serviceCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
    serviceObserver.observe(card);
  });

  /* =============================================
     BACK TO TOP BUTTON
     ============================================= */
  const backToTop = document.getElementById('backToTop');

  function toggleBackToTop() {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* =============================================
     SCROLL HINT click
     ============================================= */
  const scrollHint = document.querySelector('.hero-scroll-hint');
  if (scrollHint) {
    scrollHint.addEventListener('click', () => {
      document.getElementById('servicios').scrollIntoView({ behavior: 'smooth' });
    });
  }

  /* =============================================
     CONTACT FORM — Envío real vía Formspree
     ============================================= */
  const form        = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const formError   = document.getElementById('formError');
  const btnEnviar   = document.getElementById('btnEnviar');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const nombre  = document.getElementById('nombre').value.trim();
      const email   = document.getElementById('email').value.trim();
      const mensaje = document.getElementById('mensaje').value.trim();

      // Ocultar mensajes previos
      formSuccess.classList.remove('show');
      formError.classList.remove('show');

      // Validación básica
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!nombre || !email || !mensaje || !emailRegex.test(email)) {
        shakeForm(form);
        formError.classList.add('show');
        setTimeout(() => formError.classList.remove('show'), 4000);
        return;
      }

      // Estado de carga
      btnEnviar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
      btnEnviar.disabled = true;

      try {
        const response = await fetch('https://formspree.io/f/mykbyybd', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
          body: JSON.stringify({
            nombre,
            email,
            rut: document.getElementById('rut')?.value || '',
            mensaje
          })
        });

        btnEnviar.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensaje';
        btnEnviar.disabled = false;

        if (response.ok) {
          formSuccess.classList.add('show');
          form.reset();
          setTimeout(() => formSuccess.classList.remove('show'), 7000);
        } else {
          throw new Error('Error respuesta');
        }
      } catch (err) {
        btnEnviar.innerHTML = '<i class="fas fa-paper-plane"></i> Enviar Mensaje';
        btnEnviar.disabled = false;
        formError.classList.add('show');
        setTimeout(() => formError.classList.remove('show'), 4000);
      }
    });
  }

  function shakeForm(el) {
    el.style.animation = 'shake 0.4s ease';
    setTimeout(() => { el.style.animation = ''; }, 500);
  }

  /* =============================================
     SMOOTH SCROLL para todos los anchors internos
     ============================================= */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* =============================================
     NAVBAR active link style
     ============================================= */
  const style = document.createElement('style');
  style.textContent = `
    .nav-link.active {
      color: var(--gold) !important;
    }
    .navbar.scrolled .nav-link.active {
      color: var(--blue-main) !important;
    }

    @keyframes shake {
      0%,100% { transform: translateX(0); }
      20%,60%  { transform: translateX(-6px); }
      40%,80%  { transform: translateX(6px); }
    }
  `;
  document.head.appendChild(style);

});
