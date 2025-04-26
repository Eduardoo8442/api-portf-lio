import { FastifyInstance } from "fastify";
import MainRoute from "./main/main.routes";
import BlogRoute from "./blog/blog.routes";
import PostBlogRoute from "./blog/postBlog.routes";
import { UploadRoute } from "./upload/upload.routes";
export default function routesApplication(instance: FastifyInstance): void {
    

    // Rotas da aplicação
    new MainRoute(instance).initConnection();
    new BlogRoute(instance).initConnection();
    new UploadRoute(instance).initConnection();
    new PostBlogRoute(instance).initConnection();
}