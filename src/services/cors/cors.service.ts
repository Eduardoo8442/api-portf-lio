import { FastifyInstance } from 'fastify';

class CorsConfig {
    static initCors(instance: FastifyInstance): void {
        instance.register(require('@fastify/cors'), {
            origin: (origin: string | undefined, cb: any) => {
                if (!origin || origin === 'https://eduardoodev.netlify.app' || origin === 'http://localhost:3000') {
                    cb(null, true); 
                } else {
                    cb(new Error('Not allowed'), false); 
                }
            },
            methods: ['GET', 'POST']
        });
    }
}

export default CorsConfig;
