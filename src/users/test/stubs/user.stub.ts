import { User } from '../../../entities/User';

const userStub = (): Omit<User, 'password' | 'refreshTokens'> => {
  return {
    id: 'khjsdfsd',
    email: 'test@gmail.com',
    role: 'user',
    created_at: new Date(),
  };
};
export default userStub;
