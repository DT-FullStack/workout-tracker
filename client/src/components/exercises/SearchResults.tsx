import React, { useState } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import { Exercise } from '../../models/Exercise';
import ExerciseListItem from './ExerciseListItem';
import ChunkList from 'components/utils/ChunkList';
import _ from 'lodash'
import SearchResultHeader from './SearchResultHeader';
import ExerciseSearchDetails from './ExerciseSearchDetails';
import { selectExercise } from '../../redux/actions/exercise';


const mapStateToProps = ({ exercises: { list, listParams } }: RootState) => ({
  list, listParams
})
const mapDispatchToProps = { selectExercise }
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

interface SearchResultsProps extends PropsFromRedux {

}


const SearchResults = ({ list, listParams, selectExercise }: SearchResultsProps) => {
  const renderExercise = (exercise: Exercise): JSX.Element =>
    <ExerciseListItem onClickHandler={() => { selectExercise(exercise) }}
      key={exercise._id}
      exercise={exercise}
      children={<ExerciseSearchDetails exercise={exercise} />}
    />
  return (
    <ChunkList verticalAlign='middle' divided header={<SearchResultHeader listLength={list.length} searchParams={listParams} />} list={list} renderItem={renderExercise} />
  )
}


export default connector(SearchResults)