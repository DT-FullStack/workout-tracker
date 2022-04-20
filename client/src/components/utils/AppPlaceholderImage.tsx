import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import { Image, Placeholder, StrictImageProps } from 'semantic-ui-react';

export interface AppPlaceholderImageProps extends StrictImageProps {
  src: string
  fluid?: boolean
  placeholderStyle?: { [key: string]: string }
  // fullWidth?: boolean
  altText: string
}

export const AppPlaceholderImage = ({ fluid, placeholderStyle, altText, ...imageProps }: AppPlaceholderImageProps) => {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageClassName, setImageClassName] = useState('placeholder image loading');
  useEffect(() => {
    let className = 'placecholder image';
    if (imageLoading) className += ' loading';
    setImageClassName(className);
  }, [imageLoading, setImageClassName]);
  return (
    <React.Fragment>
      {imageLoading && <Placeholder style={placeholderStyle} fluid={fluid}>
        <Placeholder.Image square />
      </Placeholder>}
      <Image className={imageClassName} style={placeholderStyle} alt={altText} {...imageProps} onLoad={() => setImageLoading(false)} />
    </React.Fragment>
  )
}

AppPlaceholderImage.propTypes = {
  // second: PropTypes.
}

const mapStateToProps = (state: RootState) => ({})

const mapDispatchToProps = {}

export default connect(mapStateToProps, mapDispatchToProps)(AppPlaceholderImage)