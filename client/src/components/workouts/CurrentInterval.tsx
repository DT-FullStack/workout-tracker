import React, { useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import { Button, Divider, Form, Radio } from 'semantic-ui-react'
import AppNumber from 'components/form/AppNumber'
import { setWorkoutCursor, updateSequenceItem } from '../../redux/actions/workout';
import { WorkoutInterval } from '../../models/Workout';
import { Exercise } from '../../models/Exercise';
import { secondsToMinuteString } from 'components/utils/AppDateTime'

const mapStateToProps = (state: RootState) => ({})
const mapDispatchToProps = { setWorkoutCursor, updateSequenceItem }

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>


interface CurrentIntervalProps extends PropsFromRedux {
  exercise: Exercise
  initial?: Partial<WorkoutInterval>
  edit?: boolean
}

const CurrentInterval = ({ exercise, initial = {}, updateSequenceItem }: CurrentIntervalProps) => {
  const [duration, setDuration] = useState(initial.duration || 60)
  const [weight, setWeight] = useState(initial.weight || 25)
  const [speed, setSpeed] = useState(initial.speed || 3)
  const [distance, setDistance] = useState(initial.distance || 0.5)
  const [incline, setIncline] = useState(initial.incline || 3)
  const [verticalRise, setVerticalRise] = useState(initial.verticalRise || 20)
  const [calories, setCalories] = useState(initial.calories || 50)

  const [showingWeight, setShowingWeight] = useState(initial.weight !== undefined)
  const [showingSpeed, setShowingSpeed] = useState(initial.speed !== undefined)
  const [showingDistance, setShowingDistance] = useState(initial.distance !== undefined)
  const [showingIncline, setShowingIncline] = useState(initial.incline !== undefined)
  const [showingVerticalRise, setShowingVerticalRise] = useState(initial.verticalRise !== undefined)
  const [showingCalories, setShowingCalories] = useState(initial.calories !== undefined)

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
      <AppNumber options={{ min: 10, max: 2000 * 60, step: 10, initial: duration, transformValue: secondsToMinuteString }} rightLabel="min" value={duration} setValue={setDuration} />
      {showingWeight && <AppNumber options={{ min: 1, max: 2000, step: 1, initial: weight }} rightLabel="lbs" value={weight} setValue={setWeight} />}
      {showingSpeed && <AppNumber options={{ min: 1, max: 2000, step: 0.1, initial: speed, decimals: 1 }} rightLabel="mph" value={speed} setValue={setSpeed} />}
      {showingDistance && <AppNumber options={{ min: 0.1, max: 200, step: 0.05, initial: distance, decimals: 2 }} rightLabel="miles" value={distance} setValue={setDistance} />}
      {showingIncline && <AppNumber options={{ min: 0, max: 100, step: 0.1, initial: incline, decimals: 1 }} rightLabel="% incline" value={incline} setValue={setIncline} />}
      {showingVerticalRise && <AppNumber options={{ min: 0, max: 2000, step: 1, initial: verticalRise }} rightLabel="vertical ft" value={verticalRise} setValue={setVerticalRise} />}
      {showingCalories && <AppNumber options={{ min: 1, max: 2000, step: 1, initial: calories }} rightLabel="calories" value={calories} setValue={setCalories} />}
      <Button content="Save" color="green" fluid onClick={() => updateSequenceItem(serialize())} />
    </Form>
  )
}


export default connector(CurrentInterval)