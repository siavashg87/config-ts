import {Nullable, Object} from "./interfaces/types";
import {getFromDotNotation, isUndefined, setByDotNotation, unsetByDotNotation} from "./helpers";
import * as fs from "fs";

export default class Config<T extends Object> {

  private store: T;

  constructor(private filePath: Nullable<string> = null, defaults: Partial<T> = {}) {
    let fileValues = {};
    if (filePath) {
      try {
        fileValues = JSON.parse(fs.readFileSync(this.filePath as string, "utf8"));
      } catch(e) {
        throw new Error(`File does not exists, or failed reading json content of config file "${this.filePath}"`);
      }
    }
    this.store = Object.assign(defaults, fileValues) as T;
  }

  public has(key: string): boolean {
    let value: any = getFromDotNotation<T, any>(key.split("."), this.store);
    return !isUndefined(value);
  }

  public get<V>(key: string, _default?: V): V {
    let value: V = getFromDotNotation<T, V>(key.split("."), this.store);
    if (isUndefined(value) && !isUndefined(_default))
      value = _default as V;
    if (isUndefined(value))
      throw new Error(`"${key}" not found, and no default value is assigned!`);
    return value;
  }

  public is(key: string, value: any): boolean {
    return this.get(key) === value;
  }

  public set<V>(key: string, value: V) {
    setByDotNotation(key.split("."), value, this.store);
    return this;
  }

  public unset(key: string) {
    unsetByDotNotation(key.split("."), this.store);
    return this;
  }

  public getStore(): T {
    return this.store;
  }

  public size(): number {
    return Object.keys(this.store).length;
  }

  public clear() {
    this.store = {} as T;
    return this;
  }

  public getFilePath() {
    return this.filePath;
  }

  public path(): string {
    this.checkFilePath();
    return this.filePath as string;
  }

  public save() {
    this.checkFilePath();
    fs.writeFileSync(this.filePath as string, JSON.stringify(this.store, null, 2));
    return this;
  }

  private checkFilePath(): void {
    if (!this.filePath)
      throw new Error("No config file path has been specified!");
  }

}
