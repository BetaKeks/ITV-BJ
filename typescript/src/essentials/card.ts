import { Suit } from "./suit";
export class Card {
  constructor(
    public readonly rank: number | string,
    private readonly suit: Suit
  ) {}

  public get Suit() {
    return this.suit;
  }
}
