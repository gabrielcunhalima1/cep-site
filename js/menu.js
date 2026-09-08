// Este arquivo cuida do menu de navegação: abrir/fechar no celular,
// sombra no cabeçalho quando a página rola, e destacar o link da seção atual.

// --- Abrir e fechar o menu no celular ---
const botaoMenu = document.getElementById('navToggle');
const menuNavegacao = document.getElementById('navMenu');

if (botaoMenu && menuNavegacao) {
  botaoMenu.addEventListener('click', () => {
    const menuEstaAberto = menuNavegacao.classList.toggle('is-open');
    botaoMenu.setAttribute('aria-expanded', String(menuEstaAberto));
  });

  // Ao clicar em qualquer link do menu, fecha o menu (importante no celular)
  menuNavegacao.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      menuNavegacao.classList.remove('is-open');
      botaoMenu.setAttribute('aria-expanded', 'false');
    });
  });
}

// --- Sombra no cabeçalho quando o usuário rola a página ---
const cabecalho = document.querySelector('.nav');

if (cabecalho) {
  const atualizarSombraCabecalho = () => {
    cabecalho.classList.toggle('is-scrolled', window.scrollY > 8);
  };
  atualizarSombraCabecalho();
  window.addEventListener('scroll', atualizarSombraCabecalho, { passive: true });
}

// --- Destacar no menu qual seção está sendo vista no momento ---
const linksDoMenu = document.querySelectorAll('[data-nav-link]');

// Para cada link do menu, encontra a seção correspondente (pelo href="#id")
const secoesAcompanhadas = Array.from(linksDoMenu)
  .map((link) => document.querySelector(link.getAttribute('href')))
  .filter(Boolean);

if (secoesAcompanhadas.length && 'IntersectionObserver' in window) {
  const observadorDeSecoes = new IntersectionObserver(
    (entradas) => {
      entradas.forEach((entrada) => {
        if (!entrada.isIntersecting) return;
        linksDoMenu.forEach((link) => {
          const ehLinkDaSecaoAtual = link.getAttribute('href') === `#${entrada.target.id}`;
          link.classList.toggle('is-active', ehLinkDaSecaoAtual);
        });
      });
    },
    { rootMargin: '-45% 0px -50% 0px' } // considera "seção atual" a que está perto do centro da tela
  );
  secoesAcompanhadas.forEach((secao) => observadorDeSecoes.observe(secao));
}
