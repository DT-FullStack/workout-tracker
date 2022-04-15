import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import { List, Segment } from 'semantic-ui-react';
import { Workout, WorkoutSequence } from '../../models/Workout';
import WorkoutDatetime from './WorkoutDatetime';
import ShowSequence from './ShowSequence';

const mapStateToProps = (state: RootState) => ({})
const mapDispatchToProps = {}
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>


interface ShowWorkoutProps extends PropsFromRedux {
  workout: Workout
  collapsible?: boolean
}

const ShowWorkout = ({ workout, collapsible }: ShowWorkoutProps) => {
  const { sequenceList } = workout;
  return (
    <Segment className='workout display' basic>
      <WorkoutDatetime workout={workout} />
      <Segment basic>
        {sequenceList.length ? sequenceList.map((sequence, s) => <ShowSequence key={s} index={s} sequence={sequence} />) : <List.Item content="No activity recorded yet" />}
      </Segment>
    </Segment>
  )
}


export default connector(ShowWorkout)