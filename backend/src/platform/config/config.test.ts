/**
 * Configuration validation tests (DEV-01).
 *
 * Architecture §8: required configuration is validated at startup and fails fast.
 */

import { describe, expect, it } from 'vitest';

import { type AppConfig, ConfigError, loadConfig } from './config.js';

describe('loadConfig', () => {
  it('applies safe defaults when nothing is configured', () => {
    expect(loadConfig({})).toEqual<AppConfig>({ nodeEnv: 'development', port: 3000 });
  });

  it('reads values from the provided environment', () => {
    expect(loadConfig({ NODE_ENV: 'production', PORT: '8080' })).toEqual<AppConfig>({
      nodeEnv: 'production',
      port: 8080,
    });
  });

  it('treats empty values as unset', () => {
    expect(loadConfig({ NODE_ENV: '', PORT: '' })).toEqual<AppConfig>({
      nodeEnv: 'development',
      port: 3000,
    });
  });

  it('exposes only known configuration keys', () => {
    expect(Object.keys(loadConfig({ DATABASE_URL: 'should-be-ignored' })).sort()).toEqual([
      'nodeEnv',
      'port',
    ]);
  });

  it('rejects an unknown NODE_ENV', () => {
    expect(() => loadConfig({ NODE_ENV: 'staging' })).toThrow(ConfigError);
  });

  it('rejects a non-numeric PORT', () => {
    expect(() => loadConfig({ PORT: 'not-a-number' })).toThrow(ConfigError);
  });

  it('rejects a fractional PORT', () => {
    expect(() => loadConfig({ PORT: '3000.5' })).toThrow(ConfigError);
  });

  it.each(['0', '-1', '65536'])('rejects an out-of-range PORT: %s', (port) => {
    expect(() => loadConfig({ PORT: port })).toThrow(ConfigError);
  });
});
