//script.js (nomes em português beasileiro)

// Obtém todas as divs dentro do elemento com a classe 'board'. Cada div representa uma célula do jogo da velha.
// Juntando tudo ('.board > div') significa: "Econtro todos os elementos div que são filhos diretos de
// elementos que tem a classe 'board'".
const celulas = document.querySelectorAll('.board > div');

//Obtém o elemnto HTML que exibirá as mensagens do jogo (quem venceu, empate, etc.).
const elementoMensagem = document.querySelector('.mensagem');

// Obtém o botão que será usado para reiniciar o jogo.
const botaoReiniciar = document.querySelector('.reset-button');

// Define qual jogador começa.   'x' sempre começa.
var jogadorAtual = 'x';

// Variável para controlar se o jogo terminou ou não. Começa como falso (o jogo não acabou).
var jogoAcabou = false;

// Representa o estado atual do tabuleiro. É um array com 9 posições, uma para cada célula.
// Inicialmente, todas as posições estão vazias ('').
const tabuleiro = ['','','','','','','','',''];

// Array que contém todas as combinações de células que levam à vitória.
const combinaçõeVitoria = [
    [0,1,2], [3,4,5], [6,7,8], // linhas
    [0,3,6], [1,4,7], [2,5,8], // Colunas
    [0,4,8], [2,4,6],          // Diagonais
];

// Função para verificar se o jogador atual venceu o jogo.
function verificaVitoria() {
    // Percorre cada combinação de vitória possível.
    for (const combinacao of combinacoesVitoria) {
        // Desestrutura a combinação atual em três variáveis: a, b e c (índices das céclulas).
        const [a, b, c] = combinacao;

        // Verifica se as três células da combinação atual têm o símbolo do jogador atual.
        // tabuleiro[a] && ... : Garante que a primeira célula (tabuleiro[a]) *não está vazia*
        // antes de verificar as outras. Isso evita erros.
        if (tabuleiro[a] && tabuleiro[a] === tabuleiro[b] && tabuleiro[a] === tabuleiro[c]) {
            // Se as três células forem iguais (e não vazias), retorna verdadeiro (o jogador venceu).
            return true;
        }
    }
    // Se nenhuma combinação vencedora for encontrada, retorna falso (o jogador não vencceu).
    return false;
}

// Função para verificar se o jogo empatou.
function verificaEmpate() {
    // .every() verifica se *todos* os elementos do array passam em um teste.
    // Neste caso, verifica se *todas* as células do tabuleiro preenchidas (são diferentes de '').
    return tabuleiro.every(celula => celula !== '');
}

// Função que é chamada quando uma célula é clicada.
function tratarCliqueCelula(evento) {
    // Se o jogo já acabou , não faz nada (impede que o jogo continue após a vitória/empate).
    if (jogoAcabou) {
        return;
    }

    // Obtém a célula que foi clicada (o elemento HTML).
    const celula = evento.target;

    // Obtém o índice da célula clicada (de 0 a 8).
    // Array.from(celulas) transforma a NodeList (celulas) em um Array.
    // .indexof() encontra a posição da 'celula' dentro do array.
    const indiceCelula = Array .from(celulas).indexOf(celula);

    // Se a célula já estiver preenchida, não faz nada (impede que o jogador jogue em uma célula ocupada).
    if (tabuleiro[indiceCelula] !== '') {
        return;
    }

    // Marca a célula no tabuleiro com o símbolo do jogador atual ('X' ou 'O').
    tabuleiro[indiceCelula] = jogadorAtual;

    // Adiciona a classe 'x' ou 'o' ao elemento HTML da célula para mostrar visualente o símbolo.
    celula.classList.add(jogadorAtual.toLowerCase()); // Adiciona 'x' ou 'o'

    // Verifica se o jogador atual venceu após a jogada.
    if (verificaVitoria()) {
        // Se venceu, exibe a mensagem de vitória a define 'jogadorAcabou' como verdadeiro.
        elementoMensagem.textContent = `Jogador ${jogadorAtual} venceu!`;
    }
}