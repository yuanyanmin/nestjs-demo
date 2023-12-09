import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from 'src/user/entities/user.entity';
import { RegisterDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private logger = new Logger('AuthService')

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ){}

  async register(data: RegisterDto) {
    const { name, mobile, password } = data
    const found = await this.userRepository.findOne({
      where: {
        mobile
      }
    })
    if (found) {
      throw new InternalServerErrorException('账号已存在')
    }

    const salt = await bcrypt.genSalt()
    const hash = await bcrypt.hash(password, salt)

    const user = await this.userRepository.create({
      name,
      mobile,
      password: hash
    });
    user.createAt = new Date()
    user.updateAt = new Date()
    
    try {
      return this.userRepository.save(user)
    } catch(error) {
      this.logger.log(`Failed to register user: ${JSON.stringify(user)}`, error.stack)
      throw new InternalServerErrorException('注册失败')
    }
  }

  async login(data: loginDto) {
    const { mobile, password } = data
    const found = await this.userRepository.findOne({
      where: {
        mobile
      }
    })
    if (!found) {
      throw new InternalServerErrorException('账号不存在')
    }

    const { password: hash, id } = found;
    const isMatch = await bcrypt.compare(password, hash)

    if (!isMatch) {
      throw new InternalServerErrorException('账号密码错误')
    }

    return this.jwtService.sign({
      id,
      timestamp: Date.now()
    })
  }

  async findById(id: number) {
    const user = this.userRepository.findOne({
      where: {
        id
      }
    })

    return user
  }
}
