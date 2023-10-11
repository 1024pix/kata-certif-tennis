import { describe, it } from "node:test";
import assert from "node:assert";


function checkScore(teamAScore, teamBScore) {

  const scoreNames = ["love", "fifteen", "thirty", "fourty"];

  const isWinning = ((points = 0) => (opponentPoints = 0) => {
    return points >= 4 && points - opponentPoints > 1;
  });

  const getScore = ((points = 0) => () => {
    return scoreNames[points] ?? points;
  });

  const buildPlayer = ((points, name) => {
    return {name, points, isWinning: isWinning(points), getScore: getScore(points)}
  });

  const teamA = buildPlayer(teamAScore, "teamA");
  const teamB = buildPlayer(teamBScore, "teamB");

  const arePointsEqualToThree = () => {
    return teamAScore === 3;
  };

  const getLeader = () => {
    return teamAScore -  teamBScore > 0 ? teamA : teamB;
  }

  
  const hasEquality = () => {
    return teamAScore === teamBScore;
  }


  const hasAdvantage = () => {
    const hasOnePointGap = () => {
      return Math.abs(teamAScore - teamBScore) === 1;
    }
  
    const hasMinimumAdvantageScoreTotal = () => {
      return teamAScore + teamBScore >= 7;
    }

    return hasMinimumAdvantageScoreTotal() && hasOnePointGap();
  }

  const hasWinner = () => {
    return (
      teamA.isWinning(teamB.points) ||
      teamB.isWinning(teamA.points)
    );
  }

  
  const  result = () => {
    if (hasWinner()) {
      return `${getLeader().name} win`;
    }

    if (hasAdvantage()) {
      return `Advantage ${getLeader().name}`;
    }

    if (hasEquality()) {
      if (arePointsEqualToThree()) {
        return "deuce";
      }

      return `${teamA.getScore()} - all`;
    }

    return `${teamA.getScore()} - ${teamB.getScore()}`;
  }
  return result();
}

describe("#Score", () => {
  [
    [0, 0, "love - all"],
    [1, 1, "fifteen - all"],
    [2, 2, "thirty - all"],
    [3, 3, "deuce"],
   // [4, 4, "deuce"],

    [1, 0, "fifteen - love"],
    [0, 1, "love - fifteen"],
    [2, 0, "thirty - love"],
    [0, 2, "love - thirty"],
    [3, 0, "fourty - love"],
    [0, 3, "love - fourty"],
    [4, 0, "teamA win"],
    [0, 4, "teamB win"],

    [2, 1, "thirty - fifteen"],
    [1, 2, "fifteen - thirty"],
    [3, 1, "fourty - fifteen"],
    [1, 3, "fifteen - fourty"],
    [4, 1, "teamA win"],
    [1, 4, "teamB win"],

    [3, 2, "fourty - thirty"],
    [2, 3, "thirty - fourty"],
    [4, 2, "teamA win"],
    [2, 4, "teamB win"],

    [4, 3, "Advantage teamA"],
    [3, 4, "Advantage teamB"],
    [5, 4, "Advantage teamA"],
    [4, 5, "Advantage teamB"],
    [15, 14, "Advantage teamA"],
    [14, 15, "Advantage teamB"],

    [6, 4, "teamA win"],
    [4, 6, "teamB win"],
    [16, 14, "teamA win"],
    [14, 16, "teamB win"],
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

  describe(`when score is higher than 3`, () => {
    describe(`when player has Advantage`, () => {
      [
        [4, 3, "Advantage teamA"],
        [12, 13, "Advantage teamB"],
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

    describe(`when player win`, () => {
      [
        [4, 0, "teamA win"],
        [4, 2, "teamA win"],
        [7, 5, "teamA win"],
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
});
