import { Schema, Model, model } from 'mongoose'
import bcrypt from 'bcrypt'

export interface User {
  id?: string;
  email: string;
  password: string;
  workouts?: string[]
}

interface UserModel extends Model<User> {
  findAndValidate(email: string, password: string): Promise<User | false>
}

const userSchema = new Schema<User>({
  email: {
    type: String,
    required: [true, 'Username cannot be blank']
  },
  password: {
    type: String,
    required: [true, 'Password cannot be blank']
  },
})

userSchema.statics.findAndValidate = async function (email, password) {
  const foundUser = await this.findOne({ email })
  const isValid = await bcrypt.compare(password, foundUser.password)
  return isValid ? foundUser : false;
}

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next()
  this.password = await bcrypt.hash(this.password, 12)
  next()
})

const User = model<User, UserModel>('User', userSchema);

export default User;