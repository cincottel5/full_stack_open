import type { CoursePart } from "../types"
import Part from "./Part"

interface ContentProps {
  courseParts: CoursePart[]
}

const Content = (props: ContentProps) => (
  <>
    {props.courseParts.map(part =>
      <Part key={part.name} coursePart={part}/>
    )}
  </>
)

export default Content