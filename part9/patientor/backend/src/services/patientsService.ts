import patients from '../../data/patients';
import { NonSentitivePatient, Patient } from '../types';

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

export default {
  getNonSensitivePatients
}