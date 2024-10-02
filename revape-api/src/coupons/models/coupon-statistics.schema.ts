import { Prop, SchemaFactory, Schema } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

@Schema({ timestamps: true })
export class CouponStatistics {
  _id?: string | ObjectId;

  @Prop({
    type: String,
    required: true,
    ref: 'User',
  })
  userId: string | ObjectId;

  @Prop({
    type: String,
    required: true,
    ref: 'Coupon',
  })
  couponId: string | ObjectId;

  @Prop({
    type: Number,
    required: true,
    default: 1,
  })
  couponsNumber: number;

  @Prop({
    type: [String],
  })
  couponCodes?: string[];
}
export const CouponStatisticsSchema =
  SchemaFactory.createForClass(CouponStatistics);
export type CouponStatisticsDocument = CouponStatistics & Document;

CouponStatisticsSchema.virtual('coupon', {
  ref: 'Coupon',
  localField: 'couponId',
  foreignField: '_id',
  justOne: true,
});
