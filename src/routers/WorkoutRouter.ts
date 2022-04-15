import { Request, RequestHandler, Router } from "express";
import { jwtRequireAuth, jwtUserMatch } from '../middleware/JsonWebToken';
import User from "../schemas/User";
import asyncCatch from "../utils/asyncCatch";
import { Workout as IWorkout } from '../../client/src/models/Workout';
import Workout from '../schemas/Workout';
// import { AppRequest } from "../middleware/AppRequest";

const WorkoutRouter = Router();

WorkoutRouter.use(jwtRequireAuth);

const getList: RequestHandler = async (req, res) => {
  const workouts = await Workout.findAndPopulate({ user: req.userId })
  const response: IWorkout[] = workouts.map(workout => workout.serialize());
  res.json(response);
}

interface WorkoutRequest extends Request {
  body: IWorkout
}
const saveWorkout: RequestHandler = async (req: WorkoutRequest, res, next) => {
  const { _id, datetime, sequenceList } = req.body;
  const { userId } = req;
  if (_id) {
    await Workout.findOneAndUpdate({ _id }, { datetime, sequenceList, user: userId });
    res.json({ workoutId: _id });
  } else {
    const { _id } = await Workout.create({ datetime, sequenceList, user: userId });
    res.json({ workoutId: _id });
  }
}
WorkoutRouter.route('/user/:userId')
  .all(jwtUserMatch)
  .get(asyncCatch(getList))
  .post(asyncCatch(saveWorkout));


const getWorkout: RequestHandler = async (req, res) => {
  const { workoutId } = req.params;
  const workout = await Workout.findById(workoutId);
  res.json(workout);
}
const deleteWorkout: RequestHandler = async (req, res) => {
  const { workoutId } = req.params;
  const { userId } = req;
  const workout = await Workout.findOneAndDelete({ id: workoutId, userId });
  res.json({ success: true });
}
WorkoutRouter.route('/:workoutId')
  .get(asyncCatch(getWorkout))
  .delete(asyncCatch(deleteWorkout))



export default WorkoutRouter;