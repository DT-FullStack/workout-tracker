import React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import { List, ListItem } from 'semantic-ui-react';
import { WorkoutSet } from '../../../../models/Workout';

interface ShowSetProps {
  set: WorkoutSet
}

const ShowSet = ({ set: { exerciseName, reps, weight, barWeight } }: ShowSetProps) => {
  const totalWeight =
    weight || barWeight
      ? (weight || 0) + (barWeight || 0)
      : null;

  return (
    <List.Item >
      <List.Header content={exerciseName} />
      <List.Content >
        {reps} reps
        {weight && weight > 0 && `${weight} lbs`}
        {barWeight && barWeight > 0 && `${barWeight} lbs`}
      </List.Content>
    </List.Item>

  )
}

ShowSet.propTypes = {
  // second: PropTypes.
}

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ShowSet)