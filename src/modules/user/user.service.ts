import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IResponse } from 'src/interfaces/reponse.interface';
import { User } from 'src/interfaces/user.interface';

@Injectable()
export class UserService {
  private response: IResponse;
  constructor(
    @InjectModel('USER_MODEL') private readonly userModel: Model<User>,
  ) {}

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
}
