import { describe, it } from "node:test";
import assert from "node:assert";

const array = ["love", "fifteen", "thirty", "fourty"];
class Team {
  #points;
  constructor({name, points = 0}) {
    this.name = name;
    this.#points = points;
  }

  isWinning(opponentScore = 0) {
    return this.#points >= 4 && (this.score - opponentScore) > 0;
  }

  get score() {
    return array[this.#points] ?? this.#points;
  }

  get points(){
    return this.#points
  }

}

function checkScore(teamAScore, teamBScore) {
  const teamA = new Team({name: 'teamA', points: teamAScore});
  const teamB = new Team({name: 'teamB', points: teamBScore});

  if (teamA.isWinning(teamB.points)) {
    return `${teamA.name} win`;
  }

  if (teamB.isWinning(teamA.points)) {
    return `${teamB.name} win`;
  }

  if (teamA.points === teamB.points) {
    if (teamA.points === 3) {
      return "deuce";
    }

    return `${teamA.score} - all`;
  }

  return `${teamA.score} - ${teamB.score}`;
}


describe("#Score", () => {
  [
    [0, 1, "love - fifteen"],
    [0, 2, "love - thirty"],
    [0, 3, "love - fourty"],
    [1, 0, "fifteen - love"],
    [1, 2, "fifteen - thirty"],
    [2, 3, "thirty - fourty"],
  ].forEach(([teamAScore, teamBScore, expected]) =>
    describe(`when given (${teamAScore},${teamBScore})`, () => {
      it(`it displays ${expected}`, () => {
        // given when
        const result = checkScore(teamAScore, teamBScore);
        // then
        assert.strictEqual(result, expected);
      });
    })
  );

  describe(`when score are equal`, () => {
    describe(`when score = 3`, () => {
      [[3, 3, "deuce"]].forEach(([teamAScore, teamBScore, expected]) =>
        describe(`when given (${teamAScore},${teamBScore})`, () => {
          it(`it displays ${expected}`, () => {
            // given when
            const result = checkScore(teamAScore, teamBScore);
            // then
            assert.strictEqual(result, expected);
          });
        })
      );
    });
    describe(`when score > 3`, () => {
      [[4, 4, "4 - all"], [5, 5, "5 - all"]].forEach(([teamAScore, teamBScore, expected]) =>
        describe(`when given (${teamAScore},${teamBScore})`, () => {
          it(`it displays ${expected}`, () => {
            // given when
            const result = checkScore(teamAScore, teamBScore);
            // then
            assert.strictEqual(result, expected);
          });
        })
      );
    });

    describe(`when score is lower than 3`, () => {
      [
        [0, 0, "love - all"],
        [1, 1, "fifteen - all"],
        [2, 2, "thirty - all"],
      ].forEach(([teamAScore, teamBScore, expected]) =>
        describe(`when given (${teamAScore},${teamBScore})`, () => {
          it(`it displays ${expected}`, () => {
            // given when
            const result = checkScore(teamAScore, teamBScore);
            // then
            assert.strictEqual(result, expected);
          });
        })
      );
    });
  });

  describe(`when player win`, () => {
    [
      [4, 0, "teamA win"],
      [4, 2, "teamA win"],
      [0, 4, "teamB win"],
    ].forEach(([teamAScore, teamBScore, expected]) =>
      describe(`when given (${teamAScore},${teamBScore})`, () => {
        it(`it displays ${expected}`, () => {
          // given when
          const result = checkScore(teamAScore, teamBScore);
          // then
          assert.strictEqual(result, expected);
        });
      })
    );
  });
});
