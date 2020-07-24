import 'reflect-metadata';
import ListProviderMonthAvailabilityService from "./ListProviderMonthAvailabilityService";
import FakeAppointmentsRepository from "@modules/appointments/repositories/fakes/FakeAppointmentsRepository";

import AppError from '@shared/errors/AppError';


let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderMonthAvailabilityService: ListProviderMonthAvailabilityService;

describe('ListProviderMonthAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderMonthAvailabilityService = new ListProviderMonthAvailabilityService(fakeAppointmentsRepository);
  })
  it('should be able to list the month availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 7, 10, 8, 0, 0),
      user_id: 'fakeId'
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 7, 10, 9, 0, 0),
      user_id: 'fakeId'
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 7, 10, 10, 0, 0),
      user_id: 'fakeId'
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 7, 10, 11, 0, 0),
      user_id: 'fakeId'
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 7, 10, 12, 0, 0),
      user_id: 'fakeId'
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 7, 10, 13, 0, 0),
      user_id: 'fakeId'
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 7, 10, 14, 0, 0),
      user_id: 'fakeId'
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 7, 10, 15, 0, 0),
      user_id: 'fakeId'
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 7, 10, 16, 0, 0),
      user_id: 'fakeId'
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 7, 10, 17, 0, 0),
      user_id: 'fakeId'
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 7, 11, 8, 0, 0),
      user_id: 'fakeId',
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      user_id: 'fakeId',
      date: new Date(2020, 6, 11, 8, 0, 0),
    })

    const availability = await listProviderMonthAvailabilityService.execute({
      provider_id: 'user',
      year: 2020,
      month: 8
    })
    expect(availability).toEqual(expect.arrayContaining([
      { day: 9, available: true },
      { day: 10, available: false },
      { day: 11, available: true },
      { day: 12, available: true },
    ]))
  });
});
