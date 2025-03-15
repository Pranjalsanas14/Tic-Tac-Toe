const board = document.getElementById('game-board');
const message = document.getElementById('message');
const restartButton = document.getElementById('restartButton');

let currentPlayer = 'X'; // 'X' starts first
let gameBoard = ['', '', '', '', '', '', '', '', '']; // Array representing the game state

// Function to create the game board
function createBoard() {
    gameBoard = ['', '', '', '', '', '', '', '', ''];
    board.innerHTML = '';
    message.textContent = `Player ${currentPlayer}'s turn`;
    
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement('div');
        cell.classList.add('cell');
        cell.setAttribute('data-index', i);
        cell.addEventListener('click', makeMove);
        board.appendChild(cell);
    }
}

// Function to handle making a move
function makeMove(event) {
    const index = event.target.getAttribute('data-index');
    
    // If the cell is already taken or the game is over, return
    if (gameBoard[index] !== '' || checkWinner()) return;

    // Update the game board with the current player's move
    gameBoard[index] = currentPlayer;
    event.target.textContent = currentPlayer;

    // Check for a winner
    if (checkWinner()) {
        message.textContent = `Player ${currentPlayer} wins!`;
    } else if (gameBoard.every(cell => cell !== '')) {
        message.textContent = "It's a tie!";
    } else {
        // Switch player
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        message.textContent = `Player ${currentPlayer}'s turn`;
    }
}

// Function to check if there's a winner
function checkWinner() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6] // Diagonals
    ];

    for (let pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (gameBoard[a] && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
            return true;
        }
    }
    return false;
}

// Function to restart the game
function restartGame() {
    createBoard();
}

// Event listener for restarting the game
restartButton.addEventListener('click', restartGame);

// Initialize the game
createBoard();
