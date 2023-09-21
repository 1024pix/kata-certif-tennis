import { describe, it } from "node:test";
import assert from "node:assert";

function checkScore(teamAScore, teamBScore) {

  if(teamAScore === teamBScore){
    return "deuce";
  }

  const array = ['love','fifteen','thirty','fourty'];

  return `${array[teamAScore]} - ${array[teamBScore]}`;
}

describe("#Score", () => {
  it(`it displays a result`, () => {
    // given
    const expected = "deuce";
    // when
    const result = checkScore();
    // then
    assert.strictEqual(result, expected);
  });

  [[0,1,"love - fifteen"], [0,2,"love - thirty"], [0,3,"love - fourty"], [1,0,"fifteen - love"]].forEach(([teamAScore,teamBScore,expected]) =>
      describe(`when given (${teamAScore},${teamBScore})`, () => {
    it(`it displays ${expected}`, () => {
      // given when
      const result = checkScore(teamAScore, teamBScore);
      // then
      assert.strictEqual(result, expected);
    });
  }));
});
