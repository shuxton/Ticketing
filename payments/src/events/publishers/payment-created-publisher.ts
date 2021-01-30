import { Publisher, PaymentCreatedEvent, Subjects } from "@snjtickets/common";



export class PaymentCreatedPublisher extends Publisher<PaymentCreatedEvent>{
 subject : Subjects.PaymentCreated = Subjects.PaymentCreated;
 
}