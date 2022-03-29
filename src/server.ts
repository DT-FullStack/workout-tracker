import express from 'express'
import session from 'express-session'
import fs from 'fs'

import path from 'path'
import bodyParser from 'body-parser'
import { env } from 'process'

import MongoAtlasConnect, { MongoDbOptions } from './database/MongoAtlasConnect'
import authRouter from './routers/AuthRouter';
import ErrorHandler from './middleware/ErrorHandler';

if (env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express()
const getPort = () => env.PORT
const getHost = () => env.HOST || 'http://localhost'

const startServer = () => {
  const port = getPort(), host = getHost();
  if (port) {
    app.listen(port, () => console.log(`Listening at ${host}:${port}`))
  }
  else setTimeout(startServer, 1000)
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
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/exercises', (req, res) => {
  res.json(fs.readFileSync(path.join(__dirname, 'exercises.json')));
})

app.use(function (req, res, next) {
  res.header(
    "Access-Control-Allow-Headers",
    "X-ACCESS-TOKEN, Origin, Content-Type, Accept"
  );
  next();
});

app.use('/auth', authRouter);
app.use(ErrorHandler)

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'build/public/index.html'))
})

app.get('**', (req, res) => {
  res.redirect('/')
})


startServer();
