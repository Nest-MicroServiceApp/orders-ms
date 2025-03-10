import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities';
import { OrderItem } from './entities/order-item.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, NATS_SERVICE } from '../config';
import { NatsModule } from 'src/transports/nats.module';

//!  (cliente NATS): Configuras un emisor/cliente para interactuar con otros microservicios a través de NATS.
@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [
    TypeOrmModule.forFeature([Order, OrderItem]),
    NatsModule
    // ClientsModule.register([
    //   {
    //     // name : PRODUCT_SERVICE,
    //     name: NATS_SERVICE,
    //     // transport : Transport.TCP,
    //     transport: Transport.NATS,
    //     options: {
    //       // host : envs_prd.host_prd,
    //       //port : +envs_prd.port_prd
    //       servers: envs.natsServers,
    //     },
    //   },
    // ]),
  ],
})
export class OrdersModule {}
