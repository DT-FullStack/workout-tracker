import React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import { List } from 'semantic-ui-react';
import { WorkoutInterval } from '../../../../models/Workout';

interface ShowIntervalProps {
  interval: WorkoutInterval
}

const ShowInterval = ({ interval: { exerciseName, weight, duration, speed, incline, calories } }: ShowIntervalProps) => {

  return (
    <List.Item >
      <List.Header content={exerciseName} />
      <List.Content >
        {duration} minutes
        {weight && weight > 0 && `${weight} lbs`}
        {speed && speed > 0 && `${speed} mph`}
        {incline && incline > 0 && `${incline}% incline`}
        {calories && calories > 0 && `${calories} calories`}
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