import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/interfaces/user.interface';

@Injectable()
export class UserService {
  constructor(
    @InjectModel('USER_MODEL') private readonly userModel: Model<User>,
  ) {}

  /**
   * 注册方法
   * @param user
   * @returns
   */
  public async regist(user: User) {
    return this.userModel
      .find({
        phone: user.phone,
      })
      .then((res) => {
        if (res && res.length) {
          console.log('该用户已经存在');
          throw Error('用户已注册');
        }
      })
      .then(() => {
        try {
          const createUser = new this.userModel(user);
          return createUser.save();
        } catch (error) {
          throw Error('保存用户失败' + error);
        }
      })
      .catch((err) => {
        throw Error('发生问题' + err);
      });
  }
}
