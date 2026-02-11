const links = document.querySelectorAll('a[href^="#"]');

links.forEach((link) => {
  link.addEventListener('click', (event) => {
    const targetId = link.getAttribute('href');
    if (!targetId || targetId === '#') return;
    const target = document.querySelector(targetId);
    if (!target) return;
    event.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});

const header = document.querySelector('header.container');
if (header) {
  let lastScrollY = window.scrollY;
  let isHidden = false;

  const showHeader = () => {
    if (isHidden) {
      header.classList.remove('nav-hidden');
      isHidden = false;
    }
  };

  const hideHeader = () => {
    if (!isHidden) {
      header.classList.add('nav-hidden');
      isHidden = true;
    }
  };

  window.addEventListener('scroll', () => {
    const currentY = window.scrollY;
    const scrollingDown = currentY > lastScrollY + 6;
    const scrollingUp = currentY < lastScrollY - 6;

    if (currentY < 10 || scrollingUp) {
      showHeader();
    } else if (scrollingDown) {
      hideHeader();
    }

    lastScrollY = currentY;
  }, { passive: true });

  window.addEventListener('mousemove', (event) => {
    if (event.clientY <= 80) {
      showHeader();
    }
  });

  window.addEventListener('touchstart', (event) => {
    if (event.touches[0] && event.touches[0].clientY <= 80) {
      showHeader();
    }
  }, { passive: true });
}
