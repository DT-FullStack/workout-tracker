import { NextFunction, Request, RequestHandler, Response } from "express";

const asyncCatch = (handler: RequestHandler): RequestHandler => {
  return async (req, res, next) => {
    try {
      await handler(req, res, next);
    } catch (error) {
      console.error(error);
      next(error);
    }
  }

}

export default asyncCatch;