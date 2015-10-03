import { assert } from 'chai';
import { play } from '../index.js';

describe('play!', () => {
  it('should return true', () => {
    assert.equal(play(), true, 'play() return true');  	
  })
});