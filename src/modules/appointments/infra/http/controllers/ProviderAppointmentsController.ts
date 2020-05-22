import { Request, Response } from 'express';
import { container } from 'tsyringe';

import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService';
import { classToClass } from 'class-transformer';


export default class ProviderAppointmentsController {
  public async index(request: Request, response: Response): Promise<Response> {
    const provider_id = request.user.id;  // pega o usuário logado
    const { day, month, year } = request.query;

    const listProviderAppointments = container.resolve(ListProviderAppointmentsService);
    /*
    Vai carregar o service, vai ver no constructor dele se ta precisando de qlqer depdencia
    Vai no container, verifica se tem dependencia e retorna uma instance de appointmentsrepository

    */

    const appointments = await listProviderAppointments.execute({
      provider_id,
      day: Number(day),
      month: Number(month),
      year: Number(year),
    });

    return response.json(classToClass(appointments));

  }
}
