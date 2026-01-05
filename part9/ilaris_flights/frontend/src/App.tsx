import { useState, useEffect } from 'react'
import type { NonSensitiveDiaryEntry } from './types'
import { getAllDiaries } from './services/diariesService'
import DiaryEntryList from './components/DiaryEntryList'
import DiaryEntryForm from './components/DiaryEntryForm'

function App() {
  const [diaries, setDiaries] = useState<NonSensitiveDiaryEntry[]>([])

  useEffect(() => {
    getAllDiaries()
      .then(data => {
        setDiaries(data)}
  )}, [])

  return (
    <>
      <DiaryEntryForm diaries={diaries} setDiaries={setDiaries}/>
      <DiaryEntryList diaryEntries={diaries}/>
    </>
  )
}

export default App
