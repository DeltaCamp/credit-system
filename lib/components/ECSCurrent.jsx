import React, { Component } from 'react'
import ReactTimeout from 'react-timeout'
import { withApollo } from 'react-apollo'

import localForage from 'lib/localForage'
import { Button } from 'lib/components/form'
import { TransactionButton } from 'lib/components/TransactionButton'
import { TableRow } from 'lib/components/TableRow'
import { DaiLogo } from 'lib/components/DaiLogo'
import { ConnectWallet } from 'lib/components/ConnectWallet'
import { ContentBox } from 'lib/components/ContentBox'
import { StatRow } from 'lib/components/StatRow'
import { withCreditSystemAddress } from 'lib/components/hocs/withCreditSystemAddress'
import { withNetworkAccountQuery } from 'lib/components/hocs/withNetworkAccountQuery'
import { creditScore } from 'lib/utils/creditScore'

const debug = require('debug')('pt:components:ECSCurrent')

export const ECSCurrent = withApollo(ReactTimeout(withCreditSystemAddress(withNetworkAccountQuery(
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
                <ContentBox>
                  {this.state.humanityDaoConnected ? <>
                      <StatRow
                        color='black'
                        title='Your credit score:'
                        value={creditScore(691)}
                      />
                      <StatRow
                        color='black'
                        title='Current deposit:'
                        value={'200'}
                        unit={<DaiLogo />}
                      />
                    </> : <>
                      <h3>
                        For identity verification please connect your Ethereum address to HumanityDAO:
                      </h3>
                      <br />
                      <Button
                        onClick={this.handleConnectDaoClick}
                      >
                        Connect HumanityDAO
                      </Button>
                    </>
                  }
                </ContentBox>
                
                <ContentBox
                >
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
                    <span className='text-7xl'>
                      200&nbsp;
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
                      color='green'
                    >
                      Deposit
                    </TransactionButton>
                    <TransactionButton
                    >
                      Withdraw
                    </TransactionButton>
                  </TableRow>
                </ContentBox>
              </>
            }
          </div>


          
        </>
      )
    }
  }
))))