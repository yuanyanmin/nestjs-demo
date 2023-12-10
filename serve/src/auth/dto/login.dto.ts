import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, Length, Matches } from "class-validator";

export class loginDto {
  @IsNotEmpty({
    message: '手机号不能为空'
  })
  @Matches(/1[0-9]{10}/, {
    message: '手机号不合法'
  })
  @ApiProperty({
    type: String,
    default: '15678909877',
    description: '手机号'
  })
  mobile: string;

  @IsNotEmpty({
    message: '密码号不能为空'
  })
  @Length(6, 20)
  @ApiProperty({
    type: String,
    default: '123456',
    description: '密码'
  })
  password: string;
}