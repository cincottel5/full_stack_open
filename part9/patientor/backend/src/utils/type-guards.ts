import { NewPatient, Gender } from "../types";

// export interface Patient {
//   id: string;
//   name: string;
//   dateOfBirth: string;
//   ssn: string;
//   gender: string;
//   occupation: string;
// }

const isString = (text: unknown): text is string => 
  typeof text === 'string' || text instanceof String;

const isDate = (date: string): boolean => Boolean(Date.parse(date));

const isGender = (param: string): param is Gender => 
  Object.values(Gender).map(g => g.toString()).includes(param);

const parseString = (param: unknown): string => {
  if (!isString(param)) 
    throw new Error('Incorrect or missing name');
  
  return param;
}

const parseDateOfBirth = (date: unknown): string => {
  if (!isString(date) || !isDate(date))
    throw new Error('Incorrect or missing date');

  return date;
}

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender))
    throw new Error('Incorrect or missing gender');

  return gender
}

export const toNewPatient = (object: unknown): NewPatient => {
   if (!object || typeof object !== 'object') 
    throw new Error ('Incorrect or missing data');

   if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object){
    const newPatient: NewPatient = {
      name: parseString(object.name),
      dateOfBirth: parseDateOfBirth(object.dateOfBirth),
      ssn: parseString(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseString(object.occupation)
    };

    return newPatient;
   }

   throw new Error('Incorrect data: some fields are missing')
}