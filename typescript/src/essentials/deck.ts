import { DEFAULT_RANKS, SPECIAL_RANKS } from "../utils/constants";
import { Card } from "./card";
import { Suit } from "./suit";

export class Deck {
  public cards: Array<Card> = [];

  // constructor params for testing only
  constructor(
    private numSuits: number = 4,
    private ranks: Array<number> = DEFAULT_RANKS
  ) {
    const suits = Object.values(Suit).slice(0, numSuits);

    for (let suit in suits) {
      for (let rank of ranks) {
        this.cards.push(new Card(this.getCardRank(rank), suits[suit]));
      }
    }

    this.cards = this.shuffleDeck(this.cards);
  }

  private getCardRank = (rank: number): number => SPECIAL_RANKS[rank] ?? rank;

  private shuffleDeck = (unshuffledDeck: Array<Card>): Array<Card> =>
    unshuffledDeck
      .map((card: Card) => ({ card, sortBy: Math.random() }))
      .sort((a, b) => a.sortBy - b.sortBy)
      .map(({ card }: { card: Card }) => card);
}
