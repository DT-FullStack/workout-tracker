import React, { useState } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import { Button, Dropdown, Form, Header, Input, Radio, Segment } from 'semantic-ui-react'
import { BodyPart, Equipment, Exercise, TargetMuscles, BodyPartList, TargetMusclesList, EquipmentList } from '../../api/ExerciseDB';
import { setBodyPart, setEquipment, setName, setTarget, searchExercises } from '../../redux/actions/exercise';
import SearchResults from './SearchResults';
import { ExerciseSearchState, ExerciseState } from '../../redux/reducers/Exercise';
import "./Search.sass"
import { AppDropdown } from '../form/AppDropdown';

export type searchBy = 'bodyPart' | 'target' | 'equipment' | 'name';
export type searchTerm = string | null;

interface ExerciseSearchProps extends ExerciseState {
  setBodyPart(name: BodyPart): void
  setEquipment(name: Equipment): void
  setTarget(name: TargetMuscles): void
  setName(name: string | null): void
  searchExercises(params: ExerciseSearchState): void
}

export const ExerciseSearch = ({ current, search, list, setBodyPart, setEquipment, setTarget, setName, searchExercises }: ExerciseSearchProps) => {
  const { bodyPart, target, equipment, name } = search;
  return (
    <div id="ExerciseSearch">
      <Header as="h3" content="Search for Exercises" />
      <Form>
        <Form.Field>
          <Input label="Search by Name" className={name === '' || name === null ? '' : 'active'} value={name || ''} onChange={(e, { value }) => setName(value)} />
        </Form.Field>
        <AppDropdown inline label="Equipment" optionsArray={EquipmentList} value={equipment || 'any'} onChange={(e, { value }) => setEquipment(value as Equipment)} />
        <AppDropdown inline label="Body Part" optionsArray={BodyPartList} value={bodyPart || 'any'} onChange={(e, { value }) => setBodyPart(value as BodyPart)} />
        <AppDropdown inline label="Target Muscle" optionsArray={TargetMusclesList} value={target || 'any'} onChange={(e, { value }) => setTarget(value as TargetMuscles)} />
      </Form>
      <Button.Group >
        <Button content="Search" color="green" onClick={() => searchExercises({ name, bodyPart, target, equipment })} />
      </Button.Group>
      <Segment content={<SearchResults />} />
    </div>
  )
}

const mapStateToProps = ({ exercises: { search, current, list } }: RootState) => ({
  current,
  search,
  list
})

const mapDispatchToProps = { setBodyPart, setEquipment, setName, setTarget, searchExercises }

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseSearch)