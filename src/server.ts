import Fastify from 'fastify';
import cors from '@fastify/cors';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient({
    // A prop abaixa me mostra todos os loggs(acontecimentos) das minhas querys
    log: ['query'],
});

// Essa função será a primeira a ser chamada. Comumente chamada bootstrap.
async function bootstrap() {
    // Essa constante é basicamente meu servidor.
    const fastify = Fastify({
        // A propriedade logger permite que o Fastify envie loggs da minha aplicação
        // no caso de erros por exemplos. (monitoramento)
        logger: true,
    });

    await fastify.register(cors, {
        // estou dizendo que qualquer aplicação pode acessar meu servidor
        origin: true,
    });

    // Abaixo criarei as rotas
    fastify.get('/pools/count', async () => {
        // O prisma já me mostra as minhas tabelas
        const getAllPools = await prisma.pool.count();
        return { count: getAllPools };
    });

    // Esse host: '0.0.0.0' é só um detalhe para que meu server seja bem consumido no React
    // e ReactNative
    await fastify.listen({ port: 3333, host: '0.0.0.0' });
}

bootstrap();
