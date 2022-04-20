import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import { Button, List } from 'semantic-ui-react';
import { WorkoutSequence, WorkoutSet, WorkoutInterval } from '../../models/Workout';
import ShowInterval from './ShowInterval';
import ShowSet from './ShowSet';
import _ from 'lodash';
import { setWorkoutCursor, openSearch } from '../../redux/actions/workout';
import ExerciseSearch from 'components/exercises/ExerciseSearch';
import CurrentSequenceItem from './CurrentSequenceItem';
import ShowSequenceItem from './ShowSequenceItem';

const mapStateToProps = ({ workout, auth }: RootState) => ({
  isSearching: workout.isSearching,
  cursor: workout.cursor
})
const mapDispatchToProps = { setWorkoutCursor, openSearch }

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

interface ShowSequenceProps extends PropsFromRedux {
  sequence: WorkoutSequence
  compact?: boolean
  index: number
  editable?: boolean
}

const ShowSequence = ({ sequence, compact, index, editable, isSearching, cursor, openSearch, setWorkoutCursor }: ShowSequenceProps) => {
  const exercises = _.uniq(sequence.map(item => item.exercise.name));
  const compactRender = () => <List.Item className='compact' content={exercises.join(', ')} />
  const headerText = () => sequence.length
    ? _.uniq(sequence.map(item => item.exercise.bodyPart)).join(', ')
    : 'New workout';
  const hasCursor = () => cursor && (cursor[0] === index) && (sequence.length === cursor[1]);

  return (
    <React.Fragment>
      <List className='sequence' divided>
        <List.Header as="h3" content={headerText()} />
        {compact
          ? compactRender()
          : sequence.map((item, i) => <ShowSequenceItem key={i} index={i} sequenceIndex={index} item={item} />)
        }
      </List>
      {editable &&
        <React.Fragment>
          <Button.Group fluid className='bottom attached' basic >
            <Button icon="plus" alt="Add new exercise" onClick={() => { openSearch([index, sequence.length]); }} />
            {/* <Button icon="copy" onClick={() => { }} /> */}
            <Button icon="trash" onClick={() => { }} />
            <Button icon="angle double down" onClick={() => { }} />
          </Button.Group>
          {hasCursor() && <CurrentSequenceItem />}
        </React.Fragment>
      }
      {/* {isSearching && hasCursor() && <ExerciseSearch />} */}
    </React.Fragment>

  )
}



export default connector(ShowSequence)