import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IResponse } from 'src/interfaces/reponse.interface';
import { User } from 'src/interfaces/user.interface';

const logger = new Logger('user.service');

@Injectable()
export class UserService {
  private response: IResponse;
  constructor(
    @InjectModel('USER_MODEL') private readonly userModel: Model<User>,
  ) {}

  /**
   * 注册方法
   * @param user
   * @returns
   */
  public async regist(user: User) {
    return this.findOneByPhone(user.phone)
      .then((res) => {
        if (res && res.length) {
          this.response = {
            code: 1,
            msg: '当前手机号已经注册',
          };
          throw this.response;
        }
      })
      .then(async () => {
        try {
          const createUser = new this.userModel(user);
          await createUser.save();
          this.response = {
            code: 0,
            msg: '注册成功',
          };
          return this.response;
        } catch (error) {
          this.response = {
            code: 2,
            msg: '用户注册失败' + error,
          };
          throw this.response;
        }
      })
      .catch((err) => {
        logger.error('发生问题：' + err.msg);
        return this.response;
      });
  }

  /**
   * 根据手机号查找用户
   * @param phone
   * @returns
   */
  private async findOneByPhone(phone: string) {
    return await this.userModel.find({
      phone,
    });
  }
}
