import { Object } from "../interfaces/types";
export declare const getFromDotNotation: <T extends Object, V>(keys: Array<string>, store: T) => V;
export declare const getRoot: <T>(keys: Array<string>, store: T) => {
    root: Object;
    lastProp: string;
};
export declare const setByDotNotation: <T, V>(keys: Array<string>, value: V, store: T) => void;
export declare const unsetByDotNotation: <T>(keys: Array<string>, store: T) => void;
export declare const isUndefined: (value: any) => boolean;
