import { MongooseModule } from '@nestjs/mongoose';
import { Coupon, CouponSchema } from './models/coupon.schema';
import { Constants } from 'src/shared/utils/constants.utils';
import { CouponController } from './controllers/coupon.controller';
import { CouponService } from './services/coupon.service';
import { Module } from '@nestjs/common';
import {
  CouponStatistics,
  CouponStatisticsSchema,
} from './models/coupon-statistics.schema';
import { UserModule } from 'src/users/user.module';

const CouponMongooseModule = MongooseModule.forFeature(
  [
    { name: Coupon.name, schema: CouponSchema, collection: 'coupons' },
    {
      name: CouponStatistics.name,
      schema: CouponStatisticsSchema,
      collection: 'coupon_statistics',
    },
  ],
  Constants.MONGO_CONNECTION_NAME,
);

@Module({
  controllers: [CouponController],
  providers: [CouponService],
  imports: [CouponMongooseModule, UserModule],
  exports: [CouponMongooseModule],
})
export class CouponModule {}
