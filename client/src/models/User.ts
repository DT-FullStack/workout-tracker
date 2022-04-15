
import { Exercise } from "./Exercise";
import { Workout } from "./Workout";

export interface User {
  id?: string;
  email: string;
  password: string;
  workouts?: Workout[],
  exercises?: Exercise[]
}
