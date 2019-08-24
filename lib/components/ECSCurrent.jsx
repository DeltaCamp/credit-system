import React, { Component } from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import ReactTimeout from 'react-timeout'
import { withApollo } from 'react-apollo'

import { ConnectWallet } from 'lib/components/ConnectWallet'
import { withCreditSystemAddress } from 'lib/components/hocs/withCreditSystemAddress'
import { withNetworkAccountQuery } from 'lib/components/hocs/withNetworkAccountQuery'
import { TabButton } from 'lib/components/TabButton'

const debug = require('debug')('pt:components:ECSCurrent')

export const ECSCurrent = withApollo(ReactTimeout(withCreditSystemAddress(withNetworkAccountQuery(
  class _ECSCurrent extends Component {
    getPage = () => {
      const { page } = this.props.router.query
      switch (page) {
        case 'this':
          return 'that'
        default:
          return 'pool'
      }
    }

    render() {
      const { networkAccountQuery } = this.props
      const { account, loading, error } = networkAccountQuery || {}

      if (error) {
        console.error(error)
      }

      const page = this.getPage()

      return (
        <>
          <div>
            {
              !account ? <ConnectWallet /> :
              <>
                Just keeps coming back again
              </>
            }
          </div>


          <div
            className='tab-button-menu tab-button-menu--right flex items-center justify-center menu'
          >
            <TabButton
              count={1}
              active={page === 'account'}
              onClick={this.showAccount}
              roundedClasses='rounded-tl-full rounded-bl-full'
              color='blue'
              className={`mt-2 lg:mt-4 xl:mt-6`}
            >
              Account
            </TabButton>
            <TabButton
              count={2}
              active={page === 'pool'}
              onClick={this.showPool}
              roundedClasses='rounded-tr-full rounded-br-full'
              color='purple'
              className={`mt-2 lg:mt-4 xl:mt-6`}
            >
              Pool
            </TabButton>
          </div>
        </>
      )
    }
  }
))))