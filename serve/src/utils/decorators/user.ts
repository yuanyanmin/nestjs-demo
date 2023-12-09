import { ExecutionContext, createParamDecorator } from "@nestjs/common";

export const GetUser = createParamDecorator((data, ctx: ExecutionContext) => {
  return ctx.switchToHttp().getRequest().user
})