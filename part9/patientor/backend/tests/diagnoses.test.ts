import { test } from 'node:test';
import app from '../src/app';
import request from 'supertest';
import { type } from 'os';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const assert:any = require('node:assert');
const api:any = request(app);

test('get diagnoses responds', async () => {
  const result = await api
    .get('/api/diagnoses')
    .expect(200);
});