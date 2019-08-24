import React from 'react'

import { ECSLayout } from 'lib/components/ECSLayout'
import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'
import { PaymentView } from 'lib/components/PaymentView'

export default () => {
  return (
    <DynamicApolloWrapper>
      <ECSLayout>
        <PaymentView />
      </ECSLayout>
    </DynamicApolloWrapper>
  )
}