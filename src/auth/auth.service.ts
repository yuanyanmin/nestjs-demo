import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IResponse } from 'src/interfaces/reponse.interface';
import { User } from 'src/interfaces/user.interface';
import { UserService } from 'src/modules/user/user.service';
import { encript } from 'src/utils/encription';

const logger = new Logger('auth.service');

@Injectable()
export class AuthService {
  private response: IResponse;
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    @InjectModel('USER_MODEL') private readonly userModel: Model<User>,
  ) {}

  /**
   * 用户登录验证
   * @param user
   */
  private async validateUser(user: User) {
    const phone: string = user.phone;
    const password: string = user.password;
    return this.userService
      .findOneByPhone(phone)
      .then((res) => {
        if (res.length === 0) {
          this.response = {
            code: 3,
            msg: '用户尚未注册',
          };
          throw this.response;
        }
        return res[0];
      })
      .then((dbUser: User) => {
        const pass = encript(password, dbUser.salt);
        if (pass === dbUser.password) {
          this.response = {
            code: 0,
            msg: '用户登录成功',
          };
          return this.response;
        } else {
          this.response = {
            code: 4,
            msg: '密码错误',
          };
          throw this.response;
        }
      })
      .catch((err) => {
        return err;
      });
  }

  /**
   * 用户登录
   * @param user
   * @returns
   */
  public async login(user: User) {
    // return await this.validateUser(user).then(() => {
    //   return this.createToken(user);
    // });
    return await this.validateUser(user)
      .then(async (res: IResponse) => {
        if (res.code !== 0) {
          this.response = res;
          throw this.response;
        }
        const userId = res.msg.userId;
        this.response = {
          code: 0,
          msg: { token: await this.createToken(user), userId },
        };
        return this.response;
      })
      .catch((err) => err);
  }

  /**
   * 注册方法
   * @param user
   * @returns
   */
  public async regist(user: User) {
    return this.userService
      .findOneByPhone(user.phone)
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

  private async createToken(user: User) {
    return await this.jwtService.sign(user);
  }
}
