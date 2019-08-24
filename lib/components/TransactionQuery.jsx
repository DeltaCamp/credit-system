import React, { Component } from 'react'
import { cloneDeep } from 'lodash'

import { USER_REJECTED_TX } from 'lib/constants'
import { withAllTransactionsQuery } from 'lib/components/hocs/withAllTransactionsQuery';

const debug = require('debug')('pt:components:DepositForm')

export const TransactionQuery = withAllTransactionsQuery(
  ({
    allTransactionsQuery,
    children,
    contractName,
    contractAddress,
    method
  }) => {
    const { transactions } = allTransactionsQuery

    let transaction = null

    const txs = cloneDeep(transactions)
    txs.reverse()

    transaction = txs.find(transaction => {
      if (method && method !== transaction.method) {
        return false
      }
      if (contractName && contractName !== transaction.contractName) {
        return false
      }
      if (contractAddress && contractAddress !== transaction.contractAddress) {
        return false
      }

      return true
    })

    return children(transaction)
  }
)
