import { topicPatternToRexExpPattern } from './topic-pattern-to-rex-exp-pattern.js';

/**
 * Converts an MQTT topic pattern into a `RegExp` matching every topic accepted by the pattern.
 *
 * @param topicPattern - The MQTT topic pattern to convert.
 */
export function topicPatternToRexExp(topicPattern: string): RegExp {
  return new RegExp(topicPatternToRexExpPattern(topicPattern), '');
}
