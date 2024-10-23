import { HttpStatus, Injectable, Logger, Inject } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './entities';
import { createQueryBuilder, DataSource, Repository } from 'typeorm';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PaginationDto } from '../common';
import { OrderPaginationDto } from './dto/order-pagination.dto';
import { ChangeOrderStatusDto } from './dto/change-order-status.dto';
// import { PRODUCT_SERVICE } from '../config';
import { NATS_SERVICE } from '../config';
import { firstValueFrom } from 'rxjs';
import { OrderItem } from './entities/order-item.entity';

@Injectable()
export class OrdersService {
  private readonly logger = new Logger('OrdersService');
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,

    @InjectRepository(OrderItem)
    private readonly orderItemRepository: Repository<OrderItem>,
    //@Inject(NATS_SERVICE) private readonly client: ClientProxy,
    private readonly dataSource: DataSource,
  ) {
    this.logger.log('Database Connected');
  }
  // async create(createOrderDto: CreateOrderDto) {
  //   //*Transacción
  //   const queryRunner = this.dataSource.createQueryRunner();

  //   await queryRunner.connect();
  //   await queryRunner.startTransaction();

  //   try {
  //     //* 1 - Coonfirmar los ids de los productos
  //     const productsIds = createOrderDto.item.map((i) => i.productId);

  //     const products: any[] = await firstValueFrom(
  //       this.client.send({ cmd: 'validate_products' }, productsIds),
  //     );

  //     //* 2 - caluclos de los valores
  //     //createOrderDto: cojemos este, porque puede que je trael array de ordenes, sean los mismos ids pero diferentes cantidades o tallas, etc.
  //     const totalAmaunt = createOrderDto.item.reduce((accm, orderItem) => {
  //       const price = products.find(
  //         (product) => product.id === orderItem.productId,
  //       ).price;

  //       return price * orderItem.quantity;
  //     }, 0);

  //     const totalItems = createOrderDto.item.reduce((acc, orderItem) => {
  //       return acc + orderItem.quantity;
  //     }, 0);

  //     //* 3 - crear transacción de bd

  //     const order = await this.orderRepository.create({
  //       totalItems: totalItems,
  //       totoalAmount: totalAmaunt,
  //       orderItem: createOrderDto.item.map((orderItem) => {
  //         return this.orderItemRepository.create({
  //           productId: orderItem.productId,
  //           quantity: orderItem.productId,
  //           price: products.find((product) => product.id == orderItem.productId)
  //             .price,
  //         });
  //       }),
  //     });

  //     const orderSave = await queryRunner.manager.save(order);

  //     // const orderItems = await createOrderDto.item.map((orderItem) =>{
  //     //   return this.orderItemRepository.create({
  //     //     productId : orderItem.productId,
  //     //     quantity : orderItem.productId,
  //     //     price : products.find(product => product.id == orderItem.productId ).price,
  //     //     order: orderSave
  //     //   })
  //     // });

  //     // const orderItemsSave = await queryRunner.manager.save(orderItems);
  //     await queryRunner.commitTransaction();

  //     return {
  //       ...orderSave,
  //       orderItem: orderSave.orderItem.map(order => ({
  //         price : order.price,
  //         order : order.quantity,
  //         product : {
  //           productId : order.productId,
  //           name : products.find(product => product.id ===  order.productId).name
  //         }
  
  //        }))
  //     };

     
  //   } catch (error) {
  //     await queryRunner.rollbackTransaction();

  //     throw new RpcException({
  //       status: HttpStatus.BAD_REQUEST,
  //       message: 'check logs',
  //     });
  //   } finally {
  //     await queryRunner.release();
  //   }

  //   // try {
  //   //   const order = this.orderRepository.create(createOrderDto);
  //   //   const odeerSave = await this.orderRepository.save(order);

  //   //   return odeerSave;
  //   // } catch (error) {
  //   //   console.log(error);
  //   // }
  // }

  async findAll(oderPaginationDto: OrderPaginationDto) {
    const { limit, page, status } = oderPaginationDto;
    const totalPages = await this.orderRepository.count({ where: { status } });
    const lastPage = Math.ceil(totalPages / limit); //ultima pagina

    

    const orders = await this.orderRepository.find({
      skip: (page - 1) * limit, //* esto me sirve para no saltarme el primer registro(pocisión 0) y obtener la cantidad de registros segun el limit
      take: limit,
      where: { status: status },
    })


    return {
      data:orders,
      meta: {
        total: totalPages,
        page: page,
        lastPage: lastPage,
      },
    };
  }

  async findOne(id: number) {

      const order = await this.orderRepository
        .createQueryBuilder('order')
        .innerJoinAndSelect('order.orderItem', 'order_item')
        .where('order.id = :id ', { id: id })
        .getOne();


        if (!order)
          throw new RpcException({
            message: `La orden con id '${id}' no existe`,
            status: HttpStatus.NOT_FOUND,
          });

        const productsIds = order.orderItem.map(or => or.productId)

        // const products: any[] = await firstValueFrom(
        //   this.client.send({ cmd: 'validate_products' }, productsIds),
        // );

    
      
      return {
        ...order,
        orderItem: order.orderItem.map(order => ({
          price : order.price,
          order : order.quantity,
          productId : order.productId,
         // productName :  products.find(product => product.id ===  order.productId).name
          
  
         }))

      };
  }

  update(id: number, updateOrderDto: UpdateOrderDto) {
    return `This action updates a #${id} order`;
  }

  remove(id: number) {
    return `This action removes a #${id} order`;
  }

  async changeOrderStatus(changeOrderStatusDto: ChangeOrderStatusDto) {
    const { id, status } = changeOrderStatusDto;

    const orderFind = await this.findOne(id);
    if (orderFind.status === status) {
      return orderFind;
    }

    orderFind.status = status;

    const { orderItem, ...order  } = orderFind

    const orderUpdate = await this.orderRepository.save(order);
    return orderUpdate;
  }
}
