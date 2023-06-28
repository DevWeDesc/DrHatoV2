import { test, expect, jest } from '@jest/globals'
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


test('should edit user', async () => {
  const updatedUser = {
    name: 'John Doe',
    username: 'john@example.com',
    password: 'newpassword',
    userType: ['admin', 'regular'],
    id: 1,
    crmv: null,
    userIsVet: true
  };

  jest.spyOn(prismaMock.user, 'update').mockResolvedValue(updatedUser);

  const result = await prismaMock.user.update({
    where: { id: updatedUser.id },
    data: {
      name: updatedUser.name,
      password: updatedUser.password,
      userType: updatedUser.userType,
      crmv: updatedUser.crmv,
      userIsVet: updatedUser.userIsVet
    }
  });

  expect(result).toEqual(updatedUser);
  expect(prismaMock.user.update).toHaveBeenCalledWith({
    where: { id: updatedUser.id },
    data: {
      name: updatedUser.name,
      password: updatedUser.password,
      userType: updatedUser.userType,
      crmv: updatedUser.crmv,
      userIsVet: updatedUser.userIsVet
    }
  });
});

test('should show list of users', async () => {
  const users = [
    { name: 'John', username: 'john@example.com', password: 'password', userType: ['admin'], id: 1, crmv: null, userIsVet: true},
  ];
  jest.spyOn(prismaMock.user, 'findMany').mockResolvedValue(users);
  const userList = await prismaMock.user.findMany();
  expect(userList).toEqual(users);
  expect(prismaMock.user.findMany).toHaveBeenCalled();
})

