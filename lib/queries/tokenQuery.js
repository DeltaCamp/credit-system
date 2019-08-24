import gql from 'graphql-tag'

export const tokenQuery = gql`
  query tokenQuery($userAddress: String!, $spender: String!) {
    Token @contract {
      id
      __typename
      allowance(from: $userAddress, to: $spender)
      myBalance: balanceOf(address: $userAddress)
    }
  }
`

export function tokenQueryKey(creditSystemAddress, userAddress) {
  return `tokenQuery(${creditSystemAddress}-${userAddress})`
}