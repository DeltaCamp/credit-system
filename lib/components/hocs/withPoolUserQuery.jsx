import { graphql } from 'react-apollo'

import { poolUserQuery } from 'lib/queries/poolUserQuery'

const userAddressFromProps = (props) => {
  let userAddress = props.userAddress

  // Allows withPoolUserQuery to be chained w/ withNetworkAccountQuery
  if (
    props.networkAccountQuery &&
    props.networkAccountQuery.account
  ) {
    userAddress = props.networkAccountQuery.account
  }


  return userAddress
}

export function withPoolUserQuery (Component) {
  return graphql(poolUserQuery, {
    name: 'poolUserQuery',
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
