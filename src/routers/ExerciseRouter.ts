import { Request, RequestHandler, Response, Router } from "express";
import User from '../schemas/User';
import asyncCatch from "../utils/asyncCatch";
import { Exercise as IExercise } from "../../client/src/models/Exercise";
import Exercise from '../schemas/Exercise';
import { jwtRequireAuth } from '../middleware/JsonWebToken';
import _ from 'lodash'
// import { AppRequest } from '../middleware/AppRequest';

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
const search: RequestHandler = async ({ body: params }: SearchRequest, res) => {
  const query = Exercise.getFindQuery(params);
  const exercises = await Exercise.find(query);

  res.json(exercises);
}
exerciseRouter.post('/search', asyncCatch(search));



export default exerciseRouter