import { topicPatternToRexExp } from './functions.private/topic-pattern-to-rex-exp.js';

/**
 * Represents an MQTT topic with support for wildcard pattern matching.
 *
 * This class encapsulates the functionality to work with MQTT topic strings,
 * including matching topics against patterns using MQTT wildcard syntax.
 *
 * @example
 * ```ts
 * const topic = new MqttTopic('test/#');
 * topic.matches('test'); // false
 * topic.matches('test/topic'); // true
 * topic.matches('test/topic/subtopic'); // true
 * topic.matches('abc'); // false
 * ```
 */
export class MqttTopic {
  readonly #value: string;
  readonly #regExp: RegExp; // computed

  constructor(value: string) {
    this.#value = value;
    this.#regExp = topicPatternToRexExp(value);
  }

  /**
   * Returns the topic.
   */
  get value(): string {
    return this.#value;
  }

  /**
   * Returns true if the topic matches the pattern.
   *
   * @param topic - The topic to test.
   * @returns {boolean} Returns true if the topic matches the pattern.
   */
  matches(topic: string): boolean {
    this.#regExp.lastIndex = 0;
    return this.#regExp.test(topic);
  }

  /**
   * Returns the topic.
   */
  toString(): string {
    return this.#value;
  }

  /**
   * Returns the topic.
   */
  valueOf(): string {
    return this.#value;
  }
}
