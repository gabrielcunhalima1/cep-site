// Este arquivo controla o aviso de cookies (exigência da LGPD).
// A escolha do visitante fica salva no navegador (localStorage), então o aviso
// só aparece de novo se ele limpar os dados do navegador ou usar outro dispositivo.

const CHAVE_COOKIES_ACEITOS = 'cepCookiesAceitos';

const avisoCookies = document.getElementById('avisoCookies');
const botaoAceitarCookies = document.getElementById('botaoAceitarCookies');

if (avisoCookies && botaoAceitarCookies) {
  const cookiesJaForamAceitos = localStorage.getItem(CHAVE_COOKIES_ACEITOS) === 'true';

  if (!cookiesJaForamAceitos) {
    avisoCookies.hidden = false;
    // Classe no <body> empurra o botão flutuante do WhatsApp para cima,
    // para o aviso não ficar em cima dele
    document.body.classList.add('tem-aviso-cookies');
  }

  botaoAceitarCookies.addEventListener('click', () => {
    localStorage.setItem(CHAVE_COOKIES_ACEITOS, 'true');
    avisoCookies.hidden = true;
    document.body.classList.remove('tem-aviso-cookies');
  });
}
