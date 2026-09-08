// Este arquivo anima a abertura/fechamento das perguntas do FAQ pela altura,
// em vez do <details> nativo abrir/fechar de forma seca (instantânea).
// Continua sendo um <details>/<summary> por baixo — funciona normalmente
// mesmo se, por algum motivo, o JavaScript não carregar.

const faqPrefereMenosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const DURACAO_ABRIR = faqPrefereMenosMovimento ? 0 : 250;
const DURACAO_FECHAR = faqPrefereMenosMovimento ? 0 : 200;

document.querySelectorAll('.faq__item').forEach((item) => {
  const resumo = item.querySelector('summary');
  const conteudo = item.querySelector('p');
  let animacaoAtual = null;

  resumo.addEventListener('click', (evento) => {
    // Assumimos o controle manual da abertura/fechamento, pra poder animar a altura
    evento.preventDefault();

    if (animacaoAtual) animacaoAtual.cancel();

    if (item.classList.contains('is-aberto')) {
      fechar();
    } else {
      abrir();
    }
  });

  function abrir() {
    item.open = true; // precisa estar aberto pra o conteúdo existir e dar pra medir a altura
    item.classList.add('is-aberto');

    const alturaFinal = conteudo.getBoundingClientRect().height;
    animacaoAtual = conteudo.animate(
      [{ height: '0px', opacity: 0 }, { height: `${alturaFinal}px`, opacity: 1 }],
      { duration: DURACAO_ABRIR, easing: 'ease-out' }
    );
    animacaoAtual.onfinish = () => { animacaoAtual = null; };
  }

  function fechar() {
    item.classList.remove('is-aberto');

    const alturaAtual = conteudo.getBoundingClientRect().height;
    animacaoAtual = conteudo.animate(
      [{ height: `${alturaAtual}px`, opacity: 1 }, { height: '0px', opacity: 0 }],
      { duration: DURACAO_FECHAR, easing: 'ease-in' }
    );
    animacaoAtual.onfinish = () => {
      item.open = false; // só fecha de verdade quando a animação termina
      animacaoAtual = null;
    };
  }
});
