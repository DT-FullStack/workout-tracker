import { Exercise } from "../client/src/api/ExerciseDB";
import { Workout } from "./Workout";

export interface User {
  id?: string;
  email: string;
  password: string;
  workouts?: Workout[],
  exercises?: Exercise[]
}
