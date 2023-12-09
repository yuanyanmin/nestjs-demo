import * as joi from 'joi'

export const configSchemaValidater = joi.object({
  DB_HOST: joi.string().default('localhost'),
  DB_PORT: joi.number().default(3306),
  DB_USERNAME: joi.string().default('root'),
  DB_PASSWORD: joi.string().default('123456'),
  DB_DATABASE: joi.string().default('nestjs_shop'),
  DB_SYNCHRONIZE: joi.boolean().default(false),
  JWT_SECRET: joi.string().default('102030'),
  JWT_EXPIRES: joi.number().default(86400)
})