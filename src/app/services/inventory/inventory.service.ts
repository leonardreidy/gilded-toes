import { Item, ItemType } from "@/components/item.component";
import { ServiceLogger } from "@/components/logger.component";
import { LogType } from "@/core/core.logger";

export enum ServiceDefaults {
  DefaultQualityDecayValue = 1,
  DefaultQualityIncreaseValue = 1,
  DefaultSellInIncreaseValue = 1,
}

export interface InventoryServiceITF {
  updateQuality(items): Array<Item>;
}

/**
 * InventoryService
 * @description Receives requests for actions on inventory items and coordinates services and resources
 * to fulfill those requests
 * @class InventoryService
 * @param serviceLogger ServiceLogger takes ServiceLogger as a constructor parameter
 */
export class InventoryService implements InventoryServiceITF {
  private _name: string;

  constructor(private serviceLogger: ServiceLogger) {
    this._name = InventoryService.name;
    this.initialize({});
  }

  get name(): string {
    return this._name;
  }

  public initialize(opts: any) {
    this.serviceLogger.log(`${this.name} is initializing`, LogType.INFO);
  }

  public updateQuality(items: Array<Item>): Array<Item> {
    return this.updateQualityDeprecated(items);
  }

  /**
   * “Conjured” items degrade in Quality twice as fast as normal items
   */
  private updateConjuredItems(items: Array<Item>): Array<Item> {
    items?.map((item: Item) => {
      if(this.isAConjuredItem(item)) {
        return this.decreaseItemQualityByTwiceTheDefault(item);
      }
    });
    return items;
  }

  // Check for new Conjured type item: ItemType.Conjured
  private isAConjuredItem(item: Item): Item {
    item.type === ItemType.Conjured;
    return item;
  }

  // New rule for new Conjured type item (ItemType.Conjured)
  private decreaseItemQualityByTwiceTheDefault(item: Item): Item {
    this.serviceLogger.log(String(item.quality), LogType.INFO);
    if (item.quality === 0) {
      return item;
    }
    if (item.quality - (2 * ServiceDefaults.DefaultQualityDecayValue) < 0) {
      item.quality = 0;
    };
    return item;
  }

  // TODO - add conditions for new item
  private updateQualityDeprecated(items: Array<Item>): Array<Item> {
    this.serviceLogger.log(`${this.name}::updateQualityDeprecated is currently updating items`, LogType.INFO);
    // loop through items
    for (let i = 0; i < items.length; i++) {
      
      // if item is not Aged Brie and item is not Backstage passes and item is not a Conjured item
      if (items[i].name != 'Aged Brie' && 
        items[i].name != 'Backstage passes to a TAFKAL80ETC concert' &&
        !this.isAConjuredItem(items[i])) {
        // if item quality is greater than 0
        if (items[i].quality > 0) {
          // if item is not Sulfuras
          if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
            // decrease item quality by 1
            items[i].quality = items[i].quality - 1
          }
        }
      } else {
        // if item quality is less than 50
        if (items[i].quality < 50) {
          // increase item quality by 1
          items[i].quality = items[i].quality + 1
          // if item is Backstage passes
          if (items[i].name == 'Backstage passes to a TAFKAL80ETC concert') {
            // if item sellIn is less than 11
            if (items[i].sellIn < 11) {
              // if item quality is less than 50
              if (items[i].quality < 50) {
                // increase item quality by 1
                items[i].quality = items[i].quality + 1
              }
            }
            // if item sellIn is less than 6
            if (items[i].sellIn < 6) {
              // if item quality is less than 50
              if (items[i].quality < 50) {
                // increase item quality by 1
                items[i].quality = items[i].quality + 1
              }
            }
          }
        }
      }
      
      // if item is not Sulfuras
      if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
        // decrease item sellIn by 1
        items[i].sellIn = items[i].sellIn - 1;
      }
      
