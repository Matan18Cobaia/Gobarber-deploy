import { injectable, inject } from "tsyringe";

import IAppointmentsRepository from "../repositories/IAppointmentsRepository";
import Appointment from "../infra/typeorm/entities/Appointment";
import ICacheProvider from "@shared/container/providers/CacheProvider/models/ICacheProvider";


interface Request {
  provider_id: string;
  month: number;
  year: number;
  day: number;
}

@injectable()
class ListProviderAppointmentsService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
    @inject('CacheProvider')
    private cacheProvider: ICacheProvider
  ) { }

  public async execute({ provider_id, year, month, day }: Request): Promise<Appointment[]> {
    const cacheKey = `provider-appointments:${provider_id}:${year}-${month}-${day}`;
    let appointments = await this.cacheProvider.recover<Appointment[]>(cacheKey);
    if (!appointments) {
      appointments = await this.appointmentsRepository.findAllInDayFromProvider({
        provider_id,
        year,
        month,
        day
      })
      await this.cacheProvider.save(cacheKey, appointments)
    }
    await this.cacheProvider.save('as', 'asd');

    return appointments;
  }
}
export default ListProviderAppointmentsService;
