import { MongooseModule } from '@nestjs/mongoose';
import { Constants } from 'src/shared/utils/constants.utils';
import { Module } from '@nestjs/common';
import { Bin, BinSchema } from './models/bin.schema';
import { BinController } from './controllers/bin.controller';
import { BinService } from './services/bin.service';

const BinMongooseModule = MongooseModule.forFeature(
  [{ name: Bin.name, schema: BinSchema, collection: 'bins' }],
  Constants.MONGO_CONNECTION_NAME,
);

@Module({
  controllers: [BinController],
  providers: [BinService],
  imports: [BinMongooseModule],
  exports: [BinMongooseModule],
})
export class BinModule {}
