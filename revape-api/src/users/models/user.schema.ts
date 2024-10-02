import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

export enum Role {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

@Schema({ timestamps: true })
export class User {
  _id?: string | ObjectId;

  @Prop({
    type: String,
    required: true,
  })
  userName: string;

  @Prop({
    type: String,
    required: true,
  })
  email: string;

  @Prop({
    type: String,
    required: true,
  })
  password: string;

  @Prop({
    type: String,
  })
  salt?: string;

  @Prop({
    type: String,
    enum: Role,
    default: Role.USER,
  })
  role: Role;

  @Prop({
    type: Number,
    default: 0,
  })
  points: number;

  @Prop({
    type: Date,
    default: Date.now,
  })
  createdAt?: Date;

  @Prop({
    type: Date,
    default: Date.now,
  })
  updatedAt?: Date;
}
export const UserSchema = SchemaFactory.createForClass(User);
export type UserDocument = User & Document;

UserSchema.index({ email: 1 }, { unique: true });
