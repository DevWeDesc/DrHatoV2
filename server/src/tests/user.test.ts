import { test, expect } from '@jest/globals'
import { userController } from '../controllers/userController';
import { prismaMock } from '../../singleton'
test('should create new user ', async () => {
  const user = {
    name: 'Rich',
    username: 'hello@prisma.io',
    password: '123456',
    userType: 'admin'
  }

  await prismaMock.user.create({data: user})

  expect(prismaMock.user.create).toHaveBeenCalledWith({ data: user });

})

