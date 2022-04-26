import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import { Button, List, Segment } from 'semantic-ui-react';
import { Workout, WorkoutSequence } from '../../models/Workout';
import WorkoutDatetime from './WorkoutDatetime';
import ShowSequence from './ShowSequence';
import { addNewSequence } from 'redux/actions/workout';

const mapStateToProps = (state: RootState) => ({})
const mapDispatchToProps = { addNewSequence }
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>


interface ShowWorkoutProps extends PropsFromRedux {
  workout: Workout
  editable?: boolean
}

const ShowWorkout = ({ workout, editable, addNewSequence }: ShowWorkoutProps) => {
  const { sequenceList } = workout;
  return (
    <Segment className='workout display' basic>
      <WorkoutDatetime workout={workout} />
      <Segment basic>
        {sequenceList.length ? sequenceList.map((sequence, s) => <ShowSequence compact={false} key={s} index={s} editable sequence={sequence} />) : <List.Item content="No activity recorded" />}
      </Segment>
      <Button icon="angle double down" fluid onClick={() => { addNewSequence() }} />
    </Segment>
  )
}


export default connector(ShowWorkout)