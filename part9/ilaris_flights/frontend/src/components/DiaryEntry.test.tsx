import { render, screen } from '@testing-library/react'
import DiaryEntry from './DiaryEntry'
import type { NonSensitiveDiaryEntry } from '../types'
import { expect, test } from 'vitest'

const testEntry: NonSensitiveDiaryEntry = {
    date: "2024-06-01",
    visibility: 'great',
    weather: 'sunny',
    id: 100
}

test('renders content', async () => {
  render(<DiaryEntry diaryEntry={testEntry} />)
  expect(screen.getByText('2024-06-01')).toBeDefined()
})