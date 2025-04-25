import { FastifyRequest, FastifyReply } from "fastify";
import HandleBlogList from "../../database/getListBlog";


class BlogList {
    static async executeUseCase(request: FastifyRequest, reply: FastifyReply): Promise<void> {
        try {
              const getBlogList = new HandleBlogList();
              await getBlogList.init();
              const list = await getBlogList.getList();
            if(!list) reply.status(404).send({ message: 'Não conseguimos buscar nenhum dado no banco de dados.' });
            reply.status(200).send({ list: list });
        } catch (e) {
            console.log(e);
            reply.status(500).send({ message: 'Erro interno do servidor.' });
        }
    }
}

export default BlogList;