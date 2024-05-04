import {
    Column,
    CreateDateColumn,
    Entity,
    JoinColumn,
    JoinTable,
    ManyToOne,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
  } from 'typeorm';
import { Order } from './order.entity';
  
  
  
  @Entity()
  export class OrderItem {
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column('int',{
        nullable: false,
    })
    productId : number;


    @Column('int',{
            nullable: false,
        })
    quantity : number;

    @Column('float',{
        nullable: false,
    })
    price : number;

    @ManyToOne(()=> Order,(order) => order.orderItem)
    order : Order

    

    
  }
  