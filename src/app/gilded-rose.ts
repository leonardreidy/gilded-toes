import { Item } from "./components/item.component";
import { InventoryRulesEngine } from "./components/rules.engine.component";
import { CoreResultType, CoreRuleType } from "./core/core.rules.engine";
import { InventoryService } from "./services/inventory/inventory.service";

export class GildedRose<Rule extends CoreRuleType, Result extends CoreResultType> {
  private _items: Array<Item>;
  private _inventoryService: InventoryService<Rule, Result>;

  constructor(
    items: Array<Item>,
    inventoryService?: InventoryService<Rule, Result>,
  ) {
    this._items = items;
    this._inventoryService = inventoryService ??
      new InventoryService<Rule, Result>(new InventoryRulesEngine<Rule, Result>());
  }

  get items(): Array<Item> {
    return this._items;
  }

  get inventoryService(): InventoryService<Rule, Result> {
    return this._inventoryService;
  }

  public updateQuality() {
    return this._inventoryService.updateQuality(this.items);
  }
}
