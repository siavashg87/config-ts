import {Object} from "../interfaces/types";

export const getFromDotNotation = <T extends Object, V>(keys: Array<string>, store: T): V => {
  if (!keys.length)
    throw new Error(`Key is empty!`);
  const key: string = (keys as Array<string>).shift() as string;
  return !keys.length || !store[key] ? store[key] : getFromDotNotation<T, V>(keys, store[key]);
};

export const getRoot = <T>(keys: Array<string>, store: T) => {
  if (!keys.length)
    throw new Error(`Key is empty!`);
  const lastProp: string = (keys as Array<string>).pop() as string;
  const root: Object = keys.length ? getFromDotNotation(keys, store) : store;
  if (isUndefined(root))
    throw new Error(`path "${[...keys, lastProp].join(".")}" cannot be set! Make sure upper levels are of type object. Settings object property without defining top level object will cause this error!`);
  return {root, lastProp};
}
export const setByDotNotation = <T, V>(keys: Array<string>, value: V, store: T): void => {
  const {root, lastProp} = getRoot<T>(keys, store);
  root[lastProp] = value;
};

export const unsetByDotNotation = <T>(keys: Array<string>, store: T): void => {
  const {root, lastProp} = getRoot<T>(keys, store);
  delete root[lastProp];
}

export const isUndefined = (value: any) => typeof value === "undefined";
