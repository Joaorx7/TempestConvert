// Adiciona um "event listener" (ouvinte de evento) ao botão de conversão
document.getElementById('converter').addEventListener('click', async function() {
    
    // Pega o valor da moeda de origem (moeda de onde será feita a conversão)
    const moedaOrigem = document.getElementById('moedaOrigem').value;
    
    // Pega o valor da moeda de destino (moeda para onde será feita a conversão)
    const moedaDestino = document.getElementById('moedaDestino').value;
    
    // Pega o valor digitado pelo usuário para conversão e converte para número (float)
    const valor = parseFloat(document.getElementById('valor').value).toFixed(2);

    // Verifica se o valor não é um número ou se o valor é menor ou igual a 0
    if (isNaN(valor) || valor <= 0) {
        alert('Por favor, insira um valor válido para converter.');  // Exibe alerta se o valor não for válido
        return;  // Encerra a função sem continuar
    }

    try {
        // Faz uma requisição para a API que retorna a taxa de câmbio para a moeda de origem
        const response = await fetch(`https://api.exchangerate-api.com/v4/latest/${moedaOrigem}`);

        // Se a resposta da API não for OK, lança um erro
        if (!response.ok) {
            throw new Error('Erro ao obter dados da API.');
        }

        //  Converte a resposta da API (JSON) em um objeto JavaScript e armazena na variável data.
        const data = await response.json();

        // Obtém a taxa de câmbio para a moeda de destino a partir dos dados da API
        const taxa = data.rates[moedaDestino];

        // Verifica se a taxa de câmbio para a moeda de destino está disponível
        if (!taxa) {
            alert('Conversão de moeda não disponível.');  // Exibe alerta se a conversão não for possível
            return;  // Encerra a função sem continuar
        }

        // Calcula o valor convertido, multiplicando o valor de entrada pela taxa de câmbio
        const valorConvertido = (valor * taxa).toFixed(2);  // Limita o resultado a 2 casas decimais

        // Cria uma string formatada para exibir o resultado da conversão
        const resultadoTexto = `${valor} ${moedaOrigem} = ${valorConvertido} ${moedaDestino}`;
        
        // Exibe o resultado formatado na tela
        document.getElementById('resultadoTexto').innerText = resultadoTexto;

        // Exibe a div que contém o resultado (que estava oculta)
        document.getElementById('resultado').style.display = 'block';

    } catch (error) {
        // Se ocorrer um erro durante o processo (exemplo: erro na API ou na conversão), exibe no console e mostra um alerta
        console.error(error);
        alert('Erro ao converter moeda. Tente novamente mais tarde.');
    }
});
