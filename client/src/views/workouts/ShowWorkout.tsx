import React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import { List, Segment } from 'semantic-ui-react';
import { Workout, WorkoutSequence } from '../../../../models/Workout';
import WorkoutDatetime from './WorkoutDatetime';
import { Exercise } from '../../api/ExerciseDB';
import ExerciseCard from '../exercises/ExerciseCard';

interface ShowWorkoutProps {
  workout: Workout
  currentExercise: Exercise | null
}

const ShowWorkout = ({ workout, currentExercise }: ShowWorkoutProps) => {
  const { datetime: { start, end }, sequenceList } = workout;
  // const renderSequenceListItem = (sequence: WorkoutSequence) => <SequenceListItem sequence={sequence} />;
  return (
    <Segment className='workout display' basic>
      <WorkoutDatetime workout={workout} />
      <List>
        {sequenceList.length ? sequenceList.map((sequence, s) => s) : <List.Item content="Add some exercises" />}
      </List>
    </Segment>
  )
}

ShowWorkout.propTypes = {
  // second: PropTypes.
}

const mapStateToProps = ({ exercises }: RootState) => ({
  currentExercise: exercises.current
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ShowWorkout)