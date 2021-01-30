import { OrderCreatedEvent, Publisher, Subjects } from "@snjtickets/common";


export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent>{
    subject: Subjects.OrderCreated = Subjects.OrderCreated;
}

