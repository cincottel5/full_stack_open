import express, { Response} from 'express';
import { NonSentitivePatient } from '../types';
import patientsService from '../services/patientsService';

const router = express.Router();

router.get('/', (_req, res: Response<NonSentitivePatient[]>) => {
  res.send(patientsService.getNonSensitivePatients());
});

export default router;