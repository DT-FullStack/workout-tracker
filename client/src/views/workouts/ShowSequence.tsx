import React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import { List } from 'semantic-ui-react';
import { WorkoutSequence, WorkoutSet, WorkoutInterval } from '../../../../models/Workout';
import ShowInterval from './ShowInterval';
import ShowSet from './ShowSet';

interface ShowSequenceProps {
  sequence: WorkoutSequence
}

const ShowSequence = ({ sequence }: ShowSequenceProps) => {
  const renderItem = (key: number, item: WorkoutSet & WorkoutInterval) => (
    item.reps
      ? <ShowSet key={key} set={item} />
      : <ShowInterval key={key} interval={item} />
  )
  return (
    <List>
      {sequence.map((item, i) => renderItem(i, item as WorkoutSet & WorkoutInterval))}
    </List>
  )
}

ShowSequence.propTypes = {
  // second: PropTypes.
}

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ShowSequence)