import React, { useState } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import { Exercise } from '../../api/ExerciseDB';
import { WorkoutSequence } from '../../../../models/Workout';
import ShowSequence from './ShowSequence';
import { Button, Card, Container, Grid, Header } from 'semantic-ui-react';
import { IconButton } from '../utils/AppIconButton';
import AppPlaceholderImage from 'views/utils/AppPlaceholderImage';
import CurrentSet from './CurrentSet';
import CurrentInterval from './CurrentInterval';

interface CurrentSequenceProps {
  exercise: Exercise | null,
  sequence: WorkoutSequence
}

const CurrentSequence = ({ exercise, sequence }: CurrentSequenceProps) => {
  const [exerciseType, setExerciseType] = useState<'set' | 'interval'>('set');

  return (
    <React.Fragment>
      <ShowSequence sequence={sequence} />
      {exercise && (
        <Grid stackable>
          <Grid.Column width={8}>
            <Container textAlign='center' >
              <Header content={exercise.name} />
              <Button.Group color='blue' >
                <Button icon='list' content="Set" onClick={() => setExerciseType('set')} />
                <Button.Or />
                <Button icon='tachometer alternate' content='Interval' onClick={() => setExerciseType('interval')} />
              </Button.Group>
            </Container>
            {exerciseType === 'set' && <CurrentSet exercise={exercise} />}
            {exerciseType === 'interval' && <CurrentInterval exercise={exercise} />}
          </Grid.Column>
          <Grid.Column width={8}>
            <AppPlaceholderImage srcUrl={exercise.gifUrl} />
          </Grid.Column>



        </Grid>
      )}
    </React.Fragment>
  )
}

CurrentSequence.propTypes = {
  // second: PropTypes.
}

const mapStateToProps = ({ workouts: { sequence, exercise } }: RootState) => ({
  sequence, exercise
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(CurrentSequence)