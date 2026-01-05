import type { NonSensitiveDiaryEntry } from "../types";
import DiaryEntry from "./DiaryEntry";

type DiaryEntryListProps = {
  diaryEntries: NonSensitiveDiaryEntry[]
}

const DiaryEntryList = ({diaryEntries}: DiaryEntryListProps) => (
  <>
    <h2>Diary Entries</h2>

    <div>
      { diaryEntries.map( entry => 
        <DiaryEntry key={entry.id} diaryEntry={entry}/>
      )}
    </div>
  </>
)

export default DiaryEntryList