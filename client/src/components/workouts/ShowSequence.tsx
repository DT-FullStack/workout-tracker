import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import { Button, List } from 'semantic-ui-react';
import { WorkoutSequence } from '../../models/Workout';
import _ from 'lodash';
import { v4 as uuid } from 'uuid';
import { setWorkoutCursor, openSearch, addNewSequence, deleteSequence } from '../../redux/actions/workout';
import CurrentSequenceItem from './CurrentSequenceItem';
import ShowSequenceItem from './ShowSequenceItem';
import { Exercise } from 'models/Exercise';
import ConfirmDelete from 'components/utils/ConfirmDelete';
import ConfirmCopy from 'components/utils/ConfirmCopy';


const mapStateToProps = ({ workout, auth }: RootState) => ({
  isSearching: workout.isSearching,
  cursor: workout.cursor
})
const mapDispatchToProps = { setWorkoutCursor, openSearch, addNewSequence, deleteSequence }

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

interface ShowSequenceProps extends PropsFromRedux {
  sequence: WorkoutSequence
  compact: boolean
  index: number
  editable?: boolean
}

const ShowSequence = ({ sequence, compact, index, editable, cursor, openSearch, setWorkoutCursor, addNewSequence, deleteSequence }: ShowSequenceProps) => {
  const exercises = _.uniq(sequence.map(item => item.exercise.name));
  const indentIndex = ({ name }: Exercise) => _.indexOf(exercises, name);

  const headerText = () => sequence.length
    ? _.uniq(sequence.map(item => _.startCase(item.exercise.bodyPart))).join(' / ')
    : 'New set';
  const hasCursor = () => cursor && (cursor[0] === index) && (sequence.length === cursor[1]);

  const compactList = _.uniqBy(sequence, ({ exercise: { name } }) => name);
  const renderCompact = () =>
    <List className='sequence'>
      <List.Header as="h3" content={headerText()} />
      {compactList.map((item, i) => <ShowSequenceItem key={uuid()} index={i} sequenceIndex={index} compact indentIndex={indentIndex(item.exercise)} item={item} />)}
    </List>
  const renderExpanded = () =>
    <React.Fragment>
      <List className='sequence' divided>
        <List.Header as="h3" content={headerText()} />
        {sequence.map((item, i) => <ShowSequenceItem key={uuid()} index={i} sequenceIndex={index} indentIndex={indentIndex(item.exercise)} item={item} />)}
      </List>
      {editable &&
        <React.Fragment>
          <Button.Group fluid className='bottom attached' basic widths={3} >
            <Button icon="plus" alt="Add new exercise" onClick={() => { openSearch([index, sequence.length]); }} />
            <ConfirmCopy onConfirm={() => { }} />
            <ConfirmDelete onConfirm={() => deleteSequence(index)} />
            {/* <Button icon="trash" onClick={() => { deleteSequence(index) }} /> */}
          </Button.Group>
          {hasCursor() && <CurrentSequenceItem />}
        </React.Fragment>
      }
    </React.Fragment>

  return compact ? renderCompact() : renderExpanded();

}



export default connector(ShowSequence)