import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import _ from 'lodash'
import { Button, Card, CardProps, List, ListItemProps } from 'semantic-ui-react'
import { Workout, WorkoutSet, WorkoutInterval, WorkoutSequence } from '../../models/Workout';
import { AppDateTime } from 'components/utils/AppDateTime'
import WorkoutDatetime from './WorkoutDatetime'
import { deleteWorkout } from '../../redux/actions/workout';
import ButtonLink from 'components/nav/ButtonLink'

const mapStateToProps = (state: RootState) => ({})
const mapDispatchToProps = { deleteWorkout }

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

//
// No need to include any props from mapState or mapDispatch
// They are automatically typed by react-redux
interface WorkoutListCardProps extends PropsFromRedux, CardProps {
  workout: Workout
  onClickHandler(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, data: CardProps): void
  active?: boolean
  details?: JSX.Element
  className?: string
}

const WorkoutListCard = ({ workout, active, details, className = "workout", onClickHandler, editWorkout, deleteWorkout }: WorkoutListCardProps) => {
  if (active) className += ' active blue';
  const sequences = _.flatten(workout.sequenceList);
  const exercises = _.uniq(sequences.map(seq => seq.exercise));
  const workoutBodyParts = _.uniq(exercises.map(ex => _.startCase(`${ex.bodyPart}`)));
  const workoutMuscles = _.uniq(exercises.map(ex => _.startCase(`${ex.target}`)));

  return (
    <Card as="div" onClick={onClickHandler} className={className}>
      <Card.Content>
        <Card.Header >
          {workoutBodyParts + ' Workout'}
          {!active && <div className='right floated'> {new AppDateTime(workout.datetime.start).mini()}</div>}
          {active && <Button.Group compact floated='right'>
            <ButtonLink basic to={"/dashboard/workout"} icon="edit" alt="Edit Workout" />
            <Button basic icon="copy" alt="Copy as New Workout" />
            <Button basic icon="trash" alt="Delete Workout" onClick={() => deleteWorkout(workout)} />
          </Button.Group>}
        </Card.Header>
        <Card.Meta content={workoutMuscles} />
        {active && <WorkoutDatetime compact isEditable={false} workout={workout} />}
        {active && details}
      </Card.Content>
    </Card>
  )
}

export default connector(WorkoutListCard)