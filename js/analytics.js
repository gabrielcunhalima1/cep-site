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
