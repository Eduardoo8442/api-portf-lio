import { FastifyInstance } from 'fastify';

class CorsConfig {
    static initCors(instance: FastifyInstance): void {
        instance.register(require('@fastify/cors'), {
            origin: 'https://eduardoodev.netlify.app',
            methods: ['GET', 'POST']
        });
    }
}

export default CorsConfig;