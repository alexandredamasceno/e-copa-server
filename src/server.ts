import Fastify from 'fastify';
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

    // Abaixo criarei as rotas
    fastify.get('/pools/count', async () => {
        // O prisma já me mostra as minhas tabelas
        const getAllPools = await prisma.pool.count();
        return { count: getAllPools };
    });

    await fastify.listen({ port: 3333 });
}

bootstrap();
