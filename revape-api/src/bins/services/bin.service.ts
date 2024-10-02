import { Injectable } from '@nestjs/common';
import { CrudService } from 'src/shared/services/crud.service';
import { Bin, BinDocument } from '../models/bin.schema';
import { InjectModel } from '@nestjs/mongoose';
import { Constants } from 'src/shared/utils/constants.utils';
import { Model } from 'mongoose';

@Injectable()
export class BinService extends CrudService<Bin> {
  constructor(
    @InjectModel(Bin.name, Constants.MONGO_CONNECTION_NAME)
    protected readonly model: Model<BinDocument>,
  ) {
    super();
  }

  async create(data: Partial<Bin>): Promise<Bin> {
    return super.create(data);
  }
}
