import React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import { List, Label } from 'semantic-ui-react';
import { humanDuration } from 'components/utils/AppDateTime';
import { WorkoutInterval } from '../../models/Workout';

interface ShowIntervalProps {
  interval: WorkoutInterval
}

const ShowInterval = ({ interval: { exercise, weight, distance, duration, speed, incline, calories } }: ShowIntervalProps) => {
  const showDuration = humanDuration();
  return (
    <List.Item >
      <List.Header content={exercise.name} />
      <List.Content >
        <Label.Group>
          <Label>{showDuration(duration)}</Label>
          {weight && weight > 0 && <Label>{weight} lbs</Label>}
          {distance && distance > 0 && <Label>{distance} mi</Label>}
          {speed && speed > 0 && <Label>{speed} mph</Label>}
          {incline && incline > 0 && <Label>{incline}% incline</Label>}
          {calories && calories > 0 && <Label>{calories} calories</Label>}
        </Label.Group>
      </List.Content>
    </List.Item>

  )
}

ShowInterval.propTypes = {
  // second: PropTypes.
}

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ShowInterval)