import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import {  OrderStatus } from '../enum/order.enum';
import { OrderItem } from './order-item.entity';



@Entity()
export class Order {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column('float', {
    default: 0,
  })
  totoalAmount: number;

  @Column('int')
  totalItems: number;

  @Column({
    name: 'status',
    type: 'varchar',
    enum: OrderStatus,
    nullable: false,
    default: OrderStatus.PENDING,
  })
  status!: OrderStatus;

  @Column('boolean',{
    default : false
  })
  paid?: boolean;

  @Column('date', {
    nullable: true,
    default: null,
  })
  paidAt?: Date;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @OneToMany(()=> OrderItem, (orderItem) => orderItem.order, {
    cascade: true,
    eager: true
  })
  orderItem : OrderItem[]
}
