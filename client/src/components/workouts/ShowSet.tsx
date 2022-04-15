import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import { List, ListItem, Label, Button } from 'semantic-ui-react';
import { WorkoutSet } from '../../models/Workout';
import { setWorkoutCursor } from '../../redux/actions/workout';
import CurrentSet from './CurrentSet';

const mapStateToProps = ({ workouts }: RootState) => ({
  workout: workouts.current,
  sequence: workouts.sequence,
  cursor: workouts.cursor
  // activeItem: workouts.cursor ? workouts.current.sequenceList[workouts.cursor[0]][workouts.cursor[1]] : null,
})
const mapDispatchToProps = { setWorkoutCursor }
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>


interface ShowSetProps extends PropsFromRedux {
  set: WorkoutSet,
  index?: number
  sequenceIndex?: number,
}

const ShowSet = ({ workout, sequence, cursor, set: { exercise, reps, weight, barWeight, weightAssist }, index, sequenceIndex, setWorkoutCursor }: ShowSetProps) => {
  const isSelected = (cursor && (cursor[0] === sequenceIndex) && (cursor[1] === index)) || false;

  const totalWeight =
    weight || barWeight
      ? (weight || 0) + (barWeight || 0)
      : null;
  const renderEditOptions = () => (
    (index !== undefined && sequenceIndex !== undefined) &&
    <Button.Group className='compact' floated='right'>
      {isSelected
        ? <Button basic icon="x" alt="Cancel" onClick={() => setWorkoutCursor()} />
        : <React.Fragment>
          <Button basic icon="edit" alt="Edit Set" onClick={() => { setWorkoutCursor([sequenceIndex, index]) }} />
          <Button basic icon="copy" alt="Copy as New Set" onClick={() => { }} />
          <Button basic icon="trash" alt="Delete Set" onClick={() => { }} />
        </React.Fragment>}
    </Button.Group>
  )
  const renderDisplay = () => <React.Fragment>
    {renderEditOptions()}
    <List.Header content={exercise.name} />
    <List.Content >
      <Label.Group>
        <Label>{reps} reps</Label>
        {weight && weight > 0 && <Label>{weight} lbs</Label>}
        {barWeight && barWeight > 0 && (
          <React.Fragment>
            <Label>{barWeight} lb barbell</Label>
            <Label>{totalWeight} lb total</Label>
          </React.Fragment>
        )}
      </Label.Group>
    </List.Content>
  </React.Fragment>

  return (
    <List.Item >
      {renderDisplay()}
      {isSelected && <CurrentSet edit exercise={exercise} initial={{ reps, barWeight, weight, weightAssist }} />}
    </List.Item>

  )
}

export default connector(ShowSet)