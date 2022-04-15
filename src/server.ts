import express from 'express'

import path from 'path'
import bodyParser from 'body-parser'
import { env } from 'process'

import MongoAtlasConnect, { MongoDbOptions } from './database/MongoAtlasConnect'
import authRouter from './routers/AuthRouter';
import ErrorHandler from './middleware/ErrorHandler';
import WorkoutRouter from './routers/WorkoutRouter'
import ExerciseRouter from './routers/ExerciseRouter'

if (env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express()
const getPort = () => isProduction() ? env.PORT : '8080';
const getHost = () => env.HOST || 'http://localhost'
const isProduction = () => env.HEROKU;

const serverStartCallback = (host: string, port: string) => {
  console.log(`Listening at ${host}:${port}`);
}

let attempts = 0;
const startServer = () => {
  if (attempts > 5) return;
  const port = getPort(), host = getHost();
  attempts++;
  if (port) {
    try {
      app.listen(port, () => serverStartCallback(host, port))
    } catch (error) {
      console.log(error);
    }
  }
  else setTimeout(startServer, 1000 * 5)
}

const mongoOptions = (): MongoDbOptions => ({
  user: env.ATLAS_USER || 'david',
  password: env.ATLAS_PW || 'no-pw',
  dbName: env.ATLAS_DB || 'workoutWizard',
  uri: env.ATLAS_URI,
  host: env.ATLAS_HOST || 'cluster0.zrqy5.mongodb.net',
  options: { retryWrites: true, w: 'majority' }
})

MongoAtlasConnect.initialize(mongoOptions())

app.use(express.static('build/public'))
app.use('/images', express.static('images'))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

// app.get('/exercises', (req, res) => {
//   res.json(fs.readFileSync(path.join(__dirname, 'exercises.json')));
// })

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "X-ACCESS-TOKEN, Origin, Content-Type, Accept"
  );
  next();
});

app.use('/auth', authRouter);
app.use('/workouts', WorkoutRouter);
app.use('/exercises', ExerciseRouter);
app.use(ErrorHandler)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/public/index.html'))
})

app.get('**', (req, res) => {
  res.redirect('/')
})

startServer();