import { graphql } from 'react-apollo'

import { withNetworkAccountQuery } from 'lib/components/hocs/withNetworkAccountQuery'
import { tokenQuery } from 'lib/queries/tokenQuery'
import { abiMapping } from 'lib/apollo/abiMapping'

export function withTokenQuery (Component) {
  return withNetworkAccountQuery(graphql(tokenQuery, {
    name: 'tokenQuery',
    skip: (props) => {
      return !props.userAddress && (!props.networkAccountQuery.account || !props.networkAccountQuery.networkId)
    },
    options: (props) => {
      const variables = {
        userAddress: props.userAddress || props.networkAccountQuery.account,
        spender: abiMapping.getAddress('CreditSystem', props.networkAccountQuery.networkId)
      }

      return {
        variables
      }
    }
  })(Component))
}
