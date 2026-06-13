(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (prefersReducedMotion) {
    document.querySelectorAll('.animate-reveal').forEach(el => {
      el.style.opacity = '1';
      el.style.transform = 'none';
    });
    return;
  }

  // ═══════════════════════════════════════════
  // SCROLL PROGRESS BAR
  // ═══════════════════════════════════════════
  const progressBar = document.createElement('div');
  progressBar.style.cssText = 'position:fixed;top:0;left:0;height:3px;background:linear-gradient(90deg,#4D8BF5,#6C5CE7);z-index:10000;width:0;border-radius:0 2px 2px 0;pointer-events:none;';
  document.body.appendChild(progressBar);

  let ticking = false;
  window.addEventListener('scroll', () => {
    if (!ticking) {
      requestAnimationFrame(() => {
        const scroll = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
        progressBar.style.width = (scroll * 100) + '%';
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // ═══════════════════════════════════════════
  // GSAP LOADER
  // ═══════════════════════════════════════════
  function onReady(fn) {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
      gsap.registerPlugin(ScrollTrigger);
      fn();
    } else {
      setTimeout(() => onReady(fn), 100);
    }
  }

  onReady(() => {
    // ═══════════════════════════════════════════
    // HERO — Blueprint crosshair draw + text reveal
    // ═══════════════════════════════════════════
    const hero = document.querySelector('.hero');
    if (hero) {
      // Split title into chars
      const titleEl = hero.querySelector('.hero-title');
      if (titleEl && !titleEl.dataset.split) {
        const text = titleEl.textContent;
        titleEl.innerHTML = '';
        text.split('').forEach(ch => {
          const span = document.createElement('span');
          span.className = 'char';
          span.textContent = ch === ' ' ? '\u00a0' : ch;
          span.style.display = 'inline-block';
          titleEl.appendChild(span);
        });
        titleEl.dataset.split = '1';
      }

      // Hero scrub timeline
      const heroTl = gsap.timeline({
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: 1.2
        }
      });

      heroTl
        .from('.hero-crosshair', { scale: 0, rotation: -90, opacity: 0, duration: 0.3, ease: 'power2.out' })
        .from('.hero-badge', { opacity: 0, y: 15, duration: 0.1 }, 0)
        .from('.hero-title .char', {
          y: 40, opacity: 0,
          stagger: 0.015, duration: 0.25
        }, 0.05)
        .from('.hero-accent', { opacity: 0, y: 10, duration: 0.15 }, 0.25)
        .from('.hero-subtitle', { opacity: 0, y: 15, duration: 0.15 }, 0.35)
        .from('.hero-actions .btn', { x: -20, opacity: 0, stagger: 0.03, duration: 0.12 }, 0.4);
    }

    // ═══════════════════════════════════════════
    // INTERSECTION OBSERVER — Simple reveal
    // ═══════════════════════════════════════════
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.to(entry.target, {
            opacity: 1, y: 0, duration: 0.6, ease: 'power2.out'
          });
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.animate-reveal').forEach(el => {
      revealObserver.observe(el);
    });

    // ═══════════════════════════════════════════
    // SECTION LABELS — Slide in from left
    // ═══════════════════════════════════════════
    const labelObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.fromTo(entry.target,
            { opacity: 0, x: -20 },
            { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
          );
          labelObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.section-label').forEach(el => {
      labelObserver.observe(el);
    });

    // ═══════════════════════════════════════════
    // BENTO CARDS — Stagger reveal
    // ═══════════════════════════════════════════
    const cardObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          gsap.fromTo(entry.target,
            { opacity: 0, y: 30, scale: 0.96 },
            {
              opacity: 1, y: 0, scale: 1,
              duration: 0.5,
              delay: i * 0.06,
              ease: 'power2.out'
            }
          );
          cardObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.15 });

    document.querySelectorAll('.bento-card').forEach(el => {
      cardObserver.observe(el);
    });

    // ═══════════════════════════════════════════
    // SVG BLUEPRINT DRAW — Stroke animation
    // ═══════════════════════════════════════════
    const drawObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const paths = entry.target.querySelectorAll('path, circle, line, polyline, rect');
          paths.forEach(path => {
            try {
              const length = path.getTotalLength ? path.getTotalLength() : 200;
              path.style.strokeDasharray = length;
              path.style.strokeDashoffset = length;
              gsap.to(path, {
                strokeDashoffset: 0,
                duration: 1.5,
                ease: 'power1.inOut'
              });
            } catch(e) {}
          });
          drawObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.bp-draw').forEach(el => {
      drawObserver.observe(el);
    });

    // ═══════════════════════════════════════════
    // MATH/CODE DECORATIONS — Fade in
    // ═══════════════════════════════════════════
    const mathObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          gsap.fromTo(entry.target,
            { opacity: 0, x: -10 },
            { opacity: 1, x: 0, duration: 0.5, ease: 'power2.out' }
          );
          mathObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.bp-math, .bp-code, .bp-dim').forEach(el => {
      mathObserver.observe(el);
    });

    // ═══════════════════════════════════════════
    // FLIP CARDS — 3D flip on scroll
    // ═══════════════════════════════════════════
    const flipObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          gsap.fromTo(entry.target,
            { rotationX: 80, opacity: 0 },
            {
              rotationX: 0, opacity: 1,
              transformPerspective: 600,
              ease: 'back.out(1.4)',
              duration: 0.6,
              delay: i * 0.08
            }
          );
          flipObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.flip-card').forEach(el => {
      flipObserver.observe(el);
    });

    // ═══════════════════════════════════════════
    // TIMELINE — Line draw + items cascade
    // ═══════════════════════════════════════════
    const timelinePath = document.querySelector('.timeline-path');
    if (timelinePath) {
      try {
        const length = timelinePath.getTotalLength();
        timelinePath.style.strokeDasharray = length;
        timelinePath.style.strokeDashoffset = length;

        const timelineObserver = new IntersectionObserver((entries) => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              gsap.to(timelinePath, {
                strokeDashoffset: 0,
                duration: 2,
                ease: 'power1.inOut'
              });
              timelineObserver.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });
        timelineObserver.observe(document.querySelector('.timeline'));
      } catch(e) {}
    }

    // Timeline items
    const timelineItemObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          gsap.fromTo(entry.target,
            { opacity: 0, x: i % 2 === 0 ? -30 : 30 },
            {
              opacity: 1, x: 0,
              duration: 0.5,
              delay: i * 0.1,
              ease: 'power2.out'
            }
          );
          timelineItemObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.3 });

    document.querySelectorAll('.timeline-item').forEach(el => {
      timelineItemObserver.observe(el);
    });

    // ═══════════════════════════════════════════
    // SOCIAL CARDS — Bounce in
    // ═══════════════════════════════════════════
    const socialObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          gsap.fromTo(entry.target,
            { y: 40, opacity: 0, scale: 0.9 },
            {
              y: 0, opacity: 1, scale: 1,
              ease: 'back.out(1.7)',
              duration: 0.5,
              delay: i * 0.1
            }
          );
          socialObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.social-card').forEach(el => {
      socialObserver.observe(el);
    });

    // ═══════════════════════════════════════════
    // CAVEAT BOX — Fade in
    // ═══════════════════════════════════════════
    const infoBox = document.querySelector('.info-box');
    if (infoBox) {
      const boxObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            gsap.fromTo(entry.target,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' }
            );
            boxObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      boxObserver.observe(infoBox);
    }

    // ═══════════════════════════════════════════
    // GEOMETRIC DECORATIONS — Parallax on scroll
    // ═══════════════════════════════════════════
    gsap.utils.toArray('.bp-deco').forEach((el, i) => {
      gsap.to(el, {
        y: -30 * (i % 3 + 1),
        rotation: 60 * (i % 2 === 0 ? 1 : -1),
        ease: 'none',
        scrollTrigger: {
          trigger: el,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 2
        }
      });
    });

    // ═══════════════════════════════════════════
    // CARD HOVER — 3D tilt
    // ═══════════════════════════════════════════
    document.querySelectorAll('.bento-card, .social-card').forEach(card => {
      card.addEventListener('mousemove', e => {
        const rect = card.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width - 0.5;
        const y = (e.clientY - rect.top) / rect.height - 0.5;
        gsap.to(card, {
          rotationY: x * 10,
          rotationX: -y * 10,
          transformPerspective: 800,
          duration: 0.25,
          ease: 'power2.out'
        });
      });
      card.addEventListener('mouseleave', () => {
        gsap.to(card, {
          rotationY: 0, rotationX: 0,
          duration: 0.4,
          ease: 'power2.out'
        });
      });
    });

    // ═══════════════════════════════════════════
    // MAGNETIC BUTTONS
    // ═══════════════════════════════════════════
    document.querySelectorAll('.btn').forEach(btn => {
      btn.addEventListener('mousemove', e => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(btn, { x: x * 0.12, y: y * 0.12, duration: 0.2, ease: 'power2.out' });
      });
      btn.addEventListener('mouseleave', () => {
        gsap.to(btn, { x: 0, y: 0, duration: 0.35, ease: 'elastic.out(1, 0.5)' });
      });
    });

    // ═══════════════════════════════════════════
    // FILTER
    // ═══════════════════════════════════════════
    const filterBtns = document.querySelectorAll('.filter-btn');
    const bentoCards = document.querySelectorAll('.bento-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        bentoCards.forEach((card, i) => {
          const show = filter === 'all' || card.dataset.category === filter;
          gsap.to(card, {
            opacity: show ? 1 : 0.1,
            scale: show ? 1 : 0.95,
            duration: 0.35,
            delay: show ? i * 0.03 : 0,
            ease: 'power2.out'
          });
        });
      });
    });

    // ═══════════════════════════════════════════
    // PAGE HERO — Entrance
    // ═══════════════════════════════════════════
    const pageHero = document.querySelector('.page-hero');
    if (pageHero) {
      const phTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      phTl
        .from('.page-hero .section-label', { opacity: 0, y: 15, duration: 0.4 })
        .from('.page-hero .section-title', { opacity: 0, y: 30, duration: 0.6 }, '-=0.2')
        .from('.page-hero .section-desc', { opacity: 0, y: 15, duration: 0.5 }, '-=0.3');
    }

    // ═══════════════════════════════════════════
    // FOOTER — Slide up
    // ═══════════════════════════════════════════
    const footer = document.querySelector('.footer');
    if (footer) {
      const footerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            gsap.fromTo(entry.target,
              { opacity: 0, y: 20 },
              { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' }
            );
            footerObserver.unobserve(entry.target);
          }
        });
      }, { threshold: 0.2 });
      footerObserver.observe(footer);
    }
  });

  // ═══════════════════════════════════════════
  // NAV TOGGLE
  // ═══════════════════════════════════════════
  const menuButton = document.getElementById('menuButton');
  const nav = document.getElementById('mainNav');
  if (menuButton && nav) {
    menuButton.addEventListener('click', () => {
      nav.classList.toggle('open');
      const isOpen = nav.classList.contains('open');
      menuButton.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
    });
    document.addEventListener('click', e => {
      if (!nav.contains(e.target) && !menuButton.contains(e.target)) {
        nav.classList.remove('open');
      }
    });
  }
})();
