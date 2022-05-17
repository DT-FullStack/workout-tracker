import React, { useEffect, useRef } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import { Button, Header, Menu, Segment } from 'semantic-ui-react';
import { BackButton } from 'components/nav/Buttons/BackButton';
import ShowWorkout from './ShowWorkout';
import { saveWorkout, resetSaveTracker, triggerChange } from '../../redux/actions/workout';

const mapStateToProps = ({ workout: { current, emittedChangeEvent, isSearching, hasChanges }, exercises }: RootState) => ({
  workout: current,
  emittedChangeEvent,
  isSearching,
  hasChanges
})

const mapDispatchToProps = { saveWorkout, triggerChange }

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>;

interface CurrentWorkoutProps extends PropsFromRedux { }

const CurrentWorkout = ({ workout, isSearching, emittedChangeEvent, hasChanges, triggerChange, saveWorkout }: CurrentWorkoutProps) => {
  const buttonText = workout._id !== undefined ? 'Save Changes' : 'Save Workout';
  const timer = useRef<ReturnType<typeof setTimeout>>();
  useEffect(() => {
    if (emittedChangeEvent) {
      triggerChange();
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => { if (hasChanges) saveWorkout(workout) }, 10 * 1000)
    }
  }, [emittedChangeEvent, triggerChange, hasChanges])
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