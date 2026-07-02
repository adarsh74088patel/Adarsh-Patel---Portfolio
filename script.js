const typedTextSpans = document.querySelectorAll(".typed-text");
const cursorSpans = document.querySelectorAll(".cursor");

const textArray = ["B.Tech AI/ML Student", "Frontend Developer", "Python Programmer", "Web Designer"];
const typingDelay = 100;
const erasingDelay = 50;
const newTextDelay = 2000; // Delay between current and next text
let textArrayIndex = 0;
let charIndex = 0;

function type() {
  if (charIndex < textArray[textArrayIndex].length) {
    cursorSpans.forEach(span => {
      if (!span.classList.contains("typing")) span.classList.add("typing");
    });
    typedTextSpans.forEach(span => {
      span.textContent += textArray[textArrayIndex].charAt(charIndex);
    });
    charIndex++;
    setTimeout(type, typingDelay);
  }
  else {
    cursorSpans.forEach(span => {
      span.classList.remove("typing");
    });
    setTimeout(erase, newTextDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    cursorSpans.forEach(span => {
      if (!span.classList.contains("typing")) span.classList.add("typing");
    });
    typedTextSpans.forEach(span => {
      span.textContent = textArray[textArrayIndex].substring(0, charIndex - 1);
    });
    charIndex--;
    setTimeout(erase, erasingDelay);
  }
  else {
    cursorSpans.forEach(span => {
      span.classList.remove("typing");
    });
    textArrayIndex++;
    if (textArrayIndex >= textArray.length) textArrayIndex = 0;
    setTimeout(type, typingDelay + 1100);
  }
}

document.addEventListener("DOMContentLoaded", function () { // On DOM Load initiate the effect
  if (textArray.length) setTimeout(type, newTextDelay + 250);

  // Tab Navigation Logic
  const tabLinks = document.querySelectorAll('.tab-link');
  const tabContents = document.querySelectorAll('.tab-content');

  tabLinks.forEach(link => {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('data-target');

      if (!targetId) return;

      // Remove active class from all links and tabs
      document.querySelectorAll('.nav-links .tab-link').forEach(nav => nav.classList.remove('active'));
      tabContents.forEach(content => content.classList.remove('active'));

      // Add active class to clicked link in nav
      const navLink = document.querySelector(`.nav-links .tab-link[data-target="${targetId}"]`);
      if (navLink) navLink.classList.add('active');

      // Add active class to target content
      const targetContent = document.getElementById(targetId);
      if (targetContent) {
        targetContent.classList.add('active');
      }

      // Scroll to top
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  });

  // Initialize Feather Icons
  if (typeof feather !== 'undefined') {
    feather.replace();
  }

  // Certificate Modal Logic
  const certBtns = document.querySelectorAll('.view-cert-btn');
  const certModal = document.getElementById('cert-modal');
  const certModalImg = document.getElementById('cert-modal-img');
  const certModalCloseBtn = document.querySelector('.cert-modal-close-btn');

  if (certBtns && certModal && certModalImg) {
    certBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const imgSrc = this.getAttribute('data-cert-img');
        if (imgSrc) {
          certModalImg.src = imgSrc;
          certModal.classList.add('active');
        }
      });
    });
  }

  if (certModalCloseBtn) {
    certModalCloseBtn.addEventListener('click', () => {
      certModal.classList.remove('active');
      setTimeout(() => { certModalImg.src = ''; }, 300);
    });
  }

  if (certModal) {
    certModal.addEventListener('click', (e) => {
      if (e.target === certModal) {
        certModal.classList.remove('active');
        setTimeout(() => { certModalImg.src = ''; }, 300);
      }
    });
  }

  // Contact Form Submission Logic
  const contactForm = document.getElementById('contact-form');
  const formSuccessMsg = document.getElementById('form-success-msg');
  const sendAnotherBtn = document.getElementById('send-another-btn');

  const scriptURL = 'https://script.google.com/macros/s/AKfycby3XilpbY5yyNtGIo35vWzuQmZYmR6EuD7bPAe6SZ5ius0ge9hqHNHDDxMCa5zKEEKRzA/exec'; // Replace with your URL
  const submitBtn = document.getElementById('submit-btn');

  if (contactForm && formSuccessMsg) {
    contactForm.addEventListener('submit', e => {
      e.preventDefault();

      if (submitBtn) submitBtn.innerHTML = 'Sending...';

      fetch(scriptURL, { method: 'POST', body: new FormData(contactForm), mode: 'no-cors' })
        .then(response => {
          // With no-cors, response is opaque, but we assume success if no network error
          contactForm.style.display = 'none';
          formSuccessMsg.style.display = 'block';
          if (submitBtn) submitBtn.innerHTML = 'Send Message <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';
        })
        .catch(error => {
          console.error('Error!', error.message);
          alert("Something went wrong. Please try again.");
          if (submitBtn) submitBtn.innerHTML = 'Send Message <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>';
        });
    });
  }

  if (sendAnotherBtn) {
    sendAnotherBtn.addEventListener('click', function () {
      // Reset form
      contactForm.reset();
      // Hide success message and show form
      formSuccessMsg.style.display = 'none';
      contactForm.style.display = 'block';
    });
  }
});
