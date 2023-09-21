import { describe, it } from "node:test";
import assert from "node:assert";

function checkScore(teamAScore, teamBScore) {
  if (teamAScore === 0) {
    if (teamBScore === 2) {
      return "love - thirty";
    }

    if (teamBScore === 3) {
      return "love - fourty";
    }

    return "love - fifteen";
  }

  return "deuce";
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

  describe("when given (0,1)", () => {
    it('it displays "love - fifteen"', () => {
      // given
      const expected = "love - fifteen";
      // when
      const result = checkScore(0, 1);
      // then
      assert.strictEqual(result, expected);
    });
  });

  describe("when given (0,2)", () => {
    it('it displays "love - thirty"', () => {
      // given
      const expected = "love - thirty";
      // when
      const result = checkScore(0, 2);
      // then
      assert.strictEqual(result, expected);
    });
  });

  describe("when given (0,3)", () => {
    it('it displays "love - fourty"', () => {
      // given
      const expected = "love - fourty";
      // when
      const result = checkScore(0, 3);
      // then
      assert.strictEqual(result, expected);
    });
  });
});