      // if item sellIn is less than 0 and item is not a Conjured item
      if (items[i].sellIn < 0 && !this.isAConjuredItem(items[i])) {
        // if item is not Aged Brie
        if (items[i].name != 'Aged Brie') {
          // if item is not Backstage passes
          if (items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
            // if item quality is greater than 0
            if (items[i].quality > 0) {
              // if item is not Sulfuras
              if (items[i].name != 'Sulfuras, Hand of Ragnaros') {
                // decrease item quality by 1
                items[i].quality = items[i].quality - 1
              }
            }
          } else {
            // substract the item's quality from itself 
            if (!this.isAConjuredItem(items[i])) {
              items[i].quality = items[i].quality - items[i].quality
            }
          }
        } else {
          // if item quality is less than 50
          if (items[i].quality < 50) {
            // increase item quality by 1
            items[i].quality = items[i].quality + 1
          }
        }
      }
      if(this.isAConjuredItem(items[i])) {
        this.decreaseItemQualityByTwiceTheDefault(items[i])
      }
    }
    
    return items;
  }

  /** Update logic v2 (WIP) */
  private updateQualityV2(items: Array<Item>): Array<Item> {
    /**
     * Use formal logic to simplify rules. For example, note that
     * by Conjunctive Simplification: 
     * (P ∧ Q) -> P , (P ∧ Q) -> Q implies that 
     * (p ∧ q) -> (r -> (s -> t)) is equivalent to
     * p -> (r -> (s -> t)) and ultimately, it can be shown that
     * (p ∧ q ∧ r ∧ s) -> t by applying simplification and implication
     */
    const updates = items.map((item: Item) => {

      if(this.itemIsNotAgedBrie(item) && this.itemIsNotBackstagePasses(item)) {
        if(this.itemQualityIsGreaterThanZero(item)) {
          if (this.itemIsNotSulfuras(item)) {
            this.decreaseItemQualityByDefaultDecayValue(item)
          }
        }
      }

      if(this.itemQualityIsLessThanFifty(item)) {
        item.quality = item.quality + 1;
        if(!this.itemIsNotBackstagePasses(item)) {
          if(this.itemSellInIsLessThanEleven(item)) {
            if (this.itemQualityIsLessThanFifty(item)) {
              this.increaseItemQualityByDefault(item);
            }
          }
          if(this.itemSellInIsLessThanSix(item)) {
            if(this.itemQualityIsLessThanFifty(item)) {
              this.increaseItemQualityByDefault(item);
            }
          }
        }
      }

      if (this.itemIsNotSulfuras(item)) {
        this.increaseItemSellInByDefaultValue(item)
      }

      if(this.itemSellInIsLessThanZero(item)) {
        if(this.itemIsNotAgedBrie(item)) {
          if(this.itemIsNotBackstagePasses(item)) {
            if(this.itemQualityIsGreaterThanZero(item)) {
              if (this.itemIsNotSulfuras(item)) {
                this.decreaseItemQualityByDefaultDecayValue(item)
              }
            }
          } 
          if(!this.itemIsNotBackstagePasses(item)) {
            this.decreaseItemQualityByItsCurrentValue(item)
          }
        }
        if(!this.itemIsNotAgedBrie(item)) {
          if (this.itemQualityIsLessThanFifty(item)) {
            this.increaseItemQualityByDefault(item)
          }
        }
      }
    });

    return updates as unknown as Array<Item>;
  }


  /** Update Actions */

  private decreaseItemQualityByItsCurrentValue(item: Item, currentValue?: number): Item {
    item.quality = item.quality - (currentValue ?? item.quality);
    return item;
  }

  private increaseItemQualityByDefault(item: Item, qualityIncreaseValue?: number): Item {
    item.quality = item.quality + (qualityIncreaseValue ?? ServiceDefaults.DefaultQualityIncreaseValue);
    return item;
  }

  private decreaseItemQualityByDefaultDecayValue(item, qualityDecayValue?: number): Item {
    item.quality = item.quality - (qualityDecayValue ?? ServiceDefaults.DefaultQualityDecayValue);
    return item;
  }

  private increaseItemSellInByDefaultValue(item, sellInIncreaseValue?: number): Item {
    item.sellIn = item.sellIn + (sellInIncreaseValue ?? ServiceDefaults.DefaultSellInIncreaseValue);
    return item;
  }

  /** Conditions */
  private itemIsNotAgedBrie(item): boolean {
    return item.name != 'Aged Brie';
  }

  private itemIsNotBackstagePasses(item): boolean {
    return item.name != 'Backstage passes to a TAFKAL80ETC concert';
  }

  private itemQualityIsGreaterThanZero(item): boolean {
    return item.quality > 0;
  }

  private itemIsNotSulfuras(item): boolean {
    return item.name != 'Sulfuras, Hand of Ragnaros';
  }

  private itemQualityIsLessThanFifty(item): boolean {
    return item.quality < 50;
  }

  private itemSellInIsLessThanEleven(item): boolean {
    return item.sellIn < 11;
  }

  private itemSellInIsLessThanSix(item): boolean {
    return item.sellIn < 6;
  }

  private itemSellInIsLessThanZero(item): boolean {
    return item.sellIn < 0;
  }
}