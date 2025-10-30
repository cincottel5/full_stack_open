import patients from '../../data/patients';
import { NonSentitivePatient, Patient, NewPatient } from '../types';
import { randomUUID as uuid} from 'crypto';

const getPatients = (): Patient[] => patients;

const getNonSensitivePatients = (): NonSentitivePatient[] =>
  getPatients()
    .map(({id, name, dateOfBirth, gender, occupation}) => ({
      id, 
      name,
      dateOfBirth,
      gender,
      occupation
    }));

const addPatient = (patient: NewPatient) => {
  const newPatient = { 
    id: uuid(),
    ...patient
  }

  patients.push(newPatient);
  return newPatient;
};

export default {
  getNonSensitivePatients,
  addPatient
}