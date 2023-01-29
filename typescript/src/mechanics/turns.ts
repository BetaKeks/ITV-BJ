import readline from "readline-promise";
import { Card } from "../essentials/card";
import { Counter } from "../essentials/counter";
import { Deck } from "../essentials/deck";
import { printStatus } from "../utils/printStatus";
import { dealCard } from "./initializations";

const readConsole = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
  terminal: true,
});

const command = async (): Promise<boolean> => {
  return await readConsole
    .questionAsync("Stand, Hit (s/h) \n")
    .then((read: String) => {
      if (read === "h") {
        return true;
      } else {
        return false;
      }
    });
};

export const playerTurn = async (
  deck: Deck,
  playerHand: Array<Card>,
  playerCounter: Counter
): Promise<boolean> => {
  let playing = true;
  let playerLost = false;

  const [card1, card2] = playerHand;

  console.log(
    `Player initially hit with ${card1?.Suit} ${card1?.rank} & ${card2?.Suit} ${card2?.rank}.`
  );

  if (playerCounter.total === 21) {
    console.log("Its a natural/blackjack for the player.\n\n");
    playing = false;
  } else {
    console.log(
      `Its a ${playerCounter.isHardTotal ? "hard" : "soft"} ${
        playerCounter.total
      }.\n\n`
    );
    playing = await command();
  }

  while (playing) {
    const card = dealCard(deck, playerHand, playerCounter);

    const gameOver = playerCounter.total > 21;

    if (gameOver) {
      printStatus(card, playerCounter, gameOver, "player");
      playing = false;
      playerLost = true;
      break;
    }

    printStatus(card, playerCounter, gameOver, "player");

    if (playerCounter.total === 21) {
      playing = false;
      break;
    }

    playing = await command();
  }

  return playerLost;
};

export const dealerTurn = (
  dealerCounter: Counter,
  playerLost: boolean,
  deck: Deck,
  dealerHand: Array<Card>
) => {
  console.log(
    `\n\nDealers first card ${dealerHand[0].Suit} ${dealerHand[0].rank}.`,
    `\nCurrent hand: Its a ${dealerCounter.isHardTotal ? "hard" : "soft"} ${
      dealerCounter.total
    }.\n\n`
  );

  let dealerStands = dealerCounter.total >= 17;

  while (!dealerStands && !playerLost) {
    const card = deck.cards.pop();
    dealerHand.push(card);
    dealerCounter.updateTotal(card.rank);

    dealerStands = dealerCounter.total >= 17;
    const dealerBusted = dealerCounter.total > 21;

    printStatus(card, dealerCounter, dealerBusted, "dealer");
  }
};
