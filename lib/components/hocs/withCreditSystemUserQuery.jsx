import { graphql } from 'react-apollo'

import { creditSystemQuery } from 'lib/queries/creditSystemQuery'

const userAddressFromProps = (props) => {
  let userAddress = props.userAddress

  // Allows withcreditSystemQuery to be chained w/ withNetworkAccountQuery
  if (
    props.networkAccountQuery &&
    props.networkAccountQuery.account
  ) {
    userAddress = props.networkAccountQuery.account
  }


  return userAddress
}

export function withcreditSystemQuery (Component) {
  return graphql(creditSystemQuery, {
    name: 'creditSystemQuery',
    skip: (props) => {
      return !props.creditSystemAddress || !userAddressFromProps(props)
    },
    options: (props) => {
      return {
        variables: {
          creditSystemAddress: props.creditSystemAddress,
          userAddress: userAddressFromProps(props)
        }
      }
    }
  })(Component)
}
