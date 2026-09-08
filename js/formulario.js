// Este arquivo cuida do mini formulário de triagem (Nome, Tipo de obra, Cidade).
// Em vez de enviar os dados para um servidor, ele monta uma mensagem organizada
// e abre o WhatsApp já com essa mensagem preenchida.
// Precisa que js/whatsapp.js tenha sido carregado antes (usa a função montarLinkWhatsApp).

const formularioTriagem = document.getElementById('formularioTriagem');

if (formularioTriagem) {
  formularioTriagem.addEventListener('submit', (evento) => {
    evento.preventDefault(); // impede o formulário de recarregar a página

    // Pega os valores digitados/selecionados pelo visitante
    const nomeCliente = formularioTriagem.nome.value.trim();
    const tipoDeObra = formularioTriagem.tipoObra.value;
    const cidadeCliente = formularioTriagem.cidade.value.trim();

    // Monta um texto organizado a partir dos dados do formulário
    const mensagem =
      `Olá! Vim pelo site e quero um orçamento.\n` +
      `Nome: ${nomeCliente}\n` +
      `Tipo de obra: ${tipoDeObra}\n` +
      `Cidade: ${cidadeCliente}`;

    // Abre o WhatsApp em uma nova aba, já com a mensagem preenchida
    window.open(montarLinkWhatsApp(mensagem), '_blank', 'noopener');

    formularioTriagem.reset(); // limpa o formulário para uma próxima vez
  });
}
