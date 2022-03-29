import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import { Placeholder } from 'semantic-ui-react';

interface AppPlaceholderImageProps {
  srcUrl: string
  fluid?: boolean
  style?: { [key: string]: string }
}

export const AppPlaceholderImage = ({ srcUrl, fluid, style }: AppPlaceholderImageProps) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageClassName, setImageClassName] = useState('placeholder image loading');
  useEffect(() => {
    if (!imageLoading) setImageClassName('placeholder image');
  }, [imageLoading, setImageClassName]);
  return (
    <React.Fragment>
      {imageLoading && <Placeholder style={style} fluid={fluid}>
        <Placeholder.Image square />
      </Placeholder>}
      <img className={imageClassName} src={srcUrl} onLoad={() => setImageLoading(false)} />
    </React.Fragment>
  )
}

AppPlaceholderImage.propTypes = {
  // second: PropTypes.
}

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AppPlaceholderImage)