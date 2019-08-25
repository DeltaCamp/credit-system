import React, { Component } from 'react'
import ReactTimeout from 'react-timeout'
import FeatherIcon from 'feather-icons-react'
import { ethers } from 'ethers'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import { withRouter } from 'next/router'

import { CreditScore } from 'lib/components/CreditScore'
import { DaiBalanceChart } from 'lib/components/DaiBalanceChart'
import { Button } from 'lib/components/form'
import { shortenAddress } from 'lib/utils/shortenAddress'
import { ContentBox } from 'lib/components/ContentBox'
import { withCreditSystemAddress } from 'lib/components/hocs/withCreditSystemAddress'
import { withNetworkAccountQuery } from 'lib/components/hocs/withNetworkAccountQuery'
import { withSystemInfoQuery } from 'lib/components/hocs/withSystemInfoQuery'
import { withFormProps } from 'lib/components/hocs/withFormProps'
import { TransactionQuery } from 'lib/components/TransactionQuery'

const debug = require('debug')('pt:components:ChargeForm')

export const PaymentView = withSystemInfoQuery(withRouter(withFormProps(ReactTimeout(withCreditSystemAddress(withNetworkAccountQuery(
  class _PaymentView extends Component {
    handlePayment = (e) => {
      e.preventDefault()

      const variables = {
        contractName: 'CreditSystem',
        method: 'charge',
        args: this.chargeArgs()
      }

      this.props.sendTransaction({ variables })
    }

    chargeArgs = () => {
      const sig = ethers.utils.splitSignature(this.props.router.query.signature)
      return [
        this.props.router.query.charge,
        sig.r,
        sig.s,
        sig.v
      ]
    }

    render() {
      const { router, systemInfoQuery } = this.props
      let { charge } = router.query

      const { systemInfo } = systemInfoQuery || {}

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

      let button
      if (systemInfo && systemInfo.hasWeb3Available) {
        button = (
          <TransactionQuery
            contractName='CreditSystem'
            method='charge'
            args={this.chargeArgs()}>

            {(transaction) => {
              let inFlight = false
              let complete = false
              let err
              if (transaction) {
                const { sent, completed, error } = transaction
                inFlight = sent && !completed
                complete = completed
                err = error
              }
              
              if (complete && !err) {
                return <FeatherIcon
                  icon='check-circle'
                  className='mx-auto mt-8 text-green-400'
                  height='100'
                  width='100'
                />
              } else {
                return <Button
                    onClick={this.handlePayment}
                    disabled={inFlight}
                  >
                  <FeatherIcon
                    icon='download'
                    className='mx-auto text-white mb-2 mt-1'
                    height='28'
                    width='28'
                  /> Deposit money
                </Button>
              }
            }}
          </TransactionQuery>
        )
      } else {
        button =
          <CopyToClipboard text={window.location.href}>
            <Button>
              <FeatherIcon
                icon='copy'
                className='mx-auto text-white mb-2 mt-1'
                height='28'
                width='28'
              /> Copy Link
            </Button>
          </CopyToClipboard>
      }

      return <>
        <ContentBox>
          <h3>{shortenAddress(from)}</h3>
          <h3>is sending you</h3>
          <h1 className='text-4xl m-0'>{ethers.utils.formatEther(value)} DAI</h1>
        </ContentBox>
        <ContentBox>
          {button}
        </ContentBox>
        <ContentBox
          isTight
        >
          <CreditScore
            label='Sender credit score'
            userAddress={from}
          />
          <p className='text-xxs text-blue-400 underline my-0'>
            The sender's credit score
          </p>
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
))))))