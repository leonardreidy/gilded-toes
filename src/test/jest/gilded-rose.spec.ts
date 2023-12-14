import { Item, GildedRose } from '@/gilded-rose';

describe('Gilded Rose', () => {
  it('should foo', () => {
    const expectedName = 'foo';
    const gildedRose = new GildedRose([new Item('foo', 0, 0)]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toBe(expectedName);
  });

  it('should instantiate a new Item', () => {
    const expectedName = 'Tucker Butternugs';
    const expectedSellIn = 10;
    const expectedQuality = 14;
    const item = new Item(expectedName, expectedSellIn, expectedQuality);
    expect(
      expect.objectContaining({
        name: expectedName,
        sellIn: expectedSellIn,
        quality: expectedQuality
      })
    ).toEqual(item);
  });

  it('should instantiate a new GildedRose with an item in its data store', () => {
    const expectedName = 'Tucker Butternugs';
    const expectedSellIn = 10;
    const expectedQuality = 14;
    const item = new Item(expectedName, expectedSellIn, expectedQuality);
    const gildedRose = new GildedRose([item]);
    expect(gildedRose.items).toEqual([item]);
  });

  it('should update the quality of an item', () => {
    const expectedName = 'Tucker Butternugs';
    const expectedSellIn = 10;
    const expectedQuality = 14;
    const item = new Item(expectedName, expectedSellIn, expectedQuality);
    const gildedRose = new GildedRose([item]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(expectedQuality - 1);
  });

  it('should update the sellIn of an item', () => {
    const expectedName = 'Tucker Butternugs';
    const expectedSellIn = 10;
    const expectedQuality = 14;
    const item = new Item(expectedName, expectedSellIn, expectedQuality);
    const gildedRose = new GildedRose([item]);
    const items = gildedRose.updateQuality();
    expect(items[0].sellIn).toBe(expectedSellIn - 1);
  });

  it('should degrade quality twice as fast after sell by date', () => {
    const expectedName = 'Tucker Butternugs';
    const expectedSellIn = 0;
    const expectedQuality = 14;
    const item = new Item(expectedName, expectedSellIn, expectedQuality);
    const gildedRose = new GildedRose([item]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(expectedQuality - 2);
  });

  it('should never have negative quality', () => {
    const expectedName = 'Tucker Butternugs';
    const expectedSellIn = 0;
    const expectedQuality = 0;
    const item = new Item(expectedName, expectedSellIn, expectedQuality);
    const gildedRose = new GildedRose([item]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(expectedQuality);
  });

  it('should increase quality of Aged Brie', () => {
    const expectedName = 'Aged Brie';
    const expectedSellIn = 10;
    const expectedQuality = 14;
    const item = new Item(expectedName, expectedSellIn, expectedQuality);
    const gildedRose = new GildedRose([item]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(expectedQuality + 1);
  });

  it('should never have quality over 50', () => {
    const expectedName = 'Aged Brie';
    const expectedSellIn = 10;
    const expectedQuality = 50;
    const item = new Item(expectedName, expectedSellIn, expectedQuality);
    const gildedRose = new GildedRose([item]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(expectedQuality);
  });

  it('should never decrease quality of Sulfuras', () => {
    const expectedName = 'Sulfuras, Hand of Ragnaros';
    const expectedSellIn = 10;
    const expectedQuality = 80;
    const item = new Item(expectedName, expectedSellIn, expectedQuality);
    const gildedRose = new GildedRose([item]);
    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(expectedQuality);
  });

  it('should increase quality of Backstage Passes', () => {
    const expectedName = 'Backstage passes to a TAFKAL80ETC concert';
    const expectedSellIn = 20;
    const expectedQuality = 14;
    const item = new Item(expectedName, expectedSellIn, expectedQuality);
    const gildedRose = new GildedRose([item]);

    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(expectedQuality + 1);
  });

  it('should increase quality of Backstage Passes by 2 when there are 10 days or less', () => {
    const expectedName = 'Backstage passes to a TAFKAL80ETC concert';
    const expectedSellIn = 10;
    const expectedQuality = 14;
    const item = new Item(expectedName, expectedSellIn, expectedQuality);
    const gildedRose = new GildedRose([item]);

    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(expectedQuality + 2);
  });

  it('should increase quality of Backstage Passes by 3 when there are 5 days or less', () => {
    const expectedName = 'Backstage passes to a TAFKAL80ETC concert';
    const expectedSellIn = 5;
    const expectedQuality = 14;
    const item = new Item(expectedName, expectedSellIn, expectedQuality);
    const gildedRose = new GildedRose([item]);

    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(expectedQuality + 3);
  });

  it('should drop quality of Backstage Passes to 0 after the concert', () => {
    const expectedName = 'Backstage passes to a TAFKAL80ETC concert';
    const expectedSellIn = 0;
    const expectedQuality = 14;
    const item = new Item(expectedName, expectedSellIn, expectedQuality);
    const gildedRose = new GildedRose([item]);

    const items = gildedRose.updateQuality();
    expect(items[0].quality).toBe(0);
  });
});
