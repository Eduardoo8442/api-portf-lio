import app from "./app";
import path from "path";
import DataBase from "./database/database";
import FormBody from "./services/formbody/formbody.service";
import routesApplication from "./http/routes";
import fastifyMultipart from "@fastify/multipart";


const server = app.initInstance();

server.register(fastifyMultipart);
DataBase.initConnection();
FormBody.initFormBody(server);

routesApplication(server);

server.register(require('@fastify/static'), {
  root: path.join(__dirname, 'uploads'),
  prefix: '/uploads/', 
});

app.initServer();
