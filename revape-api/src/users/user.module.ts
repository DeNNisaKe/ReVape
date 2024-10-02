import { MongooseModule } from '@nestjs/mongoose';
import { User, UserSchema } from './models/user.schema';
import { Constants } from 'src/shared/utils/constants.utils';
import { UserService } from './services/user.service';
import { Module } from '@nestjs/common';
import { UserController } from './controllers/user.controller';
import { JwtModule } from '@nestjs/jwt';

const UsersMongooseModule = MongooseModule.forFeature(
  [{ name: User.name, schema: UserSchema, collection: 'users' }],
  Constants.MONGO_CONNECTION_NAME,
);

@Module({
  controllers: [UserController],
  providers: [UserService],
  imports: [UsersMongooseModule, JwtModule],
  exports: [UsersMongooseModule, UserService],
})
export class UserModule {}
