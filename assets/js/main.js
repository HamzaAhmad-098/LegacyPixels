document.addEventListener('DOMContentLoaded', function () {

  // Header scroll state
  var header = document.querySelector('.site-header');
  var toTop = document.querySelector('.to-top');
  function onScroll() {
    if (window.scrollY > 60) { header.classList.add('scrolled'); } else { header.classList.remove('scrolled'); }
    if (toTop) { if (window.scrollY > 500) toTop.classList.add('show'); else toTop.classList.remove('show'); }
  }
  window.addEventListener('scroll', onScroll);
  onScroll();

  // Mobile menu toggle
  var toggle = document.querySelector('.menu-toggle');
  var nav = document.querySelector('.nav-menu');
  if (toggle && nav) {
    toggle.addEventListener('click', function () { nav.classList.toggle('open'); });
    nav.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () { nav.classList.remove('open'); });
    });
  }

  // Back to top
  if (toTop) {
    toTop.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
  }

  // Reveal on scroll
  var revealEls = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && revealEls.length) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) { entry.target.classList.add('in'); io.unobserve(entry.target); }
      });
    }, { threshold: 0.15 });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('in'); });
  }

  // FAQ accordion
  document.querySelectorAll('.faq-item').forEach(function (item) {
    item.addEventListener('click', function () {
      var wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(function (i) { i.classList.remove('open'); });
      if (!wasOpen) item.classList.add('open');
    });
  });

  // Contact form (client-side only — wire to a backend/Formspree endpoint to actually send)
  var contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = contactForm.querySelector('.form-msg');
      var name = contactForm.querySelector('#name').value.trim();
      var email = contactForm.querySelector('#email').value.trim();
      var message = contactForm.querySelector('#message').value.trim();
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!name || !emailOk || !message) {
        msg.textContent = 'Please fill in your name, a valid email, and a message.';
        msg.className = 'form-msg show err';
        return;
      }
      msg.textContent = 'Thanks — your message has been prepared. Please connect a form backend (e.g. Formspree) to deliver it, or WhatsApp us directly.';
      msg.className = 'form-msg show ok';
      contactForm.reset();
    });
  }

  // Booking form
  var bookingForm = document.getElementById('booking-form');
  if (bookingForm) {
    bookingForm.addEventListener('submit', function (e) {
      e.preventDefault();
      var msg = bookingForm.querySelector('.form-msg');
      var name = bookingForm.querySelector('#b-name').value.trim();
      var email = bookingForm.querySelector('#b-email').value.trim();
      var phone = bookingForm.querySelector('#b-phone').value.trim();
      var emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

      if (!name || !emailOk || !phone) {
        msg.textContent = 'Please fill in your name, a valid email, and phone/WhatsApp number.';
        msg.className = 'form-msg show err';
        return;
      }
      msg.textContent = 'Booking request captured. Connect a form backend to submit it live, or tap "Chat on WhatsApp" above for an instant reply.';
      msg.className = 'form-msg show ok';
      bookingForm.reset();
    });
  }

  // Package select buttons -> scroll to booking form and prefill
  document.querySelectorAll('.pkg-select').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var pkgName = btn.getAttribute('data-pkg');
      var select = document.getElementById('b-package');
      if (select) select.value = pkgName;
      var target = document.getElementById('booking-form');
      if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

});
