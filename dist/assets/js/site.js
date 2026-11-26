/* © 2026 Securis. Todos los derechos reservados. Código visible solo para consulta; sin licencia de copia, modificación ni reutilización. */
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

  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = new Date().getFullYear();
  });

  /* Foco de luz que sigue al cursor dentro de cada tarjeta. */
  if (window.matchMedia('(hover: hover) and (prefers-reduced-motion: no-preference)').matches) {
    document.querySelectorAll('.card').forEach(function (c) {
      c.addEventListener('pointermove', function (e) {
        var r = c.getBoundingClientRect();
        c.style.setProperty('--mx', (e.clientX - r.left) + 'px');
        c.style.setProperty('--my', (e.clientY - r.top) + 'px');
      });
    });
  }

  /* Contacto: el correo se arma solo al hacer clic, para que no quede
     escrito en el HTML ni lo recojan los robots que buscan direcciones. */
  document.querySelectorAll('[data-contacto]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      e.preventDefault();
      var u = ['l', 'a', 'i', 'c', 'r', 'e', 'm', 'o', 'c'].reverse().join('');
      var d = ['co', 'com', 'securis'].reverse().join('.');
      var asunto = encodeURIComponent('Contacto desde securis.com.co');
      window.location.href = 'mai' + 'lto:' + u + String.fromCharCode(64) + d + '?subject=' + asunto;
    });
  });

  /* Revelado al entrar en pantalla.
     Los navegadores con scroll-driven animations lo resuelven solo con CSS;
     el resto usa IntersectionObserver, y solo si el usuario admite movimiento. */
  var nativo = window.CSS && CSS.supports &&
    CSS.supports('(animation-timeline: view()) and (animation-range: entry)');
  var movimiento = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
  if (nativo || !movimiento || !('IntersectionObserver' in window)) return;

  root.classList.add('rv-io');
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
  document.querySelectorAll('.rv').forEach(function (el) { io.observe(el); });
})();
