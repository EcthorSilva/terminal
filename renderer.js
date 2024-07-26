const terminal = document.getElementById('terminal');

const welcomeMessage = `Terminal [versão 1.0.1]`;

terminal.innerHTML = welcomeMessage + '\n> ';

terminal.addEventListener('keypress', async (event) => {
  if (event.key === 'Enter') {
    event.preventDefault();

    const input = terminal.innerText.trim();
    terminal.innerHTML += '\n';

    try {
      const output = await window.api.execCommand(input);
      console.log(`Saída do comando: ${output}`);
      terminal.innerHTML += `${output}\n`;
    } catch (error) {
      console.error(`Erro ao executar o comando: ${error}`);
      terminal.innerHTML += `(render)${error}\n`;
    }

    terminal.innerHTML += '> ';
    terminal.scrollTop = terminal.scrollHeight;
  }
});