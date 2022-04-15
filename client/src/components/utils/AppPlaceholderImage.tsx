import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import { Placeholder } from 'semantic-ui-react';

interface AppPlaceholderImageProps {
  srcUrl: string
  fluid?: boolean
  placeholderStyle?: { [key: string]: string }
  fullWidth?: boolean
  altText: string
}

export const AppPlaceholderImage = ({ srcUrl, fluid, placeholderStyle, fullWidth, altText }: AppPlaceholderImageProps) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageClassName, setImageClassName] = useState('placeholder image loading');
  useEffect(() => {
    let className = 'placecholder image';
    if (imageLoading) className += ' loading';
    if (fullWidth) className += ' full-width';
    setImageClassName(className);
    // if (!imageLoading) setImageClassName('placeholder image'+` ${width}`);
  }, [imageLoading, fullWidth, setImageClassName]);
  return (
    <React.Fragment>
      {imageLoading && <Placeholder style={placeholderStyle} fluid={fluid}>
        <Placeholder.Image square />
      </Placeholder>}
      <img className={imageClassName} alt={altText} src={srcUrl} onLoad={() => setImageLoading(false)} />
    </React.Fragment>
  )
}

AppPlaceholderImage.propTypes = {
  // second: PropTypes.
}

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AppPlaceholderImage)