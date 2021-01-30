import express,{Request,Response} from 'express'
import { BadRequstError, NotFoundError, OrderStatus, requireAuth, validateRequest} from '@snjtickets/common'
import { body } from 'express-validator'
import { Ticket } from '../models/ticket'
import { Order } from '../models/order'
import { OrderCreatedPublisher } from '../events/order-created-publisher'
import { natsWrapper } from '../nats-wrapper'


const router = express.Router()

const EXPIRATION_WINDOW_SECONDS=1*60 

router.post('/api/orders',
requireAuth,
[
    body('ticketId')
    .not()
    .isEmpty()
    .withMessage('TicketId must be provided')
],
validateRequest
,async(req:Request,res:Response)=>{
    const {ticketId} = req.body;
    const ticket = await Ticket.findById(ticketId)

    if(!ticket){
        throw new NotFoundError
    }

    const isReserved = await ticket.isReserved()

    if(isReserved){
        throw new BadRequstError('Ticket is already reserved')
    }

    const expiration = new Date()
    expiration.setSeconds(expiration.getSeconds()+EXPIRATION_WINDOW_SECONDS)
    
    const order= Order.build({
       userId: req.currentUser!.id ,
       status: OrderStatus.Created,
       expiresAt: expiration,
       ticket
    })
    await order.save();

    new OrderCreatedPublisher(natsWrapper.client).publish({
        id: order.id,
        status: order.status,
        version: order.version,
        userId: order.userId,
        expiresAt: order.expiresAt.toISOString(),
        ticket:{
            id:ticket.id,
            price:ticket.price,
        }
    })

    res.status(201).send(order);


})


export {router as  newOrderRouter}