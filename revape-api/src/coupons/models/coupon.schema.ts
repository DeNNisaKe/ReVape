import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

export enum CouponType {
  Discount = 'discount',
  FreeProduct = 'free_product',
}

@Schema({ timestamps: true })
export class Coupon {
  _id?: string | ObjectId;

  @Prop({
    type: String,
    required: true,
  })
  description: string;

  @Prop({
    type: Number,
    required: true,
  })
  requiredPoints: number;

  @Prop({
    type: String,
    enum: Object.values(CouponType),
    required: true,
  })
  type: CouponType;

  @Prop({
    type: Number,
    min: 0,
    max: 100,
  })
  discount?: number;

  @Prop({
    type: String,
  })
  product?: string;
}
export const CouponSchema = SchemaFactory.createForClass(Coupon);
export type CouponDocument = Coupon & Document;
