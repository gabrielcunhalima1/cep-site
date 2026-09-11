// Este arquivo abre as fotos do portfólio em tamanho grande, centralizadas
// na tela (o famoso "lightbox"), sem sair da página nem abrir aba nova.
// Usamos delegação de evento (um único listener no documento, em vez de um
// em cada foto) porque as fotos do carrossel são criadas depois pelo
// js/portfolio.js — assim funciona não importa a ordem de carregamento.

const lightbox = document.getElementById('lightbox');
const lightboxImagem = document.getElementById('lightboxImagem');
const lightboxLegenda = document.getElementById('lightboxLegenda');
const botaoFecharLightbox = document.getElementById('botaoFecharLightbox');

if (lightbox && lightboxImagem && lightboxLegenda && botaoFecharLightbox) {
  document.addEventListener('click', (evento) => {
    const fotoClicada = evento.target.closest('.carrossel__item img');
    if (!fotoClicada) return;

    lightboxImagem.src = fotoClicada.src;
    lightboxImagem.alt = fotoClicada.alt;
    lightboxLegenda.textContent = fotoClicada.alt;
    lightbox.hidden = false;
    document.body.classList.add('lightbox-aberto');
  });

  function fecharLightbox() {
    lightbox.hidden = true;
    lightboxImagem.src = ''; // libera a imagem da memória enquanto o lightbox está fechado
    document.body.classList.remove('lightbox-aberto');
  }

  botaoFecharLightbox.addEventListener('click', fecharLightbox);

  // Clicar no fundo escuro (fora da foto) também fecha
  lightbox.addEventListener('click', (evento) => {
    if (evento.target === lightbox) fecharLightbox();
  });

  // Tecla Esc também fecha
  document.addEventListener('keydown', (evento) => {
    if (evento.key === 'Escape' && !lightbox.hidden) fecharLightbox();
  });
}
