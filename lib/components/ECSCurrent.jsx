import React, { Component } from 'react'
import classnames from 'classnames'
import ReactTimeout from 'react-timeout'
import SVG from 'react-inlinesvg'
import { withRouter } from 'next/router'
import { withApollo } from 'react-apollo'

import localForage from 'lib/localForage'
import { Button } from 'lib/components/form'
import { DaiBalanceContentBox } from 'lib/components/DaiBalanceContentBox'
import { CreditScore } from 'lib/components/CreditScore'
import { ConnectWallet } from 'lib/components/ConnectWallet'
import { ConnectHumanityDao } from 'lib/components/ConnectHumanityDao'
import { ContentBox } from 'lib/components/ContentBox'
import { TokenQuery } from 'lib/components/TokenQuery'
import { withCreditSystemAddress } from 'lib/components/hocs/withCreditSystemAddress'
import { withNetworkAccountQuery } from 'lib/components/hocs/withNetworkAccountQuery'

const debug = require('debug')('pt:components:ECSCurrent')

export const ECSCurrent = withRouter(withApollo(ReactTimeout(withCreditSystemAddress(withNetworkAccountQuery(
  class _ECSCurrent extends Component {
    state = {
      humanityDaoConnected: false
    }

    handleConnectDaoClick = async (e) => {
      if (e) {
        e.preventDefault()
      }

      this.setState({
        humanityDaoConnected: true
      })

      await localForage.setItem('humanityDaoConnected', true)
    }

    async componentDidMount () {
      if (await localForage.getItem('humanityDaoConnected')) {
        this.handleConnectDaoClick()
      }
    }
    
    getPage = () => {
      const page = '/asdf'
      switch (page) {
        case 'this':
          return 'that'
        default:
          return 'or'
      }
    }

    handleCreateCharge = (e) => {
      if (e) {
        e.preventDefault()
      }
      
      this.props.router.push(
        `/charges/create`,
        `/charges/create`, { shallow: true }
      )
    }

    render() {
      let loading = true

      let networkAccountLoading,
        networkAccountError,
        creditSystemLoading,
        creditSystemError,
        userAddress,
        creditSystemAddress

      let networkAccount = {}
      let creditSystem = {}

      const { networkAccountQuery, creditSystemQuery } = this.props

      if (creditSystemQuery) {
        creditSystem = creditSystemQuery.creditSystem
        creditSystemLoading = creditSystemQuery.loading
        creditSystemError = creditSystemQuery.error
      }

      if (networkAccountQuery) {
        networkAccount = networkAccountQuery.networkAccount
        networkAccountLoading = networkAccountQuery.loading
        networkAccountError = networkAccountQuery.error
      }

      if (
        creditSystem &&
        !creditSystemLoading &&
        networkAccount &&
        !networkAccountLoading
      ) {
        loading = false
        userAddress = networkAccount.account
      }

      if (creditSystemError || networkAccountError) {
        console.error(creditSystemError)
        console.error(networkAccountError)
      }

      const page = this.getPage()

      return <>
        <div
          className={classnames(
            'animated', {
              'zoomOut': !this.state.humanityDaoConnected,
              'zoomIn': this.state.humanityDaoConnected
            }
          )}
        >
          <ConnectWallet
            userAddress={userAddress}
          />

          <ConnectHumanityDao
            connected={this.state.humanityDaoConnected}
          />


          <ContentBox
            isTight
          >
            <CreditScore
              label='Your credit score'
              score={887}
            />
          </ContentBox>

          <ContentBox>
            <Button
              onClick={this.handleCreateCharge}
            >
              + Create a new Charge
            </Button>
          </ContentBox>
        
          <TokenQuery
            userAddress={userAddress}
            creditSystemAddress={creditSystemAddress}
          >
            {({ tokenQuery }) => <DaiBalanceContentBox
              tokenQuery={tokenQuery}
            />}
          </TokenQuery>
        </div>

        <Button
          onClick={this.handleCreateCharge}
          className='fixed qrcode-button shadow-xl'
        >
          <SVG src='/static/qrcode.svg'
            className='qrcode-svg'
          />
        </Button>
      </>
    }
  }
)))))