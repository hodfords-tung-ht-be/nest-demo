import { Controller, Get, Post, Body, Param, Patch } from '@nestjs/common';
import { ApiOkResponse, ApiParam, ApiTags } from '@nestjs/swagger';
import { plainToClass } from 'class-transformer';

import { CreateRestaurantDTO } from './dtos/create-restaurant.dto';
import { RestaurantDTO } from './dtos/restaurant.dto';
import { RestaurantsDTO } from './dtos/restaurants.dto';

import { RestaurantService } from './restaurant.service';

@ApiTags('restaurants')
@Controller('api/restaurants')
export class RestaurantController {
  constructor(private readonly restaurantService: RestaurantService) {}

  @Get()
  @ApiOkResponse({ type: RestaurantDTO, isArray: true })
  async index(): Promise<RestaurantsDTO> {
    const restaurants = await this.restaurantService.find();
    return plainToClass(RestaurantsDTO, { restaurants });
  }

  @Post()
  @ApiOkResponse({ type: RestaurantDTO })
  async create(
    @Body() createRestaurantDTO: CreateRestaurantDTO,
  ): Promise<RestaurantDTO> {
    const restaurant = await this.restaurantService.create(createRestaurantDTO);

    return plainToClass(RestaurantDTO, restaurant);
  }

  @Patch(':id')
  @ApiOkResponse({ type: RestaurantDTO })
  async update(
    @Param('id') id: string,
    @Body() createRestaurantDTO: CreateRestaurantDTO,
  ): Promise<RestaurantDTO> {
    const restaurant = await this.restaurantService.update(
      id,
      createRestaurantDTO,
    );

    return plainToClass(RestaurantDTO, restaurant);
  }
}
