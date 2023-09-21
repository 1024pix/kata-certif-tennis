import { describe, it } from "node:test";
import assert from "node:assert";

function checkScore(teamAScore, teamBScore) {
  const array = ['love','fifteen','thirty','fourty'];
  if(teamAScore === 4) {
    return 'Player A win'
  }

  if(teamAScore === teamBScore){
    if(teamAScore === 3){
     return "deuce";
    }

    return `${array[teamAScore]} - all`
  }


  return `${array[teamAScore]} - ${array[teamBScore]}`;
}

describe("#Score", () => {

  [[0,1,"love - fifteen"], [0,2,"love - thirty"], [0,3,"love - fourty"], [1,0,"fifteen - love"], [1,2,"fifteen - thirty"], [2,3,"thirty - fourty"]].forEach(([teamAScore,teamBScore,expected]) =>
      describe(`when given (${teamAScore},${teamBScore})`, () => {
    it(`it displays ${expected}`, () => {
      // given when
      const result = checkScore(teamAScore, teamBScore);
      // then
      assert.strictEqual(result, expected);
    });
  }));
  
  describe(`when score are equal`, () => {
  [[3,3,"deuce"], [0,0,"love - all"], [1,1,"fifteen - all"], [2,2,"thirty - all"]].forEach(([teamAScore,teamBScore,expected]) =>
      describe(`when given (${teamAScore},${teamBScore})`, () => {
        it(`it displays ${expected}`, () => {
          // given when
          const result = checkScore(teamAScore, teamBScore);
          // then
          assert.strictEqual(result, expected);
        });
    }));
  });
  describe(`when player win`, () => {
    [[4,0,"Player A win"], [4,2,"Player A win"]].forEach(([teamAScore,teamBScore,expected]) =>
        describe(`when given (${teamAScore},${teamBScore})`, () => {
      it(`it displays ${expected}`, () => {
        // given when
        const result = checkScore(teamAScore, teamBScore);
        // then
        assert.strictEqual(result, expected);
      });
    }));
  });
});
