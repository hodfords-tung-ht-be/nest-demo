import { Exclude, Expose, Type } from 'class-transformer';

import { RestaurantDTO } from './restaurant.dto';

@Exclude()
export class RestaurantsDTO {
  @Expose()
  @Type(() => RestaurantDTO)
  readonly restaurants: RestaurantDTO[];
}
