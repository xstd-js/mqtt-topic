import { topicPatternToRexExp } from './functions.private/topic-pattern-to-rex-exp.js';

/**
 * Represents an MQTT topic pattern with support for wildcard pattern matching.
 *
 * A pattern is composed of slash-separated levels and may contain the two MQTT wildcards:
 * - `+` (single level): matches exactly one level, including an empty one (spec §4.7.1.3)
 * - `#` (multi level): matches the parent level and any number of child levels (spec §4.7.1.2),
 *   and must be the last character of the pattern
 *
 * The underlying `RegExp` is compiled once at construction, making `matches` cheap to reuse.
 *
 * @example
 * ```ts
 * const topic = new MqttTopic('test/#');
 * topic.matches('test'); // true
 * topic.matches('test/topic'); // true
 * topic.matches('test/topic/subtopic'); // true
 * topic.matches('abc'); // false
 * ```
 *
 * @see https://www.hivemq.com/blog/mqtt-essentials-part-5-mqtt-topics-best-practices/
 */
export class MqttTopic {
  readonly #value: string;
  readonly #regExp: RegExp; // computed

  /**
   * Creates a new `MqttTopic` from a topic pattern.
   *
   * @param value - The MQTT topic pattern, with or without wildcards (e.g. `'sport/+/player1'` or `'sport/#'`).
   */
  constructor(value: string) {
    this.#value = value;
    this.#regExp = topicPatternToRexExp(value);
  }

  /**
   * Returns the topic pattern.
   */
  get value(): string {
    return this.#value;
  }

  /**
   * Returns true if the given topic matches the pattern.
   *
   * - `+` matches exactly one level, which may be empty (spec §4.7.1.3)
   * - `#` matches the parent level and any number of child levels (spec §4.7.1.2)
   *
   * @example
   * ```ts
   * const singleLevel = new MqttTopic('sport/+');
   * singleLevel.matches('sport/'); // true (empty level)
   * singleLevel.matches('sport/tennis'); // false
   *
   * const multiLevel = new MqttTopic('sport/#');
   * multiLevel.matches('sport'); // true (parent level)
   * multiLevel.matches('sport/tennis/player1'); // true
   * ```
   *
   * @param topic - The topic to test.
   */
  matches(topic: string): boolean {
    this.#regExp.lastIndex = 0;
    return this.#regExp.test(topic);
  }

  /**
   * Returns the topic pattern (same as `value`).
   */
  toString(): string {
    return this.#value;
  }

  /**
   * Returns the topic pattern (same as `value`).
   */
  valueOf(): string {
    return this.#value;
  }
}
