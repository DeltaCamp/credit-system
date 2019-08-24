import gql from 'graphql-tag'

export const tokenSubscription = gql`
  subscription tokenSubscription {
    Token @contract {
      allEvents @events
    }
  }
`
