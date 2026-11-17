// https://www.hivemq.com/blog/mqtt-essentials-part-5-mqtt-topics-best-practices/

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
