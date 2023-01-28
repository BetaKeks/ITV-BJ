import { Card } from "./card";
import { specialRanks, Suit } from "./suit";
export class Deck {
  public cards: Array<Card> = [];

  constructor() {
    const suits = Object.values(Suit);

    for (let suit in Object.keys(Suit)) {
      for (let rank = 1; rank < 14; rank += 1) {
        this.cards.push(new Card(this.getCardRank(rank), suits[suit]));
      }
    }

    this.cards = this.shuffleDeck(this.cards);
  }

  private getCardRank = (rank: number): number => specialRanks[rank] ?? rank;

  private shuffleDeck = (unshuffledDeck: Array<Card>): Array<Card> =>
    unshuffledDeck
      .map((card: Card) => ({ card, sortBy: Math.random() }))
      .sort((a, b) => a.sortBy - b.sortBy)
      .map(({ card }: { card: Card }) => card);
}
