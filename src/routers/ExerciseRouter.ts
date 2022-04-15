import { Request, RequestHandler, Response, Router } from "express";
import User from '../schemas/User';
import asyncCatch from "../utils/asyncCatch";
import { Exercise as IExercise } from "../../client/src/api/ExerciseDB";
import Exercise from '../schemas/Exercise';
import { jwtRequireAuth } from '../middleware/JsonWebToken';
import _ from 'lodash'

const exerciseRouter = Router();
exerciseRouter.use(jwtRequireAuth);

interface SaveExerciseRequest extends Request {
  body: IExercise | IExercise[]
}

const saveExercise: RequestHandler = async (req: SaveExerciseRequest, res) => {
  const exercises = Array.isArray(req.body) ? req.body : [req.body];
  const insert = async (chunk: IExercise[]) => Exercise.insertMany(chunk);
  const result = exercises.length > 100
    ? await Promise.all(_.chunk(exercises, 100).map(chunk => insert(chunk)))
    : await insert(exercises);
  res.json(result);
}
const getFullList: RequestHandler = async (req, res) => {
  const exercises = await Exercise.find({});
  const response: IExercise[] = exercises.map(ex => ex.serialize())
  res.json(response);
}
exerciseRouter.post('/', asyncCatch(saveExercise))
exerciseRouter.get('/', asyncCatch(getFullList));

interface SearchRequest extends Request {
  body: {
    name?: string,
    bodyPart?: string
    equipment?: string
    target?: string
  }
}
const search: RequestHandler = async (req: SearchRequest, res) => {
  // console.log(req.body);
  const exercises = await Exercise.find(req.body);

  res.json(exercises);
}
exerciseRouter.post('/search', asyncCatch(search));



export default exerciseRouter