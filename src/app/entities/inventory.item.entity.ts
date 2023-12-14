// Pseudocode representation of Inventory Item Entity and interfaces

export interface InventoryItemEntityITF {
    name: string;
    sellIn: number;
    quality: number;
  }
  
  export interface InventoryItemDataITF {
    name: string;
    sellIn: number;
    quality: number;
  }
  
  // @Entity({ tableName: 'inventory_items' })
  export class InventoryItemEntity implements InventoryItemEntityITF {
    _name: string;
    _sellIn: number;
    _quality: number;
  
    constructor(data: InventoryItemDataITF) {
      this._name = data.name;
      this._sellIn = data.sellIn;
      this._quality = data.quality;
    }
  
    // @Property({ fieldName: 'name', type: 'string' })
    get name() {
      return this._name;
    }
  
    // @Property({ fieldName: 'sellIn', type: 'number' })
    get sellIn() {
      return this._sellIn;
    }
  
    // @Property({ fieldName: 'quality', type: 'number' })
    get quality() {
      return this._quality;
    }
  
    set name(name) {
      this._name = name;
    }
  
    set sellIn(sellIn) {
      this._sellIn = sellIn;
    }
  
    set quality(quality) {
      this._quality = quality;
    }
  
  }