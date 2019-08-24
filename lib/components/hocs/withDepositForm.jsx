import { graphql } from 'react-apollo'
import ReactTimeout from 'react-timeout'

import { withNetworkAccountQuery } from 'lib/components/hocs/withNetworkAccountQuery'
import { withFormProps } from 'lib/components/hocs/withFormProps'
import { tokenQuery } from 'lib/queries/tokenQuery'

export function withDepositForm(Component) {
  return withFormProps(
    withNetworkAccountQuery(
      graphql(tokenQuery,
        {
          name: 'allowanceQuery',
          fetchPolicy: 'cache-and-network',
          skip: (props) => (
            !props.networkAccountQuery.account ||
            !props.networkAccountQuery.networkId ||
            !props.creditSystemAddress
          ),
          options: (props) => {
            const variables = {
              userAddress: props.networkAccountQuery.account,
              spender: props.creditSystemAddress
            }
            return {
              variables
            }
          }
        }
      )(
        ReactTimeout(
          Component
        )
      )
    )
  )
}