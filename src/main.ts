import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';

async function bootstrap() {
  // create the app
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  // start listening for shutdown hooks
  app.enableShutdownHooks();

  // set the rabbitmq microservice
  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: [process.env.RABBITMQ_URL],
      queue: 'messages-queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  // start the microservice
  await app.startAllMicroservices();

  // start the app
  await app.listen(8000, '0.0.0.0');

  // const app = await NestFactory.createMicroservice<MicroserviceOptions>(
  //   AppModule,
  //   {
  //     transport: Transport.RMQ,
  //     options: {
  //       urls: [process.env.RABBITMQ_URL],
  //       queue: 'messages-queue',
  //       queueOptions: {
  //         durable: false,
  //       },
  //     },
  //   },
  // );
}
bootstrap();
