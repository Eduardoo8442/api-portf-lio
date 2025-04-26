import { FastifyInstance } from "fastify";
import PostBlog from "../../domain/use-cases/postBlog.use-case";

class PostBlogRoute {
constructor(private readonly instance: FastifyInstance) {}

public initConnection(): void {
    this.instance.post('/blog', PostBlog.executeUseCase);
}
}
export default PostBlogRoute;