import React, { Component } from 'react'

import { RecipientSalesChart } from 'lib/components/RecipientSalesChart'
import { TxList } from 'lib/components/TxList'
import { ContentBox } from 'lib/components/ContentBox'
import { DaiLogo } from 'lib/components/DaiLogo'
import { TransactionButton } from 'lib/components/TransactionButton'
import { TableRow } from 'lib/components/TableRow'

export const RecipientDaiBalance = 
  class _RecipientDaiBalance extends Component {
    render () {
      const token = {
        balanceOf: 1500,
      }
      return <>
        <ContentBox>
          <h1>
            Merchant Overview:
          </h1>

          <h6 className='text-left ml-4 text-gray-700'>
            Transactions:
          </h6>
          <TxList
          />
        </ContentBox>

        <ContentBox>
          <RecipientSalesChart
            label='Your sales:'
            balanceOf={token.balanceOf}
            className='mt-8'
          />
        </ContentBox>

        <ContentBox>
          <TableRow>
            <span className='text-7xl'>
              667&nbsp;
            </span>

            <span className='text-sm text-gray-600'>
              Your current Dai <DaiLogo /> balance
            </span>
          </TableRow>

          <TableRow
            noRule
            isHorizontal
          >
            <TransactionButton
            >
              Withdraw
            </TransactionButton>
          </TableRow>
        </ContentBox>
      </>
    }
  }
