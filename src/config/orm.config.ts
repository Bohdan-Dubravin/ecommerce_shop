import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { ProfileUser } from '../entities/ProfileUser';
import { Order } from '../entities/Order';
import { Category } from '../entities/Category';
import { Product } from '../entities/Product';
import { Payment } from '../entities/Payment';
import { OrderItem } from '../entities/OrderItem';

export default registerAs(
  'orm.config',
  (): TypeOrmModuleOptions => ({
    type: 'postgres',
    host: process.env.POSTGRES_HOST,
    port: Number(process.env.POSTGRES_PORT),
    username: 'myuser',
    password: process.env.POSTGRES_PASSWORD,
    // password: 'mypassword',
    database: process.env.POSTGRES_DB,

    // database: 'ecommerse',

    entities: [
      User,
      ProfileUser,
      Order,
      Category,
      Product,
      Order,
      Payment,
      OrderItem,
    ],
    synchronize: true,
    dropSchema: Boolean(parseInt(process.env.DB_DROP_SCHEMA)),
  }),
);
