import { ArrayMinSize, IsArray, ValidateNested } from "class-validator";
import { CreateOrderItemDto } from "./create-order-item.dto";
import { Type } from "class-transformer";


export class CreateOrderDto {

    @IsArray()
    @ArrayMinSize(1)
    @ValidateNested({each:true}) //*Valida cada elemento que esta dentro del array
    @Type(()=> CreateOrderItemDto)
    item: CreateOrderItemDto[]
}
