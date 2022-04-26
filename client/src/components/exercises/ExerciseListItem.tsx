import AppPlaceholderImage from 'components/utils/AppPlaceholderImage'
import { Exercise } from 'models/Exercise'
import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import { Button, List, ListItemProps } from 'semantic-ui-react'
import ExerciseImage from './ExerciseImage'
import { deselectExercise } from '../../redux/actions/exercise';

const mapStateToProps = ({ exercises: { list, listParams, active: activeList } }: RootState) => ({
  list, listParams, activeList
})
const mapDispatchToProps = { deselectExercise }
const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;


interface ExerciseListItemProps extends PropsFromRedux, ListItemProps {
  exercise: Exercise
  onClickHandler(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, data: ListItemProps): void
}

const ExerciseListItem = ({ exercise, activeList, details, children, className = '', onClickHandler, deselectExercise }: ExerciseListItemProps) => {
  const active = activeList.includes(exercise._id);
  // const className = active ? 'active' : '';
  if (active) className += ' active';
  return (
    <List.Item onClick={onClickHandler} className={className}>
      <ExerciseImage exercise={exercise} size={active ? 'medium' : 'tiny'} />
      <List.Content >
        <List.Header as={active ? 'h2' : 'h4'} >
          {exercise.name}
        </List.Header>
        {!active && exercise.bodyPart}
        {active && children}
      </List.Content>
      {active && <Button icon='x' basic compact className='clearActive' onClick={(ev) => { ev.stopPropagation(); deselectExercise(exercise) }} />}
    </List.Item>
  )
}


export default connector(ExerciseListItem)