import { InventoryItemDataITF } from "@/entities/inventory.item.entity";

export interface InventoryServiceITF {
  updateQuality(): Array<InventoryItemDataITF>;
}

export class InventoryService implements InventoryServiceITF {
  private _items: Array<InventoryItemDataITF>;
  private _opts: any;

  constructor(items: Array<InventoryItemDataITF>, opts?: any) {
    this._items = items;
    this._opts = opts;
    this.initialize(items, opts);
  }

  private initialize(data: any, opts?: any) {
    console.log('InventoryService initialized');
  }

  get items(): Array<InventoryItemDataITF> {
    return this._items;
  }

  updateQuality(): Array<InventoryItemDataITF> {
    // loop through items
    for (let i = 0; i < this.items.length; i++) {
      // if item is not Aged Brie and item is not Backstage passes
      if (this.items[i].name != 'Aged Brie' && this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
        // if item quality is greater than 0
        if (this.items[i].quality > 0) {
          // if item is not Sulfuras
          if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
            // decrease item quality by 1
            this.items[i].quality = this.items[i].quality - 1
          }
        }
      } else {
        // if item quality is less than 50
        if (this.items[i].quality < 50) {
          // increase item quality by 1
          this.items[i].quality = this.items[i].quality + 1
          // if item is Backstage passes
          if (this.items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            // if item sellIn is less than 11
            if (this.items[i].sellIn < 11) {
              // if item quality is less than 50
              if (this.items[i].quality < 50) {
                // increase item quality by 1
                this.items[i].quality = this.items[i].quality + 1
              }
            }
            // if item sellIn is less than 6
            if (this.items[i].sellIn < 6) {
              // if item quality is less than 50
              if (this.items[i].quality < 50) {
                // increase item quality by 1
                this.items[i].quality = this.items[i].quality + 1
              }
            }
          }
        }
      }
      // if item is not Sulfuras
      if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
        // decrease item sellIn by 1
        this.items[i].sellIn = this.items[i].sellIn - 1;
      }
      // if item sellIn is less than 0
      if (this.items[i].sellIn < 0) {
        // if item is not Aged Brie
        if (this.items[i].name != 'Aged Brie') {
          // if item is not Backstage passes
          if (this.items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            // if item quality is greater than 0
            if (this.items[i].quality > 0) {
              // if item is not Sulfuras
              if (this.items[i].name != 'Sulfuras, Hand of Ragnaros') {
                // decrease item quality by 1
                this.items[i].quality = this.items[i].quality - 1
              }
            }
          } else {
            // substract the item's quality from itself 
            this.items[i].quality = this.items[i].quality - this.items[i].quality
          }
        } else {
          // if item quality is less than 50
          if (this.items[i].quality < 50) {
            // increase item quality by 1
            this.items[i].quality = this.items[i].quality + 1
          }
        }
      }
    }

    return this.items;
  }

  private itemIsNotAgedBrie(item) {
    return item.name != 'Aged Brie';
  }

  private itemIsNotBackstagePasses(item) {
    return item.name != 'Backstage passes to a TAFKAL80ETC concert';
  }

  private itemQualityIsGreaterThanZero(item) {
    return item.quality > 0;
  }

  private itemIsNotSulfuras(item) {
    return item.name != 'Sulfuras, Hand of Ragnaros';
  }

  private itemQualityIsLessThanFifty(item) {
    return item.quality < 50;
  }

  private itemSellInIsLessThanEleven(item) {
    return item.sellIn < 11;
  }

  private itemSellInIsLessThanSix(item) {
    return item.sellIn < 6;
  }

  itemSellInIsLessThanZero(item) {
    return item.sellIn < 0;
  }
}