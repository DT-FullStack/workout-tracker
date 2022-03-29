import axios, { Axios, AxiosResponse } from "axios";
import { searchBy, searchTerm } from "views/exercises/ExerciseSearch";
import _ from 'lodash'
import { memoizeAndDebounce } from './util/ApiCalls';
import Exercises from "./Exercises";

export enum BodyPart { "any", "back", "cardio", "chest", "lower arms", "lower legs", "neck", "shoulders", "upper arms", "upper legs", "waist" }
export enum TargetMuscles { "any", "abductors", "abs", "adductors", "biceps", "calves", "cardiovascular system", "delts", "forearms", "glutes", "hamstrings", "lats", "levator scapulae", "pectorals", "quads", "serratus anterior", "spine", "traps", "triceps", "upper back" }
export enum Equipment { "any", "assisted", "band", "barbell", "body weight", "bosu ball", "cable", "dumbbell", "elliptical machine", "ez barbell", "hammer", "kettlebell", "leverage machine", "medicine ball", "olympic barbell", "resistance band", "roller", "rope", "skierg machine", "sled machine", "smith machine", "stability ball", "stationary bike", "stepmill machine", "tire", "trap bar", "upper body ergometer", "weighted", "wheel roller" }

export const BodyPartList: BodyPart[] = Object.values(BodyPart).filter(v => typeof v === 'string').map(v => v as BodyPart);
export const TargetMusclesList: TargetMuscles[] = Object.values(TargetMuscles).filter(v => typeof v === 'string').map(v => v as TargetMuscles);
export const EquipmentList: Equipment[] = Object.values(Equipment).filter(v => typeof v === 'string').map(v => v as Equipment);

export interface Exercise {
  id: string
  name: string
  bodyPart: BodyPart
  target: TargetMuscles
  equipment: Equipment
  gifUrl: string
}

export class ExerciseDB {
  constructor() {
    this.api.interceptors.response.use(this.handleResponse);
  }
  private api = axios.create({
    baseURL: 'https://exercisedb.p.rapidapi.com/',
    headers: {
      'x-rapidapi-host': 'exercisedb.p.rapidapi.com',
      'x-rapidapi-key': '54f3118fe0msh12f4dba91bd40c1p1aba94jsn40edc1b79205'
    },
  })
  private handleResponse = ({ data }: AxiosResponse) => data;

  private jsonSource = axios.create({
    baseURL: 'http://localhost:8080/exercises'
  });

  search = async (by: searchBy, term: searchTerm) => {
    // console.log(by, term);
    // return Exercises;
    if (term === null) return [];
    return this.api.get<Exercise[]>(`/exercises/${by}/${term}`)
  }
  cachedSearch = memoizeAndDebounce(this.search, 500)

}
