import { User } from './types';

export const users: User[] = [
  {
    username: 'admin',
    password: 'admin123',
    role: 'admin'
  },
  {
    username: 'student',
    password: 'student123',
    role: 'student'
  }
];

export const authenticate = (username: string, password: string): User | null => {
  const user = users.find(
      (u) => u.username === username && u.password === password
  );
  return user || null;
};