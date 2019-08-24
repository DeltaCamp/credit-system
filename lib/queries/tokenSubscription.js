import gql from 'graphql-tag'

export const tokenSubscription = gql`
  subscription tokenSubscription($tokenAddress: String!) {
    Token @contract(address: $tokenAddress) {
      allEvents @events
    }
  }
`
