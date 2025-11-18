import type { CoursePart } from "../types"

type partProps = {
  coursePart: CoursePart
}

const Part = ({coursePart}: partProps) => {

  const renderByKind = () => {
    switch(coursePart.kind) {
      case 'basic':
        return <p className="p-coursive">{coursePart.description}</p>
      case 'group':
        return <p>project exercises {coursePart.groupProjectCount}</p>
      case 'background': 
        return (
          <>
            <p className="p-coursive">{coursePart.description}</p>
            <p >submit to: {coursePart.backgroundMaterial}</p>
          </>
        )
      case 'special':
        return (
          <>
            <p className="p-coursive">{coursePart.description}</p>
            <p >required skills: {coursePart.requirements.join(', ')}</p>
          </>
        )
    }
  }

  return (
    <div className="part">
      <p><b>{coursePart.name}</b> {coursePart.exerciseCount}</p>
      { renderByKind() }
    </div>
  )
}

export default Part