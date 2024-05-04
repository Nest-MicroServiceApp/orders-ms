import { IsBoolean, IsDate, isDate, IsEnum, IsNumber, IsOptional, IsPositive } from "class-validator";
import { OrderStatus,OrderStatusList } from "../enum/order.enum";


export class CreateOrderItemDto {

    @IsNumber()
    @IsPositive()
    productId : number
    @IsNumber()
    @IsPositive()
    quantity : number
    @IsNumber()
    @IsPositive()
    price : number

  

}
