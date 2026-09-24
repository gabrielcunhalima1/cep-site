// Este arquivo carrega o Google Analytics 4, mas SÓ quando o visitante aceita os cookies.
// Quem clica em "Só essenciais" nunca chega a carregar o script do Google (LGPD).
// Quem chama carregarAnalytics() é o js/cookies.js, por isso este script vem antes dele no HTML.

const ID_MEDICAO_GOOGLE_ANALYTICS = 'G-8ZBYNBLR2N';

let analyticsJaCarregado = false;

function carregarAnalytics() {
  if (analyticsJaCarregado) return;
  analyticsJaCarregado = true;

  window.dataLayer = window.dataLayer || [];
  window.gtag = function () { window.dataLayer.push(arguments); };
  window.gtag('js', new Date());
  window.gtag('config', ID_MEDICAO_GOOGLE_ANALYTICS);

  const script = document.createElement('script');
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${ID_MEDICAO_GOOGLE_ANALYTICS}`;
  document.head.appendChild(script);
}

// Registra um evento no Analytics. Sem consentimento o gtag não existe, então não faz nada.
function rastrearEvento(nome, parametros) {
  if (typeof window.gtag === 'function') {
    window.gtag('event', nome, parametros || {});
  }
}

// Diz em qual parte do site está um botão, para o relatório mostrar de onde vêm os cliques
function localDoBotao(elemento) {
  if (elemento.closest('.whatsapp-float')) return 'botao_flutuante';
  if (elemento.closest('.aviso-cookies')) return 'aviso_cookies';
  if (elemento.closest('header')) return 'menu';
  if (elemento.closest('footer')) return 'rodape';
  const secao = elemento.closest('section[id]');
  return secao ? secao.id : 'outro';
}

// Um único "ouvinte" no documento cobre todos os botões de WhatsApp, inclusive os futuros
document.addEventListener('click', (evento) => {
  const link = evento.target.closest('.js-whatsapp-link');
  if (link) rastrearEvento('clique_whatsapp', { local: localDoBotao(link) });
});
