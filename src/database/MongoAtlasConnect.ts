import mongoose, { ConnectOptions as MongooseOptions } from "mongoose"

export interface MongoDbOptions {
  user: string;
  password: string;
  uri?: string;
  options?: MongooseOptions;
  host: string;
  dbName: string;
}

class MongoAtlasConnect {
  static initialize(options: MongoDbOptions) {
    console.log('MONGO OPTIONS', options);
    return new MongoAtlasConnect(options);
  }

  constructor(private dbOptions: MongoDbOptions) {
    // console.log(dbOptions);
    mongoose.connect(this.getUri(), this.dbOptions.options || {})
      .then(() => console.log(`Mongo Connection Open`))
      .catch(err => {
        console.log(`Mongo Connection Error!!!`)
        console.dir(dbOptions);
        console.log(err)
      })
  }
  private getUri(): string {
    const { user, password, host, dbName, uri } = this.dbOptions;
    return uri ? uri : `mongodb+srv://${user}:${password}@${host}/${dbName}`;
  }

}

export default MongoAtlasConnect