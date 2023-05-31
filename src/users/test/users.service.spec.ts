import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from '../users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/User';
import { ProfileUser } from '../../entities/ProfileUser';
import mockUserRepository from './__mocks__/user.repository';
import * as bcrypt from 'bcrypt';
import { ForbiddenException } from '@nestjs/common';

describe('UsersService', () => {
  let usersService: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
        {
          provide: getRepositoryToken(ProfileUser),
          useClass: Repository,
        },
      ],
    }).compile();

    usersService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  describe('Create and return new user', () => {
    describe('Should Successfully create new user', () => {
      jest.spyOn(bcrypt, 'hash').mockImplementation(() => 'hash123');
      it('should call createUser method', async () => {
        expect(
          await usersService.createUser({
            email: 'test@gmail.com',
            password: 'test12345',
          }),
        ).toEqual({
          id: expect.any(String),
          email: 'test@gmail.com',
          password: expect.any(String),
        });
      });

      it('than should call findOneBy method', () => {
        expect(userRepository.findOneBy).toBeCalledWith({
          email: 'test@gmail.com',
        });
      });
      it('than should hash password', async () => {
        expect(bcrypt.hash).toHaveBeenCalledWith('test12345', 10);
      });

      it('than should call create method', () => {
        expect(userRepository.create).toBeCalledWith({
          email: 'test@gmail.com',
          password: 'hash123',
        });
      });

      it('than should call save method', () => {
        expect(userRepository.save).toBeCalled();
      });
    });

    describe('Should get error user already exist', () => {
      it('than throw error ', async () => {
        try {
          expect(
            await usersService.createUser({
              email: 'test@gmail.com',
              password: 'test12345',
            }),
          ).toBeCalled();
          expect(userRepository.findOneBy).toBeTruthy();
        } catch (error) {
          expect(error).toBeInstanceOf(ForbiddenException);
        }
      });
    });
  });
});
