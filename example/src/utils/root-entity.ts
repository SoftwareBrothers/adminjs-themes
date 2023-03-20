import {
  ClassConstructor,
  instanceToPlain,
  plainToInstance,
} from 'class-transformer';
import {
  BaseEntity,
  CreateDateColumn,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

export class RootEntity extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  public id: string;

  @CreateDateColumn({ name: 'created_at' })
  public createdAt: Date;

  @UpdateDateColumn({ name: 'updated_at' })
  public updatedAt?: Date;

  public toJSON() {
    return instanceToPlain(this);
  }

  public static build<T extends BaseEntity, K>(
    entity: ClassConstructor<T>,
    data: K
  ): T {
    return plainToInstance<T, K>(entity, data);
  }
}
