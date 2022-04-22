import React, { useEffect, useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import { Form, Radio, Header } from 'semantic-ui-react';
import AppNumber from 'components/form/AppNumber';
import { WorkoutSet } from '../../models/Workout';
import { Exercise } from '../../models/Exercise';
import { Button } from 'semantic-ui-react';
// import { addToSequence } from 'redux/actions/workout';
import { setWorkoutCursor, updateSequenceItem } from '../../redux/actions/workout';

const mapStateToProps = (state: RootState) => ({})
const mapDispatchToProps = { setWorkoutCursor, updateSequenceItem }

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

interface CurrentSetProps extends PropsFromRedux {
  exercise: Exercise
  edit?: boolean
  initial?: Partial<WorkoutSet>
  // initialReps?: number
  // initialWeight?: number
  // initialBarWeight?: number
}

const CurrentSet = ({ exercise, initial = {}, setWorkoutCursor, updateSequenceItem, edit = false }: CurrentSetProps) => {
  const [reps, setReps] = useState(initial.reps || 0);
  const [weight, setWeight] = useState(initial.weight || 0);
  const [barWeight, setBarWeight] = useState(initial.barWeight || 0);
  const [weightAssist, setWeightAssist] = useState(initial.weightAssist || 0);

  const [showingWeight, setShowingWeight] = useState(weight > 0);
  const [showingBarWeight, setShowingBarWeight] = useState(barWeight > 0);
  const [showingWeightAssist, setShowingWeightAssist] = useState(weightAssist > 0);

  const serialize = (): WorkoutSet => {
    const serializable: WorkoutSet = { exercise, reps };
    if (showingWeight && weight > 0) serializable.weight = weight;
    if (showingBarWeight && barWeight > 0) serializable.barWeight = barWeight;
    if (showingWeightAssist && weightAssist > 0) serializable.weightAssist = weightAssist;
    return serializable;
  }

  return (
    <Form className='sequence form center'>
      <Form.Field className='sequence props'>
        <Radio label="Weight" toggle checked={showingWeight} onClick={() => setShowingWeight(!showingWeight)} />
        <Radio label="Barbell" toggle checked={showingBarWeight} onClick={() => setShowingBarWeight(!showingBarWeight)} />
        <Radio label="Assist" toggle checked={showingWeightAssist} onClick={() => setShowingWeightAssist(!showingWeightAssist)} />
      </Form.Field>
      <AppNumber options={{ min: 1, max: 2000, step: 1, initial: reps }} rightLabel="reps" value={reps} setValue={setReps} />
      {showingWeight && <AppNumber options={{ min: 0, max: 2000, step: 5, initial: weight }} rightLabel="lbs" value={weight} setValue={setWeight} />}
      {showingBarWeight && <AppNumber options={{ min: 5, max: 2000, step: 5, initial: barWeight }} rightLabel="bar lbs" value={barWeight} setValue={setBarWeight} />}
      {showingWeightAssist && <AppNumber options={{ min: 5, max: 2000, step: 5, initial: weightAssist }} rightLabel="lbs assist" value={weightAssist} setValue={setWeightAssist} />}

      <Button content="Save" fluid color="green" onClick={() => updateSequenceItem(serialize())} />

    </Form>
  )
}

export default connector(CurrentSet)