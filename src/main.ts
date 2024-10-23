import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { envs } from './config/envs';
import { Logger } from '@nestjs/common';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const logger = new Logger('OrdersMS-Main');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    AppModule,
    {
      transport: Transport.TCP,
     // transport : Transport.NATS,
      options: {
        port: envs.port,
        //servers: envs.natsServers
      },
    },
  );
  //*Esto se usa solo cuando es una configuración REST
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //   }),
  // );
  await app.listen();
  logger.log(
    `El microservicio OrdersMS esta corriendo en el puerto ${envs.port}`,
  );
}
bootstrap();
