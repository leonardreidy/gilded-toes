import { Item } from "./components/item.component";
import { ServiceLogger } from "./components/logger.component";
import { InventoryService } from "./services/inventory/inventory.service";

export class GildedRose {
  private _name: string;
  private _items: Array<Item>;
  private _serviceLogger: ServiceLogger;
  private _inventoryService: InventoryService;

  constructor(
    items: Array<Item>,
    inventoryService?: InventoryService,
    serviceLogger?: ServiceLogger,
  ) {
    this._name = GildedRose.name;
    this._serviceLogger = serviceLogger ?? new ServiceLogger();
    this._inventoryService = inventoryService ?? new InventoryService(this._serviceLogger);
    this._items = items;
  }

  get name(): string {
    return this._name;
  }
  get items(): Array<Item> {
    return this._items;
  }

  get inventoryService(): InventoryService {
    return this._inventoryService;
  }

  public updateQuality() {
    return this._inventoryService.updateQuality(this.items);
  }
}
