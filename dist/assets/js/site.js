(function () {
  var root = document.documentElement;
  root.classList.remove('no-js');

  var top = document.querySelector('.top');
  var btn = document.querySelector('.menu-btn');
  if (top && btn) {
    btn.addEventListener('click', function () {
      var open = top.classList.toggle('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      btn.textContent = open ? 'Cerrar' : 'Menú';
    });
    top.querySelectorAll('.nav a').forEach(function (a) {
      a.addEventListener('click', function () {
        top.classList.remove('open');
        btn.setAttribute('aria-expanded', 'false');
        btn.textContent = 'Menú';
      });
    });
  }

  var y = document.querySelectorAll('[data-year]');
  y.forEach(function (el) { el.textContent = new Date().getFullYear(); });

  var items = document.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  items.forEach(function (el) { io.observe(el); });
})();
