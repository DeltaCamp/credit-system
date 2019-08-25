import { graphql } from 'react-apollo'

import { withNetworkAccountQuery } from 'lib/components/hocs/withNetworkAccountQuery'
import { creditSystemUserQuery } from 'lib/queries/creditSystemUserQuery'

export function withCreditSystemUserQuery (Component) {
  return withNetworkAccountQuery(graphql(creditSystemUserQuery, {
      name: 'creditSystemUserQuery',
      skip: (props) => {
        return !props.userAddress && !props.networkAccountQuery.account
      },
      options: (props) => {
        return {
          pollInterval: 2000,
          variables: {
            userAddress: props.userAddress || props.networkAccountQuery.account
          }
        }
      }
    })(Component)
  )
}
