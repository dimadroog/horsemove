var hm = new Vue({
	el: '#horsemove',
	data: function() {
		return {
			board: this.getBoard(8, 8),
			board_rows: 8,
			board_cols: 8,
			starts: false,
			played: 0,
			available_count: 0,
			game_result: '',
			levels: [
				{'row': 3, 'col': 4},
				{'row': 5, 'col': 5},
				{'row': 6, 'col': 6},
				{'row': 7, 'col': 7},
				{'row': 8, 'col': 8},
				{'row': 9, 'col': 9},
				{'row': 10, 'col': 10},
			]
		}
	},
	methods: {

		getBoard: function (rows, cols) {

			var board = Array(rows).fill('');
			for (var r = 0; r < board.length; r++) {
				board[r] = [];
				for (var c = 0; c < cols; c++) {
					var cell = {
						'current': false,
						'available': false,
						'played': 0,
						'row': r,
						'col': c,
					}
					board[r].push(cell);
				}
			}

			this.board = board;
			this.board_rows = rows;
			this.board_cols = cols;
			this.starts = false;
			this.played = 0;
			this.available_count = 0;
			this.game_result = '';

			return board;
		},

		cellClick: function (cell) {

			if (!this.starts || cell.available) {

				if (this.starts == false) {
					this.starts = true;
				}

				//clean old 
				this.cleanOldCells();

				this.played++
				cell.played = this.played;
				cell.current = true;

				//determine available moves
				this.availableMoves(cell);

				// summare the game
				if (this.available_count == 0) {
					this.summareTheGame();
				}

			} else {
				console.log('the horse does not walk like that!');
			}
		},

		undo: function () {
			if (this.played > 1) {
				for (var i = 0; i < this.board.length; i++) {
					for (var n = 0; n < this.board[i].length; n++) {
						if (this.board[i][n].played == this.played) {
							var current = this.board[i][n];
						}
						if (this.board[i][n].played == this.played - 1) {
							var previous = this.board[i][n];
						}
					}
				}
				current.played = 0;
				this.cleanOldCells();

				previous.available = false;
				previous.current = true;
				this.availableMoves(previous);

				this.played--;
				this.game_result = '';
			} else {
				console.log('Undo not access yet');
			}
		},

		cleanOldCells: function () {
			for (var i = 0; i < this.board.length; i++) {
				for (var n = 0; n < this.board[i].length; n++) {
					if (this.board[i][n].available) {
						this.board[i][n].available = false;
					}
					if (this.board[i][n].current) {
						this.board[i][n].current = false;
					}
				}
			}
		},

		availableMoves: function (cell) {
			var all_available = [
				[cell.row + 2, cell.col + 1],
				[cell.row + 2, cell.col - 1],
				[cell.row - 2, cell.col + 1],
				[cell.row - 2, cell.col - 1],
				[cell.row + 1, cell.col + 2],
				[cell.row + 1, cell.col - 2],
				[cell.row - 1, cell.col + 2],
				[cell.row - 1, cell.col - 2]
			];
			this.available_count = 0;
			for (var i = 0; i < all_available.length; i++) {
				var r = all_available[i][0];
				var c = all_available[i][1];
				if (r >= 0 && r < this.board_rows && c >= 0 && c < this.board_cols) {
					if (this.board[r][c].played == 0) {
						this.board[r][c].available = true;
						this.available_count++;
					}
				}

			}
		},

		summareTheGame: function () {
			var not_played_count = 0;
			for (var i = 0; i < this.board.length; i++) {
				for (var n = 0; n < this.board[i].length; n++) {
					if (this.board[i][n].played == 0) {
						not_played_count++;
					}
				}
			}
			if (not_played_count > 0) {
				this.game_result = 'Ты проиграл! Доступных ходов больше не осталось.'
			} else {
				this.game_result = 'Ты выиграл! Все клетки заполнены.'
			}
		},
	}

});