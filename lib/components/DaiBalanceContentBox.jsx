import React, { Component } from 'react'

import { DaiBalanceChart } from 'lib/components/DaiBalanceChart'
import { ContentBox } from 'lib/components/ContentBox'
import { DaiLogo } from 'lib/components/DaiLogo'
import { TransactionButton } from 'lib/components/TransactionButton'
import { TableRow } from 'lib/components/TableRow'

export const DaiBalanceContentBox = 
  class _DaiBalanceContentBox extends Component {
    render () {
      const token = {
        balanceOf: 270,
        stakeAmount: -140
      }
      return <ContentBox>

        <DaiBalanceChart
          label='Your credit score'
          balanceOf={token.balanceOf}
          stakeAmount={token.stakeAmount}
          className='mt-8'
        />

        {/* <div
          className='tab-button-menu tab-button-menu--right flex items-center menu'
        >
          <TabButton
            active={page === 'account'}
            onClick={this.showBalances}
            roundedClasses='rounded-tl-lg'
            color='blue'
            className={`mt-2 lg:mt-4 xl:mt-6`}
          >
            Balances
          </TabButton>
          <TabButton
            active={page === 'account'}
            onClick={this.showTransactions}
            roundedClasses='rounded-tr-lg'
            color='blue'
            className={`mt-2 lg:mt-4 xl:mt-6`}
          >
            Transactions
          </TabButton>
        </div> */}
        <TableRow>
        </TableRow>
        <TableRow
          noRule
        >
          <h6>
            Merchants will determine your credibility by your credit score and Dai balance.
          </h6>
          <hr />
          <h6>
            To stop using Vero withdraw your stake here:
          </h6>
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
    }
  }
