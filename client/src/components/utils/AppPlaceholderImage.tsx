import React, { createRef, forwardRef, useEffect, useRef, useState } from 'react'
import { connect } from 'react-redux'
import { RootState } from 'redux/store'
import { Image, Placeholder, StrictImageProps } from 'semantic-ui-react';

export interface AppPlaceholderImageProps extends StrictImageProps {
  src: string
  fluid?: boolean
  placeholderStyle?: { [key: string]: string }
  altText: string
}

export const AppPlaceholderImage = ({ fluid, placeholderStyle, className = "", altText, ...imageProps }: AppPlaceholderImageProps) => {
  const [imageLoading, setImageLoading] = useState(true);

  return (
    <React.Fragment>
      {imageLoading && <Placeholder style={placeholderStyle} fluid={fluid}>
        <Placeholder.Image square />
      </Placeholder>}
      <Image className={imageLoading ? className + " loading" : className} alt={altText} {...imageProps} onLoad={() => { setImageLoading(false) }} />
    </React.Fragment>
  )
}


export default AppPlaceholderImage