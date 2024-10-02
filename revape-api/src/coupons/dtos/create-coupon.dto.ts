import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';
import { CouponType } from '../models/coupon.schema';

export class CreateCouponDto {
  @IsString()
  description: string;

  @IsString()
  requiredPoints: number;

  @IsNumber()
  discount?: number;

  @IsOptional()
  @IsString()
  product?: string;

  @IsEnum(CouponType)
  type: CouponType;
}
