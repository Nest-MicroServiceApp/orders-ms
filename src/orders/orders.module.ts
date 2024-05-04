import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from './entities';
import { OrderItem } from './entities/order-item.entity';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { envs, envs_prd, PRODUCT_SERVICE } from '../config';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
  imports: [ 
    TypeOrmModule.forFeature([Order,OrderItem]),
    ClientsModule.register(
      [
      {
        name : PRODUCT_SERVICE,
        transport : Transport.TCP,
        options : {
          host : envs_prd.host_prd,
          port : +envs_prd.port_prd
        }
        
      }
    ])
  ]
})
export class OrdersModule {
}
