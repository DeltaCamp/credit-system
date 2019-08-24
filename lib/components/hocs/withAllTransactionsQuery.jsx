import { graphql } from 'react-apollo'
import { allTransactionsQuery } from 'apollo-link-ethereum-mutations-ethersjs'

const debug = require('debug')('pt:withAllTransactionsQuery')

export function withAllTransactionsQuery (Component) {
  return graphql(allTransactionsQuery,
    { name: 'allTransactionsQuery' }
  )(Component)
}
