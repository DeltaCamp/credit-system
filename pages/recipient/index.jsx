import React from 'react'

import { ECSLayout } from 'lib/components/ECSLayout'
import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'
import { RecipientView } from 'lib/components/RecipientView'

export default () => {
  return (
    <DynamicApolloWrapper>
      <ECSLayout>
        <RecipientView />
      </ECSLayout>
    </DynamicApolloWrapper>
  )
}