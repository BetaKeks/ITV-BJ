import { describe, expect, test } from "@jest/globals";
import { Deck } from "../src/essentials/deck";
import { Counter } from "../src/essentials/counter";
import { Card } from "../src/essentials/card";
import { dealCard } from "../src/mechanics/initializations";

describe("Test deck", () => {
  test("Should have 52 cards", () => {
    expect(new Deck().cards.length).toBe(52);
  });

  test("Should have 4 distinct suits", () => {
    expect(new Set(new Deck().cards.map((card) => card.Suit)).size).toBe(4);
  });
});

describe("Test counter", () => {
  const createSetup = (
    numSuits?: number,
    ranks?: Array<number>
  ): { deck: Deck; hand: Array<Card>; counter: Counter } => ({
    deck: new Deck(numSuits, ranks),
    hand: new Array<Card>(),
    counter: new Counter(),
  });

  const dealCards = (
    deck: Deck,
    hand: Array<Card>,
    counter: Counter,
    numCards: number = 1
  ): void => {
    for (let i = 0; i < numCards; i += 1) {
      dealCard(deck, hand, counter);
    }
  };

  test("Hard 16", () => {
    const { deck, hand, counter } = createSetup(1, [10, 5, 1]);
    dealCards(deck, hand, counter, 3);

    expect(counter.total).toBe(16);
    expect(counter.isHardTotal).toBe(true);
  });

  test("Hard 22", () => {
    const { deck, hand, counter } = createSetup(1, [12, 10, 1, 1]);
    dealCards(deck, hand, counter, 4);

    expect(counter.total).toBe(22);
    expect(counter.isHardTotal).toBe(true);
  });

  test("Soft 22", () => {
    const { deck, hand, counter } = createSetup(1, [10, 13, 2]);
    dealCards(deck, hand, counter, 3);

    expect(counter.total).toBe(22);
    expect(counter.isHardTotal).toBe(false);
  });

  test("Hard 21", () => {
    const { deck, hand, counter } = createSetup(1, [1, 2, 3, 4, 1]);
    dealCards(deck, hand, counter, 5);

    expect(counter.total).toBe(21);
    expect(counter.isHardTotal).toBe(false);
  });

  test("Soft 21", () => {
    const { deck, hand, counter } = createSetup(1, [1, 2, 3, 5]);
    dealCards(deck, hand, counter, 4);

    expect(counter.total).toBe(21);
    expect(counter.isHardTotal).toBe(false);
  });

  test("Soft 30", () => {
    const { deck, hand, counter } = createSetup(1, [10, 11, 12]);
    dealCards(deck, hand, counter, 3);

    expect(counter.total).toBe(30);
    expect(counter.isHardTotal).toBe(false);
  });

  test("Hard 30", () => {
    const { deck, hand, counter } = createSetup(1, [1, 9, 12, 13]);
    dealCards(deck, hand, counter, 4);

    expect(counter.total).toBe(30);
    expect(counter.isHardTotal).toBe(true);
  });

  test("Soft 13", () => {
    const { deck, hand, counter } = createSetup(1, [1, 2]);
    dealCards(deck, hand, counter, 2);

    expect(counter.total).toBe(13);
    expect(counter.isHardTotal).toBe(false);
  });

  test("Hard 13", () => {
    const { deck, hand, counter } = createSetup(1, [10, 2, 1]);
    dealCards(deck, hand, counter, 3);

    expect(counter.total).toBe(13);
    expect(counter.isHardTotal).toBe(true);
  });
});
