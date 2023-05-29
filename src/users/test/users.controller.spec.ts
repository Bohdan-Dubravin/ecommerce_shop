import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from '../users.controller';
import { Auth } from '../../auth/decorators/auth.decorator';
import { UsersService } from '../users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../../entities/User';
import { ProfileUser } from '../../entities/ProfileUser';
import userStub from './stubs/user.stub';
import mockUserService from '../__mocks__/users.service';
describe('UsersController', () => {
  let usersController: UsersController;
  let usersService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        // UsersService,
        {
          provide: getRepositoryToken(User),
          useClass: Repository,
        },
        {
          provide: getRepositoryToken(ProfileUser),
          useClass: Repository,
        },
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

  it('should be defined', () => {
    expect(usersController).toBeDefined();
  });

  describe('getUserById', () => {
    describe('when getUserById is called', () => {
      let user: User;
      beforeEach(async () => {
        console.log(usersService);

        user = await usersController.getUserById(userStub().id);
      });

      it('should call usersService', () => {
        expect(usersService.getUserById).toBeCalledWith(userStub().id);
      });
    });
  });
});
