import { FastifyReply, FastifyRequest } from "fastify";
import path from "path";
import fs from "fs";
import * as dotenv from 'dotenv';
dotenv.config();

class UploadImage {
  static async executeUseCase(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    try {

      const file = await request.file();

      if (!file) {
        return reply.status(400).send('Nenhum arquivo foi enviado.');
      }

      const uploadPath = path.resolve(__dirname, '../../uploads');
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true }); 
      }

     
      const randomName = Array.from({ length: 20 }, () => Math.floor(Math.random() * 10)).join('');
      const fileExtension = path.extname(file.filename); 
      const filename = `${randomName}${fileExtension}`;
      const filepath = path.join(uploadPath, filename);

      const writeStream = fs.createWriteStream(filepath);
      file.file.pipe(writeStream);

      const imageLink = `${process.env.URL}/uploads/${filename}`;
      reply.status(200).send({ imageLink });

      writeStream.on('error', (err) => {
        console.error('Erro ao salvar o arquivo:', err);
        reply.status(500).send('Erro ao processar upload.');
      });

    } catch (error) {
      console.error('Erro ao processar upload:', error);
      reply.status(500).send('Erro ao processar upload.');
    }
  }
}

export default UploadImage;
