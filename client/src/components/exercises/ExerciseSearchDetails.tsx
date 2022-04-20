import AppPlaceholderImage from 'components/utils/AppPlaceholderImage';
import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import { Button, Grid, Header, Image, Item, ItemGroup, List } from 'semantic-ui-react';
import { Exercise } from '../../models/Exercise';
import ExerciseImage from './ExerciseImage';
import { selectExerciseForWorkout } from '../../redux/actions/workout';

const mapStateToProps = (state: RootState) => ({})
const mapDispatchToProps = { selectExerciseForWorkout }

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

interface ExerciseSearchDetailsProps extends PropsFromRedux {
  exercise: Exercise
}
// _id: string
// name: string
// bodyPart: BodyPart
// target: TargetMuscle
// equipment: Equipment
// gifUrl: string
const ExerciseSearchDetails = ({ exercise, selectExerciseForWorkout }: ExerciseSearchDetailsProps) => {
  return (
    <React.Fragment>
      <ul   >
        <li>Uses {exercise.equipment}</li>
        <li>Works {exercise.bodyPart}</li>
        <li>Targets {exercise.target}</li>
      </ul>
      <Button color='green' content="Select" onClick={() => selectExerciseForWorkout(exercise)} />
    </React.Fragment>
  )
}

export default connector(ExerciseSearchDetails)