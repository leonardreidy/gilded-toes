// Pseudocode representation of Inventory Item Repository
import { CoreRepository } from '@/core/core.repository';
import { InventoryItemDataITF, InventoryItemEntity } from '@/entities/inventory.item.entity';

// @Injectable()
// export class InventoryItemRepository extends CoreRepository<InventoryItemEntity>
export class InventoryItemRepository extends CoreRepository<InventoryItemEntity> {
  constructor() {
    super();
  }

  findOne(id: number): InventoryItemEntity {
    return new InventoryItemEntity({ name: 'test', sellIn: 1, quality: 1});
  }

  findAll(): Array<InventoryItemEntity> {
    return [new InventoryItemEntity({ name: 'test', sellIn: 1, quality: 1})];
  }

  create(entity: InventoryItemDataITF): InventoryItemEntity {
    return new InventoryItemEntity(entity);
  }

  save(entity: InventoryItemDataITF): InventoryItemEntity {
    return new InventoryItemEntity(entity);
  }

  update(entity: InventoryItemDataITF): InventoryItemEntity {
    return new InventoryItemEntity(entity)
  }

  delete(entity: InventoryItemDataITF): InventoryItemEntity {
    return new InventoryItemEntity(entity);
  }

}