import 'reflect-metadata';
import 'dotenv/config';

import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { errors } from 'celebrate';
import 'express-async-errors';

import uploadConfig from '@config/upload';
import AppError from '@shared/errors/AppError';
import rateLimiter from './middlewares/rateLimiter';
import routes from './routes';

import '@shared/infra/typeorm';
import '@shared/container';

const app = express();

app.use(rateLimiter);
app.use(cors());
app.use(express.json());
app.use('/files', express.static(uploadConfig.uploadsFolder)); //rota direta para mostrar todos os arquivos salvos
//http://localhost:3333/files/NOMEIMAGEM -> já puxa a imagem
app.use(routes);
//Trativa de errors
app.use(errors());

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) { //se conhece o erro, se for originzado atraves do app, retornar o erro de maneira legal pro front
      return response.status(err.statusCode).json({
        status: 'error',
        message: err.message,
      })
    }
    //erro descnhecido no app
    console.error(err);
    return response.status(500).json({
      status: 'error',
      message: 'Internal server error',
    })
  });

app.listen(3333, () => {
  console.log('Server started');
})
