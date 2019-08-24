import React, { Component } from 'react'
import ReactTimeout from 'react-timeout'
import { withApollo } from 'react-apollo'

import { ConnectWallet } from 'lib/components/ConnectWallet'
import { ContentBox } from 'lib/components/ContentBox'
import { StatRow } from 'lib/components/StatRow'
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
                <ContentBox
                >
                  <StatRow
                    color='black'
                    title='Your credit score:'
                    value={691}
                  />
                </ContentBox>
  
                <ContentBox
                >
                  <div
                    className='tab-button-menu tab-button-menu--right flex items-center justify-center menu'
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
                  </div>
                </ContentBox>
              </>
            }
          </div>


          
        </>
      )
    }
  }
))))