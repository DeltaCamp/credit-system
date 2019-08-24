import React, { Component } from 'react'
import classnames from 'classnames'
import ReactTimeout from 'react-timeout'
import FeatherIcon from 'feather-icons-react'
import { withRouter } from 'next/router'
import { withApollo } from 'react-apollo'
import { ethers } from 'ethers'

import { CreditScore } from 'lib/components/CreditScore'
import { DaiBalanceChart } from 'lib/components/DaiBalanceChart'
import { Button, Input, Form } from 'lib/components/form'
import { shortenAddress } from 'lib/utils/shortenAddress'
import { ContentBox } from 'lib/components/ContentBox'
import { withCreditSystemAddress } from 'lib/components/hocs/withCreditSystemAddress'
import { withNetworkAccountQuery } from 'lib/components/hocs/withNetworkAccountQuery'

const debug = require('debug')('pt:components:ChargeForm')

export const PaymentView = withRouter(withApollo(ReactTimeout(withCreditSystemAddress(withNetworkAccountQuery(
  class _PaymentView extends Component {
    render() {
      const { router } = this.props
      let { charge } = router.query

      const decodedData = ethers.utils.defaultAbiCoder.decode(
        [
          'address',
          'address',
          'uint',
          'bytes32'
        ],
        charge
      )

      const [from, to, value, txId] = decodedData

      console.log(decodedData)

      return <>
        <ContentBox>
          <h3>{shortenAddress(from)}</h3>
          <h3>is sending you</h3>
          <h1 className='text-4xl m-0'>{ethers.utils.formatEther(value)} DAI</h1>
        </ContentBox>
        <ContentBox>
          <Button
            onClick={this.handleCreateCharge}
          >
            <FeatherIcon
              icon='download'
              className='mx-auto text-white mb-2 mt-1'
              height='28'
              width='28'
            /> Deposit money
          </Button>
        </ContentBox>
        <ContentBox
          isTight
        >
          <CreditScore
            label='Sender credit score'
            userAddress={from}
          />
          <p className='text-xxs text-blue-400 underline'>The sender's credit score</p>
        </ContentBox>
        <ContentBox>
          <h2>Sender Balance</h2>
          <DaiBalanceChart
            label='Sender credit score'
            userAddress={from}
            className='mt-8'
          />
        </ContentBox>
      </>
    }
  }
)))))