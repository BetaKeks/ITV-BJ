import { Card } from "../essentials/card";
import { Counter } from "../essentials/counter";
import { Deck } from "../essentials/deck";

// both start with 2 cards, dealer shows the second one
export const initializePlayerAndDealer = (
  deck: Deck
): {
  playerHand: Array<Card>;
  playerCounter: Counter;
  dealerHand: Array<Card>;
  dealerCounter: Counter;
} => {
  const playerHand = new Array<Card>();
  const playerCounter = new Counter();

  const dealerHand = new Array<Card>();
  const dealerCounter = new Counter();

  dealCard(deck, playerHand, playerCounter);
  dealCard(deck, dealerHand, dealerCounter);

  dealCard(deck, playerHand, playerCounter);

  const openCard = dealCard(deck, dealerHand, dealerCounter);
  console.log(`Dealer hit with ${openCard?.Suit} ${openCard?.rank}.\n\n`);

  return { playerHand, playerCounter, dealerHand, dealerCounter };
};

export const dealCard = (
  deck: Deck,
  hand: Array<Card>,
  counter: Counter
): Card => {
  const card = deck.cards.pop();
  hand.push(card);
  counter.updateTotal(card.rank);

  return card;
};
