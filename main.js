
// --- Scroll suave con fade-out ---
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    document.body.classList.add('fade-out');

    setTimeout(() => {
      target.scrollIntoView({ behavior: 'smooth' });
      document.body.classList.remove('fade-out');
    }, 300);
  });
});

// --- Back to top dinámico ---
const backToTopBtn = document.createElement('button');
backToTopBtn.id = 'backToTop';
backToTopBtn.textContent = '↑';
document.body.appendChild(backToTopBtn);

backToTopBtn.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// --- Header hide/show y sombra al hacer scroll ---
let lastScrollTop = 0;
const header = document.querySelector('header.main-header');

window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

  // Mostrar/ocultar botón
  backToTopBtn.classList.toggle('show', scrollTop > 300);

  // Esconder header al bajar
  if (scrollTop > lastScrollTop && scrollTop > 100) {
    header.classList.add('hide-nav');
  } else {
    header.classList.remove('hide-nav');
  }

  // Sombra
  header.classList.toggle('scrolled', scrollTop > 10);

  lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// --- Año dinámico en footer ---
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// --- Intersection Observer para animaciones con delay + tooltips ---
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

// --- Aplicar delay progresivo a múltiples elementos ---
const animateWithDelay = (selector) => {
  const elements = document.querySelectorAll(selector);
  elements.forEach((el, index) => {
    el.style.transitionDelay = `${index * 30}ms`;
    observer.observe(el);
  });
};

animateWithDelay('.card');
animateWithDelay('ul li');
animateWithDelay('.section');
animateWithDelay('h2');

// --- ScrollSpy para resaltar enlaces activos ---
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (scrollY >= sectionTop) current = section.id;
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) {
      link.classList.add('active');
    }
  });
});


