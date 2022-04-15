import { Document, FilterQuery } from 'mongoose';
import { InstanceMethods } from './AppModel';

export interface AppDocument<T> extends Document<string>, InstanceMethods<T> { }
export type AppQuery<T> = (params: FilterQuery<T>) => Promise<AppDocument<T>[]>