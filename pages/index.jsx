import React from 'react'

import { ECSLayout } from 'lib/components/ECSLayout'
import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'

export default () => {
  return (
    <DynamicApolloWrapper>
      <ECSLayout />
    </DynamicApolloWrapper>
  )
}