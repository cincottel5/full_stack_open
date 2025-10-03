
import { test } from 'node:test';
import app from '../app';
import request from 'supertest';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const assert:any = require('node:assert');
const api:any = request(app);

test('ping responds pong', async () => {
  const result = await api
    .get('/ping')
    .expect(200);

  assert(result.text.includes('pong'));
});