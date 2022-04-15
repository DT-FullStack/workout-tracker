import React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import { List, Segment } from 'semantic-ui-react';
import { Workout, WorkoutSequence } from '../../../../models/Workout';
import WorkoutDatetime from './WorkoutDatetime';
import { Exercise } from '../../api/ExerciseDB';
import ExerciseCard from '../exercises/ExerciseCard';
import ShowSequence from './ShowSequence';

interface ShowWorkoutProps {
  workout: Workout
  collapsible?: boolean
}

const ShowWorkout = ({ workout, collapsible }: ShowWorkoutProps) => {
  const { sequenceList } = workout;
  return (
    <Segment className='workout display' basic>
      <WorkoutDatetime workout={workout} />
      <Segment basic>
        {sequenceList.length ? sequenceList.map((sequence, s) => <ShowSequence key={s} sequence={sequence} />) : <List.Item content="No activity recorded yet" />}
      </Segment>
    </Segment>
  )
}

ShowWorkout.propTypes = {
  // second: PropTypes.
}

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ShowWorkout)