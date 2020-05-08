import { sign } from 'jsonwebtoken';
import authConfig from '../../../config/auth';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';


import AppError from '@shared/errors/AppError';

import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';


interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

@injectable()
class AuthenticateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject("HashProvider")
    private hashProvider: IHashProvider,
  ) { }

  public async execute({ email, password }: IRequest): Promise<IResponse> {

    const user = await this.usersRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401);
    }
    // user.password = senha criptografada
    //password = senha não criptografada
    //compare compara uma senha nao criptografada, com uma criptografada, e ve se elas batem
    const passwordMatched = await this.hashProvider.compareHash(password, user.password);

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401);
    }
    //nao precisa de await pq eh um metodo assincrono e nao retorna uma promise
    //1 parametro -> informaçÕes que pode passar do usuario para pode usar depois
    //   ex: permissoes de usuario, nome de usuario(se quiser acesso direto)
    // nao pode por credenciais importantes(email e senha princ.) PAYLOAD
    // 2 parametro -> chave secreta(string) gerado pelo http://www.md5.cz/ com qlqer coisa
    //3 parametro -> config do token

    const { secret, expiresIn } = authConfig.jwt;

    const token = sign({}, secret, {
      subject: user.id, //sempre id do usuario
      expiresIn,
    })

    return {
      user,
      token
    }
  }
}

export default AuthenticateUserService;
