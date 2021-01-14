import * as path from "path";
import * as assert from "assert";
import ConfigTS from "../src";

describe("Config file", () => {

  it("file + default", () => {
    const Config = new ConfigTS(path.join(__dirname, "./config.json"), {foo: false, bar: false});
    assert.deepStrictEqual(Config.getStore(), {foo: true, bar: false});
  });

  it("file not found", () => {
    try {
      new ConfigTS(path.join(__dirname, "./config.xxx.json"));
    } catch(e) {
      return;
    }
    throw new Error("Did not expect to find file!");
  });

  it("file content not json", () => {
    try {
      new ConfigTS(path.join(__dirname, "./config.error.json"));
    } catch(e) {
      return;
    }
    throw new Error("Did not expect to parse json!");
  });

  it("file save", () => {
    const key = (Math.random() + "").replace(".", "_");
    const Config = new ConfigTS(path.join(__dirname, "./config.save.json"), {foo: false});
    Config.set(key, key);
    Config.save();
    const Config2 = new ConfigTS(path.join(__dirname, "./config.save.json"));
    assert.deepStrictEqual(Config2.get("foo"), false);
    assert.deepStrictEqual(Config2.get(key), key);
  });

});
