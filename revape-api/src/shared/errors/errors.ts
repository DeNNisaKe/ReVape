import { HttpException } from '@nestjs/common';

export class AppException extends HttpException {
  constructor(status: number, message: string) {
    super(message, status);
  }
}

export const Errors = {
  generic: {
    userExists: new AppException(400, 'User already exists'),
  },
  auth: {
    invalidPassword: new AppException(
      400,
      'Password must contain at least 6 characters',
    ),
    invalidCredentials: new AppException(400, 'Invalid credentials'),
  },
  coupons: {
    notEnoughPoints: new AppException(400, 'Not enough points'),
  },
};
