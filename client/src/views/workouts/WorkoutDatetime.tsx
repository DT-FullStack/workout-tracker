import React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import { Button, Card, CardGroup, Icon } from 'semantic-ui-react'
import { Workout } from '../../../../models/Workout';
import { AppDateTime } from '../utils/AppDateTime';
import { startWorkout, endWorkout, clearStart, clearEnd } from '../../redux/actions/workout';
import { IconButton } from 'views/utils/AppIconButton';

interface WorkoutDatetimeProps {
  workout: Workout
  startWorkout(): void
  endWorkout(): void
  clearStart(): void
  clearEnd(): void
}

const WorkoutDatetime = ({ workout, startWorkout, endWorkout, clearStart, clearEnd }: WorkoutDatetimeProps) => {
  const { datetime: { start, end } } = workout;
  const startTime: AppDateTime | null = start ? new AppDateTime(start) : null;
  const endTime: AppDateTime | null = end ? new AppDateTime(end) : null;
  const reset = (action: () => void, text: string = 'reset') => <IconButton className='right corner reset' name="x" onClick={action} />
  return (
    <CardGroup itemsPerRow={2} className='workout datetime' >
      <Card className='green'>
        {startTime
          ? <Card.Content textAlign='center'  >
            <Card.Header>{startTime.toTimeOrDateTimeString()}</Card.Header>
            <Card.Meta content='Start Time' />
            {reset(clearStart)}
          </Card.Content>
          : <Button className='fill' color='green' content="Start" onClick={startWorkout} />
        }
      </Card>
      <Card color='red'>
        {endTime
          ? <Card.Content textAlign='center' header={endTime.toTimeOrDateTimeString()} meta="End Time" >
            <Card.Header content={endTime.toTimeOrDateTimeString()} />
            <Card.Meta content='End Time' />
            {reset(clearEnd)}
          </Card.Content>
          : <Button className='fill' color='red' content="End" onClick={endWorkout} />}
      </Card>
    </CardGroup>
  )
}

WorkoutDatetime.propTypes = {
  // second: PropTypes.
}

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = { startWorkout, endWorkout, clearStart, clearEnd }

export default connect(mapStateToProps, mapDispatchToProps)(WorkoutDatetime)