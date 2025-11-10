[![npm (scoped)](https://img.shields.io/npm/v/@xstd/mqtt-topic.svg)](https://www.npmjs.com/package/@xstd/mqtt-topic)
![npm](https://img.shields.io/npm/dm/@xstd/mqtt-topic.svg)
![NPM](https://img.shields.io/npm/l/@xstd/mqtt-topic.svg)
![npm type definitions](https://img.shields.io/npm/types/@xstd/mqtt-topic.svg)
![coverage](https://img.shields.io/badge/coverage-100%25-green)

<picture>
  <source height="64" media="(prefers-color-scheme: dark)" srcset="https://github.com/xstd-js/website/blob/main/assets/logo/png/logo-large-dark.png?raw=true">
  <source height="64" media="(prefers-color-scheme: light)" srcset="https://github.com/xstd-js/website/blob/main/assets/logo/png/logo-large-light.png?raw=true">
  <img height="64" alt="Shows a black logo in light color mode and a white one in dark color mode." src="https://github.com/xstd-js/website/blob/main/assets/logo/png/logo-large-light.png?raw=true">
</picture>

## @xstd/mqtt-topic

A class to handle MQTT topics with support for wildcard pattern matching.

## 📦 Installation

```shell
yarn add @xstd/mqtt-topic
# or
npm install @xstd/mqtt-topic --save
```

## 💡 Example

```ts
const topic = new MqttTopic('test/#');
topic.matches('test'); // false
topic.matches('test/topic'); // true
topic.matches('test/topic/subtopic'); // true
topic.matches('abc'); // false
```
  
## 📜 Documentation

  
```ts
/**
 * Represents an MQTT topic with support for wildcard pattern matching.
 *
 * This class encapsulates the functionality to work with MQTT topic strings,
 * including matching topics against patterns using MQTT wildcard syntax.
  */
declare class MqttTopic {
  constructor(value: string);
  
  /**
  * Returns the topic.
  */
  get value(): string;
  
  /**
  * Returns true if the topic matches the pattern.
  *
  * @param topic - The topic to test.
  * @returns {boolean} Returns true if the topic matches the pattern.
  */
  matches(topic: string): boolean;
  
  /**
  * Returns the topic.
  */
  toString(): string;
  
  /**
  * Returns the topic.
  */
  valueOf(): string;
}
```
