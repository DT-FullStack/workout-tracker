import { ErrorRequestHandler } from "express"
import { JsonWebTokenError } from "jsonwebtoken";

const ErrorHandler: ErrorRequestHandler = ((err, req, res, next) => {
  // console.dir(err);
  if (err instanceof JsonWebTokenError) {
    console.log(err.name)
    res.status(401).json({error:{token:'Unauthorized'}})
  }
  res.status(500).json({ err: err });
})

export default ErrorHandler;

// export default ((err, req, res, next) => {
  
// })