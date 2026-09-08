// Este arquivo monta o carrossel de fotos do portfólio: pega a lista de fotos,
// embaralha a ordem (pra não mostrar sempre as mesmas primeiro) e liga as setas.

// Lista de fotos do portfólio. Para adicionar uma foto nova, é só acrescentar
// um item aqui — o carrossel se ajusta sozinho, não precisa mexer no HTML.
// TODO Pedro: ir trocando estas fotos de placeholder pelas fotos reais das obras
// (pode chegar a até 10 fotos aqui, o carrossel aceita qualquer quantidade)
const FOTOS_PORTFOLIO = [
  {
    src: 'img/portfolio/caso-1-antes.webp',
    legenda: 'Laboratório antes da obra — só as paredes externas e o teto existiam.',
  },
  {
    src: 'img/portfolio/caso-1-depois.webp',
    legenda: 'Mesmo laboratório depois: estrutura interna construída do zero, pronto pra operar.',
  },
  {
    src: 'img/portfolio/caso-2-antes.webp',
    legenda: 'Apartamento antes da reforma.',
  },
  {
    src: 'img/portfolio/caso-2-depois.webp',
    legenda: 'Apartamento reformado — novo layout, mais luz, mais funcionalidade.',
  },
  {
    src: 'img/portfolio/caso-3-antes.webp',
    legenda: 'Loja comercial antes da obra.',
  },
  {
    src: 'img/portfolio/caso-3-depois.webp',
    legenda: 'Loja comercial entregue no prazo, pronta para receber os primeiros clientes.',
  },
];

// Embaralha uma lista sem alterar a original (algoritmo de Fisher-Yates)
function embaralhar(lista) {
  const copia = [...lista];
  for (let i = copia.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copia[i], copia[j]] = [copia[j], copia[i]];
  }
  return copia;
}

const trilho = document.getElementById('trilhoPortfolio');

if (trilho) {
  // Cada visita mostra as fotos em uma ordem diferente
  const fotosEmOrdemAleatoria = embaralhar(FOTOS_PORTFOLIO);

  fotosEmOrdemAleatoria.forEach((foto) => {
    const item = document.createElement('figure');
    item.className = 'carrossel__item reveal'; // "reveal" é a animação de entrada ao rolar (interacoes.js)
    item.innerHTML = `
      <img src="${foto.src}" alt="${foto.legenda}" loading="lazy" decoding="async" width="480" height="320">
      <figcaption>${foto.legenda}</figcaption>
    `;
    trilho.appendChild(item);
  });

  const setaEsquerda = document.getElementById('setaEsquerda');
  const setaDireita = document.getElementById('setaDireita');

  // Quanto o carrossel deve andar a cada clique: a largura de um item + o espaço entre eles
  function distanciaDeUmItem() {
    const primeiroItem = trilho.querySelector('.carrossel__item');
    if (!primeiroItem) return 0;
    const espacoEntreItens = parseFloat(getComputedStyle(trilho).columnGap) || 0;
    return primeiroItem.getBoundingClientRect().width + espacoEntreItens;
  }

  setaEsquerda.addEventListener('click', () => {
    trilho.scrollBy({ left: -distanciaDeUmItem(), behavior: 'smooth' });
  });

  setaDireita.addEventListener('click', () => {
    trilho.scrollBy({ left: distanciaDeUmItem(), behavior: 'smooth' });
  });

  // Apaga a seta quando não há mais pra onde rolar naquela direção
  function atualizarEstadoDasSetas() {
    const chegouNoInicio = trilho.scrollLeft <= 2;
    const chegouNoFim = trilho.scrollLeft >= trilho.scrollWidth - trilho.clientWidth - 2;
    setaEsquerda.classList.toggle('is-desabilitada', chegouNoInicio);
    setaDireita.classList.toggle('is-desabilitada', chegouNoFim);
  }

  trilho.addEventListener('scroll', atualizarEstadoDasSetas, { passive: true });
  window.addEventListener('resize', atualizarEstadoDasSetas);
  atualizarEstadoDasSetas();
}
