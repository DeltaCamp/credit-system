import gql from 'graphql-tag'

export const creditSystemUserQuery = gql`
  query creditSystemUserQuery($userAddress: String!) {
    CreditSystem @contract {
      stake: stakes(address: $userAddress)
      unstakedAt(address: $userAddress)
      creditScore(address: $userAddress)
    }
  }
`