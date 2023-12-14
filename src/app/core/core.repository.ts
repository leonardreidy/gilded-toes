// Pseudocode representation of Abstract Core Repository
import { CoreEntity } from "@/core/core.entity";

export interface CoreRepositoryITF {
  findOne(id: number): CoreEntity;
  findAll(): Array<CoreEntity>;
  create(entity: Partial<CoreEntity>): void;
  save(entity: Partial<CoreEntity>): void;
  update(entity: Partial<CoreEntity>): void;
  delete(entity: CoreEntity): void;
}

export abstract class CoreRepository<T extends CoreEntity> implements CoreRepositoryITF {
  abstract findOne(id: number): T;
  abstract findAll(): Array<T>;
  abstract create(entity: Partial<T>): T;
  abstract save(entity: Partial<T>): T;
  abstract update(entity: Partial<T>): T;
  abstract delete(entity: T): void;
}