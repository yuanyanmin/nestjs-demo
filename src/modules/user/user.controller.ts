import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'src/interfaces/user.interface';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
// import { AuthGuard } from 'src/guards/auth.guard';
import { Role } from '../role/role.decorator';
import { AuthGuard } from '@nestjs/passport';

@Controller('user')
@ApiTags('用户模块')
// @UseGuards(AuthGuard)
@UseGuards(AuthGuard('jwt'))
@ApiBearerAuth('jwt')
export class UserController {
  constructor(private userService: UserService) {}

  @Get('hello')
  // @SetMetadata('roles', ['admin'])
  @Role('admin')
  // @UseGuards(AuthGuard('jwt'))
  @ApiOperation({
    summary: '测试hello',
  })
  async hello() {
    return 'hello world';
  }
}
