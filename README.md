# Config-ts

[![Build Status](https://travis-ci.org/rundef/config-ts.svg?branch=master)](https://travis-ci.org/rundef/config-ts)
[![Node version required](https://img.shields.io/node/v/config-ts.svg)](https://www.npmjs.com/package/config-ts)
[![Latest Stable Version](https://img.shields.io/npm/v/config-ts.svg)](https://www.npmjs.com/package/config-ts)

Lightweight typescript configuration handler, supporting config files, default values and dot notation paths.

## Installation

```bash
npm install configstore-ts
```

### Usage

```ts
import ConfigTS from "configstore-ts";

interface IConfig {
  foo: string;
  bar: string;
}

const config = new ConfigTS<IConfig>(null, {
  foo: "foo-value"
});

config.get("foo"); // config-foo
config.get<IConfig["foo"]>("foo"); // config-foo
config.has("foo"); // true

config.has("bar"); // false
config.get("bar"); // throws error
config.set("bar", "bar-value")
config.has("bar"); // true
config.get("bar"); // 123456
config.is("bar", "123456"); // true


config.unset("bar"); // false
config.has("bar"); // false
config.get("bar"); // throws error
config.get("bar", "default-value"); // default-value

// dot-notation usage for nested properties 
config.get("foo.bar.baz") // throws error
config.get("foo.bar.baz", "default-value") // default value
config.set("foo", {bar: "baz"});
config.get("foo.bar.baz") // baz
config.get("foo.bar.baz", "default-value") // default valuebaz


```

### API

##### ConfigTS(filePath?, defaults?);

###### filePath: string
Optional. Path to config file to read from or write to.
Example: path.join(__dirname, "./config.json")
Avoid usage of relative paths!

###### defaults: Partial\<T>
Optional. Define default values.

Properties from filePath and defaults will be merged, where filePath properties will override defaults duplicate properties.

##### .get\<T>(key: string, default?: any): T
No value found bt key, will return default value if defined, otherwise throws an error.
T is optional.

##### .is(key: string, value: any): boolean
Is store value strict equal to value param.

##### .has(key: string): boolean
Does property exist on store.

##### .set\<T>(key: string, value: T): ConfigTS
Adds new property to store.
dont-notation property-keys will throw error if toplevel object is undefined! 

##### .unset(key: string)
Removes key from store.

##### .getStore()
Returns entire store object

##### .size(): number
Number of keys in toplevel store object.

##### .clear()
Sets store object to empty object

##### .save()
Will write to config file.
Throws an error if no filePath is specified.

##### .path(): string
Returns path to config file.
