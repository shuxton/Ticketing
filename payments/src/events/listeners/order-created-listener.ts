import { Listener, OrderCreatedEvent, Subjects } from "@snjtickets/common";
import { Order } from "../../models/order";
import { queueGroupName } from "./queue-group-name";
import {Message } from 'node-nats-streaming'



export class OrderCreatedListener extends Listener<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated
    queueGroupName = queueGroupName

    async onMessage(data: OrderCreatedEvent['data'],msg:Message){
        const order =Order.build({
            id: data.id,
            userId: data.userId,
            version: data.version,
            status: data.status,
            price: data.ticket.price
        })
        await order.save()

        msg.ack()
    }
}