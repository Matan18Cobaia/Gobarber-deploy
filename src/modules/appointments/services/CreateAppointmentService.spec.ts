import 'reflect-metadata';
import CreateAppointmentService from "./CreateAppointmentService";
import FakeAppointmentsRepository from "../repositories/fakes/FakeAppointmentsRepository";
import FakeCacheProvider from "@shared/container/providers/CacheProvider/fakes/FakeCacheProvider";
import FakeNotificationsRepository from "@modules/notifications/repositories/fakes/FakeNotificationsRepository";
import AppError from '@shared/errors/AppError';

let fakeAppointmentsRepository: FakeAppointmentsRepository;
let fakeCacheProvider: FakeCacheProvider;
let fakeNotificationsRepository: FakeNotificationsRepository;
let createAppointmentService: CreateAppointmentService;

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    fakeNotificationsRepository = new FakeNotificationsRepository();
    fakeCacheProvider = new FakeCacheProvider();

    createAppointmentService = new CreateAppointmentService(
      fakeAppointmentsRepository,
      fakeNotificationsRepository,
      fakeCacheProvider);
  })
  it('should be able to create a new appointment', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    })
    const appointment = await createAppointmentService.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: '13213212',
      user_id: '213145'
    });
    expect(appointment).toHaveProperty('id');
    expect(appointment.provider_id).toBe('13213212');
  })
  it('should not be able to create two appointments on the same time', async () => {
    const appointmentDate = new Date(2020, 8, 10, 11);
    await createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '13213212',
      user_id: '213145'

    });

    await expect(createAppointmentService.execute({
      date: appointmentDate,
      provider_id: '13213212',
      user_id: '213145'
    })).rejects.toBeInstanceOf(AppError);
  })
  it('should not be able to create an appointment on a past date', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    })

    await expect(createAppointmentService.execute({
      date: new Date(2020, 4, 10, 11),
      provider_id: '13213212',
      user_id: '213145'
    })).rejects.toBeInstanceOf(AppError);
  })
  it('should not be able to create an appointment with same user as provider', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    })

    await expect(createAppointmentService.execute({
      date: new Date(2020, 4, 10, 13),
      provider_id: 'equalId',
      user_id: 'equalId'
    })).rejects.toBeInstanceOf(AppError);
  })
  it('should not be able to create an appointment outside befor 8am and after 5pm', async () => {
    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 4, 10, 12).getTime();
    })

    await expect(createAppointmentService.execute({
      date: new Date(2020, 4, 11, 7),
      provider_id: 'provider_id',
      user_id: 'user_id'
    })).rejects.toBeInstanceOf(AppError);

    await expect(createAppointmentService.execute({
      date: new Date(2020, 4, 11, 18),
      provider_id: 'provider_id',
      user_id: 'user_id'
    })).rejects.toBeInstanceOf(AppError);
  })

});
