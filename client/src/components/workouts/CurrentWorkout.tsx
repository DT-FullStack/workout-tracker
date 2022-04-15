import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import { Button, Menu, Segment } from 'semantic-ui-react';
import { BackButton } from 'components/nav/Buttons/BackButton';
import CurrentSequence from './CurrentSequence';
import ShowWorkout from './ShowWorkout';
import ExerciseSearch from 'components/exercises/ExerciseSearch';
import { saveWorkout, resetSaveTracker } from '../../redux/actions/workout';
import { useNavigate } from 'react-router-dom';

const mapStateToProps = ({ workouts, exercises }: RootState) => ({
  workout: workouts.current,
  isSearching: workouts.isSearching,
  justSaved: workouts.saveEventSuccess,
})

const mapDispatchToProps = { saveWorkout, resetSaveTracker }

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface CurrentWorkoutProps extends PropsFromRedux { }

const CurrentWorkout = ({ workout, isSearching, justSaved, saveWorkout, resetSaveTracker }: CurrentWorkoutProps) => {
  const nav = useNavigate();
  useEffect(() => {
    if (justSaved === true) {
      resetSaveTracker();
      nav(-1);
    }
  }, [justSaved, resetSaveTracker])
  return (
    <Segment basic>
      <Menu secondary>
        <Menu.Item content={<BackButton />} />
        <Menu.Item content={"Current Workout"} />
      </Menu>
      <Button disabled={workout.sequenceList.length === 0} color='blue' fluid content="Record Workout" onClick={() => { saveWorkout(workout) }} />
      <ShowWorkout workout={workout} />

      {/* <React.Fragment> */}
      {isSearching && (
        <Segment>
          <ExerciseSearch />
        </Segment>
      )}
      <CurrentSequence />
      {/* </React.Fragment> */}
    </Segment>
  )
}

export default connector(CurrentWorkout)