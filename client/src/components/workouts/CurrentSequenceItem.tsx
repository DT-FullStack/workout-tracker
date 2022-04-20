import React, { useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import { Button, Container, Divider, Grid, Header, Segment } from 'semantic-ui-react';
import AppPlaceholderImage from 'components/utils/AppPlaceholderImage';
import CurrentSet from './CurrentSet';
import CurrentInterval from './CurrentInterval';
import { openSearch } from '../../redux/actions/workout';
import { WorkoutSet, WorkoutInterval } from '../../models/Workout';
import ExerciseImage from 'components/exercises/ExerciseImage';

const mapStateToProps = ({ workout: { exercise } }: RootState) => ({
  exercise
})

const mapDispatchToProps = { openSearch }

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

interface CurrentSequenceItemProps extends PropsFromRedux {
  initial?: Partial<WorkoutSet & WorkoutInterval>;
}

const CurrentSequenceItem = ({ exercise, initial, openSearch }: CurrentSequenceItemProps) => {
  const [exerciseType, setExerciseType] = useState<'set' | 'interval'>('set');

  return (
    exercise &&
    <Segment basic>
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
    </Segment>
  )
}


export default connect(mapStateToProps, mapDispatchToProps)(CurrentSequenceItem)