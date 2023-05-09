import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { User } from '../entities/User';
import { ProfileUser } from 'src/entities/ProfileUser';

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

    entities: [User, ProfileUser],
    synchronize: true,
    dropSchema: Boolean(parseInt(process.env.DB_DROP_SCHEMA)),
  }),
);
