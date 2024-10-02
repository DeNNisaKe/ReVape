import { Model, ObjectId, FilterQuery, UpdateQuery } from 'mongoose';
import { MongoUtils } from '../utils/mongo.utils';

export abstract class CrudService<T> {
  protected model: Model<T & Document>;

  public async create(data: Partial<T>): Promise<T> {
    const resource = await this.model.create(data);
    return this.findOne({ _id: resource._id });
  }

  async findOne(query: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(query).exec();
  }

  public findById(id: string | ObjectId): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  public findAll(query: FilterQuery<T>): Promise<T[]> {
    return this.model.find(query).exec();
  }

  public async updateById(
    id: string | ObjectId,
    updates: UpdateQuery<T & Document>,
  ): Promise<T | null> {
    await this.model
      .updateOne({ _id: MongoUtils.ObjectId(id.toString()) }, updates)
      .exec();
    return this.findOne({ _id: MongoUtils.ObjectId(id.toString()) });
  }

  public async updateOne(
    query: FilterQuery<T>,
    updates: UpdateQuery<T & Document>,
  ): Promise<T | null> {
    await this.model.updateOne(query, updates).exec();
    return this.findOne(query);
  }

  public async removeById(id: string | ObjectId): Promise<T | null> {
    const resource = await this.findOne({ _id: id });
    await this.model.deleteOne({ _id: id }).exec();
    return resource;
  }

  public async removeOne(query: FilterQuery<T>): Promise<T | null> {
    const resource = await this.findOne(query);
    await this.model.deleteOne(query).exec();
    return resource;
  }
}
