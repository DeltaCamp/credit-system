import { graphql } from 'react-apollo'

import { withNetworkAccountQuery } from 'lib/components/hocs/withNetworkAccountQuery'
import { tokenQuery } from 'lib/queries/tokenQuery'
import { abiMapping } from 'lib/apollo/abiMapping'

export function withTokenQuery (Component) {
  return withNetworkAccountQuery(graphql(tokenQuery, {
    name: 'tokenQuery',
    skip: (props) => {
      return !props.networkAccountQuery.account || !props.networkAccountQuery.networkId
    },
    options: (props) => {
      console.log(props.networkAccountQuery.networkId)
      const variables = {
        userAddress: props.networkAccountQuery.account,
        spender: abiMapping.getAddress('CreditSystem', props.networkAccountQuery.networkId)
      }

      console.log('token query variables: ', variables)

      return {
        variables
      }
    }
  })(Component))
}
