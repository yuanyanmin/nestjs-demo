import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './user/entities/user.entity';
import { CategoryModule } from './category/category.module';
import { ShopModule } from './shop/shop.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: '123456',
      database: 'nestjs_shop',
      // entities: [User],
      synchronize: true,
      autoLoadEntities: true
    }),
    CategoryModule,
    ShopModule,
    UserModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
