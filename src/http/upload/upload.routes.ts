import { FastifyInstance } from "fastify";
import UploadImage from "../../domain/use-cases/upload.use-case";

export class UploadRoute {
  constructor(private readonly instance: FastifyInstance) {}

  public initConnection(): void {
    // Rota POST para fazer o upload de arquivos
    this.instance.post('/upload', UploadImage.executeUseCase);
  }
}
