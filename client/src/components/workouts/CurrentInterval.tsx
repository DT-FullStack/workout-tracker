import React, { useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import { Button, Divider, Form, Radio } from 'semantic-ui-react'
import AppNumber from 'components/form/AppNumber'
import { setWorkoutCursor, updateSequenceItem } from '../../redux/actions/workout';
import { WorkoutInterval } from '../../models/Workout';
import { Exercise } from '../../models/Exercise';
import { secondsToMinutes } from 'components/utils/AppDateTime'

const mapStateToProps = (state: RootState) => ({})
const mapDispatchToProps = { setWorkoutCursor, updateSequenceItem }

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>


interface CurrentIntervalProps extends PropsFromRedux {
  exercise: Exercise
  initial?: Partial<WorkoutInterval>
  // initialDuration?: number;
  // initialWeight?: number
  // initialSpeed?: number
  // initialDistance?: number
  // initialIncline?: number
  // initialCalories?: number
  edit?: boolean
}

const CurrentInterval = ({ exercise, initial = {}, setWorkoutCursor, updateSequenceItem }: CurrentIntervalProps) => {
  const [duration, setDuration] = useState(initial.duration || 0)
  const [weight, setWeight] = useState(initial.weight || 0)
  const [speed, setSpeed] = useState(initial.speed || 0)
  const [distance, setDistance] = useState(initial.distance || 0)
  const [incline, setIncline] = useState(initial.incline || 0)
  const [verticalRise, setVerticalRise] = useState(initial.verticalRise || 0)
  const [calories, setCalories] = useState(initial.duration || 0)

  const [showingWeight, setShowingWeight] = useState(weight > 0)
  const [showingSpeed, setShowingSpeed] = useState(speed > 0)
  const [showingDistance, setShowingDistance] = useState(distance > 0)
  const [showingIncline, setShowingIncline] = useState(incline > 0)
  const [showingVerticalRise, setShowingVerticalRise] = useState(verticalRise > 0)
  const [showingCalories, setShowingCalories] = useState(calories > 0)

  const serialize = (): WorkoutInterval => {
    const serializable: WorkoutInterval = { exercise, duration };
    if (showingWeight && weight > 0) serializable.weight = weight;
    if (showingSpeed && speed > 0) serializable.speed = speed;
    if (showingDistance && distance > 0) serializable.distance = distance;
    if (showingIncline && incline > 0) serializable.incline = incline;
    if (showingVerticalRise && verticalRise > 0) serializable.verticalRise = verticalRise;
    if (showingCalories && calories > 0) serializable.calories = calories;
    return serializable;
  }

  // duration: number;
  // speed ?: number
  // distance ?: number
  // incline ?: number
  // verticalRise ?: number
  // calories ?: number


  return (
    <Form className='center'>
      <Divider />
      <Form.Field className='sequence props'>
        <Radio label="Weighted" toggle checked={showingWeight} onClick={() => setShowingWeight(!showingWeight)} />
        <Radio label="Speed" toggle checked={showingSpeed} onClick={() => setShowingSpeed(!showingSpeed)} />
        <Radio label="Distance" toggle checked={showingDistance} onClick={() => setShowingDistance(!showingDistance)} />
        <Radio label="Incline" toggle checked={showingIncline} onClick={() => setShowingIncline(!showingIncline)} />
        <Radio label="Vertical Rise" toggle checked={showingVerticalRise} onClick={() => setShowingVerticalRise(!showingVerticalRise)} />
        <Radio label="Calories" toggle checked={showingCalories} onClick={() => setShowingCalories(!showingCalories)} />
      </Form.Field>
      <AppNumber options={{ min: 10, max: 2000 * 60, step: 10, initial: 10 * 60, transformValue: secondsToMinutes }} rightLabel="min" value={duration} setValue={setDuration} />
      {showingWeight && <AppNumber options={{ min: 1, max: 2000, step: 1, initial: 25 }} rightLabel="lbs" value={weight} setValue={setWeight} />}
      {showingSpeed && <AppNumber options={{ min: 1, max: 2000, step: 0.1, initial: 3, decimals: 1 }} rightLabel="mph" value={speed} setValue={setSpeed} />}
      {showingDistance && <AppNumber options={{ min: 0.1, max: 200, step: 0.1, initial: 1, decimals: 2 }} rightLabel="miles" value={distance} setValue={setDistance} />}
      {showingIncline && <AppNumber options={{ min: 0, max: 2000, step: 0.1, initial: 0, decimals: 1 }} rightLabel="% incline" value={incline} setValue={setIncline} />}
      {showingVerticalRise && <AppNumber options={{ min: 0, max: 2000, step: 0.5, initial: 0, decimals: 1 }} rightLabel="vertical ft" value={verticalRise} setValue={setVerticalRise} />}
      {showingCalories && <AppNumber options={{ min: 1, max: 2000, step: 1, initial: 100 }} rightLabel="calories" value={calories} setValue={setCalories} />}
      <Button content="Save" color="green" fluid onClick={() => updateSequenceItem(serialize())} />
    </Form>
  )
}


export default connector(CurrentInterval)