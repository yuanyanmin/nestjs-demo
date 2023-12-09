import { IsNotEmpty, Length, Matches } from "class-validator";

export class RegisterDto {
  @IsNotEmpty({
    message: '手机号不能为空'
  })
  @Matches(/1[0-9]{10}/, {
    message: '手机号不合法'
  })
  mobile: string;

  @IsNotEmpty({
    message: '密码不能为空'
  })
  @Length(6, 20)
  password: string;

  @IsNotEmpty({
    message: '名称不能为空'
  })
  name: string;
}