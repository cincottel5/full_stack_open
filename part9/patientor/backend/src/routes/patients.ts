import express, { Response, Request } from 'express';
import { NewPatient, NonSentitivePatient, Patient } from '../types';
import patientsService from '../services/patientsService';
import { newPatientParser } from '../utils/middleware';


const router = express.Router();

router.get('/', (_req, res: Response<NonSentitivePatient[]>) => {
  res.send(patientsService.getNonSensitivePatients());
});

router.post('/', newPatientParser, (req: Request<unknown, unknown, NewPatient>, res: Response<Patient>) => {  
  const addedPatient = patientsService.addPatient(req.body);
  res.status(201).json(addedPatient);
})

export default router;