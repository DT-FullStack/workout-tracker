import { Workout } from '../models/Workout';
import { AppAxios } from './util/AppAxios';
import { memoizeAndDebounce } from './util/ApiCalls';

type ListResponse = Workout[];
interface SaveWorkoutResponse {
  workoutId?: string
}

class WorkoutDB extends AppAxios {
  static NewWorkout = (): Workout => ({ datetime: {}, sequenceList: [] })

  constructor() {
    super({
      baseURL: '/workouts',
      withCredentials: true,
      timeout: 5000
    });
  }

  // 
  // Browser Actions

  //
  // Requests
  fetchList = async (userId: string) => this.api.get<ListResponse>(`/user/${userId}`);
  saveWorkout = async (workout: Workout, userId: string) => this.api.post<SaveWorkoutResponse>(`/user/${userId}`, workout);
  deleteWorkout = async (workoutId: string) => this.api.delete(`/${workoutId}`)
}

export default WorkoutDB