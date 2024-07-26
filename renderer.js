console.log('renderer.js carregado com sucesso'); // Verificação

// Verifica se o DOM está totalmente carregado
document.addEventListener('DOMContentLoaded', () => {
  const terminal = document.getElementById('terminal');

  // Mensagem inicial
  const welcomeMessage = `Terminal [versão 1.0.1]`;
  terminal.innerHTML = welcomeMessage + '\n> ';

  // Adiciona um ouvinte de evento para a tecla pressionada
  terminal.addEventListener('keypress', async (event) => {
    if (event.key === 'Enter') {
      event.preventDefault(); // Previne o comportamento padrão da tecla Enter

      const input = terminal.innerText.trim(); // Obtém o comando do terminal
      terminal.innerHTML += '\n'; // Adiciona uma nova linha ao terminal

      try {
        const output = await window.api.execCommand(input);
        console.log(`Saída do comando: ${output}`);
        terminal.innerHTML += `${output}\n`;
      } catch (error) {
        console.error(`Erro ao executar o comando: ${error}`);
        terminal.innerHTML += `(render)${error}\n`;
      }

      terminal.innerHTML += '> '; // Adiciona o prompt de entrada
      terminal.scrollTop = terminal.scrollHeight; // Rola o terminal para baixo
    }
  });
});
