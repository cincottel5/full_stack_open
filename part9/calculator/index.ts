import express from 'express'
import { calculateBmi } from './bmiCalculator'
import { isNotNumber } from './utils'

const app = express()

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!')
})

app.get('/bmi', (req, res) => {
  const { height, weight} = req.query
  
  if (isNotNumber(height) || isNotNumber(weight))
    return res.status(400).send({error: 'malformatted parameters'})

  return res.send(calculateBmi(Number(height), Number(weight)))
})



const PORT = 3000

app.listen(PORT, () =>{
  console.log(`Server listening on port ${PORT}`)
})