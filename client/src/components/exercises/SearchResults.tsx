import React, { useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import { Exercise } from '../../models/Exercise';
import ExerciseListItem from './ExerciseListItem';
import ExerciseCard from './ExerciseCard';
import ChunkList from 'components/utils/ChunkList';
import { Header, Label } from 'semantic-ui-react';
import _ from 'lodash'
import SearchResultHeader from './SearchResultHeader';


const mapStateToProps = ({ exercises: { list, listParams } }: RootState) => ({
  list, listParams
})
const mapDispatchToProps = {}
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface SearchResultsProps extends PropsFromRedux {

}


export const SearchResults = ({ list, listParams }: SearchResultsProps) => {
  const [activeId, setActiveId] = useState<string | null>(null);

  const renderExercise = (exercise: Exercise): JSX.Element =>
    <ExerciseListItem onClickHandler={() => { setActiveId(exercise._id) }}
      active={exercise._id === activeId}
      key={exercise._id}
      exercise={exercise}
      details={<ExerciseCard exercise={exercise} />}
    />
  return (
    <ChunkList header={<SearchResultHeader listLength={list.length} searchParams={listParams} />} list={list} renderItem={renderExercise} />
  )
}


export default connect(mapStateToProps, mapDispatchToProps)(SearchResults)