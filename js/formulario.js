// Este arquivo cuida do mini formulário de triagem (Nome, Tipo de obra, Cidade).
// Em vez de enviar os dados para um servidor, ele monta uma mensagem organizada
// e abre o WhatsApp já com essa mensagem preenchida.
// Precisa que js/whatsapp.js tenha sido carregado antes (usa a função montarLinkWhatsApp).

const formularioTriagem = document.getElementById('formularioTriagem');

if (formularioTriagem) {
  formularioTriagem.addEventListener('submit', (evento) => {
    evento.preventDefault(); // impede o formulário de recarregar a página

    // Pega os valores digitados/selecionados pelo visitante.
    // Os três campos são "required" no HTML, então o navegador já garante
    // que nenhum deles chega vazio aqui.
    const nomeCliente = formularioTriagem.nome.value.trim();
    const tipoDeObra = formularioTriagem.tipoObra.value.toLowerCase();
    const cidadeCliente = formularioTriagem.cidade.value.trim();

    // Monta a mensagem numa frase só, pronta pra virar a primeira mensagem do WhatsApp
    const mensagem = `Olá, vim pelo site! Sou ${nomeCliente} de ${cidadeCliente} e desejo o orçamento para minha ${tipoDeObra}.`;

    // Abre o WhatsApp em uma nova aba, já com a mensagem preenchida
    window.open(montarLinkWhatsApp(mensagem), '_blank', 'noopener');

    formularioTriagem.reset(); // limpa o formulário para uma próxima vez
  });
}
