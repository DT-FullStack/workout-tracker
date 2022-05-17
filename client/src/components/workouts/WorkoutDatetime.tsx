import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import { Button, Card, CardGroup, Header, Icon } from 'semantic-ui-react'
import { Workout } from '../../models/Workout';
import { AppDateTime } from '../utils/AppDateTime';
import { startWorkout, endWorkout, clearStart, clearEnd } from '../../redux/actions/workout';
import { IconButton } from 'components/utils/AppIconButton';
import _ from 'lodash'
import { DateTimePicker } from '@codewizard-dt/react-semantic-datetime-picker';

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = { startWorkout, endWorkout, clearStart, clearEnd }

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>


interface WorkoutDatetimeProps extends PropsFromRedux {
  workout: Workout
  isEditable?: boolean
  compact?: boolean
}

const WorkoutDatetime = ({ workout, isEditable = true, compact, startWorkout, endWorkout, clearStart, clearEnd }: WorkoutDatetimeProps) => {
  const { datetime: { start, end } } = workout;
  const startTime: AppDateTime | null = start ? new AppDateTime(start) : null;
  const endTime: AppDateTime | null = end ? new AppDateTime(end) : null;
  const reset = (action: typeof clearStart, text: string = 'reset') => <IconButton className='right corner reset' name="x" onClick={() => action(null)} />
  const duration = () => startTime && endTime
    ? `${_.ceil(endTime.timeBetween(startTime).as('minutes'))} minutes`
    : 'Duration not recorded';


  return compact && !isEditable
    ? <Header as="h4" content={startTime?.short() || 'Start time not recorded'} subheader={duration()} />
    : (<CardGroup itemsPerRow={2} className='workout datetime' >
      <Card className='green'>
        {startTime
          ? <Card.Content textAlign='center'  >
            <Card.Header><DateTimePicker initial={startTime.dt} /></Card.Header>
            <Card.Meta content='Start Time' />
          </Card.Content>
          : <Button className='fill' color='green' content="Start" onClick={() => startWorkout(Date.now())} />
        }
      </Card>
      <Card color='red'>
        {endTime
          ? <Card.Content textAlign='center' >
            <Card.Header content={<DateTimePicker initial={endTime.dt} />} />
            <Card.Meta content='End Time' />
            {reset(clearEnd)}
          </Card.Content>
          : <Button className='fill' color='red' content="End" onClick={() => endWorkout(Date.now())} />}
      </Card>
    </CardGroup>)
}


export default connect(mapStateToProps, mapDispatchToProps)(WorkoutDatetime)