import { parseArguments } from './utils'

interface Average {
  rating: number, 
  ratingDescription: string
}

interface ExerciseInfo extends Average {
  periodLength: number
  trainingDays: number
  target: number
  average: number
  success: boolean
  rating: number
  ratingDescription: string
}

const getAverage = (average: number, target: number): Average => {
  if (average > target) return { rating: 3, ratingDescription: 'Excellent job! You made it!' }
  if (average > target*0.6) return { rating: 2, ratingDescription: 'Not too bad but could be better' }
  
  return { rating: 1, ratingDescription: 'You can do better next time' }
}

const calculateExercises = (dailyExerciseHours: number[], target: number): ExerciseInfo => {
  const sum = (accumulator: number, currentValue: number) => accumulator + currentValue
  const periodLength = dailyExerciseHours.length
  const average = dailyExerciseHours.reduce(sum, 0) / periodLength
  const { rating, ratingDescription } = getAverage(average, target)
  
  return {
    periodLength,
    trainingDays: dailyExerciseHours.filter(d => d > 0).length,
    target,
    average,
    success: average >= target,
    rating,
    ratingDescription
  }
}

try {
  const args = parseArguments(process.argv, 2)
  const [target, ...dailyExerciseHours] = args
  console.log(calculateExercises(dailyExerciseHours, target))
} catch (error: unknown) {
    let errorMessage = 'Something bad happened: '

    if (error instanceof Error)
      errorMessage += error.message

    console.log(errorMessage)
  }

