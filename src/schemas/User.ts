import { Schema, Model, model, Types } from 'mongoose'
import bcrypt from 'bcrypt'
import { AppModel, InstanceMethods } from './AppModel';
import { User as IUser } from '../../client/src/models/User';
// import Workout from './Workout'
// import { Workout as IWorkout } from '../../models/Workout';

interface UserMethods extends InstanceMethods<IUser> { }

interface UserModel extends AppModel<IUser, {}, UserMethods> {
  findAndValidate(email: string, password: string): Promise<IUser | false>
}

export const userSchema = new Schema<IUser, UserModel>({
  email: {
    type: String,
    required: [true, 'Username cannot be blank']
  },
  password: {
    type: String,
    required: [true, 'Password cannot be blank'],
  },
  // workouts: [{ type: Types.ObjectId, ref: 'Workout' }],
  // exercises: [{ type: Types.ObjectId, ref: 'Exercise' }],
}, {
  timestamps: true,
})

userSchema.statics.findAndValidate = async function (email, password) {
  const foundUser = await this.findOne({ email })
  if (!foundUser?.password) return false;
  const isValid = await bcrypt.compare(password, foundUser.password)
  return isValid ? foundUser : false;
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

const User = model<IUser, UserModel>('User', userSchema);

export default User;