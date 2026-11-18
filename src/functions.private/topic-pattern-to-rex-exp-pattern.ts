/**
 * Converts an MQTT topic pattern into the source of an anchored `RegExp` (wrapped between `^` and `$`).
 *
 * - RegExp special characters are escaped
 * - `+` is replaced by `([^\/]*)`: exactly one level, possibly empty (spec §4.7.1.3)
 * - a trailing `#` is replaced by an optional `.*` group, so the parent level matches too (spec §4.7.1.2)
 *
 * @param topicPattern - The MQTT topic pattern to convert.
 * @returns The RegExp source matching every topic accepted by `topicPattern`.
 * @see https://www.hivemq.com/blog/mqtt-essentials-part-5-mqtt-topics-best-practices/
 */
export function topicPatternToRexExpPattern(topicPattern: string): string {
  return (
    '^' +
    topicPattern
      // escape special chars
      .replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
      // MQTT Wildcard – Single Level: + (matches any single level, including zero-length, spec §4.7.1.3)
      .replace(/(^|\\\/)\\\+($|\\\/)/g, (_, start: string, end: string): string => {
        return `${start}([^\\/]*)${end}`;
      })
      // MQTT Wildcard – Multi Level: # (matches the parent level too, spec §4.7.1.2)
      .replace(/(^|\\\/)#$/g, (_, start: string): string => {
        return `(?:${start}.*)?`;
      }) +
    '$'
  );
}
