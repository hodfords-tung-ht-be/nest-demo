import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { RestaurantModule } from './restaurants/restaurant.module';

@Module({
  imports: [TypeOrmModule.forRoot(), RestaurantModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
