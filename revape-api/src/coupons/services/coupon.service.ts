import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/shared/services/crud.service';
import { Coupon, CouponDocument } from '../models/coupon.schema';
import { Constants } from 'src/shared/utils/constants.utils';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { CouponStatisticsDocument } from '../models/coupon-statistics.schema';
import { CouponStatistics } from '../models/coupon-statistics.schema';
import { Errors } from 'src/shared/errors/errors';

@Injectable()
export class CouponService extends CrudService<Coupon> {
  constructor(
    @InjectModel(Coupon.name, Constants.MONGO_CONNECTION_NAME)
    protected readonly model: Model<CouponDocument>,
    @InjectModel(CouponStatistics.name, Constants.MONGO_CONNECTION_NAME)
    protected readonly statisticsModel: Model<CouponStatisticsDocument>,
  ) {
    super();
  }

  create(data: Partial<Coupon>): Promise<Coupon> {
    return super.create(data);
  }

  async buyCoupon(couponId: string, userId: string, usersPoints: number) {
    const couponCode = Math.random().toString(36).substring(2, 8);

    const coupon = await this.model.findById(couponId);

    if (usersPoints < coupon.requiredPoints) {
      throw Errors.coupons.notEnoughPoints;
    }

    await this.statisticsModel.findOneAndUpdate(
      { couponId, userId },
      {
        $inc: { couponsNumber: 1 },
        $push: { couponCodes: couponCode },
      },
      { upsert: true, new: true },
    );

    return coupon.requiredPoints;
  }

  async getMyCoupons(filter: Partial<CouponStatistics>) {
    const couponsData = await this.statisticsModel
      .find(filter)
      .populate('coupon')
      .lean()
      .exec();

    return couponsData;
  }
}
