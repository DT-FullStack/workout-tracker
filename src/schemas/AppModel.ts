import { Model } from 'mongoose';

export interface InstanceMethods<T> {
  serialize(): T
}

export interface AppModel<T, QueryHelpers = {}, MethodsAndOverrides = InstanceMethods<T>, Virtuals = {}>
  extends Model<T, QueryHelpers, MethodsAndOverrides, Virtuals> { }