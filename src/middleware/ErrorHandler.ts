import { ErrorRequestHandler } from "express"
import { JsonWebTokenError } from "jsonwebtoken";
import { ValidationError } from './MongooseErrors';

const ErrorHandler: ErrorRequestHandler = ((error, req, res, next) => {
  // console.dir(error);
  try {
    if (error instanceof JsonWebTokenError) {
      res.status(401).json({ error: { token: 'Unauthorized' } })
    } else if (error.name) {
      console.dir({ error });

      switch (error.name) {
        case 'ValidationError':
          const validationError: ValidationError = error;
          if (validationError.errors) {
            res.status(400).json({ error: { validation: Object.values(validationError.errors).map(error => error.properties.message).join(' ') } });
          } else if (validationError.properties) {
            res.status(400).json({ error: validationError.properties.message });
          }
          return;
        default:
          res.status(500).json({ error });
      }
    } else {
      console.log(error.name);
      console.dir({ error })
      res.status(500).json({ error: error });
    }
    
  } catch (caughtError) {
    console.error('Error');
    console.log({error,caughtError})
  }
})

export default ErrorHandler;

// export default ((err, req, res, next) => {
  
// })