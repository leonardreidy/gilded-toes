import { InventoryItemDataITF } from "@/entities/inventory.item.entity";

export class Item implements InventoryItemDataITF {
  private _name: string;
  private _sellIn: number;
  private _quality: number;
  constructor(
    name: string,
    sellIn: number,
    quality: number,
  ) {
    this._name = name;
    this._sellIn = sellIn;
    this._quality = quality;
  }

  public get name(): string {
    return this._name;
  }

  public set name(value: string) {
    this._name = value;
  }

  public get sellIn(): number {
    return this._sellIn;
  }

  public set sellIn(value: number) {
    this._sellIn = value;
  }

  public get quality(): number {
    return this._quality;
  }

  public set quality(value: number) {
    this._quality = value;
  }
}
