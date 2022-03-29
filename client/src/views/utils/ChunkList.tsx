import _ from 'lodash';
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import { Header, List } from 'semantic-ui-react';
import ChunkNavBar from 'views/nav/ChunkNavBar';

interface ChunkListProps {
  list: any[]
  chunkSize: number
  renderItem(item: any): JSX.Element
  header?: string | number | JSX.Element
}

const ChunkList = ({ list, chunkSize, header, renderItem }: ChunkListProps) => {
  const chunks = _.chunk(list, chunkSize);
  const [chunkIndex, setChunkIndex] = useState(0);
  return (
    <div className="chunk list">
      {header && <Header content={header} />}
      <ChunkNavBar chunks={chunks} chunkSize={chunkSize} chunkIndex={chunkIndex} setChunkIndex={setChunkIndex} />
      <List>
        {chunks.length ? chunks[chunkIndex].map((item: any) => renderItem(item)) : <List.Item content='No results' />}
      </List>
    </div>
  )
}

ChunkList.defaultProps = {
  chunkSize: 10
}

export default ChunkList