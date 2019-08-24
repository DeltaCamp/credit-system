import React from 'react'
import { withRouter } from 'next/router'

import { abiMapping } from 'lib/apollo/abiMapping'
import { withNetworkAccountQuery } from 'lib/components/hocs/withNetworkAccountQuery'
import { LoadingSpinner } from 'lib/components/LoadingSpinner'

export const withCreditSystemAddress = (WrappedComponent) => {
  return withRouter(
    withNetworkAccountQuery(
      function _withCreditSystemAddress(props) {
        const { router, networkAccountQuery } = props
        const { networkId } = networkAccountQuery

        let creditSystemAddress = router.query.creditSystemAddress

        if (!creditSystemAddress && networkId) {
          creditSystemAddress = abiMapping.getAddress('CreditSystem', networkId)
        }

        const newProps = {
          ...props,
          creditSystemAddress
        }

        if (newProps.creditSystemAddress) {
          return <WrappedComponent {...newProps} />
        } else {
          return <LoadingSpinner />
        }
      }
    )
  )
}
