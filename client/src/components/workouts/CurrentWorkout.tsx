import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import { Button, Header, Menu, Segment } from 'semantic-ui-react';
import { BackButton } from 'components/nav/Buttons/BackButton';
import CurrentSequence from './CurrentSequence';
import ShowWorkout from './ShowWorkout';
import ExerciseSearch from 'components/exercises/ExerciseSearch';
import { saveWorkout, resetSaveTracker } from '../../redux/actions/workout';
import { useNavigate } from 'react-router-dom';

const mapStateToProps = ({ workouts, exercises }: RootState) => ({
  workout: workouts.current,
  hasChanges: workouts.hasChanges,
  isSearching: workouts.isSearching,
  justSaved: workouts.saveEventSuccess,
})

const mapDispatchToProps = { saveWorkout, resetSaveTracker }

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface CurrentWorkoutProps extends PropsFromRedux { }

const CurrentWorkout = ({ workout, isSearching, hasChanges, justSaved, saveWorkout, resetSaveTracker }: CurrentWorkoutProps) => {
  const buttonText = workout._id !== undefined ? 'Save Changes' : 'Record Workout';
  const nav = useNavigate();
  // useEffect(() => {
  //   if (justSaved === true) {
  //     resetSaveTracker();
  //     nav(-1);
  //   }
  // }, [justSaved, nav, resetSaveTracker])
  return (
    <Segment basic>
      <Menu secondary>
        <Menu.Item content={<BackButton />} />
        <Menu.Item content={`Current Workout`} />
      </Menu>
      {hasChanges
        ? <Button color='green' fluid content={buttonText} onClick={() => { saveWorkout(workout) }} />
        : <Button disabled fluid content={buttonText} />}

      <ShowWorkout workout={workout} />
      {isSearching && (
        <Segment>
          <ExerciseSearch />
        </Segment>
      )}
      <CurrentSequence />
    </Segment>
  )
}

export default connector(CurrentWorkout)