import { NextFunction, Request, RequestHandler, Response } from "express";

const asyncCatch = (handler: RequestHandler): RequestHandler => {

  return (req, res, next) => {
    try {
      handler(req, res, next);
    } catch (error) {
      next(error);
    }
  }

}

export default asyncCatch;