export class Counter {
  private _total: number = 0;
  private _containsAce: boolean = false;
  private _isHardTotal: boolean = false;

  constructor() {}

  public get total() {
    return this._total;
  }

  public set total(value: number) {
    this._total += value;
  }

  public get containsAce() {
    return this._containsAce;
  }

  public set containsAce(containsAce: boolean) {
    this._containsAce = containsAce;
  }

  public get isHardTotal() {
    return this._isHardTotal;
  }

  public set isHardTotal(isHardTotal: boolean) {
    this._isHardTotal = isHardTotal;
  }

  public updateTotal(valueToAdd: number | string) {
    if (typeof valueToAdd === "number") {
      this.countAceAsOne(valueToAdd);
      this._total += valueToAdd;
      return;
    }

    if (valueToAdd === "A") {
      this.handleAce();
      return;
    }

    this.countAceAsOne(10);
    this._total += 10;
  }

  // count an existing ace as 1 if the a new card would bust the player/dealer
  // also make sure not to reduce more than once (soft total -> hard total)
  private countAceAsOne = (valueToAdd: number) => {
    if (
      this._total + valueToAdd > 21 &&
      this._containsAce &&
      !this._isHardTotal
    ) {
      this._total -= 10;
      this._isHardTotal = true;
    }
  };

  private handleAce = () => {
    if (this._containsAce) {
      this.countAceAsOne(1);
      this._total += 1;
      return;
    }

    if (!this._containsAce) {
      this._containsAce = true;
    }

    if (this._total + 11 > 21) {
      this._total += 1;
      this._isHardTotal = true;
      return;
    }

    this._total += 11;
  };
}
