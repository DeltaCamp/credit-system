import React from 'react'
import ContentLoader from 'react-content-loader'

export const DataTableLoader = () => <ContentLoader
  height={300}
  speed={1}
  primaryColor={'#f2f2f2'}
  secondaryColor={'#e6e6e6'}
  
>
  <rect x="0" y="0" rx="125" ry="125" width="250" height="250"/>
</ContentLoader>