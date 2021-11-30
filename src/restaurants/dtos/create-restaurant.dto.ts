import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsOptional, MaxLength, IsString } from 'class-validator';
import { SHORT_LENGTH } from 'src/common/constants/common.constant';

export class CreateRestaurantDTO {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @MaxLength(SHORT_LENGTH)
  readonly name: string;

  @ApiProperty()
  @IsOptional()
  readonly categoryIds: string[];
}
