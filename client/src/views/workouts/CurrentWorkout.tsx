import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import { Menu, Button, Segment } from 'semantic-ui-react';
import { BackButton } from 'views/nav/Buttons/BackButton'
import { Workout, WorkoutSequence } from '../../../../models/Workout';
import ExerciseSearch from 'views/exercises/ExerciseSearch';
import { Exercise } from 'api/ExerciseDB';
import ShowWorkout from './ShowWorkout';
import ExerciseCard from 'views/exercises/ExerciseCard';
import CurrentSequence from './CurrentSequence';
import { toggleExerciseSearch } from '../../redux/actions/workout';

interface CurrentWorkoutProps {
  id?: string
  currentWorkout: Workout
  selectedExercise: Exercise | null
  currentSequence: WorkoutSequence
  exerciseList: Exercise[]
  isSearching: boolean
  toggleExerciseSearch(): void
}

const CurrentWorkout = ({ id, currentWorkout, selectedExercise, isSearching, toggleExerciseSearch, currentSequence, exerciseList, }: CurrentWorkoutProps) => {
  // const [showingSearch, setShowingSearch] = useState(false);
  return (
    <React.Fragment>
      <Menu secondary>
        <Menu.Item content={<BackButton />} />
        <Menu.Item content={"Current Workout"} />
      </Menu>
      <ShowWorkout workout={currentWorkout} />
      <CurrentSequence />

      <Button content="Find An Exercise" active={isSearching} onClick={() => toggleExerciseSearch()} />

      {isSearching && (
        <Segment>
          <ExerciseSearch />
        </Segment>
      )}

    </React.Fragment>
  )
}

const mapStateToProps = ({ workouts, exercises }: RootState) => ({
  currentWorkout: workouts.current,
  currentSequence: workouts.sequence,
  selectedExercise: workouts.exercise,
  exerciseList: exercises.list,
  isSearching: workouts.isSearching
})

const mapDispatchToProps = { toggleExerciseSearch }

export default connect(mapStateToProps, mapDispatchToProps)(CurrentWorkout)