import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { RootState } from 'redux/store'
import { Exercise } from 'models/Exercise';
import { AppPlaceholderImage, AppPlaceholderImageProps } from '../utils/AppPlaceholderImage';
import { StrictImageProps } from 'semantic-ui-react';

const mapStateToProps = (state: RootState) => ({})
const mapDispatchToProps = {}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

interface ExerciseImageProps extends PropsFromRedux, Partial<AppPlaceholderImageProps> {
  exercise: Exercise
}

const ExerciseImage = ({ exercise, altText, ...otherProps }: ExerciseImageProps) => {
  return (
    <AppPlaceholderImage placeholderStyle={{ width: '80px', height: '80px' }} className='exercise-image' altText={exercise.name} src={exercise.gifUrl} {...otherProps} />
  )
}

export default connector(ExerciseImage)