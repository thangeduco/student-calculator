/**
 * Application assembly.
 *
 * This module only wires the HTTP application together; it never binds a port (see server.ts).
 * Keeping assembly separate makes the app testable without occupying a port.
 *
 * Architecture §14: every API route lives under the versioned base path.
 * Architecture §3: dependency direction is route -> controller -> use-case -> repository.
 *
 * DEV-01 mounts the versioned router only. Calculator routes (DEV-04), the error envelope and
 * request-id middleware (DEV-04), logging (DEV-09) and health endpoints (DEV-09) are not part of
 * this task.
 */

import express, { type Express, Router } from 'express';

/** Versioned API base path (Architecture §14, API Spec header). */
export const API_BASE_PATH = '/api/v1';

/**
 * Builds the Express application.
 *
 * The application holds no mutable module-level state, so every instance is interchangeable
 * (Architecture §2: the backend is stateless).
 */
export function createApp(): Express {
  const app = express();

  // Do not advertise the framework to clients.
  app.disable('x-powered-by');

  // Versioned API surface. Routes are added by the tasks that own them.
  const apiRouter = Router();
  app.use(API_BASE_PATH, apiRouter);

  return app;
}
