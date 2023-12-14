import { Item } from "@/components/item.component";
import { CoreResultType, CoreRuleType } from "@/core/core.rules.engine";

// Rules
const itemIsNotAgedBrie = (item: Item) => item.name != 'Aged Brie';
const itemIsNotBackstagePasses = (item: Item) => item.name != 'Backstage passes to a TAFKAL80ETC concert';
const itemQualityIsGreaterThanZero = (item: Item) => item.quality > 0;
const itemIsNotSulfuras = (item: Item) => item.name != 'Sulfuras, Hand of Ragnaros';
const itemQualityIsLessThanFifty = (item: Item) => item.quality < 50;
const itemSellInIsLessThanEleven = (item: Item) => item.sellIn < 11;
const itemSellInIsLessThanSix = (item: Item) => item.sellIn < 6;
const itemSellInIsLessThanZero = (item: Item) => item.sellIn < 0;

// Results
const decrementSellIn = (item: Item) => { item.sellIn = item.sellIn - 1 };
const increaseItemQualityByOne = (item: Item) => { item.quality = item.quality + 1 };
const decreaseItemQualityByOne = (item: Item) => { item.quality = item.quality - 1 };

enum BaseRuleset {
  ItemIsNotAgedBrie = 'itemIsNotAgedBrie',
  ItemIsNotBackstagePasses = 'itemIsNotBackstagePasses',
  ItemQualityIsGreaterThanZero = 'itemQualityIsGreaterThanZero',
  ItemIsNotSulfuras = 'itemIsNotSulfuras',
  ItemQualityIsLessThanFifty = 'itemQualityIsLessThanFifty',
  ItemSellInIsLessThanEleven = 'itemSellInIsLessThanEleven',
  ItemSellInIsLessThanSix = 'itemSellInIsLessThanSix',
  ItemSellInIsLessThanZero = 'itemSellInIsLessThanZero',
}

export const baseRules = new Map(
  [[String(BaseRuleset.ItemIsNotAgedBrie), { rule: itemIsNotAgedBrie, result: decrementSellIn }]],
);
