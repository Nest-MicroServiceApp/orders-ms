import { IsEnum, IsInt, IsNumber, IsPositive, IsUUID } from 'class-validator';
import { OrderStatus, OrderStatusList } from '../enum/order.enum';



export class ChangeOrderStatusDto {

  @IsNumber()
  @IsPositive()
  @IsInt()
  id: number;

  @IsEnum( OrderStatusList, {
    message: `Valid status are ${ OrderStatusList }`
  })
  status: OrderStatus;


}