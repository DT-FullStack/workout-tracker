import MongoAtlasConnect, { MongoDbOptions } from '../database/MongoAtlasConnect';
import { env } from 'process';
import User from './User';
require('./Exercise');
import Workout from './Workout';


const mongoOptions = (): MongoDbOptions => ({
  user: env.ATLAS_USER || 'david',
  password: env.ATLAS_PW || 'b0nerzFTW',
  dbName: env.ATLAS_DB || 'workoutWizard',
  uri: env.ATLAS_URI,
  host: env.ATLAS_HOST || 'cluster0.zrqy5.mongodb.net',
  options: { retryWrites: true, w: 'majority' }
})

MongoAtlasConnect.initialize(mongoOptions());

const log = (...userArgs: any[]) => {
  return (...args: any[]) => { console.log("\n\n", ...userArgs, "\n*******************************\n", ...args) }
}
// const log = (...args: any[]) => { console.log(args) }

const start = async () => {
  const workout = await Workout.findOne({ user: '624f97cff9fee85d64de3973' }).populate({ path: 'sequenceList', populate: { path: 'exercise', model: 'Exercise' } });
  if (!workout) return;
  const sequences = workout.sequenceList;
  console.log(sequences.map(seq => seq.map(item => item.exercise)));
}

start();