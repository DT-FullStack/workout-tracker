import AppPlaceholderImage from 'components/utils/AppPlaceholderImage';
import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import { Button, Grid, Header, Image, Item, ItemGroup } from 'semantic-ui-react';
import { Exercise } from '../../models/Exercise';
import ExerciseImage from './ExerciseImage';
import { selectExerciseForWorkout } from '../../redux/actions/workout';

const mapStateToProps = (state: RootState) => ({})
const mapDispatchToProps = { selectExerciseForWorkout }

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

interface ExerciseSearchDetailsProps extends PropsFromRedux {
  exercise: Exercise
}
// _id: string
// name: string
// bodyPart: BodyPart
// target: TargetMuscle
// equipment: Equipment
// gifUrl: string
const ExerciseSearchDetails = ({ exercise, selectExerciseForWorkout }: ExerciseSearchDetailsProps) => {
  return (
    <React.Fragment>


      <p>Primary target: {exercise.target}</p>
      <p>Uses {exercise.equipment}</p>
      <Button color='green' content="Select" onClick={() => selectExerciseForWorkout(exercise)} />
    </React.Fragment>
  )
}
// const ExerciseSearchDetails = ({ exercise, selectExerciseForWorkout }: ExerciseSearchDetailsProps) => {
//   return (
//     <ItemGroup>
//       <Item>
//         <Item.Image floated='left' children={<ExerciseImage exercise={exercise} />} />
//         <Item.Content>
//           <Item.Header content={exercise.name} />
//           <Item.Meta />
//           <Item.Description >
//             <p>Primary target: {exercise.target}</p>
//             <p>Uses {exercise.equipment}</p>
//           </Item.Description>
//           <Item.Extra children={<Button color='green' content="Select" onClick={() => selectExerciseForWorkout(exercise)} />} />

//         </Item.Content>
//       </Item>
//     </ItemGroup>
//   )
// }
// const ExerciseSearchDetails = ({ exercise }: ExerciseSearchDetailsProps) => {
//   return (
//     <Grid stackable>
//       <Grid.Row>
//         <Grid.Column width={8} children={<ExerciseImage exercise={exercise} />} />
//         <Grid.Column width={8}>
//           <Header>{exercise.name}</Header>
//         </Grid.Column>
//       </Grid.Row>
//     </Grid>
//   )
// }

export default connector(ExerciseSearchDetails)