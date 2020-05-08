/**
 * Se usuario ja tiver uma imagem, apagar antiga e atualizar para nova
 * Verificar se usuário existe
 */

import path from 'path';
import uploadConfig from '../../../config/upload';
import { inject, injectable } from 'tsyringe';

import fs from 'fs'; //fileysstem do node
import User from '../infra/typeorm/entities/User';
import AppError from '../../../shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IStorageProvider from '@shared/container/providers/StorageProvider/models/IStorageProvider';


interface IRequest {
  user_id: string;
  avatarFilename: string;
}

@injectable()
class UpdateUserAvatarService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('StorageProvider')
    private storageProvider: IStorageProvider,
    ) { }

  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    //precisa atualizar o usuario, precisa pegar o repositório de usuários

    // precisa verificar se o ID é um ID de user válido

    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Only authenticated users can change avatar!', 401);
    }
    //verifica se já tem avatar
    if (user.avatar) {
      await this.storageProvider.deleteFile(user.avatar);
    }

    const filename = await this.storageProvider.saveFile(avatarFilename);

    //   // //Deleta avatar anterior -> join une dois caminhos
    //   // const userAvatarFilePath = path.join(uploadConfig.directory, user.avatar);
    //   // //fs -> filesystem -> stat = traz o status de um arquivo, se existir
    //   // const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

    //   if (userAvatarFileExists) {
    //     //deletando o avatar caso exista
    //     await fs.promises.unlink(userAvatarFilePath);
    //   }
    // }
    user.avatar = filename;

    await this.usersRepository.save(user);

    return user;

  }
}
export default UpdateUserAvatarService;
