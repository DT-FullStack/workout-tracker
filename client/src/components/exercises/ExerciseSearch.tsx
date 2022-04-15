import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import { Button, Form, Header, Input, Segment } from 'semantic-ui-react'
import { BodyPart, Equipment, TargetMuscle, BodyPartList, TargetMuscleList, EquipmentList } from '../../models/Exercise';
import { setBodyPart, setEquipment, setName, setTarget, searchExercises } from '../../redux/actions/exercise';
import SearchResults from './SearchResults';
import AppDropdown from '../form/AppDropdown';
import "./Search.sass"
import { onDropdownChange, onInputChange } from 'components/form/AppEventHandlers';

const mapStateToProps = ({ exercises: { search, current, list } }: RootState) => ({
  current,
  search,
  list
})

const mapDispatchToProps = { setBodyPart, setEquipment, setName, setTarget, searchExercises }

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

//
// No need to include any props from mapState or mapDispatch
// They are automatically typed by react-redux
interface ExerciseSearchProps extends PropsFromRedux { }

const ExerciseSearch = ({ search, setName, setTarget, setBodyPart, setEquipment, searchExercises }: ExerciseSearchProps) => {
  const { bodyPart, target, equipment, name } = search;
  const activeNameSearch = (): boolean => (name !== null && name !== '');

  const onNameChange: onInputChange = (event, { value }) => { setName(value || null) }
  const onEquipmentChange: onDropdownChange = (e, { value }) => { setEquipment(value as Equipment) }
  const onBodyPartChange: onDropdownChange = (e, { value }) => { setBodyPart(value as BodyPart) }
  const onTargetChange: onDropdownChange = (e, { value }) => { setTarget(value as TargetMuscle) }

  return (
    <div id="ExerciseSearch">
      <Header as="h3" content="Search for Exercises" />
      <Form>
        <Form.Field>
          <Input label="Search by Name" className={activeNameSearch() ? 'active' : ''} value={name ? name : ''} onChange={onNameChange} />
        </Form.Field>
        <AppDropdown inline label="Equipment" optionsArray={[...EquipmentList]} value={equipment || 'any'} onChange={onEquipmentChange} />
        <AppDropdown inline label="Body Part" optionsArray={[...BodyPartList]} value={bodyPart || 'any'} onChange={onBodyPartChange} />
        <AppDropdown inline label="Target Muscle" optionsArray={[...TargetMuscleList]} value={target || 'any'} onChange={onTargetChange} />
      </Form>
      <Button.Group >
        <Button content="Search" color="green" onClick={() => searchExercises({ name, bodyPart, target, equipment })} />
      </Button.Group>
      <Segment content={<SearchResults />} />
    </div>
  )
}

export default connector(ExerciseSearch)