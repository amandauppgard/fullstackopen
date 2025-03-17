const Header = ({name}) => <h2>{name}</h2>

const Content = ({course}) =>(
  <div>
    {course.parts.map(part => 
      <Part key={part.id} part={part}/>
      )}
  </div>
  )

const Part = ({part}) => (
  <p>
    {part.name} {part.exercises}
  </p>
)

const ExercisesTotal = ({parts}) => {
  const total = parts.reduce((sum, part) => {
    return sum + part.exercises
  }, 0)

  return(
    <p><strong>Total of {total} exercises</strong></p>
  )
}

const Course = ({course}) => {
  return(
    <div>
      <Header name={course.name}/>
      <Content course={course}/>
      <ExercisesTotal parts ={course.parts}/>
    </div>
  )
}

export default Course