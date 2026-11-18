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

A TypeScript class to handle MQTT topics with support for wildcard pattern matching.

An `MqttTopic` wraps a topic pattern (e.g. `'sport/+/player1'` or `'sport/#'`) and compiles it into a `RegExp` once at construction. `matches` then tests concrete topics against this pattern.

### 🃏 Wildcards

The pattern supports the two MQTT wildcards:

| Wildcard | Name         | Matches                                                                      | Example                                       | Spec     |
| -------- | ------------ | ---------------------------------------------------------------------------- | --------------------------------------------- | -------- |
| `+`      | single level | exactly one level, which may be empty                                        | `sport/+` matches `sport/` and `sport/tennis` | §4.7.1.3 |
| `#`      | multi level  | the parent level and any number of child levels (must be the last character) | `sport/#` matches `sport` and `sport/tennis`  | §4.7.1.2 |

> Learn more in the [MQTT specification §4.7](https://docs.oasis-open.org/mqtt/mqtt/v5.0/os/mqtt-v5.0-os.html) or [MQTT Essentials Part 5](https://www.hivemq.com/blog/mqtt-essentials-part-5-mqtt-topics-best-practices/).

## 📦 Installation

```shell
yarn add @xstd/mqtt-topic
# or
npm install @xstd/mqtt-topic --save
```

## 💡 Example

```ts
import { MqttTopic } from '@xstd/mqtt-topic';

const topic = new MqttTopic('test/#');
topic.matches('test'); // true
topic.matches('test/topic'); // true
topic.matches('test/topic/subtopic'); // true
topic.matches('abc'); // false
```

```ts
// `+` matches exactly one level, possibly empty (spec §4.7.1.3)
const singleLevel = new MqttTopic('sport/+');
singleLevel.matches('sport/'); // true
singleLevel.matches('sport/tennis'); // false

// `#` matches the parent level and any number of child levels (spec §4.7.1.2)
const multiLevel = new MqttTopic('sport/#');
multiLevel.matches('sport'); // true
multiLevel.matches('sport/tennis/player1'); // true
```

## 📜 Documentation

### `MqttTopic`

| Member                            | Description                                                                                                                           |
| --------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------- |
| `new MqttTopic(pattern: string)`  | Creates an `MqttTopic` from a topic pattern, with or without wildcards. The pattern is compiled into a `RegExp` once at construction. |
| `value: string`                   | Returns the topic pattern.                                                                                                            |
| `matches(topic: string): boolean` | Returns `true` if `topic` matches the pattern, using the wildcards described above.                                                   |
| `toString()` / `valueOf()`        | Return the topic pattern (same as `value`).                                                                                           |

> Each member is fully documented and illustrated in its JSDoc comments, visible on hover in your IDE.
