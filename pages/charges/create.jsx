import React from 'react'

import { ECSLayout } from 'lib/components/ECSLayout'
import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'
import { ChargeForm } from 'lib/components/ChargeForm'

export default () => {
  return (
    <DynamicApolloWrapper>
      <ECSLayout>
        <ChargeForm />
      </ECSLayout>
    </DynamicApolloWrapper>
  )
}