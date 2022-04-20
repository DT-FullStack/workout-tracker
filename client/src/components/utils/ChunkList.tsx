import _ from 'lodash';
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import { Header, List, StrictListProps } from 'semantic-ui-react';
import ChunkNavBar from 'components/nav/ChunkNavBar';

interface ChunkListProps extends StrictListProps {
  list: any[]
  chunkSize: number
  renderItem(item: any): JSX.Element
  header?: string | JSX.Element
  emptyMessage?: string
}

const ChunkList = ({ list, chunkSize, header, renderItem, emptyMessage, ...listProps }: ChunkListProps) => {
  const chunks = _.chunk(list, chunkSize);
  const [chunkIndex, setChunkIndex] = useState(0);
  const headerIsString: boolean = typeof header === 'string';
  const renderHeader = () => headerIsString ? <Header content={header} /> : header;
  return (
    <div className="chunk list">
      {header && <Header content={renderHeader()} />}
      <ChunkNavBar chunks={chunks} chunkSize={chunkSize} chunkIndex={chunkIndex} setChunkIndex={setChunkIndex} />
      <List {...listProps}>
        {chunks.length ? chunks[chunkIndex].map((item: any) => renderItem(item)) : <List.Item content={emptyMessage || 'No results'} />}
      </List>
    </div>
  )
}

ChunkList.defaultProps = {
  chunkSize: 10
}

export default ChunkList