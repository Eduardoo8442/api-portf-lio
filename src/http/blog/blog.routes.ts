import { FastifyInstance } from "fastify";
import BlogList from "../../domain/use-cases/blog.use-case";

class BlogRoute {
constructor(private readonly instance: FastifyInstance) {}

public initConnection(): void {
    this.instance.get('/blog', BlogList.executeUseCase);
}
}
export default BlogRoute;