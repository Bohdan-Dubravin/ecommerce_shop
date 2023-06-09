import { Module } from '@nestjs/common';

import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from './config/orm.config';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { ProductModule } from './modules/product/product.module';
import { OrderModule } from './modules/order/order.module';
import { CategoryModule } from './modules/category/category.module';
import ormConfigProd from './config/orm.config.prod';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,

      expandVariables: true,
      envFilePath: `${process.env.NODE_ENV}.env`,
    }),
    TypeOrmModule.forRootAsync({
      useFactory:
        process.env.NODE_ENV !== 'production' ? ormConfig : ormConfigProd,
    }),
    AuthModule,
    UsersModule,
    ProductModule,
    OrderModule,
    CategoryModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
