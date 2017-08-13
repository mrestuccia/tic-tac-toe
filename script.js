var ticTacToe = {
  // Init
  size: 0,
  player: 'X',
  totalMoves: 0,

  // createBoard
  // 1. Setup the properties
  // 2. Setup the grid and append it to the screen
  // 3. Setup the events
  createBoard: function (size) {
    // Setup the board size and number of moves
    this.size = size;
    this.totalMoves = size * size;

    // Setup the grid for the board using id y-x
    var goltable = document.createElement('tbody');
    var tablehtml = '';
    for (var x = 0; x < this.size; x++) {
      tablehtml += '<tr id="row' + x + '">';
      for (var y = 0; y < this.size; y++) {
        tablehtml += '<td data-status="empty" id="' + y + '-' + x + '"></td>';
      }
      tablehtml += '</tr>';
    }
    goltable.innerHTML = tablehtml;

    // Append the board to the screen
    var board = document.getElementById('board');
    board.innerHTML = '';
    board.appendChild(goltable);

    // Setup the click events to the cells
    this.setupCellEvents();

    // Setup the reset button and status text
    this.setupGameEvents();
  },

  // Function to traverse the grid
  forEachCell: function (func) {
    for (var x = 0; x < this.size; x++) {
      for (var y = 0; y < this.size; y++) {
        var cell = document.getElementById(x + '-' + y);
        func(cell);
      }
    }
  },

  // setupCellEvents
  // Add the event onCellClick to every cell in the grid
  setupCellEvents: function () {

    // If cell data-status is empty, 
    // 1. Add the class of the player to the cell
    // 2. Add the data-status to the player
    // 3. Switch Player
    var onCellClick = function (event) {
      if (this.getAttribute('data-status') === 'empty') {
        this.className = ticTacToe.player;
        this.setAttribute('data-status', ticTacToe.player);
        ticTacToe.changePlayer();
      }
    };

    // Apply the onCellClick function to every cell
    this.forEachCell(function (cell) {
      cell.addEventListener('click', onCellClick);
    });
  },

  // setupGameEvents
  // 1. Reset the status text to blank and
  // 2 .Reset the button to said 'clear the board' and attach the
  // function clearBoard
  setupGameEvents: function () {
    var status = document.getElementById('status');
    status.innerHTML = '';

    var reset = document.getElementById('reset');
    reset.value = 'Clear the board';
    reset.addEventListener('click', this.clearBoard.bind(this));
  },

  // changePlayer
  // 1. Switch the players
  // 2. Decrease the totalMoves. If zero, game over.
  changePlayer: function () {
    this.player = (this.player === 'X') ? 'O' : 'X';
    this.totalMoves--;
    if (this.totalMoves === 0) {
      this.gameOver();
    }
  },

  // gameOver
  // 1. Display Game Over
  // 2. Display Play Again on the reset button
  gameOver: function () {
    var status = document.getElementById('status');
    status.innerHTML = '<h3>GAME OVER</h3>';

    var reset = document.getElementById('reset');
    reset.value = 'Play again!';
  },

  // clearBoard
  // Regenerate the board from scratch
  clearBoard: function () {
    this.createBoard(this.size);
  }
};


// Init the class on page load
ticTacToe.createBoard(3);
