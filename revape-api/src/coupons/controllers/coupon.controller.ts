import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CouponService } from '../services/coupon.service';
import { Coupon, CouponType } from '../models/coupon.schema';
import { CreateCouponDto } from '../dtos/create-coupon.dto';
import { UserService } from 'src/users/services/user.service';

@Controller('api/coupons')
export class CouponController {
  constructor(
    private readonly couponService: CouponService,
    private readonly userService: UserService,
  ) {}

  @Post()
  async buyCoupon(@Body() body: { couponId: string; userId: string }) {
    const user = await this.userService.findOne({
      _id: body.userId,
    });
    const usedPoints = await this.couponService.buyCoupon(
      body.couponId,
      body.userId,
      user.points,
    );

    await this.userService.updateById(body.userId, {
      points: user.points - usedPoints,
    });

    return { success: true };
  }

  @Post(':type')
  async create(
    @Param('type') type: string,
    @Body() body: CreateCouponDto,
  ): Promise<Coupon> {
    switch (type) {
      case 'discount':
        body.type = CouponType.Discount;
        break;
      case 'free_product':
        body.type = CouponType.FreeProduct;
        body.discount = 100;
        break;
    }

    return this.couponService.create(body);
  }

  @Get()
  async getCoupons() {
    return this.couponService.findAll({});
  }

  @Get(':id')
  async getMyCoupons(@Param('id') id: string) {
    return this.couponService.getMyCoupons({ userId: id });
  }
}
