import { memoizeAndDebounce } from './util/ApiCalls';
import { AppAxios } from "./util/AppAxios";
import { ExerciseSearchState } from '../redux/reducers/Exercise';
import { Exercise } from '../models/Exercise';

export type searchBy = 'bodyPart' | 'target' | 'equipment' | 'name';
export type searchTerm = string | null;

export class ExerciseDB extends AppAxios {
  constructor() {
    super({
      baseURL: '/exercises',
      withCredentials: true,
      timeout: 5000
    })
  }

  search = async (params: Partial<ExerciseSearchState>) => {
    if (Object.values(params).every(p => p === null)) return this.api.get<Exercise[]>('');
    else return this.api.post<Exercise[]>('/search', params);
  }
  cachedSearch = memoizeAndDebounce(this.search, 500)

}
