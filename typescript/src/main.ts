import { Deck } from "./essentials/deck";
import { dealerTurn, playerTurn } from "./mechanics/turns";
import { initializePlayerAndDealer } from "./mechanics/initializations";

async function main(whenFinished: () => void) {
  const deck = new Deck();

  const { playerHand, playerCounter, dealerHand, dealerCounter } =
    initializePlayerAndDealer(deck);

  const playerLost = await playerTurn(deck, playerHand, playerCounter);

  if (!playerLost) {
    dealerTurn(dealerCounter, playerLost, deck, dealerHand);
  }

  if (playerLost) {
    console.log("Dealer wins.\n\n");
  } else if (
    dealerCounter.total > 21 ||
    dealerCounter.total < playerCounter.total
  ) {
    console.log("Player wins.\n\n");
  } else if (dealerCounter.total === playerCounter.total) {
    console.log("Its a tie.\n\n");
  } else if (dealerCounter.total > playerCounter.total) {
    console.log("Dealer wins.\n\n");
  }

  whenFinished();
}

main(() => {
  process.exit();
});
