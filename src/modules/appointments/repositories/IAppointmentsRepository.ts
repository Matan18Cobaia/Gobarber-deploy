import Appointment from '../infra/typeorm/entities/Appointment';

import ICreateAppointmentDTO from "../dtos/ICreateAppointmentDTO";
import IFindAllInMonthFromProviderDTO from '../dtos/IFindAllInMonthProviderDTO';
import IFindAllInDayFromProviderDTO from '../dtos/IFindAllInDayProviderDTO';

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>;
  findByDate(date: Date, provider_id: string): Promise<Appointment | undefined>;
  findAllInMonthFromProvider(data: IFindAllInMonthFromProviderDTO): Promise<Appointment[]>;
  findAllInDayFromProvider(data: IFindAllInDayFromProviderDTO): Promise<Appointment[]>;
};
