import React, { useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import { Button, Container, Divider, Grid, Header, Segment } from 'semantic-ui-react';
import AppPlaceholderImage from 'components/utils/AppPlaceholderImage';
import CurrentSet from './CurrentSet';
import CurrentInterval from './CurrentInterval';
import { openSearch, selectExerciseForWorkout } from '../../redux/actions/workout';
import { WorkoutSet, WorkoutInterval } from '../../models/Workout';
import ExerciseImage from 'components/exercises/ExerciseImage';
import ExerciseSearch from 'components/exercises/ExerciseSearch';

const mapStateToProps = ({ workout: { exercise, isSearching } }: RootState) => ({
  exercise, isSearching
})

const mapDispatchToProps = { openSearch, selectExerciseForWorkout }

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

interface CurrentSequenceItemProps extends PropsFromRedux {
  initial?: Partial<WorkoutSet & WorkoutInterval>;
}

const CurrentSequenceItem = ({ exercise, initial, isSearching, openSearch, selectExerciseForWorkout }: CurrentSequenceItemProps) => {
  const [exerciseType, setExerciseType] = useState<'set' | 'interval'>('set');
  useEffect(() => {
    if (initial?.exercise) selectExerciseForWorkout(initial.exercise);
  }, [initial?.exercise])
  return (
    <Segment basic>
      {exercise ? <React.Fragment>
        <Header className='center'>
          <span> {exercise.name}</span>
          <Button className='borderless' icon='edit' alt="Change exercise" basic compact onClick={() => openSearch()} />
        </Header>
        <Grid stackable className='exercise'>
          <Grid.Column width={8}>
            <Container textAlign='center' >
              <Button.Group  >
                <Button className={exerciseType === 'set' ? 'blue' : 'blue basic'} icon='list' content="Set" onClick={() => setExerciseType('set')} />
                <Button.Or className='lined' />
                <Button className={exerciseType === 'interval' ? 'blue' : 'blue basic'} icon='tachometer alternate' content='Interval' onClick={() => setExerciseType('interval')} />
              </Button.Group>
            </Container>
            {exerciseType === 'set' && <CurrentSet initial={initial} exercise={exercise} />}
            {exerciseType === 'interval' && <CurrentInterval initial={initial} exercise={exercise} />}
          </Grid.Column>
          <Grid.Column width={8} className="image">
            <ExerciseImage exercise={exercise} />
          </Grid.Column>
        </Grid>
      </React.Fragment>
        : (isSearching && <ExerciseSearch />)
      }
    </Segment>
  )
}


export default connect(mapStateToProps, mapDispatchToProps)(CurrentSequenceItem)