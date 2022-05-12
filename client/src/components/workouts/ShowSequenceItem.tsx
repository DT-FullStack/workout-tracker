import ConfirmCopy from 'components/utils/ConfirmCopy';
import ConfirmDelete from 'components/utils/ConfirmDelete';
import StatLabels from 'components/utils/StatLabels';
import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import { Button, Item, Label, List } from 'semantic-ui-react';
import { WorkoutSet, WorkoutInterval } from '../../models/Workout';
import { setWorkoutCursor, duplicateSequenceItem, deleteSequenceItem } from '../../redux/actions/workout';
import CurrentSequenceItem from './CurrentSequenceItem';
import { StatsInterval } from './StatsInterval';
import { StatsSet } from './StatsSet';

const mapStateToProps = ({ workout }: RootState) => ({
  workout: workout.current,
  cursor: workout.cursor
})
const mapDispatchToProps = { setWorkoutCursor, duplicateSequenceItem, deleteSequenceItem }

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

interface ShowSequenceItemProps extends PropsFromRedux {
  item: WorkoutSet & WorkoutInterval,
  index: number
  sequenceIndex: number,
  indentIndex: number
  compact?: boolean
}

const ShowSequenceItem = ({ workout, cursor, sequenceIndex, index, item, indentIndex, compact, setWorkoutCursor, duplicateSequenceItem, deleteSequenceItem }: ShowSequenceItemProps) => {
  const { exercise, reps } = item;
  const isSelected = (cursor && (cursor[0] === sequenceIndex) && (cursor[1] === index)) || false;
  const statistics = reps
    ? new StatsSet(item)
    : new StatsInterval(item);

  const renderOptionButtons = () =>
    <Button.Group className='compact' floated='right'>
      {isSelected
        ? <Button basic icon="x" alt="Cancel" onClick={() => setWorkoutCursor()} />
        : <React.Fragment>
          <Button basic icon="edit" alt="Edit" onClick={() => { setWorkoutCursor([sequenceIndex, index]) }} />
          <ConfirmCopy position='right' rounded basic onConfirm={() => { duplicateSequenceItem([sequenceIndex, index]) }} />
          <ConfirmDelete position='right' rounded basic alt="Delete" onConfirm={() => deleteSequenceItem([sequenceIndex, index])} />
        </React.Fragment>}
    </Button.Group>

  const renderCompact = () =>
    <List.Item content={exercise.name} />
  const renderExpanded = () =>
    <List.Item>
      {renderOptionButtons()}
      <List.Header content={exercise.name} className={`indent-${indentIndex}`} />
      <StatLabels color='grey' stats={statistics} className={`indent-${indentIndex}`} />
      {isSelected && <CurrentSequenceItem initial={item} />}
    </List.Item>

  return compact ? renderCompact() : renderExpanded();
}

export default connector(ShowSequenceItem)