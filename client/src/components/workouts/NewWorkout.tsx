import React, { useEffect } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import { selectWorkout } from '../../redux/actions/workout';
import CurrentWorkout from './CurrentWorkout';

const mapStateToProps = (state: RootState) => ({})
const mapDispatchToProps = { selectWorkout }

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

//
// No need to include any props from mapState or mapDispatch
// They are automatically typed by react-redux
interface NewWorkoutProps extends PropsFromRedux {

}

const NewWorkout = ({ selectWorkout }: NewWorkoutProps) => {
  useEffect(() => {
    selectWorkout({
      datetime: { start: Date.now() },
      sequenceList: [[]]
    });
  }, [selectWorkout])
  return (
    <CurrentWorkout />
  )
}

export default connector(NewWorkout)