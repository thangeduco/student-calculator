/**
 * Environment configuration.
 *
 * Architecture §8: configuration is validated at startup and the process fails fast when a
 * required value is missing or invalid. No credential, connection string or environment-specific
 * host is hard-coded here.
 *
 * Database configuration is intentionally absent — persistence is introduced in DEV-02.
 */

export const NODE_ENVS = ['development', 'test', 'production'] as const;

export type NodeEnv = (typeof NODE_ENVS)[number];

export interface AppConfig {
  readonly nodeEnv: NodeEnv;
  readonly port: number;
}

const DEFAULT_NODE_ENV: NodeEnv = 'development';
const DEFAULT_PORT = 3000;
const MIN_PORT = 1;
const MAX_PORT = 65535;

/** Thrown when the environment cannot produce a valid configuration. */
export class ConfigError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'ConfigError';
  }
}

function parseNodeEnv(raw: string | undefined): NodeEnv {
  if (raw === undefined || raw === '') {
    return DEFAULT_NODE_ENV;
  }

  const found = NODE_ENVS.find((candidate) => candidate === raw);
  if (found === undefined) {
    throw new ConfigError(`Invalid NODE_ENV "${raw}". Expected one of: ${NODE_ENVS.join(', ')}.`);
  }

  return found;
}

function parsePort(raw: string | undefined): number {
  if (raw === undefined || raw === '') {
    return DEFAULT_PORT;
  }

  const port = Number(raw);
  if (!Number.isInteger(port) || port < MIN_PORT || port > MAX_PORT) {
    throw new ConfigError(
      `Invalid PORT "${raw}". Expected an integer between ${MIN_PORT} and ${MAX_PORT}.`,
    );
  }

  return port;
}

/**
 * Reads and validates the application configuration.
 *
 * @throws {ConfigError} when a value is present but invalid.
 */
export function loadConfig(env: NodeJS.ProcessEnv = process.env): AppConfig {
  return {
    nodeEnv: parseNodeEnv(env.NODE_ENV),
    port: parsePort(env.PORT),
  };
}
