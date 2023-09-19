import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller()
@ApiTags('app 总模块')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({
    summary: '测试接口',
  })
  // @ApiTags('getHello')
  getHello(): string {
    // return this.appService.getHello();
    return this.appService.getGoodbye();
  }
}
