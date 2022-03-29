import React, { useState } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import { Button, Divider, Form, Radio } from 'semantic-ui-react'
import AppNumber from 'views/form/AppNumber'
import { addToSequence } from '../../redux/actions/workout';
import { WorkoutInterval } from '../../../../models/Workout';
import { Exercise } from '../../api/ExerciseDB';

interface CurrentIntervalProps {
  exercise: Exercise
  initialDuration?: number;
  initialWeight?: number
  initialSpeed?: number
  initialDistance?: number
  initialIncline?: number
  initialCalories?: number
  addToSequence(interval: WorkoutInterval): void
}

const CurrentInterval = ({ exercise, initialDuration, initialWeight, initialSpeed, initialDistance, initialIncline, initialCalories, addToSequence }: CurrentIntervalProps) => {
  const [duration, setDuration] = useState(initialDuration || 0)
  const [weight, setWeight] = useState(initialWeight || 0)
  const [speed, setSpeed] = useState(initialSpeed || 0)
  const [distance, setDistance] = useState(initialDistance || 0)
  const [incline, setIncline] = useState(initialIncline || 0)
  const [calories, setCalories] = useState(initialDuration || 0)

  const [showingWeight, setShowingWeight] = useState(false)
  const [showingSpeed, setShowingSpeed] = useState(false)
  const [showingDistance, setShowingDistance] = useState(false)
  const [showingIncline, setShowingIncline] = useState(false)
  const [showingCalories, setShowingCalories] = useState(false)

  const serialize = (): WorkoutInterval => {


    const { id: exerciseId, name: exerciseName } = exercise;
    const serializable: WorkoutInterval = { exerciseId, exerciseName, duration };
    if (showingWeight && weight && weight > 0) serializable.weight = weight;
    if (showingSpeed && speed && speed > 0) serializable.speed = speed;
    if (showingDistance && distance && distance > 0) serializable.distance = distance;
    if (showingIncline && incline && incline > 0) serializable.incline = incline;
    if (showingCalories && calories && calories > 0) serializable.calories = calories;
    return serializable;
  }

  return (
    <Form className='center'>
      <Divider />
      <Form.Field className='sequence props'>
        <Radio label="Weighted" toggle checked={showingWeight} onClick={() => setShowingWeight(!showingWeight)} />
        <Radio label="Speed" toggle checked={showingSpeed} onClick={() => setShowingSpeed(!showingSpeed)} />
        <Radio label="Distance" toggle checked={showingDistance} onClick={() => setShowingDistance(!showingDistance)} />
        <Radio label="Incline" toggle checked={showingIncline} onClick={() => setShowingIncline(!showingIncline)} />
        <Radio label="Calories" toggle checked={showingCalories} onClick={() => setShowingCalories(!showingCalories)} />
      </Form.Field>
      <AppNumber options={{ min: 1, max: 2000, step: 1, initial: 10 }} rightLabel="minutes" value={duration} setValue={setDuration} />
      {showingWeight && <AppNumber options={{ min: 1, max: 2000, step: 1, initial: 25 }} rightLabel="lbs" value={weight} setValue={setWeight} />}
      {showingSpeed && <AppNumber options={{ min: 1, max: 2000, step: 0.1, initial: 3, decimals: 1 }} rightLabel="mph" value={speed} setValue={setSpeed} />}
      {showingDistance && <AppNumber options={{ min: 0.1, max: 200, step: 0.1, initial: 1, decimals: 2 }} rightLabel="miles" value={distance} setValue={setDistance} />}
      {showingIncline && <AppNumber options={{ min: 0, max: 2000, step: 0.1, initial: 0, decimals: 1 }} rightLabel="% incline" value={incline} setValue={setIncline} />}
      {showingCalories && <AppNumber options={{ min: 1, max: 2000, step: 1, initial: 100 }} rightLabel="calories" value={calories} setValue={setCalories} />}
      <Button content="record interval" color="blue" onClick={() => addToSequence(serialize())} />
    </Form>
  )
}

CurrentInterval.propTypes = {
  // second: PropTypes.
}

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = { addToSequence }

export default connect(mapStateToProps, mapDispatchToProps)(CurrentInterval)