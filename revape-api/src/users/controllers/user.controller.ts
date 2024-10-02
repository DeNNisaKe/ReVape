import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { User } from '../models/user.schema';
import { CreateUserDto } from '../dtos/user.dto';
import { Errors } from 'src/shared/errors/errors';
import { LoginUserDto } from '../dtos/login-user.dto';
import { MongoUtils } from 'src/shared/utils/mongo.utils';
import { ChangePasswordDto } from '../dtos/change-password.dto';

@Controller('api/users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() body: CreateUserDto): Promise<User> {
    const user = await this.userService.findOne({ email: body.email });
    if (user) throw Errors.generic.userExists;

    return this.userService.create(body);
  }

  @Post('login')
  async login(@Body() body: LoginUserDto) {
    const user = await this.userService.login(body);
    if (!user) throw Errors.auth.invalidCredentials;

    const authToken = this.userService.generateAuthToken(user);

    return { ...user, authToken };
  }

  @Get(':id')
  async getUser(@Param('id') id: string) {
    return this.userService.findOne({ _id: id });
  }

  @Put(':id')
  async changePassword(
    @Param('id') id: string,
    @Body() body: ChangePasswordDto,
  ) {
    return this.userService.changePassword(id, body);
  }
}
