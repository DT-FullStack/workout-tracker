import { Exercise } from 'api/ExerciseDB'
import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import { Button, Card } from 'semantic-ui-react'
import AppPlaceholderImage from 'components/utils/AppPlaceholderImage'
import { setSelectedExercise } from '../../redux/actions/exercise';
import { selectExerciseForWorkout } from '../../redux/actions/workout';

interface ExerciseCardProps {
  exercise: Exercise
  currentExercise: Exercise | null
  setSelectedExercise(exercise: Exercise | null): void
  selectExerciseForWorkout(exercise: Exercise): void
}

const ExerciseCard = ({ exercise, currentExercise, setSelectedExercise, selectExerciseForWorkout }: ExerciseCardProps) => {
  const [isSelected, setIsSelected] = useState(false);
  useEffect(() => {
    if (!currentExercise && isSelected) setIsSelected(false);
    else if (currentExercise && currentExercise._id === exercise._id) setIsSelected(true);
  }, [currentExercise, exercise._id, isSelected])

  return (
    <Card>
      <Card.Content>
        <Card.Header content={exercise.name} />
        <Card.Meta >Uses {exercise.equipment} </Card.Meta>
        <Card.Meta >Targets {exercise.target}</Card.Meta>
      </Card.Content>
      <AppPlaceholderImage altText={exercise.name} fullWidth srcUrl={exercise.gifUrl} />
      {isSelected
        ? <Button.Group className='two'>
          <Button content="Add to Workout" color='green' onClick={() => selectExerciseForWorkout(exercise)} />
          <Button content="Cancel" onClick={() => setSelectedExercise(null)} />
        </Button.Group>
        : <Button content="Select" onClick={() => setSelectedExercise(exercise)} />}
    </Card>)
}

const mapStateToProps = ({ exercises }: RootState) => ({
  currentExercise: exercises.current
})

const mapDispatchToProps = { setSelectedExercise, selectExerciseForWorkout }

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseCard)