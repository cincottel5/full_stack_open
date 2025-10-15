import { test } from 'node:test';
import app from '../src/app';
import request from 'supertest';
import { type } from 'os';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const assert:any = require('node:assert');
const api:any = request(app);

test('get all patients responds', async () => {
  const result = await api
    .get('/api/patients')
    .expect(200);
});

test('get patients is not showing ssn', async () => {
  const result = await api
    .get('/api/patients')
    .expect(200);

  if (result.body.length > 0) 
    assert(!('ssn' in result.body[0]))
})