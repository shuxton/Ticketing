import { CustomError } from '../errors/custom-error'


export class NotFoundError extends CustomError{
    statusCode=404
    reason='Page not found'
    constructor(){
        super('Page not found')

        Object.setPrototypeOf(this, NotFoundError.prototype)
    }

    serializeErrors(){
        return[
            {message:this.reason}
        ]
    }
}

