import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import { Button, Item, List } from 'semantic-ui-react';
import { WorkoutSet, WorkoutInterval } from '../../models/Workout';
import { setWorkoutCursor, duplicateSequenceItem } from '../../redux/actions/workout';
import ShowInterval from './ShowInterval';
import ShowSet from './ShowSet';

const mapStateToProps = ({ workout }: RootState) => ({
  workout: workout.current,
  cursor: workout.cursor
})
const mapDispatchToProps = { setWorkoutCursor }

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

interface ShowSequenceItemProps extends PropsFromRedux {
  item: WorkoutSet & WorkoutInterval,
  index: number
  sequenceIndex: number,
}

const ShowSequenceItem = ({ workout, cursor, sequenceIndex, index, item, setWorkoutCursor }: ShowSequenceItemProps) => {
  const { exercise, reps, duration } = item;
  const isSelected = (cursor && (cursor[0] === sequenceIndex) && (cursor[1] === index)) || false;
  const renderEditOptions = () => (
    (index !== undefined && sequenceIndex !== undefined) &&
    <Button.Group className='compact' floated='right'>
      {isSelected
        ? <Button basic icon="x" alt="Cancel" onClick={() => setWorkoutCursor()} />
        : <React.Fragment>
          <Button basic icon="edit" alt="Edit Set" onClick={() => { setWorkoutCursor([sequenceIndex, index]) }} />
          <Button basic icon="copy" alt="Copy as New Set" onClick={() => { duplicateSequenceItem(item) }} />
          <Button basic icon="trash" alt="Delete Set" onClick={() => { }} />
        </React.Fragment>}
    </Button.Group>
  )

  return (
    <List.Item>
      {renderEditOptions()}
      <List.Header content={exercise.name} />
      {reps !== undefined && <ShowSet index={index} sequenceIndex={sequenceIndex} set={item} />}
      {duration !== undefined && <ShowInterval index={index} sequenceIndex={sequenceIndex} interval={item} />}
    </List.Item>

  )
}

export default connector(ShowSequenceItem)