import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { OrderItem } from "./order-item.entity";

@Entity()
export class Order extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    first_name: string;

    @Column()
    last_name: string; 

    @Column()
    email: string;

    @CreateDateColumn()
    created_at: string;

    @OneToMany(() => OrderItem, (order_item) => order_item.order)
    order_items: OrderItem[];

    get name(): string {
        return `${this.first_name} ${this.last_name}`
    }

    get total(): number {
        return this.order_items.reduce((sum, item) => sum + item.price * item.quantity, 0)
    }
}