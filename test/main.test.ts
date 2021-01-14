import * as assert from "assert";
import ConfigTS from "../src";

describe("Config test", () => {

  it("default has not", () => {
    const Config = new ConfigTS();
    assert.strictEqual(Config.has("foo"), false);
  });

  it("default has - from default value", () => {
    const Config = new ConfigTS(null, {foo: true});
    assert.strictEqual(Config.has("foo"), true);
  });

  it("default has - from set", () => {
    const Config = new ConfigTS();
    assert.strictEqual(
      Config
        .set("foo", "bar")
        .has("foo")
      , true);

  });

  it("get does not exist", () => {
    const Config = new ConfigTS();
    try {
      Config.get("foo");
    } catch (e) {
      return true;
    }
    throw new Error("Expected error!");
  });

  it("get does exist", () => {
    const Config = new ConfigTS();
    try {
      Config
        .set("foo", true)
        .get("foo");
    } catch (e) {
      throw new Error("Did not expect error!");
    }

  });


  it("unset", () => {
    const Config = new ConfigTS();
    Config.set("foo", true);
    assert.strictEqual(Config.get("foo"), true);
    Config.unset("foo");
    try {
      Config.get("foo");
    } catch(e) {
      return true;
    }
    throw new Error("Unset failed!");
  });

  it("get does exist", () => {
    const Config = new ConfigTS();
    // @ts-expect-error
    Config.get<string>("foo", true);
  });

  it("default get", () => {
    const Config = new ConfigTS();
    assert.strictEqual(Config.get("foo", "default"), "default");

  });

});
