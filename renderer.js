const { exec } = require('child_process'); // Importa o módulo child_process

const terminal = document.getElementById('terminal'); // Obtém o elemento do terminal

// Adiciona um ouvinte de evento para a tecla pressionada
terminal.addEventListener('keypress', (event) => {
  if (event.key === 'Enter') {
    event.preventDefault(); // Previne o comportamento padrão da tecla Enter

    const input = terminal.innerText.trim(); // Obtém o comando do terminal
    terminal.innerHTML += '\n'; // Adiciona uma nova linha ao terminal

    // Executa o comando e lida com a saída
    exec(input, (error, stdout, stderr) => {
      if (error) {
        terminal.innerHTML += `Error: ${stderr}\n`; // Mostra mensagens de erro
      } else {
        terminal.innerHTML += `${stdout}\n`; // Mostra a saída do comando
      }

      terminal.innerHTML += '> '; // Adiciona o prompt de entrada
      terminal.scrollTop = terminal.scrollHeight; // Rola o terminal para baixo
    });
  }
});

terminal.innerHTML = '> '; // Define o prompt inicial