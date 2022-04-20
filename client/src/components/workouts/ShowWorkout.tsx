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
  editable?: boolean
}

const ShowWorkout = ({ workout, editable }: ShowWorkoutProps) => {
  const { sequenceList } = workout;
  return (
    <Segment className='workout display' basic>
      <WorkoutDatetime workout={workout} />
      <Segment basic>
        {sequenceList.length ? sequenceList.map((sequence, s) => <ShowSequence key={s} index={s} editable sequence={sequence} />) : <List.Item content="No activity recorded" />}
      </Segment>
    </Segment>
  )
}


export default connector(ShowWorkout)