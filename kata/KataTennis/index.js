import * as prompt from 'prompt';

const [PLAYER1, PLAYER2] = [1, 2];

function tennisGame(){
	return {
		score: {
			player1: 0,
			player2: 0
		},
		isEnd: false,
		isAdv: false,
		isDeuce: false,
		winner: null,
		checkGameEnd() {
			let player1 = this.score.player1;
			let player2 = this.score.player2;
			if(player1 > 3 || player2 > 3) {
				if(player1 - player2 >= 2) {
					[this.isEnd, this.winner] = [true, PLAYER1];
				};
				if(player2 - player1 >= 2) {
					[this.isEnd, this.winner] = [true, PLAYER2];
				};
			};
		},
		scoredBy(player) {
			if(this.isAdv) {
				// win after adv
				if(player === PLAYER1 && this.score.player1 === 4)
					this.score.player1 = this.score.player1 + 1;
				if(player === PLAYER2 && this.score.player2 === 4)
					this.score.player2 = this.score.player2 + 1;
				// back to deuce
				if(player === PLAYER1 && this.score.player2 === 4)
					this.score.player2 = this.score.player2 - 1;
				if(player === PLAYER2 && this.score.player1 === 4)
					this.score.player1 = this.score.player1 - 1;
				this.isAdv = false;
				this.isDeuce = true;
			}
			else {
				if(player === PLAYER1)
					this.score.player1 = this.score.player1 + 1;
				else if(player === PLAYER2)
					this.score.player2 = this.score.player2 + 1;

				if(this.isDeuce) {
					this.isAdv = true;
					this.isDeuce = false;
				}
				// both score reach 40
				if(this.score.player1 === 3 && this.score.player2 === 3)
					this.isDeuce = true;
			};
			this.checkGameEnd();
		},
		printGameState() {
			const scoreSequence = ['love', 'fifteen', 'thirty', 'fourty'];
			let player1 = this.score.player1;
			let player2 = this.score.player2;
			if(this.isEnd){
				let player = 'PLAYER1';
				if(player2 > player1)
					player = 'PLAYER2';
				console.log(`========= ${player} WIN! =========`);
				return;
			}
			if(this.isDeuce) {
				console.log('========= DEUCE =========');
				return;
			}
			if(this.isAdv) {
				let player = 'PLAYER1';
				if(player2 > player1)
					player = 'PLAYER2';
				console.log(`========= ADVANTAGE ${player} =========`);
				return;
			}
			console.log(`=== ${scoreSequence[player1]} : ${scoreSequence[player2]} ===`);
		}
	};
}

let game = tennisGame();

prompt.start();

getInput(game);

function getInput(game){
  prompt.get(['scored_player'], function (err, result) {
  	let scoredPlayer = parseInt(result.scored_player);
		
		game.scoredBy(scoredPlayer);
		game.printGameState();

		if(game.isEnd) return;
    getInput(game);
  });
}
