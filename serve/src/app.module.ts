import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
// import { User } from './modules/user/user.entity';
import { CategoryModule } from './category/category.module';
import { ShopModule } from './shop/shop.module';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: '192.168.80.123',
      port: 3306,
      username: 'root',
      password: '12345678',
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
