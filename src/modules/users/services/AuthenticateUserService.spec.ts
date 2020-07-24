import 'reflect-metadata';
import FakeUsersRepository from "../repositories/fakes/FakeUsersRepository";
import FakeHashProvider from "../providers/HashProvider/fakes/FakeHashProvider";
import AuthenticateUserService from "./AuthenticateUserService";
import CreateUserService from "./CreateUserService";
import AppError from '@shared/errors/AppError';

let fakeUsersRepository: FakeUsersRepository;
let fakeHashProvider: FakeHashProvider;
let authenticateUserService: AuthenticateUserService;

describe('CreateUser', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository();
    fakeHashProvider = new FakeHashProvider();
    authenticateUserService = new AuthenticateUserService(fakeUsersRepository, fakeHashProvider);
  })
  it('should be able to authenticate', async () => {

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })
    const response = await authenticateUserService.execute({
      email: 'johndoe@example.com',
      password: '123456'
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  })
  it('should not be able to authenticate with not existing user', async () => {

    await expect(authenticateUserService.execute({
      email: 'johndoe1@example.com',
      password: '123456'
    })).rejects.toBeInstanceOf(AppError);
  })

  it('should not be able to authenticate with wrong password', async () => {

    await fakeUsersRepository.create({

      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456'
    })

    await expect(authenticateUserService.execute({
      email: 'johndoe@example.com',
      password: '12346'
    })).rejects.toBeInstanceOf(AppError);
  })
});
