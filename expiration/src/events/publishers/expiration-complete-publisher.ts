import { ExpirationCompleteEvent, Publisher, Subjects } from "@snjtickets/common";


export class ExpirationCompletePublisher extends Publisher<ExpirationCompleteEvent>{

subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete

}