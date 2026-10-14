/**
 * ENAMEL DENTAL STUDIO — HERO SECTION SCRIPT
 * Handles interactive micro-animations, modal logic, video controls, and counters
 */

document.addEventListener('DOMContentLoaded', () => {
  initVideoAutoplay();
  initCounterAnimation();
  initModalLogic();
  initMobileMenu();
  initHappyManInteractive();
  initServiceSelector();
  initKineticHeadlineInteractive();
});

/* --------------------------------------------------------------------------
   Background Video Autoplay
   -------------------------------------------------------------------------- */
function initVideoAutoplay() {
  const video = document.getElementById('heroVideo');
  if (!video) return;
  video.play().catch(() => {
    // Autoplay policy fallback
    console.log('Video autoplay prevented by browser policy.');
  });
}

/* --------------------------------------------------------------------------
   Counter Animation (98%)
   -------------------------------------------------------------------------- */
function initCounterAnimation() {
  const counterElement = document.querySelector('.counter');
  if (!counterElement) return;

  const target = parseInt(counterElement.getAttribute('data-target'), 10) || 98;
  const duration = 1600; // ms
  let startTimestamp = null;

  const step = (timestamp) => {
    if (!startTimestamp) startTimestamp = timestamp;
    const progress = Math.min((timestamp - startTimestamp) / duration, 1);
    // Ease-out cubic
    const easeOutProgress = 1 - Math.pow(1 - progress, 3);
    const current = Math.floor(easeOutProgress * target);
    counterElement.textContent = current;

    if (progress < 1) {
      window.requestAnimationFrame(step);
    } else {
      counterElement.textContent = target;
    }
  };

  // Trigger after entrance animation starts
  setTimeout(() => {
    window.requestAnimationFrame(step);
  }, 600);
}

/* --------------------------------------------------------------------------
   Booking Modal Logic
   -------------------------------------------------------------------------- */
function initModalLogic() {
  const modal = document.getElementById('bookingModal');
  const closeBtn = document.getElementById('modalCloseBtn');
  const openButtons = document.querySelectorAll('.open-modal-btn');
  const bookingForm = document.getElementById('bookingForm');
  const bookingSuccess = document.getElementById('bookingSuccess');
  const btnDone = document.getElementById('btnDone');
  const preferredDate = document.getElementById('preferredDate');

  if (!modal) return;

  // Set default minimum date to today
  if (preferredDate) {
    const today = new Date().toISOString().split('T')[0];
    preferredDate.min = today;
    preferredDate.value = today;
  }

  // Open modal
  openButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      modal.classList.add('is-active');
      document.body.style.overflow = 'hidden';
      // Reset form state
      if (bookingForm) bookingForm.style.display = 'flex';
      if (bookingSuccess) bookingSuccess.classList.remove('is-visible');
    });
  });

  // Close modal function
  const closeModal = () => {
    modal.classList.remove('is-active');
    document.body.style.overflow = '';
  };

  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  if (btnDone) {
    btnDone.addEventListener('click', closeModal);
  }

  // Close when clicking outside modal card
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });

  // Close with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('is-active')) {
      closeModal();
    }
  });
}

/* --------------------------------------------------------------------------
   Service Selection Chips
   -------------------------------------------------------------------------- */
function initServiceSelector() {
  const chips = document.querySelectorAll('.service-chip');
  chips.forEach((chip) => {
    chip.addEventListener('click', () => {
      chips.forEach((c) => c.classList.remove('active'));
      chip.classList.add('active');
    });
  });
}

/* --------------------------------------------------------------------------
   Form Submission Handler
   -------------------------------------------------------------------------- */
window.handleFormSubmit = function() {
  const bookingForm = document.getElementById('bookingForm');
  const bookingSuccess = document.getElementById('bookingSuccess');
  const submitBtn = document.getElementById('submitBtn');

  if (!bookingForm || !bookingSuccess) return;

  // Add subtle loading feedback
  if (submitBtn) {
    submitBtn.innerHTML = `<span>Reserving your chair...</span>`;
    submitBtn.style.opacity = '0.8';
  }

  setTimeout(() => {
    bookingForm.style.display = 'none';
    bookingSuccess.classList.add('is-visible');
    if (submitBtn) {
      submitBtn.innerHTML = `<span>Confirm Same-Week Appointment</span>`;
      submitBtn.style.opacity = '1';
    }
  }, 600);
};

/* --------------------------------------------------------------------------
   Mobile Navigation Drawer
   -------------------------------------------------------------------------- */
function initMobileMenu() {
  const menuBtn = document.getElementById('mobileMenuBtn');
  const drawer = document.getElementById('mobileDrawer');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .btn-contact-mobile');

  if (!menuBtn || !drawer) return;

  menuBtn.addEventListener('click', () => {
    const isOpen = drawer.classList.toggle('is-open');
    menuBtn.setAttribute('aria-expanded', isOpen);
  });

  mobileLinks.forEach((link) => {
    link.addEventListener('click', () => {
      drawer.classList.remove('is-open');
    });
  });
}

/* --------------------------------------------------------------------------
   Happy Man Character Interactive Effect (Playful Cursor Tracking)
   -------------------------------------------------------------------------- */
function initHappyManInteractive() {
  const happyMan = document.querySelector('.happy-man-wrapper');
  if (!happyMan) return;

  // Subtle 3D tilt tracking when mouse moves on desktop
  if (window.innerWidth > 992) {
    window.addEventListener('mousemove', (e) => {
      const { innerWidth, innerHeight } = window;
      const xOffset = (e.clientX - innerWidth / 2) / 60;
      const yOffset = (e.clientY - innerHeight / 2) / 60;

      happyMan.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    });
  }

  // Click to trigger celebration bounce
  happyMan.addEventListener('click', () => {
    happyMan.animate([
      { transform: 'scale(1) translateY(0)' },
      { transform: 'scale(1.15) translateY(-24px)' },
      { transform: 'scale(0.95) translateY(4px)' },
      { transform: 'scale(1) translateY(0)' }
    ], {
      duration: 650,
      easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
    });

    // Click animation
  });
}

/* --------------------------------------------------------------------------
   Kinetic Headline Masked Roll-Up Interactive Replay
   -------------------------------------------------------------------------- */
function initKineticHeadlineInteractive() {
  const heroTitle = document.querySelector('.hero-title');
  if (!heroTitle) return;

  // Clicking title smoothly replays the kinetic masked roll-up
  heroTitle.addEventListener('click', () => {
    const words = heroTitle.querySelectorAll('.kinetic-word');
    words.forEach((word) => {
      word.style.animation = 'none';
      void word.offsetWidth; // Trigger reflow
      word.style.animation = '';
    });
  });
}
