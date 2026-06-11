const nav = document.getElementById('mainNav');
const menuButton = document.getElementById('menuButton');
const filterButtons = document.querySelectorAll('.filter-button');
const projectCards = document.querySelectorAll('.project-card');

function toggleNav() {
  nav.classList.toggle('open');
  const isOpen = nav.classList.contains('open');
  menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
}

function setFilter(filter) {
  filterButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.filter === filter);
  });

  projectCards.forEach((card) => {
    if (filter === 'all' || card.classList.contains(filter)) {
      card.style.display = 'grid';
      requestAnimationFrame(() => card.classList.add('animate-reveal'));
    } else {
      card.style.display = 'none';
    }
  });
}

menuButton.addEventListener('click', toggleNav);
filterButtons.forEach((button) => {
  button.addEventListener('click', () => setFilter(button.dataset.filter));
});

window.addEventListener('click', (event) => {
  if (!nav.contains(event.target) && !menuButton.contains(event.target)) {
    nav.classList.remove('open');
  }
});

const revealElements = document.querySelectorAll('.animate-reveal');
const intersectionObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
      intersectionObserver.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.16,
});

revealElements.forEach((element) => intersectionObserver.observe(element));
