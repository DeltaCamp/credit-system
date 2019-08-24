import React, { Component } from 'react'
import classnames from 'classnames'
import ReactTimeout from 'react-timeout'
import { withRouter } from 'next/router'
import { withApollo } from 'react-apollo'

import localForage from 'lib/localForage'
import { Button } from 'lib/components/form'
import { RecipientDaiBalance } from 'lib/components/RecipientDaiBalance'
import { ConnectWallet } from 'lib/components/ConnectWallet'
import { ContentBox } from 'lib/components/ContentBox'
import { TokenQuery } from 'lib/components/TokenQuery'
import { withCreditSystemAddress } from 'lib/components/hocs/withCreditSystemAddress'
import { withNetworkAccountQuery } from 'lib/components/hocs/withNetworkAccountQuery'

const debug = require('debug')('pt:components:RecipientView')

export const RecipientView = withRouter(withApollo(ReactTimeout(withCreditSystemAddress(withNetworkAccountQuery(
  class _RecipientView extends Component {
    state = {
      humanityDaoConnected: false,
      hasStaked: false,
      showCheckmark: false
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

    handleStake = async (e) => {
      if (e) {
        e.preventDefault()
      }

      this.setState({
        showCheckmark: true
      })

      this.props.setTimeout(() => {
        this.setState({
          hasStaked: true
        })
      }, 1500)

      await localForage.setItem('hasStaked', true)
    }

    async componentDidMount () {
      if (await localForage.getItem('humanityDaoConnected')) {
        this.handleConnectDaoClick()
      }

      if (await localForage.getItem('hasStaked')) {
        this.setState({
          hasStaked: true
        })
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
            'animated z-1', {
              'zoomOut': !this.state.humanityDaoConnected,
              // 'zoomIn': this.state.humanityDaoConnected
            }
          )}
        >
          <ConnectWallet
            userAddress={userAddress}
          />

          <TokenQuery
            userAddress={userAddress}
            creditSystemAddress={creditSystemAddress}
          >
            {({ tokenQuery }) => <RecipientDaiBalance
              tokenQuery={tokenQuery}
            />}
          </TokenQuery>
        </div>

        
        {/* <Button
          onClick={this.handleCreateCharge}
          className='fixed qrcode-button shadow-xl'
        >
          <SVG src='/static/qrcode.svg'
            className='qrcode-svg'
          />
        </Button> */}
      </>
    }
  }
)))))