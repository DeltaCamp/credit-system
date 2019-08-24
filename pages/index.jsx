import React from 'react'

import { ECSLayout } from 'lib/components/ECSLayout'
import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'
import { ECSCurrent } from 'lib/components/ECSCurrent'

export default () => {
  return (
    <DynamicApolloWrapper>
      <ECSLayout>
        <ECSCurrent />
      </ECSLayout>
    </DynamicApolloWrapper>
  )
}