import * as path from "path";
import * as assert from "assert";
import ConfigTS from "../src";

describe("Config typescript", () => {

  it("ts-error interface - Config interface has to be object", () => {
    // @ts-expect-error
    new ConfigTS<true>();
  });

  it("ts-error default - type mismatch", () => {
    // @ts-expect-error
    new ConfigTS<{foo: string}>(null, {foo: true});
  });

  it("ts partial", () => {
    new ConfigTS<{foo: string, bar: boolean}>(null, {bar: true});
  });

  it("ts partial - baz not valid property", () => {
    // @ts-expect-error
    new ConfigTS<{foo: string, bar: boolean}>(null, {baz: true});
  });

  it("ts file", () => {
    const Config = new ConfigTS<{foo: string}>(path.join(__dirname, "./config.json"));
    assert.deepStrictEqual(Config.getStore(), {foo: true});
  });

  it("ts file + default", () => {
    const Config = new ConfigTS<{foo: boolean, bar: boolean}>(path.join(__dirname, "./config.json"), {foo: false, bar: false});
    assert.deepStrictEqual(Config.getStore(), {foo: true, bar: false});
  });

});
