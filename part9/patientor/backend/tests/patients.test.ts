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
});

test('adding a new patient', async () => {
  const newPatient = {
    name: 'Chanel Kafka',
    dateOfBirth: '2012-07-01',
    ssn: '123-123',
    gender: 'female',
    occupation: 'housekeeper'
  };

  const result = await api
    .post('/api/patients')
    .send(newPatient)
    .expect(201)

  const created = result.body;

  assert('id' in created)
  assert(created['name'] === newPatient.name);
});