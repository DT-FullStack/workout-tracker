import React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import { List } from 'semantic-ui-react';
import { WorkoutSequence, WorkoutSet, WorkoutInterval } from '../../models/Workout';
import ShowInterval from './ShowInterval';
import ShowSet from './ShowSet';
import _ from 'lodash';

interface ShowSequenceProps {
  sequence: WorkoutSequence
  compact?: boolean
}

const ShowSequence = ({ sequence, compact }: ShowSequenceProps) => {
  const exercises = _.uniq(sequence.map(item => item.exercise.name));

  const renderItem = (key: number, item: WorkoutSet & WorkoutInterval) => (
    item.reps
      ? <ShowSet key={key} set={item} />
      : <ShowInterval key={key} interval={item} />
  )
  const compactRender = () => <List.Item className='compact' content={exercises.join(', ')} />

  return (
    <React.Fragment>
      {sequence.length ?
        <List className='sequence' divided>
          <List.Header as="h3" content={_.uniq(sequence.map(item => item.exercise.bodyPart)).join(', ')} />
          {compact
            ? compactRender()
            : sequence.map((item, i) => renderItem(i, item as WorkoutSet & WorkoutInterval))

          }
        </List>
        : <div>Add any combination of sets and intervals</div>
      }
    </React.Fragment>

  )
}

ShowSequence.propTypes = {
  // second: PropTypes.
}

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ShowSequence)