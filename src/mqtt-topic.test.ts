import { describe, expect, it } from 'vitest';
import { MqttTopic } from './mqtt-topic.js';

describe('MqttTopic', () => {
  describe('properties', () => {
    describe('test', () => {
      it('should match provided input', () => {
        const topic = new MqttTopic('test');

        expect(topic.value).toBe('test');
      });
    });
  });

  describe('methods', () => {
    describe('matches', () => {
      it('should support simple topic', async () => {
        const topic = new MqttTopic('topics/test');

        expect(topic.matches('topics/test')).toBe(true);
        expect(topic.matches('topics/abc')).toBe(false);
      });

      it('should support wildcard single level topic', async () => {
        const topic = new MqttTopic('a/+/c');

        expect(topic.matches('a/b/c')).toBe(true);
        expect(topic.matches('a/d/c')).toBe(true);
        expect(topic.matches('a/b/c/a')).toBe(false);
      });

      it('should match zero-length level with wildcard single level topic (MQTT 4.7.1.3)', async () => {
        const topic = new MqttTopic('sport/+');

        expect(topic.matches('sport/')).toBe(true);
        expect(topic.matches('sport')).toBe(false);
      });

      it('should match empty middle level with wildcard single level topic (MQTT 4.7.1.3)', async () => {
        const topic = new MqttTopic('a/+/c');

        expect(topic.matches('a//c')).toBe(true);
      });

      it('should support wildcard multi level topic', async () => {
        const topic = new MqttTopic('a/b/#');

        expect(topic.matches('a/b')).toBe(true);
        expect(topic.matches('a/b/c')).toBe(true);
        expect(topic.matches('a/b/c/d')).toBe(true);
        expect(topic.matches('a/d/c')).toBe(false);
      });

      it('should match parent level with wildcard multi level topic (MQTT 4.7.1.2)', async () => {
        const topic = new MqttTopic('sport/#');

        expect(topic.matches('sport')).toBe(true);
        expect(topic.matches('sport/')).toBe(true);
        expect(topic.matches('sport/tennis')).toBe(true);
        expect(topic.matches('sport/tennis/player1')).toBe(true);
        expect(topic.matches('sports')).toBe(false);
      });
    });

    describe('toString', () => {
      it('should match provided input', async () => {
        const topic = new MqttTopic('test');

        expect(topic.toString()).toBe('test');
      });
    });

    describe('valueOf', () => {
      it('should match provided input', async () => {
        const topic = new MqttTopic('test');

        expect(topic.valueOf()).toBe('test');
      });
    });
  });
});
