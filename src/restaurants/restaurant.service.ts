import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import {
  Connection,
  EntityManager,
  EntityNotFoundError,
  Repository,
} from 'typeorm';

import { CreateRestaurantDTO } from './dtos/create-restaurant.dto';
import { RestaurantEntity } from './restaurant.entity';
import { CategoryEntity } from 'src/categories/category.entity';
import { RestaurantCategoryEntity } from 'src/restaurant_categories/restaurant_category.entity';
import { UpdateRestaurantDTO } from './dtos/update-restaurant.dto';

@Injectable()
export class RestaurantService {
  constructor(
    private connection: Connection,
    @InjectRepository(RestaurantEntity)
    private restaurantRepo: Repository<RestaurantEntity>,
    @InjectRepository(CategoryEntity)
    private categoryRepo: Repository<CategoryEntity>,
  ) {}

  async find(): Promise<RestaurantEntity[]> {
    return await this.restaurantRepo
      .createQueryBuilder()
      .leftJoinAndSelect(
        'RestaurantEntity.restaurantCategories',
        'RestaurantCategoryEntity',
      )
      .leftJoinAndSelect('RestaurantCategoryEntity.category', 'CategoryEntity')
      .getMany();
  }

  async create(
    createRestaurantDTO: CreateRestaurantDTO,
  ): Promise<RestaurantEntity> {
    const restaurant = this.restaurantRepo.create(createRestaurantDTO);
    let categories: CategoryEntity[] = [];

    if (createRestaurantDTO.categoryIds?.length) {
      categories = await this.categoryRepo.findByIds(
        createRestaurantDTO.categoryIds,
      );
      if (categories.length !== createRestaurantDTO.categoryIds.length) {
        throw new EntityNotFoundError(CategoryEntity.name, undefined);
      }
    }

    await this.connection.transaction(async (manager: EntityManager) => {
      await manager.save(restaurant);
      if (categories.length) {
        const restaurantCategories = categories.map((category) => {
          return {
            restaurantId: restaurant.id,
            categoryId: category.id,
          };
        });

        await manager.save(RestaurantCategoryEntity, restaurantCategories);
      }
    });
    (restaurant as any).categories = categories;

    return restaurant;
  }

  async update(
    id: string,
    updateRestaurantDTO: UpdateRestaurantDTO,
  ): Promise<RestaurantEntity> {
    const restaurant = await this.restaurantRepo.findOneOrFail(id);
    let categories: CategoryEntity[] = [];

    if (updateRestaurantDTO.categoryIds?.length) {
      categories = await this.categoryRepo.findByIds(
        updateRestaurantDTO.categoryIds,
      );
      if (categories.length !== updateRestaurantDTO.categoryIds.length) {
        throw new EntityNotFoundError(CategoryEntity.name, undefined);
      }
    }

    await this.connection.transaction(async (manager: EntityManager) => {
      await manager.update(RestaurantEntity, id, {
        name: updateRestaurantDTO.name,
      });
      await manager.delete(RestaurantCategoryEntity, {
        restaurantId: restaurant.id,
      });
      if (categories.length) {
        const restaurantCategories = categories.map((category) => {
          return {
            restaurantId: restaurant.id,
            categoryId: category.id,
          };
        });

        await manager.save(RestaurantCategoryEntity, restaurantCategories);
      }
    });

    const newRestaurant = await this.restaurantRepo.findOneOrFail(id);
    (restaurant as any).categories = categories;

    return newRestaurant;
  }
}
