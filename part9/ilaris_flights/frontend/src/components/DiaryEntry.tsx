import type { NonSensitiveDiaryEntry } from '../types';

type DiaryEntryProps = {
  diaryEntry: NonSensitiveDiaryEntry
}

const DiaryEntry = ({diaryEntry}: DiaryEntryProps) => (
  <div>
    <h3>{diaryEntry.date}</h3>
    <p>visibility: {diaryEntry.visibility}</p>
    <p>weather: {diaryEntry.weather}</p>
  </div>
)

export default DiaryEntry