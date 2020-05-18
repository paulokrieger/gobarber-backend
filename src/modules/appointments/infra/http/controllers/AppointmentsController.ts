import { Request, Response } from 'express';
import { parseISO } from 'date-fns';
import { container } from 'tsyringe';
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService';


export default class AppointmentsController {
  public async create(request: Request, response: Response): Promise<Response> {
    const user_id = request.user.id;  // pega o usuário logado
    const { provider_id, date } = request.body;

    const createAppointment = container.resolve(CreateAppointmentService);
    /*
    Vai carregar o service, vai ver no constructor dele se ta precisando de qlqer depdencia
    Vai no container, verifica se tem dependencia e retorna uma instance de appointmentsrepository

    */

    const appointment = await createAppointment.execute({
      date, provider_id, user_id
    });

    return response.json(appointment);

  }
}
