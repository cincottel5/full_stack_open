import { parseArguments } from "./utils"

const calculateBmi = (height: number, weight: number): string => {
  const bmi: number = weight / Math.pow((height/100),2)

  if (bmi < 16.0) 
    return "Underweight (Severe thinness)"
  else if (bmi >= 16.0 && bmi < 17.0 )
    return "Underweight (Moderate thinness)"
  else if (bmi >= 17.0 && bmi < 18.5 )
    return "Underweight (Mild thinness)"
  else if (bmi >= 18.5 && bmi < 25.0 )
    return "Normal range"
  else if (bmi >= 25.0 && bmi < 30 )
    return "Overweight (Pre-obese)"
  else if (bmi >= 30 && bmi < 35 )
    return "Obese (Class I)"
  else if (bmi >= 35 && bmi < 40 )
    return "Obese (Class II)"
  else 
    return "Obese (Class III)"
}

try {
  const args = parseArguments(process.argv, 2, 2)
  console.log(calculateBmi(args[0], args[1]))
} catch (error: unknown) {
    let errorMessage = 'Something bad happened: '

    if (error instanceof Error)
      errorMessage += error.message

    console.log(errorMessage)
  }
