import { Request, Response } from "express";
import { container } from "tsyringe";
import ListProviderDayAvailabilityService from "@modules/appointments/services/ListProviderDayAvailabilityService";

export default class ProviderdayAvailabilityController {
  public async index(request: Request, response: Response): Promise<Response> {
    const { provider_id } = request.params;
    const { day, month, year } = request.body;

    const listProvidersDayAvailability = container.resolve(ListProviderDayAvailabilityService);

    const availability = await listProvidersDayAvailability.execute({ day, provider_id, year, month });

    return response.json(availability);
  }
}
