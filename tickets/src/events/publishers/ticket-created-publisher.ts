import { Subjects, Publisher, TicketCreatedEvent } from "@snjtickets/common";


export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent>{
    subject: Subjects.TicketCreated = Subjects.TicketCreated;
}