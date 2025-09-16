import express from 'express';
import { calculateBmi } from './bmiCalculator';
import { isNotNumber, thereIsANotNumber, thereIsNull } from './utils';
import { calculateExercises } from './exerciseCalculator';

const app = express();

app.use(express.json());

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (req, res) => {
  const { height, weight} = req.query;
  
  if (isNotNumber(height) || isNotNumber(weight))
    return res.status(400).send({error: 'malformatted parameters'});

  return res.send(calculateBmi(Number(height), Number(weight)));
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;

  if (thereIsNull([target, daily_exercises]))
    return res.status(400).send({ error: 'parameters missing' })

  if (thereIsANotNumber([target, ...daily_exercises])) 
    return res.status(400).send({ error: 'malformatted parameters'});

  return res.send(calculateExercises(daily_exercises, target))
})

app.post

const PORT = 3000;

app.listen(PORT, () =>{
  console.log(`Server listening on port ${PORT}`);
});