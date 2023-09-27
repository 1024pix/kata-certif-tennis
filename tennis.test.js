import { describe, it } from "node:test";
import assert from "node:assert";

class Team {
  #points;
  scoreNames = ["love", "fifteen", "thirty", "fourty"];
  constructor({ name, points = 0 }) {
    this.name = name;
    this.#points = points;
  }

  isWinning(opponentPoints = 0) {
    return this.#points >= 4 && this.#points - opponentPoints > 1;
  }

  get score() {
    return this.scoreNames[this.#points] ?? this.#points;
  }

  get points() {
    return this.#points;
  }
}

class Game {
  constructor({ teamA, teamB }) {
    this.teamA = teamA;
    this.teamB = teamB;
  }

  get result() {
    if (this.#hasWinner()) {
      return `${this.#getWinner()} win`;
    }

    if (this.teamA.points === this.teamB.points) {
      if (this.teamA.points === 3) {
        return "deuce";
      }

      return `${this.teamA.score} - all`;
    }

    return `${this.teamA.score} - ${this.teamB.score}`;
  }

  #getWinner() {
    return this.teamA.isWinning(this.teamB.points)
      ? this.teamA.name
      : this.teamB.name;
  }

  #hasWinner() {
    return (
      this.teamA.isWinning(this.teamB.points) ||
      this.teamB.isWinning(this.teamA.points)
    );
  }
}

function checkScore(teamAScore, teamBScore) {
  const teamA = new Team({ name: "teamA", points: teamAScore });
  const teamB = new Team({ name: "teamB", points: teamBScore });

  const game = new Game({ teamA, teamB });

  return game.result;
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
      [
        [4, 4, "4 - all"],
        [5, 5, "5 - all"],
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
