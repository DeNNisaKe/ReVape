import { Injectable } from '@nestjs/common';
import { Role, User, UserDocument } from '../models/user.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CrudService } from '../../shared/services/crud.service';
import { Constants } from '../../shared/utils/constants.utils';
import * as crypto from 'crypto';
import { Errors } from 'src/shared/errors/errors';
import { JwtService } from '@nestjs/jwt';
import { ChangePasswordDto } from '../dtos/change-password.dto';

@Injectable()
export class UserService extends CrudService<User> {
  constructor(
    @InjectModel(User.name, Constants.MONGO_CONNECTION_NAME)
    protected readonly model: Model<UserDocument>,
    private jwtService: JwtService,
  ) {
    super();
  }

  generateAuthToken(user: User): string {
    return this.jwtService.sign(
      { email: user.email },
      { secret: Constants.secret },
    );
  }

  create(data: Partial<User>): Promise<User> {
    const salt = crypto.randomBytes(16).toString('hex');
    const password = crypto
      .pbkdf2Sync(data.password, salt, 1000, 64, 'sha512')
      .toString('hex');

    if (data.password.length < 6) throw Errors.auth.invalidPassword;

    return super.create({
      ...data,
      password: password,
      salt,
      role: Role.USER,
    });
  }

  async login(data: Partial<User>): Promise<User> {
    const user = await this.findOne({ email: data.email });

    return this.findOne({
      email: data.email,
      password: crypto
        .pbkdf2Sync(data.password, user.salt, 1000, 64, 'sha512')
        .toString('hex'),
    });
  }

  async findOne(query: Partial<User>): Promise<User> {
    return this.model.findOne(query).lean();
  }

  async changePassword(id: string, data: ChangePasswordDto): Promise<User> {
    const user = await this.findById(id);

    if (!user) throw Errors.auth.invalidCredentials;

    const password = crypto
      .pbkdf2Sync(data.oldPassword, user.salt, 1000, 64, 'sha512')
      .toString('hex');

    if (user.password !== password) throw Errors.auth.invalidCredentials;
    if (data.newPassword.length < 6) throw Errors.auth.invalidPassword;

    const newPassword = crypto
      .pbkdf2Sync(data.newPassword, user.salt, 1000, 64, 'sha512')
      .toString('hex');

    return this.updateById(id, { password: newPassword });
  }
}
