import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongoose';

@Schema({ timestamps: true })
export class Bin {
  _id?: string | ObjectId;

  @Prop({
    type: String,
    required: true,
  })
  name: string;

  @Prop({
    type: Number,
    required: true,
  })
  capacity: number;

  @Prop({
    type: Number,
    required: true,
  })
  percentage: number;

  @Prop({
    type: String,
    required: true,
  })
  coordinates: string;
}
export const BinSchema = SchemaFactory.createForClass(Bin);
export type BinDocument = Bin & Document;
