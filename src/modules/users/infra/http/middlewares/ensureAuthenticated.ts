import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import authConfig from '@config/auth';
import AppError from '@shared/errors/AppError';

interface TokenPayload {
  iat: number;
  exp: number;
  sub: string;
}

export default function ensureAuthenticated(
  request: Request,
  response: Response,
  next: NextFunction
): void {
  //Validação do token JWT
  const authHeader = request.headers.authorization;

  if (!authHeader) {
    throw new AppError('JWT token is missing', 401);
  }

  //Bearer token
  //Divide o token em 2, a 1 parte ele tira fora e só fica com a 2 que é o token
  const [, token] = authHeader.split(' ');

  try {
    const decoded = verify(token, authConfig.jwt.secret);
    //se deu tudo certo, sera recebido o payload com iat, exp e sub
    const { sub } = decoded as TokenPayload; //forçando o tipo da variável

    //como dentro do request do express não existe a informação do tipo user
    //é necessario criar uma extensão do request, que foi realizado dentro de
    //@types/express.d.ts
    //como inclui a informacao do usuario dentro da request, dentro da rota terá info do usuário
    //e assim pode usar essa ID , na hora que for listar/agendar o serviço, já sabe quem está
    request.user = {
      id: sub,

    }

    return next();
  } catch {
    throw new AppError('Invalid JWT Token', 401);
  }

}
