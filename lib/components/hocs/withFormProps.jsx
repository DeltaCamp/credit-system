import { react } from 'dapp-core'
import { withApollo } from 'react-apollo'

import { withSendTransaction } from 'lib/components/hocs/withSendTransaction'
import { withEthereumPermissionQuery } from 'lib/components/hocs/withEthereumPermissionQuery';

export function withFormProps(Component) {
  return react.withTransactionEe(
    withSendTransaction(
      withApollo(
        withEthereumPermissionQuery(
          Component
        )
      )
    )
  )  
}