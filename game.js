class TicTacToe {

  // createBoard
  // Setup the properties
  constructor(player, size) {
    this.player = player;
    this.size = size;
    this.totalMoves = size * size;
  }

  // onCellClick
  // If cell data-status is empty, 
  // 1. Add the class of the player to the cell
  // 2. Switch Player
  onCellClick(event) {
    let cell = event.srcElement;

    if (cell.className === '') {
      cell.className = this.player;
      this.changePlayer();
    }
  }

  // renderBoard
  // 1. Setup the grid and append it to the screen
  // 2. Setup the events
  // 3. Render the the reset button and status
  renderBoard(containerId) {
    // Setup the grid for the board using id y-x
    let goltable = document.createElement('tbody');

    for (let idx = 0; idx < this.size; idx++) {
      let tr = document.createElement('tr');
      tr.id = 'row' + idx;

      for (let idx2 = 0; idx2 < this.size; idx2++) {
        let td = document.createElement('td');
        td.id = idx2 + '-' + idx;
        td.addEventListener('click', this.onCellClick.bind(this));
        tr.appendChild(td);
      }

      goltable.appendChild(tr);
    }

    // Append the board to the screen
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    container.appendChild(goltable);

    // Render Reset
    this.renderReset('Clear the board')

    // Render the Status
    this.renderStatus('');
  }

  // changePlayer
  // 1. Switch the players
  // 2. Decrease the totalMoves. If zero, game over.
  changePlayer() {
    this.player = (this.player === 'X') ? 'O' : 'X';
    this.totalMoves--;
    if (this.totalMoves === 0) {
      this.gameOver();
    }
  }

  // gameOver
  // 1. Display Game Over
  // 2. Display Play Again on the reset button
  gameOver() {
    this.renderStatus('GAME OVER');
    this.renderReset('Play again!');
  }

  // clearBoard
  // Regenerate the board from scratch
  clearBoard() {
    this.totalMoves = Math.pow(this.size, 2);
    this.status = 'Clear Game';
    this.renderBoard('board');
  }

  // renderStatus
  // Display the status of the game
  renderStatus(message) {
    const status = document.getElementById('status');
    status.innerHTML = message;
  }

  // renderReset
  // Display the reset button and attach a click action to restart/clear
  renderReset(message) {
    const reset = document.getElementById('reset');
    reset.value = message;
    reset.addEventListener('click', this.clearBoard.bind(this));
  }
}

// Call the class using the default values
const game = new TicTacToe('X', 3);
game.renderBoard('board');
