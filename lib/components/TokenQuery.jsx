import React from 'react'
import { graphql } from 'react-apollo'

import { tokenSubscription } from 'lib/queries/tokenSubscription'
import { tokenQuery, tokenQueryKey } from 'lib/queries/tokenQuery'
import { SubscriptionQueryRefetch } from 'lib/components/SubscriptionQueryRefetch'

export const TokenQuery = graphql(tokenQuery, {
  name: 'tokenQuery',
  options: (props) => {
    return {
      variables: {
        userAddress: props.userAddress,
        spender: props.creditSystemAddress
      }
    }
  }
})(
  function _TokenQuery({ creditSystemAddress, userAddress, tokenQuery, children }) {
    return (
      <SubscriptionQueryRefetch
        queryKey={tokenQueryKey(creditSystemAddress, userAddress)}
        query={tokenQuery}
        subscription={tokenSubscription}
        variables={{ creditSystemAddress, userAddress }}
      >
        {children({ tokenQuery })}
      </SubscriptionQueryRefetch>
    )
  }
)