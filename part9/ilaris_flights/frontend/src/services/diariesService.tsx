import axios from 'axios'
import type { DiaryEntry, NewDiaryEntry, NonSensitiveDiaryEntry } from '../types'

const baseUrl = 'http://localhost:3000/api/diaries'

export const getAllDiaries = () => 
  axios
    .get<NonSensitiveDiaryEntry[]>(baseUrl)
    .then(response => response.data)

export const createDiaryEntry = (object: NewDiaryEntry) => {
  return axios
    .post<DiaryEntry>(baseUrl, object)
    .then(response => response.data)
}


    