import _ from 'lodash'

type FN = (...args: any[]) => any

export const memoize = (fn: FN): typeof fn => _.memoize(fn);
export const debounce = (fn: FN, wait: number): typeof fn => _.debounce(fn, wait);

export const memoizeAndDebounce = (fn: FN, wait: number): typeof fn => memoize(debounce(fn, wait));