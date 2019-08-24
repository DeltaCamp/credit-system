import React from 'react'

import { abiMapping } from 'lib/apollo/abiMapping'
import { withNetworkAccountQuery } from 'lib/components/hocs/withNetworkAccountQuery'

export const withCreditSystemAddress = (WrappedComponent) => {
  return withNetworkAccountQuery(
    function _withCreditSystemAddress(props) {
      const { networkAccountQuery } = props
      const { networkId } = networkAccountQuery

      let creditSystemAddress

      if (networkId) {
        creditSystemAddress = abiMapping.getAddress('CreditSystem', networkId)
      }

      const newProps = {
        ...props,
        creditSystemAddress
      }

      return <WrappedComponent {...newProps} />

      // if (newProps.creditSystemAddress) {
      //   return <WrappedComponent {...newProps} />
      // } else {
      //   return <LoadingSpinner />
      // }
    }
  )
}
