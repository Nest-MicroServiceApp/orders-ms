import { Controller, NotImplementedException, ParseIntPipe } from '@nestjs/common';
import { ClientProxy, MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { PaginationDto } from '../common';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { ChangeOrderStatusDto } from './dto/change-order-status.dto';

@Controller()
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
  ) {}

  @MessagePattern('createOrder')
  create(@Payload() createOrderDto: CreateOrderDto) {
    
 
    // return {
    //   services : "Orders Microservices",
    //   createOrderDto: createOrderDto
    // }
    //return this.ordersService.create(createOrderDto);
    return null;
  }

  @MessagePattern('findAllOrders')
  findAll(@Payload() oderPaginationDto:OrderPaginationDto) {
    return this.ordersService.findAll(oderPaginationDto);
  }

  @MessagePattern('findOneOrder')
  findOne(@Payload('id', ParseIntPipe) id: number) {
    console.log(id)
    return this.ordersService.findOne(id);
  }

  @MessagePattern('updateOrder')
  update(@Payload() updateOrderDto: UpdateOrderDto) {
    return this.ordersService.update(updateOrderDto.id, updateOrderDto);
  }

  @MessagePattern('removeOrder')
  remove(@Payload() id: number) {
    return this.ordersService.remove(id);
  }


@MessagePattern('changeOrderStatus')
changeOrderStatus(@Payload() changeOrderStatusDto: ChangeOrderStatusDto) {
    return this.ordersService.changeOrderStatus(changeOrderStatusDto);
  }

}
