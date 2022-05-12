import ChunkNavBar from 'components/nav/ChunkNavBar';
import React from 'react'
import { Header } from 'semantic-ui-react';

interface ChunkNavHeaderProps {
  header?: string | JSX.Element
  chunks: any[][]
  chunkSize: number
  chunkIndex: number
  setChunkIndex(i: number): any
  sticky?: boolean
}

const ChunkNavHeader = ({ header, chunks, chunkSize, chunkIndex, sticky = true, setChunkIndex }: ChunkNavHeaderProps) => {
  const headerIsString: boolean = typeof header === 'string';
  const renderHeader = () => headerIsString ? <Header content={header} /> : header;
  let className = 'chunk nav header';
  if (sticky) className += ' sticky';
  return (
    <div className={className}>
      {header && <Header content={renderHeader()} />}
      <ChunkNavBar chunks={chunks} chunkSize={chunkSize} chunkIndex={chunkIndex} setChunkIndex={setChunkIndex} />
    </div>
  )
}

export default ChunkNavHeader