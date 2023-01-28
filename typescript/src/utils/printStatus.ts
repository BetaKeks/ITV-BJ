import { Card } from "../essentials/card";
import { Counter } from "../essentials/counter";

export const printStatus = (
  currentCard: Card,
  counter: Counter,
  gameOver: boolean,
  cardHolder: string
) => {
  if (gameOver) {
    console.log(
      `Hit with ${currentCard?.Suit} ${
        currentCard?.rank
      }. The ${cardHolder} busted with a ${
        counter.isHardTotal ? "hard" : "soft"
      } ${counter.total}.\n\n`
    );
  } else {
    console.log(
      `Hit with ${currentCard?.Suit} ${currentCard?.rank}. Its a ${
        counter.isHardTotal ? "hard" : "soft"
      } ${counter.total} for the ${cardHolder}.\n\n`
    );
  }
};
