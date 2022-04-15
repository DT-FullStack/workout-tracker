import React, { useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import { Form, Radio } from 'semantic-ui-react';
import AppNumber from 'components/form/AppNumber';
import { WorkoutSet } from '../../../../models/Workout';
import { Exercise } from '../../api/ExerciseDB';
import { Button } from 'semantic-ui-react';
import { addToSequence } from 'redux/actions/workout';

const mapStateToProps = (state: RootState) => ({})
const mapDispatchToProps = { addToSequence }

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

interface CurrentSetProps extends PropsFromRedux {
  exercise: Exercise
  initialReps?: number
  initialWeight?: number
  initialBarWeight?: number
}

const CurrentSet = ({ exercise, initialReps, initialWeight, initialBarWeight, addToSequence }: CurrentSetProps) => {
  const [reps, setReps] = useState(initialReps || 0);
  const [weight, setWeight] = useState(initialWeight || 0);
  const [barWeight, setBarWeight] = useState(initialBarWeight || 0);

  const [showingWeight, setShowingWeight] = useState(false);
  const [showingBarWeight, setShowingBarWeight] = useState(exercise.name.includes('barbell'));
  useEffect(() => {
    setShowingBarWeight(exercise.name.includes('barbell'))
  }, [exercise])

  const serialize = (): WorkoutSet => {
    const serializable: WorkoutSet = { exercise, reps };
    if (showingWeight && weight && weight > 0) serializable.weight = weight;
    if (showingBarWeight && barWeight && barWeight > 0) serializable.barWeight = barWeight;
    return serializable;
  }

  return (
    <Form className='sequence form center'>
      <Form.Field className='sequence props'>
        <Radio label="Weight" toggle checked={showingWeight} onClick={() => setShowingWeight(!showingWeight)} />
        <Radio label="Barbell" toggle checked={showingBarWeight} onClick={() => setShowingBarWeight(!showingBarWeight)} />
      </Form.Field>
      <AppNumber options={{ min: 1, max: 2000, step: 1, initial: 10 }} rightLabel="reps" value={reps} setValue={setReps} />
      {showingWeight && <AppNumber options={{ min: 0, max: 2000, step: 5, initial: 25 }} rightLabel="lbs" value={weight} setValue={setWeight} />}
      {showingBarWeight && <AppNumber options={{ min: 5, max: 2000, step: 5, initial: 45 }} rightLabel="bar lbs" value={barWeight} setValue={setBarWeight} />}
      <Button content="Record Set" fluid color="green" onClick={() => addToSequence(serialize())} />
    </Form>
  )
}

export default connector(CurrentSet)