import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as Redis from 'ioredis';
import { Model } from 'mongoose';
import { RedisService } from 'nestjs-redis';
import { IResponse } from 'src/interfaces/reponse.interface';
import { User } from 'src/interfaces/user.interface';

@Injectable()
export class UserService {
  private response: IResponse;
  private redis: Redis.Redis;
  constructor(
    @InjectModel('USER_MODEL') private readonly userModel: Model<User>,
    private readonly redisService: RedisService,
  ) {
    this.redis = this.redisService.getClient();
  }

  /**
   * 根据手机号查找用户
   * @param phone
   * @returns
   */
  public async findOneByPhone(phone: string) {
    return await this.userModel.find({
      phone,
    });
  }

  public async hello() {
    return await this.redis.set('management', 'hello world management');
    // return {
    //   code: 0,
    //   msg: 'hello',
    // };
  }
}
