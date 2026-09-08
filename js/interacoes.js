// Pequenas interações visuais da página: animação de entrada ao rolar,
// o ano atual no rodapé, e o ajuste automático dos textos do hero.

// --- Ajustar o tamanho de um texto para caber sempre numa linha só ---
// Em vez de adivinhar um tamanho fixo, medimos o texto de verdade (com Canvas)
// e calculamos o tamanho exato que cabe na largura disponível — funciona em
// qualquer tela, sem precisar prever cada tamanho de celular/monitor.
const canvasDeMedicao = document.createElement('canvas');
const contextoDeMedicao = canvasDeMedicao.getContext('2d');

function ajustarTextoParaCaberNumaLinha(elemento, tamanhoMinimo, tamanhoMaximo) {
  if (!elemento) return;

  const larguraDisponivel = elemento.clientWidth;
  const estilo = getComputedStyle(elemento);

  const TAMANHO_DE_REFERENCIA = 100; // px, só serve para medir a proporção do texto
  contextoDeMedicao.font = `${estilo.fontWeight} ${TAMANHO_DE_REFERENCIA}px ${estilo.fontFamily}`;
  const larguraNaReferencia = contextoDeMedicao.measureText(elemento.textContent).width;

  const MARGEM_DE_SEGURANCA = 0.97; // evita a última letra encostar na borda

  let tamanhoIdeal = (larguraDisponivel / larguraNaReferencia) * TAMANHO_DE_REFERENCIA * MARGEM_DE_SEGURANCA;
  tamanhoIdeal = Math.max(tamanhoMinimo, Math.min(tamanhoMaximo, tamanhoIdeal));

  elemento.style.fontSize = `${tamanhoIdeal}px`;

  // Se o texto for comprido demais para caber numa linha mesmo no tamanho
  // mínimo (comum em telas de celular bem estreitas), deixa quebrar em vez
  // de estourar a largura da tela ou ficar com letra ilegível
  const larguraNoTamanhoIdeal = (larguraNaReferencia / TAMANHO_DE_REFERENCIA) * tamanhoIdeal;
  elemento.style.whiteSpace = larguraNoTamanhoIdeal <= larguraDisponivel ? 'nowrap' : 'normal';
}

const tituloHero = document.querySelector('.hero h1');
const subtituloHero = document.querySelector('.hero__subhead');

function ajustarTextosDoHero() {
  ajustarTextoParaCaberNumaLinha(tituloHero, 15, 52);
  ajustarTextoParaCaberNumaLinha(subtituloHero, 14, 18);
}

ajustarTextosDoHero();

// Recalcula quando a tela muda de tamanho (ex: girar o celular), sem exagerar
// nos recálculos durante o arraste da janela
let recalculoAgendado = false;
window.addEventListener('resize', () => {
  if (recalculoAgendado) return;
  recalculoAgendado = true;
  requestAnimationFrame(() => {
    ajustarTextosDoHero();
    recalculoAgendado = false;
  });
});

// --- Ano atual no rodapé (evita ter que atualizar isso manualmente todo ano) ---
const elementoAno = document.getElementById('year');
if (elementoAno) elementoAno.textContent = new Date().getFullYear();

// --- Animação de entrada ao rolar a página ---
// Pessoas com a opção "reduzir movimento" ativada no sistema não devem ver animação
const usuarioPrefereMenosMovimento = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const elementosParaAnimar = document.querySelectorAll('.reveal');

if (usuarioPrefereMenosMovimento) {
  // Mostra tudo de uma vez, sem animação
  elementosParaAnimar.forEach((elemento) => elemento.classList.add('is-visible'));
} else if ('IntersectionObserver' in window) {
  // Observa quando cada elemento entra na tela e adiciona a classe que dispara a animação
  const observadorDeEntrada = new IntersectionObserver(
    (entradas, observador) => {
      entradas.forEach((entrada) => {
        if (entrada.isIntersecting) {
          entrada.target.classList.add('is-visible');
          observador.unobserve(entrada.target); // já apareceu uma vez, não precisa observar de novo
        }
      });
    },
    { threshold: 0.15 }
  );
  elementosParaAnimar.forEach((elemento) => observadorDeEntrada.observe(elemento));
} else {
  // Navegador muito antigo sem suporte a IntersectionObserver: mostra tudo direto
  elementosParaAnimar.forEach((elemento) => elemento.classList.add('is-visible'));
}
