import { describe, it } from "node:test";
import assert from "node:assert";

function checkScore(teamAScore, teamBScore) {
  const array = ['love','fifteen','thirty','fourty'];

  if (teamAScore >= 4 && isAWin(teamAScore, teamBScore)) {
    return 'Player A win'
  }

  if (teamBScore >= 4 && isAWin(teamAScore, teamBScore)) {
    return 'Player B win'
  }

  if (teamAScore === teamBScore) {
    if(teamAScore === 3){
     return "deuce";
    }

    return `${array[teamAScore]} - all`
  }


  return `${array[teamAScore]} - ${array[teamBScore]}`;
}

function isAWin(scoreA, scoreB) {
  return Math.abs(scoreA - scoreB) > 0;
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
  describe(`when score = 3`, () => {
    [[3,3,"deuce"]].forEach(([teamAScore,teamBScore,expected]) =>
    describe(`when given (${teamAScore},${teamBScore})`, () => {
      it(`it displays ${expected}`, () => {
        // given when
        const result = checkScore(teamAScore, teamBScore);
        // then
        assert.strictEqual(result, expected);
      });
  }));
});
  describe(`when score > 3`, () => {
    [[4,4,"4 - all"]].forEach(([teamAScore,teamBScore,expected]) =>
    describe(`when given (${teamAScore},${teamBScore})`, () => {
      it(`it displays ${expected}`, () => {
        // given when
        const result = checkScore(teamAScore, teamBScore);
        // then
        assert.strictEqual(result, expected);
      });
  }));
})

    describe(`when score is lower than 3`, () => {


  [[0,0,"love - all"], [1,1,"fifteen - all"], [2,2,"thirty - all"]].forEach(([teamAScore,teamBScore,expected]) =>
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

  describe(`when player win`, () => {
    [[4,0,"Player A win"], [4,2,"Player A win"], [0,4,"Player B win"]].forEach(([teamAScore,teamBScore,expected]) =>
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
