import { Item } from "@/components/item.component";
import { InventoryRulesEngine } from "@/components/rules.engine.component";
import { CoreResultType, CoreRuleType } from "@/core/core.rules.engine";
import { baseRules as defaultRules } from "./base.rules";

export interface InventoryServiceITF {
  updateQuality(items): Array<Item>;
}

/**
 * InventoryService
 * @description Receives requests for actions on inventory items and coordinates services and resources
 * to fulfill those requests
 * @class InventoryService
 * @param rulesEngine: InventoryRulesEngine<Rule, Result>
 * @param baseRules?: any
 */
export class InventoryService<Rule extends CoreRuleType, Result extends CoreResultType> implements InventoryServiceITF {
  private _rulesEngine: InventoryRulesEngine<Rule, Result>;

  constructor(rulesEngine: InventoryRulesEngine<Rule, Result>, baseRules = defaultRules) {
    this._rulesEngine = rulesEngine;
    this.initialize({ baseRules });
  }

  public initialize(opts: any) {
    this._rulesEngine.initialize(opts.baseRules);
  }

  public addRule(rule: Rule, result: Result) {
    this._rulesEngine.add(rule, result);
  }

  public updateQuality(items: Array<Item>): Array<Item> {
    return this.updateQualityDeprecated(items);
  }

  
  private updateQualityDeprecated(items: Array<Item>): Array<Item> {
    // loop through items
    for (let i = 0; i < items.length; i++) {
      // if item is not Aged Brie and item is not Backstage passes
      if (items[i].name != 'Aged Brie' && items[i].name != 'Backstage passes to a TAFKAL80ETC concert') {
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
      
      // if item sellIn is less than 0
      if (items[i].sellIn < 0) {
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
            items[i].quality = items[i].quality - items[i].quality
          }
        } else {
          // if item quality is less than 50
          if (items[i].quality < 50) {
            // increase item quality by 1
            items[i].quality = items[i].quality + 1
          }
        }
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
            this.decreaseItemQualityByOne(item)
          }
        }
      }

      if(this.itemQualityIsLessThanFifty(item)) {
        item.quality = item.quality + 1;
        if(!this.itemIsNotBackstagePasses(item)) {
          if(this.itemSellInIsLessThanEleven(item)) {
            if (this.itemQualityIsLessThanFifty(item)) {
              this.increaseItemQualityByOne(item);
            }
          }
          if(this.itemSellInIsLessThanSix(item)) {
            if(this.itemQualityIsLessThanFifty(item)) {
              this.increaseItemQualityByOne(item);
            }
          }
        }
      }

      if (this.itemIsNotSulfuras(item)) {
        this.increaseItemSellInByOne(item)
      }

      if(this.itemSellInIsLessThanZero(item)) {
        if(this.itemIsNotAgedBrie(item)) {
          if(this.itemIsNotBackstagePasses(item)) {
            if(this.itemQualityIsGreaterThanZero(item)) {
              if (this.itemIsNotSulfuras(item)) {
                this.decreaseItemQualityByOne
              }
            }
          } 
          if(!this.itemIsNotBackstagePasses(item)) {
            this.decreaseItemQualityByItsCurrentValue(item)
          }
        }
        if(!this.itemIsNotAgedBrie(item)) {
          if (this.itemQualityIsLessThanFifty(item)) {
            this.increaseItemQualityByOne(item)
          }
        }
      }
    });

    return updates as unknown as Array<Item>;
  }

  /** Update Actions */
  private decreaseItemQualityByItsCurrentValue(item) {
    item.quality = item.quality - item.quality;
  }

  private increaseItemQualityByOne(item) {
    item.quality = item.quality + 1;
  }

  private decreaseItemQualityByOne(item) {
    item.quality = item.quality - 1;
  }

  private increaseItemSellInByOne(item) {
    item.sellIn = item.sellIn + 1;
  }

  /** Conditions */
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

  private itemSellInIsLessThanZero(item) {
    return item.sellIn < 0;
  }
}