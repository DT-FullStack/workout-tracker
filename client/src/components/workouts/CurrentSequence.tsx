import React, { useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import { Exercise } from '../../api/ExerciseDB';
import { WorkoutSequence } from '../../../../models/Workout';
import ShowSequence from './ShowSequence';
import { Button, Container, Divider, Grid, Header, Segment } from 'semantic-ui-react';
import AppPlaceholderImage from 'components/utils/AppPlaceholderImage';
import CurrentSet from './CurrentSet';
import CurrentInterval from './CurrentInterval';
import { addSequenceToWorkout, toggleExerciseSearch } from '../../redux/actions/workout';

const mapStateToProps = ({ workouts: { sequence, exercise } }: RootState) => ({
  sequence, exercise
})

const mapDispatchToProps = { toggleExerciseSearch, addSequenceToWorkout }

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>

interface CurrentSequenceProps extends PropsFromRedux {
}

const CurrentSequence = ({ exercise, sequence, addSequenceToWorkout, toggleExerciseSearch }: CurrentSequenceProps) => {
  const [exerciseType, setExerciseType] = useState<'set' | 'interval'>('set');

  return (
    <Segment color='grey'>
      <Header content="Build a Workout Sequence" subheader="Use sequences to organize your sets and intervals" />
      <ShowSequence sequence={sequence} />
      {sequence.length !== 0 && <Button content="Record Sequence" fluid color="green" onClick={() => { addSequenceToWorkout(sequence) }} />}
      <Divider />

      <Header content={exercise?.name} textAlign='center' />
      <Button content={exercise ? 'Change Exercise' : 'Find An Exercise'} fluid color='blue' onClick={() => toggleExerciseSearch()} />

      {exercise && (
        <React.Fragment>
          <Grid stackable className='exercise'>
            <Grid.Column width={8}>
              <Container textAlign='center' >
                <Button.Group  >
                  <Button className={exerciseType === 'set' ? 'blue' : 'blue basic'} icon='list' content="Set" onClick={() => setExerciseType('set')} />
                  <Button.Or className='lined' />
                  <Button className={exerciseType === 'interval' ? 'blue' : 'blue basic'} icon='tachometer alternate' content='Interval' onClick={() => setExerciseType('interval')} />
                </Button.Group>
              </Container>
              {exerciseType === 'set' && <CurrentSet exercise={exercise} />}
              {exerciseType === 'interval' && <CurrentInterval exercise={exercise} />}
            </Grid.Column>
            <Grid.Column width={8} className="image">
              <AppPlaceholderImage altText={exercise.name} fullWidth srcUrl={exercise.gifUrl} />
            </Grid.Column>
          </Grid>
        </React.Fragment>
      )}
    </Segment>
  )
}


export default connect(mapStateToProps, mapDispatchToProps)(CurrentSequence)