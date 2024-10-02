import { Module } from '@nestjs/common';
import { UserModule } from './users/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { Constants } from './shared/utils/constants.utils';
import { JwtModule } from '@nestjs/jwt';
import { CouponModule } from './coupons/coupon.module';
import { BinModule } from './bins/bin.module';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: Constants.MONGO_CONNECTION_URI,
      }),
      connectionName: Constants.MONGO_CONNECTION_NAME,
    }),
    UserModule,
    CouponModule,
    BinModule,
  ],
})
export class AppModule {}
