import { OrderCancelledEvent, Publisher, Subjects } from "@snjtickets/common";


export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent>{
    subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}

