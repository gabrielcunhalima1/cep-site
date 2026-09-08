// Este arquivo cuida só de uma coisa: montar links do WhatsApp.
// Outros arquivos (formulario.js, por exemplo) usam a função montarLinkWhatsApp()
// definida aqui embaixo, por isso este script precisa vir ANTES dos outros no HTML.

// TODO Pedro: substituir pelo número real do WhatsApp Business da CEP (formato: 55 + DDD + número, só dígitos)
const NUMERO_WHATSAPP = '5531900000000';

// Mensagem usada quando nenhuma mensagem específica é informada
const MENSAGEM_PADRAO = 'Olá! Vim pelo site e quero um orçamento.';

// Recebe um texto e devolve o link completo do WhatsApp já com a mensagem preenchida
function montarLinkWhatsApp(mensagem) {
  const textoCodificado = encodeURIComponent(mensagem || MENSAGEM_PADRAO);
  return `https://wa.me/${NUMERO_WHATSAPP}?text=${textoCodificado}`;
}

// Todo link com a classe "js-whatsapp-link" recebe automaticamente o href correto.
// A mensagem específica de cada botão vem do atributo data-message no HTML.
document.querySelectorAll('.js-whatsapp-link').forEach((link) => {
  link.href = montarLinkWhatsApp(link.dataset.message);
  link.target = '_blank';
  link.rel = 'noopener';
});
