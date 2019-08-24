import React, { Component } from 'react'
import FeatherIcon from 'feather-icons-react'

import { Button } from 'lib/components/form'
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
          <p className='text-lg text-center'>
            Merchant Overview:
          </p>
        </ContentBox>
        
        <ContentBox>
          <p className='text-center text-sm text-gray-700'>
            Transactions:
          </p>
          <TxList
          />
        </ContentBox>
        
        <ContentBox>
          <Button
            color='green'
            onClick={this.handleCreateCharge}
          >
            <FeatherIcon
              icon='send'
              className='mx-auto text-white mb-2 mt-1'
              height='28'
              width='28'
            /> Receive money
            </Button>
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
