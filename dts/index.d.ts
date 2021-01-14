import { Nullable, Object } from "./interfaces/types";
export default class Config<T extends Object> {
    private filePath;
    private store;
    constructor(filePath?: Nullable<string>, defaults?: Partial<T>);
    has(key: string): boolean;
    get<V>(key: string, _default?: V): V;
    is(key: string, value: any): boolean;
    set<V>(key: string, value: V): this;
    unset(key: string): this;
    getStore(): T;
    size(): number;
    clear(): this;
    getFilePath(): Nullable<string>;
    path(): string;
    save(): this;
    private checkFilePath;
}
