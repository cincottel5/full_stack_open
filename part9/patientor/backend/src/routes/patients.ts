import express, { Response} from 'express';
import { NonSentitivePatient } from '../types';
import { toNewPatient } from '../utils/type-guards';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res: Response<NonSentitivePatient[]>) => {
  res.send(patientsService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  const newPatient = toNewPatient(req.body);
  const addedPatient = patientsService.addPatient(newPatient);
  res.status(201).json(addedPatient);
})

export default router;