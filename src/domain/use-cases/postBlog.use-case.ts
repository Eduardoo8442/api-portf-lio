import { FastifyRequest, FastifyReply } from "fastify";
import HandleBlogPost from "../../database/postBlog";
interface UserRequestBody {
    message: string;
    image: string;
    date: string;
}


class PostBlog {
    static async executeUseCase(request: FastifyRequest<{ Body: UserRequestBody }>, reply: FastifyReply): Promise<void> {
        try {
            if (!request.body) {
                reply.status(400).send({ message: 'Corpo da requisição vazio.' });
                return;
              }
              const { message, image, date } = request.body;
              if (!message || !date) {
                reply.status(400).send({ message: 'Argumentos faltando' });
                return;
              }
              const postBlog = new HandleBlogPost();
              await postBlog.init();
              const list = await postBlog.postBlog({message, image, date});
               if(!list) reply.status(404).send({ message: 'Não conseguimos enviar nenhum dado no banco de dados.' });
            reply.status(200).send({ message: 'Post enviado!' });
        } catch (e) {
            console.log(e);
            reply.status(500).send({ message: 'Erro interno do servidor.' });
        }
    }
}

export default PostBlog;