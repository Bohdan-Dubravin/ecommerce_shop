import { User } from '../../../entities/User';

const userStub = (): Omit<
  User,
  'password' | 'refreshTokens' | 'created_at'
> => {
  return {
    id: 'khjsdfsd',
    email: 'test@gmail.com',
    role: 'user',
  };
};
export default userStub;
