import { NewPatientSchema } from "./utils/schemas";
import { z } from 'zod';

export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}
 
export enum Gender {
  Male = "male",
  Female = "female",
  NonBinary = "non binary",
  Other = "other",
  PreferNotToSay = "" 
}

export interface Patient {
  id: string;
  name: string;
  dateOfBirth: string;
  ssn: string;
  gender: Gender;
  occupation: string;
}

export type NewPatient = z.infer<typeof NewPatientSchema>;

export type NonSentitivePatient = Omit<Patient, 'ssn'>