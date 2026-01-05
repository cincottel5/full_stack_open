import * as z from 'zod'

export const WeatherTypes = ["sunny", "rainy", "cloudy", "stormy", "windy"] as const
export const WeatherTypeSchema = z.enum(WeatherTypes)
export type Weather = z.infer<typeof WeatherTypeSchema>

export const VisibilityTypes = ["great", "good", "ok", "poor"] as const
export const VisibilitySchema = z.enum(VisibilityTypes)
export type Visibility = z.infer<typeof VisibilitySchema>

export const DiaryEntrySchema = z.object({
  id: z.number(),
  date: z.string(),
  weather: WeatherTypeSchema,
  visibility: VisibilitySchema,
  comment: z.string()
})

export type DiaryEntry = z.infer<typeof DiaryEntrySchema>

export type NewDiaryEntry = Omit<DiaryEntry, 'id'>

export type NonSensitiveDiaryEntry = Omit<DiaryEntry, 'comment'>
