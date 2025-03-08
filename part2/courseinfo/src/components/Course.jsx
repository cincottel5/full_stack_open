const Content = ({parts}) => (
    <div>
        { parts.map(part =>
            <Part key={part.id} part={part}/>    
        )}
    </div>
)

const Header = ({name}) => {
    return ( <h2>{name}</h2> )
}

const Part = ({part}) => (
    <p>{part.name} {part.exercises}</p>
)

const Total = ({parts}) => {
    const totalExercises = parts.reduce( (sum, part) => sum + part.exercises, 0)

    return(
      <div>
        <p><b>Number of exercises {totalExercises}</b></p>
      </div>
    )
}

const Course = ({course}) => 
(
    <div>
        <Header name={course.name}/>
        <Content parts={course.parts}/>
        <Total parts={course.parts}/>
    </div>   
)

export default Course