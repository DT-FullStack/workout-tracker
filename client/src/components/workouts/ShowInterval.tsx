import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import { List, Label, Button } from 'semantic-ui-react';
import { humanDuration } from 'components/utils/AppDateTime';
import { WorkoutInterval } from '../../models/Workout';
import { setWorkoutCursor } from '../../redux/actions/workout';
import CurrentInterval from './CurrentInterval';

const mapStateToProps = ({ workouts }: RootState) => ({
  workout: workouts.current,
  sequence: workouts.sequence,
  cursor: workouts.cursor
})
const mapDispatchToProps = { setWorkoutCursor }
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>


interface ShowIntervalProps extends PropsFromRedux {
  interval: WorkoutInterval,
  index?: number
  sequenceIndex?: number
}

const ShowInterval = ({ cursor, index, sequenceIndex, setWorkoutCursor, interval: { exercise, weight, distance, duration, speed, incline, calories } }: ShowIntervalProps) => {
  const isSelected = (cursor && (cursor[0] === sequenceIndex) && (cursor[1] === index)) || false;
  const showDuration = humanDuration();
  const renderEditOptions = () => (
    (index !== undefined && sequenceIndex !== undefined) &&
    <Button.Group className='compact' floated='right'>
      <Button basic icon="edit" alt="Edit Interval" onClick={() => { setWorkoutCursor([sequenceIndex, index]) }} />
      <Button basic icon="copy" alt="Copy as New Interval" onClick={() => { }} />
      <Button basic icon="trash" alt="Delete Interval" onClick={() => { }} />
    </Button.Group>
  )
  const renderDisplay = () => <React.Fragment>
    <List.Content >
      <Label.Group>
        <Label>{showDuration(duration)}</Label>
        {weight && weight > 0 && <Label>{weight} lbs</Label>}
        {distance && distance > 0 && <Label>{distance} mi</Label>}
        {speed && speed > 0 && <Label>{speed} mph</Label>}
        {incline && incline > 0 && <Label>{incline}% incline</Label>}
        {calories && calories > 0 && <Label>{calories} calories</Label>}
      </Label.Group>
    </List.Content>
  </React.Fragment>;

  return (
    <List.Item >
      {renderDisplay()}
      {isSelected && <CurrentInterval edit exercise={exercise} />}
    </List.Item>

  )
}


export default connector(ShowInterval)