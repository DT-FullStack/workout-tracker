import _ from 'lodash';
import { useState } from 'react'
import { Card, ContainerProps, Header, List } from 'semantic-ui-react';
import ChunkNavBar from 'components/nav/ChunkNavBar';

interface ChunkListProps {
  list: any[]
  chunkSize: number
  className?: string
  renderCard(item: any): JSX.Element
  header?: string | number | JSX.Element
  emptyMessage?: string
}

const ChunkList = ({ list, chunkSize, className = '', header, renderCard, emptyMessage }: ChunkListProps) => {
  const chunks = _.chunk(list, chunkSize);
  const [chunkIndex, setChunkIndex] = useState(0);
  className += ' chunk list';
  return (
    <div className={className}>
      {header && <Header content={header} />}
      <ChunkNavBar chunks={chunks} chunkSize={chunkSize} chunkIndex={chunkIndex} setChunkIndex={setChunkIndex} />
      <Card.Group stackable itemsPerRow={2}>
        {chunks.length ? chunks[chunkIndex].map((item: any) => renderCard(item)) : <Card content={<Card.Content content={emptyMessage || 'No results'} />} />}
      </Card.Group>
    </div>
  )
}

ChunkList.defaultProps = {
  chunkSize: 10
}

export default ChunkList