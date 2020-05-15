import { inject, injectable } from 'tsyringe';
import { getDaysInMonth, getDate } from 'date-fns';


import IAppointmentsRepository from '../repositories/IAppointmentsRepository';

interface IRequest {
  provider_id: string;
  month: number;
  year: number;
}

type IResponse = Array<{
  day: number;
  available: boolean;
}>;

@injectable()
class ListProviderMonthAvailabilityService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentsRepository: IAppointmentsRepository,
  ) {

  }

  public async execute({ provider_id, year, month }: IRequest): Promise<IResponse> {
    const appointments = await this.appointmentsRepository.findAllInMonthFromProvider({
      provider_id,
      year,
      month,
    },
    );

    const numberOfDaysInMonth = getDaysInMonth(new Date(year, month - 1));

    const eachDayArray = Array.from(
      { length: numberOfDaysInMonth },
      (_, index) => index + 1, // [1,2,3,4,5...30]
    );

    const availability = eachDayArray.map(day => {
      const appointmentsInDay = appointments.filter(appointment => {
        return getDate(appointment.date) === day;
      });
      // 8 até 17h -> um por hora -> 10 agendamentos
      return {
        day,
        available: appointmentsInDay.length < 10,
      }

    });

    return availability;
  }
}
export default ListProviderMonthAvailabilityService;
