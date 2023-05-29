import userStub from '../test/stubs/user.stub';

const usersService = jest.fn().mockReturnValue({
  createUser: jest.fn().mockReturnValue(userStub()),
  getUserById: jest.fn().mockReturnValue(userStub()),
  getAllUsers: jest.fn().mockReturnValue([userStub()]),
  updateUserById: jest.fn().mockReturnValue(userStub()),
});
export default usersService;
