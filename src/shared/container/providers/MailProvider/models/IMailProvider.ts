import ISendMailDTO from '../dtos/ISendMaiLDTO';

export default interface IMailProvider {
  sendMail(data: ISendMailDTO): Promise<void>;
}
