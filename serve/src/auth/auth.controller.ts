import { Controller, Get, Post, Body, Patch, Param, Delete, Logger } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { loginDto } from './dto/login.dto';
import { Public } from 'src/utils/decorators/public';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
  private logger = new Logger('AuthController')

  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('/register')
  @ApiOperation({ summary: '用户注册' })
  register(@Body() registerDto: RegisterDto) {
    this.logger.log(`Registering user: ${registerDto.mobile}`)
    return this.authService.register(registerDto);
  }

  @Public()
  @Post('/login')
  @ApiOperation({ summary: '用户登录' })
  login(@Body() loginDto: loginDto) {
    this.logger.log(`Logging user: ${loginDto.mobile}`)
    return this.authService.login(loginDto);
  }
}
