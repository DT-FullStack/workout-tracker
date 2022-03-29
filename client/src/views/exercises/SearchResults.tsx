import React, { useState } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import _ from "lodash";
import { Exercise } from '../../api/ExerciseDB';
import ExerciseListItem from './ExerciseListItem';
import ExerciseCard from './ExerciseCard';
import ChunkList from 'views/utils/ChunkList';

interface SearchResultsProps {
  list: Exercise[]
}

export const SearchResults = ({ list }: SearchResultsProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);
  const [chunkIndex, setChunkIndex] = useState(0);
  const renderExercise = (exercise: Exercise): JSX.Element =>
    <ExerciseListItem onClickHandler={() => { setActiveId(exercise.id) }}
      active={exercise.id === activeId}
      key={exercise.id}
      exercise={exercise}
      details={<ExerciseCard exercise={exercise} />}
    />
  const header = () => list.length ? `Showing ${list.length} matching exercises` : '';
  return (
    <ChunkList header={header()} list={list} renderItem={renderExercise} />
  )
}

const mapStateToProps = ({ exercises: { list, current } }: RootState) => ({
  list, current
})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)