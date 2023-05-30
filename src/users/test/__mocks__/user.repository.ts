const mockUserRepository = {
  create: jest.fn().mockImplementation((dto) => dto),
  save: jest.fn().mockImplementation((user) =>
    Promise.resolve({
      id: 'asfi2372j32',
      password: expect.any(String),
      ...user,
    }),
  ),
  findOneBy: jest.fn().mockImplementation((id) => false),
};
export default mockUserRepository;
