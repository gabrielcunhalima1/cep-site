// Este arquivo monta o carrossel de fotos do portfólio: pega a lista de fotos,
// embaralha a ordem (pra não mostrar sempre as mesmas primeiro) e liga as setas.

// Lista de fotos do portfólio. Para adicionar uma foto nova, é só acrescentar
// um item aqui — o carrossel se ajusta sozinho, não precisa mexer no HTML.
// TODO Pedro: ainda falta 1 foto (a área gourmet vista do lado do balcão/
// churrasqueira) — só chegou colada no chat, sem virar arquivo de verdade.
const FOTOS_PORTFOLIO = [
  {
    src: 'img/portfolio/reforma-comercial-fachada-academia-belo-horizonte.webp',
    legenda: 'Reforma comercial de fachada em Belo Horizonte: obra planejada para não interromper o funcionamento do negócio.',
  },
  {
    src: 'img/portfolio/reforma-comercial-loja-recepcao-belo-horizonte.webp',
    legenda: 'Reforma comercial de loja e recepção: ambiente novo entregue no prazo combinado, sem imprevistos para o dia a dia do comércio.',
  },
  {
    src: 'img/portfolio/obra-comercial-sala-reuniao-belo-horizonte.webp',
    legenda: 'Sala de reuniões corporativa pronta para uso: organização em cada etapa da obra comercial, do início ao acabamento final.',
  },
  {
    src: 'img/portfolio/reforma-residencial-banheiro-belo-horizonte.webp',
    legenda: 'Reforma residencial de banheiro em Belo Horizonte: execução acompanhada de perto, sem dor de cabeça para o morador.',
  },
  {
    src: 'img/portfolio/construcao-residencial-quarto-planejado-belo-horizonte.webp',
    legenda: 'Quarto planejado entregue com acabamento de qualidade: construção tranquila, sem dor de cabeça e sem surpresas no orçamento.',
  },
  {
    src: 'img/portfolio/reforma-residencial-sala-estar-belo-horizonte.webp',
    legenda: 'Sala de estar reformada em apartamento: resultado que só uma obra bem planejada, sem surpresas pelo caminho, é capaz de entregar.',
  },
  {
    src: 'img/portfolio/reforma-residencial-area-gourmet-belo-horizonte.webp',
    legenda: 'Área gourmet planejada em cobertura residencial: espaço pronto para reunir família e amigos, sem dor de cabeça na execução.',
  },
  {
    src: 'img/portfolio/reforma-residencial-sala-sofa-couro-belo-horizonte.webp',
    legenda: 'Sala de estar com acabamento premium: resultado de uma construção organizada, sem surpresas de última hora.',
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
