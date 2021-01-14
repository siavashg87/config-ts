import * as assert from "assert";
import ConfigTS from "../src";

describe("Config do.notation", () => {

  it("default has - dot notation", () => {
    const Config = new ConfigTS();
    assert.strictEqual(Config.has("foo.bar"), false);
  });

  it("set - dot notation", () => {
    const Config = new ConfigTS();
    try {
      Config.set("foo.bar", true);
    } catch (e) {
      return true;
    }
    throw new Error("Expected error when setting path on none defined top level object!");
  });

  it("default has - dot notation", () => {
    const Config = new ConfigTS();
    assert.strictEqual(
      Config
        .set("foo", {bar: "baz"})
        .has("foo.bar")
      , true);

  });

  it("default get - dot notation", () => {
    const Config = new ConfigTS();
    assert.strictEqual(Config.get("foo.bar", "default"), "default");

  });

  it("set - dot notation", () => {
    const Config = new ConfigTS();
    assert.strictEqual(
      Config
        .set("foo", {bar: "baz"})
        .get("foo.bar", "default")
      , "baz");

  });

});
