/**
 * Process entry point — the only module that binds a port.
 *
 * Architecture §8: invalid or missing configuration fails fast before the server starts.
 */

import { createApp } from './app.js';
import { type AppConfig, ConfigError, loadConfig } from './platform/config/config.js';

function start(): void {
  let config: AppConfig;

  try {
    config = loadConfig();
  } catch (error) {
    const message = error instanceof ConfigError ? error.message : 'Failed to load configuration.';
    console.error(`[startup] ${message}`);
    process.exit(1);
  }

  const app = createApp();

  app.listen(config.port, () => {
    console.log(`[startup] backend listening on port ${config.port} (env: ${config.nodeEnv})`);
  });
}

start();
