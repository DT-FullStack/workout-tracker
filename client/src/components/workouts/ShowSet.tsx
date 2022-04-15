import React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import { List, ListItem, Label } from 'semantic-ui-react';
import { WorkoutSet } from '../../../../models/Workout';

interface ShowSetProps {
  set: WorkoutSet
}


const ShowSet = ({ set: { exercise, reps, weight, barWeight } }: ShowSetProps) => {
  const totalWeight =
    weight || barWeight
      ? (weight || 0) + (barWeight || 0)
      : null;

  return (
    <List.Item >
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
    </List.Item>

  )
}

ShowSet.propTypes = {
  // second: PropTypes.
}

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ShowSet)