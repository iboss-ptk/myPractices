import { assert } from 'chai';
import * as tennis from '../index.js';

const [ DEUCE, PLAYER_ONE_ADV, PLAYER_TWO_ADV ] = [ 0, 1, 2 ];
const [ PLAYER_ONE_WIN, PLAYER_TWO_WIN ] = [ 3, 4 ];
const [ PLAYER_ONE, PLAYER_TWO ] = [ PLAYER_ONE_ADV, PLAYER_TWO_ADV ];

function isScoreStateEqual(stateOne, stateTwo){
	let isPlayerOneScoreEqual = stateOne.playerOne === stateTwo.playerOne;
	let isPlayerTwoScoreEqual = stateOne.playerTwo === stateTwo.playerTwo;
	return isPlayerOneScoreEqual && isPlayerTwoScoreEqual;
}

describe('update game state', () => {
	it('should increase winner score if not deuce', () => {
		assert.equal(
			isScoreStateEqual(
				tennis.updateGameState({playerOne: 0, playerTwo: 0}, PLAYER_ONE
			), {playerOne: 15, playerTwo: 0}), true
		);
		assert.equal(
			isScoreStateEqual(
				tennis.updateGameState({playerOne: 15, playerTwo: 15}, PLAYER_ONE
			), {playerOne: 30, playerTwo: 15}), true
		);
		assert.equal(
			isScoreStateEqual(
				tennis.updateGameState({playerOne: 30, playerTwo: 15}, PLAYER_ONE
			), {playerOne: 40, playerTwo: 15}), true
		);
		assert.equal(
			isScoreStateEqual(
				tennis.updateGameState({playerOne: 30, playerTwo: 15}, PLAYER_TWO
			), {playerOne: 30, playerTwo: 30}), true
		);
		assert.equal(
			isScoreStateEqual(
				tennis.updateGameState({playerOne: 15, playerTwo: 30}, PLAYER_TWO
			), {playerOne: 15, playerTwo: 40}), true
		);
	});

	it('should deuce if at 40/40', () => {
		assert.equal(
			tennis.updateGameState({playerOne: 30, playerTwo: 40}, PLAYER_ONE),
			DEUCE
		);
		assert.equal(
			tennis.updateGameState({playerOne: 40, playerTwo: 30}, PLAYER_TWO),
			DEUCE
		);
	});

	it('should return winner advantage after deuce', () => {
		assert.equal(tennis.updateGameState(DEUCE, PLAYER_ONE), PLAYER_ONE_ADV);
		assert.equal(tennis.updateGameState(DEUCE, PLAYER_TWO), PLAYER_TWO_ADV);
	});

	it('should return game winner', () => {
		assert.equal(tennis.updateGameState({playerOne: 0, playerTwo: 40}, PLAYER_TWO), PLAYER_TWO_WIN);
		assert.equal(tennis.updateGameState({playerOne: 15, playerTwo: 40}, PLAYER_TWO), PLAYER_TWO_WIN);
		assert.equal(tennis.updateGameState({playerOne: 30, playerTwo: 40}, PLAYER_TWO), PLAYER_TWO_WIN);
		assert.equal(tennis.updateGameState({playerOne: 40, playerTwo: 0}, PLAYER_ONE), PLAYER_ONE_WIN);
		assert.equal(tennis.updateGameState({playerOne: 40, playerTwo: 15}, PLAYER_ONE), PLAYER_ONE_WIN);
		assert.equal(tennis.updateGameState({playerOne: 40, playerTwo: 30}, PLAYER_ONE), PLAYER_ONE_WIN);
		assert.equal(tennis.updateGameState(PLAYER_ONE_ADV, PLAYER_ONE), PLAYER_ONE_WIN);
		assert.equal(tennis.updateGameState(PLAYER_TWO_ADV, PLAYER_TWO), PLAYER_TWO_WIN);
	});
});

describe('get winner', () => {
	it('should return the player which win after advantage', () => {
    assert.equal(tennis.getWinner(PLAYER_ONE, PLAYER_ONE_ADV), PLAYER_ONE_WIN);
    assert.equal(tennis.getWinner(PLAYER_TWO, PLAYER_TWO_ADV), PLAYER_TWO_WIN);
  });

  it('should return the player that win after his/her 40', () => {
    assert.equal(tennis.getWinner(PLAYER_ONE, {playerOne: 40, playerTwo: 30}), PLAYER_ONE_WIN);
    assert.equal(tennis.getWinner(PLAYER_TWO, {playerOne: 10, playerTwo: 40}), PLAYER_TWO_WIN);
  });

  it('should return null if nobody is at 40 and no advantage', () => {
  	assert.equal(tennis.getWinner(PLAYER_TWO, {playerOne: 10, playerTwo: 30}), null);
  	assert.equal(tennis.getWinner(PLAYER_ONE, {playerOne: 10, playerTwo: 30}), null);
  });
});

describe('increase score', () => {
  it('should return love when it has no argument', () => {
    assert.equal(tennis.increaseScore(), 0);
  });

  it('should increase from 0 to 15', () => {
    assert.equal(tennis.increaseScore(0), 15);
  });

  it('should increase from 15 to 30', () => {
    assert.equal(tennis.increaseScore(15), 30);
  });

  it('should increase from 30 to 40', () => {
    assert.equal(tennis.increaseScore(30), 40);
  });
});

describe('get advantage', () => {
  it('should set player one to be advantage if deuce', () => {
    assert.equal(tennis.getAdvantage(DEUCE, PLAYER_ONE), PLAYER_ONE);
  });

  it('should set player two to be advantage if deuce', () => {
    assert.equal(tennis.getAdvantage(DEUCE, PLAYER_TWO), PLAYER_TWO);
  });

  it('should deuce if player one is advantage and player two win', () => {
    assert.equal(tennis.getAdvantage(PLAYER_ONE_ADV, PLAYER_TWO), DEUCE);
  });

  it('should deuce if player two is advantage and player one win', () => {
    assert.equal(tennis.getAdvantage(PLAYER_TWO_ADV, PLAYER_ONE), DEUCE);
  });
});
