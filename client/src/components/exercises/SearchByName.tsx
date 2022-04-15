import React from 'react'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'

interface SearchByNameProps {

}

export const SearchByName = (props: SearchByNameProps) => {
  return (
    <div>SearchByName</div>
  )
}

SearchByName.propTypes = {
  // second: PropTypes.
}

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(SearchByName)