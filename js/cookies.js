// Este arquivo controla o aviso de cookies (exigência da LGPD).
// A escolha do visitante fica salva no navegador (localStorage), então o aviso
// só aparece de novo se ele limpar os dados do navegador ou usar outro dispositivo.
// Guardamos qual foi a escolha (não só "true"/"false"), porque no futuro,
// quando entrarem Google Analytics e Meta Pixel, esse valor decide se esses
// scripts podem carregar ou não.

const CHAVE_PREFERENCIA_COOKIES = 'cepPreferenciaCookies';

const avisoCookies = document.getElementById('avisoCookies');
const botaoAceitarCookies = document.getElementById('botaoAceitarCookies');
const botaoRejeitarCookies = document.getElementById('botaoRejeitarCookies');
const botaoSaibaMaisCookies = document.getElementById('botaoSaibaMaisCookies');
const detalhesCookies = document.getElementById('detalhesCookies');

if (avisoCookies && botaoAceitarCookies && botaoRejeitarCookies) {
  const preferenciaJaEscolhida = localStorage.getItem(CHAVE_PREFERENCIA_COOKIES);

  if (!preferenciaJaEscolhida) {
    avisoCookies.hidden = false;
    // Classe no <body> empurra o botão flutuante do WhatsApp para cima,
    // para o aviso não ficar em cima dele
    document.body.classList.add('tem-aviso-cookies');
  }

  function escolherPreferencia(preferencia) {
    localStorage.setItem(CHAVE_PREFERENCIA_COOKIES, preferencia);
    avisoCookies.hidden = true;
    document.body.classList.remove('tem-aviso-cookies');
  }

  botaoAceitarCookies.addEventListener('click', () => escolherPreferencia('aceitos'));
  botaoRejeitarCookies.addEventListener('click', () => escolherPreferencia('essenciais'));

  // Botão "Saiba mais" só abre/fecha o painel com os detalhes — não decide nada sozinho
  if (botaoSaibaMaisCookies && detalhesCookies) {
    botaoSaibaMaisCookies.addEventListener('click', () => {
      const detalhesEstaoAbertos = !detalhesCookies.hidden;
      detalhesCookies.hidden = detalhesEstaoAbertos;
      botaoSaibaMaisCookies.setAttribute('aria-expanded', String(!detalhesEstaoAbertos));
      botaoSaibaMaisCookies.textContent = detalhesEstaoAbertos ? 'Saiba mais' : 'Ver menos';
    });
  }
}
