import React, { useEffect, useMemo } from 'react'
import { connect } from 'react-redux'
import { RootState } from '../redux/store'
import { Card, Segment } from 'semantic-ui-react';
import { ButtonLink } from './nav/ButtonLink';
import { Exercise } from '../api/ExerciseDB';
import _ from 'lodash';

interface DashboardProps {
  currentExercise: Exercise | null
}

export const Dashboard = ({ currentExercise }: DashboardProps) => {

  return (
    <React.Fragment>
      <ButtonLink fluid to="/dashboard/workout" content="Start Workout" color="green" />
      <Segment basic>
        <Card.Group >
          <Card fluid>
            <Card.Content>
              <Card.Header content="Browse Exercises" />
            </Card.Content>
          </Card>
        </Card.Group>

      </Segment>
    </React.Fragment>
  )
}

Dashboard.propTypes = {
  // second: PropTypes.
}

const mapStateToProps = (state: RootState) => ({
  currentExercise: state.exercises.current
})

// const mapDispatchToProps = { getBodyParts, getEquipment, getTargetMuscles }
const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(Dashboard)