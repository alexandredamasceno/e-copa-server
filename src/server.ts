import Fastify from 'fastify';

// Essa função será a primeira a ser chamada. Comumente chamada bootstrap.
async function bootstrap() {
    // Essa constante é basicamente meu servidor.
    const fastify = Fastify({
        // A propriedade logger permite que o Fastify envie loggs da minha aplicação
        // no caso de erros por exemplos. (monitoramento)
        logger: true,
    });

    // Abaixo criarei as rotas
    fastify.get('/pools/count', () => {
        return { count: 0 };
    });

    await fastify.listen({ port: 3333 });
}

bootstrap();
