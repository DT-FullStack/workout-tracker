import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import { Button, Header, Menu, Segment } from 'semantic-ui-react';
import { BackButton } from 'components/nav/Buttons/BackButton';
import ShowWorkout from './ShowWorkout';
import { saveWorkout, resetSaveTracker } from '../../redux/actions/workout';

const mapStateToProps = ({ workout, exercises }: RootState) => ({
  workout: workout.current,
  hasChanges: workout.hasChanges,
  isSearching: workout.isSearching,
})

const mapDispatchToProps = { saveWorkout }

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface CurrentWorkoutProps extends PropsFromRedux { }

const CurrentWorkout = ({ workout, isSearching, hasChanges, saveWorkout }: CurrentWorkoutProps) => {
  const buttonText = workout._id !== undefined ? 'Save Changes' : 'Record Workout';
  return (
    <Segment basic>
      <Menu secondary>
        <Menu.Item content={<BackButton />} />
        <Menu.Item content={`Current Workout`} />
      </Menu>
      {hasChanges
        ? <Button color='green' fluid content={buttonText} onClick={() => { saveWorkout(workout) }} />
        : <Button disabled fluid content={buttonText} />}

      <ShowWorkout editable workout={workout} />
    </Segment>
  )
}

export default connector(CurrentWorkout)