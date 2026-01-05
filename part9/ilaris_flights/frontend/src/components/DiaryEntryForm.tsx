import type {SyntheticEvent} from "react"
import { useState, useRef } from "react"
import type { SetStateAction } from "react"
import { VisibilityTypes, type NewDiaryEntry, type NonSensitiveDiaryEntry, type Visibility, type Weather, WeatherTypes } from "../types"
import { createDiaryEntry } from "../services/diariesService"
import Notification from "./Notification"
import type { NotificationHandle } from "./Notification"
import { AxiosError } from "axios"

type DiaryEntryFormProps = {
  diaries: NonSensitiveDiaryEntry[]
  setDiaries: React.Dispatch<SetStateAction<NonSensitiveDiaryEntry[]>>
}

const DiaryEntryForm = ({setDiaries, diaries}: DiaryEntryFormProps) => {
  const [date, setDate] = useState<string>('')
  const [visibility, setVisibility] = useState<Visibility| ''>('')
  const [weather, setWeather] = useState<Weather| ''>('')
  const [comment, setComment] = useState<string>('')
  const notificationRef = useRef<NotificationHandle>(null)

  const resetForm = () => {
    setDate('')
    setVisibility('')
    setWeather('')
    setComment('')
  }

  const addDiaryEntry = (event: SyntheticEvent) => {
    event.preventDefault()

    const newDiaryEntry: NewDiaryEntry = {
      date,
      visibility: visibility as Visibility,
      weather: weather as Weather,
      comment
    }

    createDiaryEntry(newDiaryEntry)
      .then( data => setDiaries(diaries.concat(data)))
      .catch( error => {
        if ( error instanceof AxiosError ) 
          notificationRef.current!.show( `Error: ${error.response?.data}`)
      })

    resetForm()
  }

  return (
    <div>
      <h2>Add new entry</h2>

      <Notification ref={notificationRef}/>

      <form onSubmit={addDiaryEntry}>
        <div>
          <label htmlFor="diary-entry-date">date</label>
          <input type="date" id="diary-entry-date" value={date} onChange={({target}) => setDate(target.value)}/>
        </div>

        <div>
          <span>visibility</span>
          { VisibilityTypes.map( type =>
            <label>
              <input type="radio" name="visibility-radio" value={type} onChange={({target}) => setVisibility(target.value as Visibility)} /> 
              {type}
            </label>
          )}
        </div>

        <div>
          <span>weather</span>
          { WeatherTypes.map( type =>
            <label>
              <input type="radio" name="weather-radio" value={type} onChange={({target}) => setWeather(target.value as Weather)} /> 
              {type}
            </label>
          )}
        </div>
        
        <div>
          <label htmlFor="diary-entry-comment">comment</label>
          <input type="text" id="diary-entry-comment"  value={comment} onChange={({target}) => setComment(target.value)} />
        </div>

        <div>
          <button type="submit">add</button>
        </div>
      </form>
    </div>
  )
}

export default DiaryEntryForm