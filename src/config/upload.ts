import multer from 'multer';
import path from 'path'; //passa o caminho
import crypto from 'crypto'; //gerador de hash/criptografias

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp');

export default {
  tmpFolder: tmpFolder,
  uploadsFolder: path.resolve(tmpFolder, 'uploads'),

  storage: multer.diskStorage({
    //__dirname pega o diretorio atual, como está em config, tem que voltar 2x para chegar na tmp
    destination: tmpFolder,
    //não quer que duas imagens fique com o mesmo nome
    //filename é uma funcao que recebe o request, o arquivo e a callback
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('HEX');
      const fileName = `${fileHash}-${file.originalname}`;

      //aceita duas propriedades, um erro(caso exista) e o nome do arquivo
      return callback(null, fileName);
    },
  }),
};
