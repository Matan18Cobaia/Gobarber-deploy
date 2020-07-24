import 'reflect-metadata';
import ListProviderDayAvailabilityService from "./ListProviderDayAvailabilityService";
import FakeAppointmentsRepository from "@modules/appointments/repositories/fakes/FakeAppointmentsRepository";

import AppError from '@shared/errors/AppError';


let fakeAppointmentsRepository: FakeAppointmentsRepository;
let listProviderDayAvailabilityService: ListProviderDayAvailabilityService;

describe('ListProviderDayAvailability', () => {
  beforeEach(() => {
    fakeAppointmentsRepository = new FakeAppointmentsRepository();
    listProviderDayAvailabilityService = new ListProviderDayAvailabilityService(fakeAppointmentsRepository);
  })
  it('should be able to list the day availability from provider', async () => {
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 8, 20, 14, 0, 0),
      user_id:'fakeId'
    })
    await fakeAppointmentsRepository.create({
      provider_id: 'user',
      date: new Date(2020, 8, 20, 15, 0, 0),
      user_id:'fakeId'
    })

    jest.spyOn(Date, 'now').mockImplementationOnce(() => {
      return new Date(2020, 8, 20, 11).getTime();
    })

    const availability = await listProviderDayAvailabilityService.execute({
      provider_id: 'user',
      year: 2020,
      month: 9,
      day: 20
    })
    expect(availability).toEqual(expect.arrayContaining([
      { hour: 8, available: false },
      { hour: 9, available: false },
      { hour: 10, available: false },
      { hour: 11, available: false },
      { hour: 12, available: true },
      { hour: 14, available: false },
      { hour: 15, available: false },
      { hour: 17, available: true },
    ]))
  });
});
