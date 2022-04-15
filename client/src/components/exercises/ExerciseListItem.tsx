import { Exercise } from 'models/Exercise'
import React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import { List, ListHeader, ListItem, ListItemProps } from 'semantic-ui-react'

interface ExerciseListItemProps extends ListItemProps {
  exercise: Exercise
  onClickHandler(event: React.MouseEvent<HTMLAnchorElement, MouseEvent>, data: ListItemProps): void
  active?: boolean
  details?: JSX.Element
}

const ExerciseListItem = ({ exercise, active, details, onClickHandler }: ExerciseListItemProps) => {
  const className = active ? 'active' : '';
  return (
    <List.Item onClick={onClickHandler} className={className}>
      <List.Header content={exercise.name} />
      {exercise.bodyPart}
      {active && details}
    </List.Item>
  )
}

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(ExerciseListItem)