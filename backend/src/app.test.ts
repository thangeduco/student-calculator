/**
 * Backend app-assembly smoke test (DEV-01).
 *
 * Asserts the application can be assembled and answers HTTP requests without binding a port.
 * Behavioural coverage of the calculator endpoint belongs to DEV-04.
 */

import request from 'supertest';
import { describe, expect, it } from 'vitest';

import { API_BASE_PATH, createApp } from './app.js';

describe('createApp', () => {
  it('assembles an Express application', () => {
    expect(typeof createApp()).toBe('function');
  });

  it('returns independent instances so no state is shared between apps', () => {
    expect(createApp()).not.toBe(createApp());
  });

  it('answers requests under the versioned API base path without crashing', async () => {
    const response = await request(createApp()).get(`${API_BASE_PATH}/unknown`);

    expect(response.status).toBe(404);
  });

  it('answers requests outside the API base path without crashing', async () => {
    const response = await request(createApp()).get('/unknown');

    expect(response.status).toBe(404);
  });

  it('does not advertise the server framework', async () => {
    const response = await request(createApp()).get('/');

    expect(response.headers['x-powered-by']).toBeUndefined();
  });

  it('exposes no calculations endpoint yet (owned by DEV-04)', async () => {
    const response = await request(createApp()).post(`${API_BASE_PATH}/calculations`).send({});

    expect(response.status).toBe(404);
  });
});

describe('API_BASE_PATH', () => {
  it('matches the approved API version base path', () => {
    expect(API_BASE_PATH).toBe('/api/v1');
  });
});
