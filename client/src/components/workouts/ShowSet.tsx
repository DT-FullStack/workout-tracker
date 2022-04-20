import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import { List, ListItem, Label, Button } from 'semantic-ui-react';
import { WorkoutSet } from '../../models/Workout';
import { setWorkoutCursor } from '../../redux/actions/workout';
import CurrentSet from './CurrentSet';
import CurrentSequenceItem from './CurrentSequenceItem';

const mapStateToProps = ({ workout }: RootState) => ({
  workout: workout.current,
  cursor: workout.cursor
})
const mapDispatchToProps = { setWorkoutCursor }
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>


interface ShowSetProps extends PropsFromRedux {
  set: WorkoutSet,
  index: number
  sequenceIndex: number,
}

const ShowSet = ({ workout, cursor, set, index, sequenceIndex, setWorkoutCursor }: ShowSetProps) => {
  const { exercise, reps, weight, barWeight, weightAssist } = set;
  const isSelected = (cursor && (cursor[0] === sequenceIndex) && (cursor[1] === index)) || false;

  const totalWeight =
    weight || barWeight
      ? (weight || 0) + (barWeight || 0)
      : null;
  const renderDisplay = () => <React.Fragment>
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
      {isSelected && <CurrentSequenceItem initial={set} />}
    </List.Item>

  )
}

export default connector(ShowSet)