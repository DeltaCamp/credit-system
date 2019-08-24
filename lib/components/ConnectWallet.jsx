import React, { PureComponent } from 'react'
import classnames from 'classnames'
import { web3 } from 'dapp-core'

import { Button } from 'lib/components/form'
import { withEthereumPermissionQuery } from 'lib/components/hocs/withEthereumPermissionQuery'

export const ConnectWallet = withEthereumPermissionQuery(
  class _ConnectWallet extends PureComponent {
    render () {
      const {
        ethereumPermissionQuery
      } = this.props
      const { ethereumPermission } = ethereumPermissionQuery

      return <div
        className={classnames(
          'fullscreen-message pool-face-bg animated absolute t-0 l-0 w-full h-full text-center text-blue-100 py-6 sm:py-12 lg:py-16 px-6 lg:px-10 trans trans-fastest',
          {
            'slideOutUp': ethereumPermission
          }
        )}
      >
        <div className='flex flex-col justify-between h-full'>
          <div>
            <h1 className='text-base sm:text-xl lg:text-2xl mb-6'>
              To interact with the Ethereum Credit System please permit transactions with your wallet.
            </h1>
            <Button
              backgroundClasses='bg-blue-600 hover:bg-blue-400 focus:bg-blue-400 active:bg-blue-700'
              onClick={(e) => {
                e.preventDefault()
                web3.askEthereumPermissions()
              }}
            >
              Connect Wallet
            </Button>
          </div>

        <p className='text-xs md:text-lg text-blue-300'>
          The Ethereum Credit System is a secure, audited in-person collateral tool.
        </p>
        </div>
      </div>
    }
  }
)