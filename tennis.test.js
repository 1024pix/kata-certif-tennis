import { describe, it } from 'node:test';
import assert from 'node:assert';

function checkScore(teamAScore, teamBScore) {
  return 'deuce';
}

describe('#Score', () => {
  it(`it displays the result`, () => {
    // given
    const expected = 'deuce';
    // when
    const result = checkScore(3, 3);
    // then
    assert.strictEqual(result, expected);
  });
});
