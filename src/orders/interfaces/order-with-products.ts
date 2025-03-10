import { OrderStatus } from "../enum/order.enum";

export interface OrderWithProducts{
        orderItem: {
            price: number;
            quantity: number;
            product: {
                productId: number;
                name: any;
            };
        }[];
        id: number;
        totoalAmount: number;
        totalItems: number;
        status: OrderStatus;
        paid?: boolean;
        paidAt?: Date;
        createdAt: Date;
        updatedAt: Date;
}