import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { Auth } from '../../auth/decorators/auth.decorator';
import { UsersService } from '../users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/User';
import { ProfileUser } from '../../entities/ProfileUser';
import userStub from './stubs/user.stub';
import mockUserService from './__mocks__/users.service';
describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        // {
        //   provide: getRepositoryToken(User),
        //   useClass: Repository,
        // },
        // {
        //   provide: getRepositoryToken(ProfileUser),
        //   useClass: Repository,
        // },
        { provide: Auth, useValue: jest.fn().mockImplementation(() => true) },
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    usersController = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);
  });

  describe('Create user', () => {
    let user: User;
    beforeEach(async () => {
      user = await usersController.createUser({
        email: userStub().email,
        password: 'test12345',
      });
    });

    it('should call usersService', () => {
      expect(usersService.createUser).toBeCalled();
    });

    it('than should return a new user', () => {
      expect(user).toEqual(userStub());
    });
  });

  describe('Get user by id', () => {
    let user: User;
    beforeEach(async () => {
      user = await usersController.getUserById(userStub().id);
    });

    it('should call usersService', () => {
      expect(usersService.getUserById).toBeCalledWith(userStub().id);
    });

    it('than should return a user', () => {
      expect(user).toEqual({ ...userStub(), id: expect.any(String) });
    });
  });

  describe('Get all users', () => {
    let users: User[];
    beforeEach(async () => {
      users = await usersController.getAllUsers();
    });

    it('should call usersService', () => {
      expect(usersService.getAllUsers).toBeCalled();
    });

    it('than should return a users', () => {
      expect(users).toEqual([userStub()]);
    });
  });

  describe('Update user', () => {
    let user: User[];
    beforeEach(async () => {
      user = await usersController.getAllUsers();
    });

    it('should call usersService', () => {
      expect(usersService.getAllUsers).toBeCalled();
    });

    it('than should return a users', () => {
      expect(user).toEqual([userStub()]);
    });
  });
});
