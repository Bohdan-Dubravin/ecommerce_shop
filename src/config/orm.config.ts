import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { ProfileUser } from '../entities/ProfileUser';
import { Order } from '../entities/Order';
import { Category } from 'src/entities/Category';
import { Product } from 'src/entities/Product';

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

    entities: [User, ProfileUser, Order, Category, Product],
    synchronize: true,
    dropSchema: Boolean(parseInt(process.env.DB_DROP_SCHEMA)),
  }),
);
