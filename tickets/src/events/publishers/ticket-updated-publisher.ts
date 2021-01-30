import { Subjects, Publisher, TicketUpdatedEvent } from "@snjtickets/common";


export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent>{
    subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}