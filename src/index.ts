import app from "./app";
import path from "path";
import DataBase from "./database/database";
import FormBody from "./services/formbody/formbody.service";
import routesApplication from "./http/routes";
import fastifyMultipart from "@fastify/multipart";
import * as dotenv from 'dotenv';
dotenv.config();


const server = app.initInstance();

// Middleware de segurança para rotas POST /blog
server.addHook('onRequest', async (request, reply) => {
  if (request.method === 'POST' && request.url === '/blog') {
    const apiKey = request.headers['x-api-key'];
    
    
    if (apiKey !== process.env.SECRET_KEY) {
      return reply.status(401).send({ 
        error: 'Acesso não autorizado',
        message: 'Chave API inválida para esta operação'
      });
    }
  }
});

server.register(fastifyMultipart);
DataBase.initConnection();
FormBody.initFormBody(server);

routesApplication(server);

server.register(require('@fastify/static'), {
  root: path.join(__dirname, 'uploads'),
  prefix: '/uploads/', 
});

app.initServer();
