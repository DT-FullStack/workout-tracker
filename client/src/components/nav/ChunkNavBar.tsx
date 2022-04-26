import React, { useEffect, useLayoutEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import { Icon, Menu } from 'semantic-ui-react'
import './ChunkNavBar.sass'

interface ChunkNavBarProps {
  chunkIndex: number
  chunkSize: number
  chunks: any[][]
  setChunkIndex(i: number): any
}

const ChunkNavBar = ({ chunks, chunkSize, chunkIndex, setChunkIndex }: ChunkNavBarProps) => {
  const chunkLabel = (index: number, length: number, chunkSize: number): string => `${index * chunkSize + 1} - ${index * chunkSize + length}`
  const decrementIndex = () => setChunkIndex(Math.max(0, chunkIndex - 1));
  const incrementIndex = () => setChunkIndex(Math.min(chunks.length, chunkIndex + 1));

  const menuRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!menuRef.current) return;
    const { left: menuLeft, right: menuRight } = menuRef.current.getBoundingClientRect();
    const activeItem = menuRef.current.querySelector('.item.active');
    if (!activeItem) return;
    const { left: itemLeft, right: itemRight, width } = activeItem.getBoundingClientRect();
    if (itemLeft < menuLeft) menuRef.current.scrollLeft -= menuLeft - itemLeft + width * 0.5;
    else if (itemRight > menuRight) menuRef.current.scrollLeft += itemRight - menuRight + width * 0.5;
  }, [chunkIndex])

  return (
    <Menu attached="top" className='chunk sticky'>
      <Menu.Item icon disabled={chunkIndex === 0} onClick={decrementIndex} content={<Icon name='arrow left' />} />
      <div ref={menuRef} className="menu chunk body" style={{ overflow: 'hidden' }}>
        {chunks.map((chunk, index) => <Menu.Item key={index} active={index === chunkIndex} onClick={() => setChunkIndex(index)} content={chunkLabel(index, chunk.length, chunkSize)} />)}
      </div>
      <Menu.Item icon disabled={chunkIndex === chunks.length - 1 || chunks.length <= 1} onClick={incrementIndex} content={<Icon name='arrow right' />} />
    </Menu>
  )
}

export default ChunkNavBar