import { Router } from "express";
import { jwtRequireAuth } from '../middleware/JsonWebToken';

const WorkoutRouter = Router();

WorkoutRouter.use(jwtRequireAuth);


export default WorkoutRouter;