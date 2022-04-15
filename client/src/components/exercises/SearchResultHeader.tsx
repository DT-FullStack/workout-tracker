import React from 'react'
import { connect, ConnectedProps } from 'react-redux'
import { ExerciseSearchState } from 'redux/reducers/Exercise'
import { RootState } from 'redux/store'
import { Header, Label } from 'semantic-ui-react'
import _ from 'lodash'

const mapStateToProps = (state: RootState) => ({})
const mapDispatchToProps = {}

const connector = connect(mapStateToProps, mapDispatchToProps);

type PropsFromRedux = ConnectedProps<typeof connector>

//
// No need to include any props from mapState or mapDispatch
// They are automatically typed by react-redux
interface SearchResultHeaderProps extends PropsFromRedux {
  listLength: number,
  searchParams: Partial<ExerciseSearchState>
}

const SearchResultHeader = (props: SearchResultHeaderProps) => {
  const paramEntries = Object.entries(props.searchParams);
  const hasListItems = props.listLength > 0;
  const hasSearchParams = paramEntries.length > 0;
  let mainText = '';
  if (hasListItems && !hasSearchParams) mainText = `Showing all ${props.listLength} exercises`;
  else if (hasListItems && hasSearchParams) mainText = `Found ${props.listLength} matching exercises`;
  else if (!hasListItems && hasSearchParams) mainText = `No matching exercises found`;
  return (
    <Header>
      {mainText}
      {hasSearchParams && (<Header.Subheader>
        {paramEntries.map(param => <Label key={param[0]} content={_.lowerCase(param[0])} detail={param[1]} />)}
      </Header.Subheader>)}
    </Header>
  )
}

export default connector(SearchResultHeader)