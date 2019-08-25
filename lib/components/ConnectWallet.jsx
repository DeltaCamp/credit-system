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
          'fixed forceOffScreen t-0 l-0 w-full mx-auto bg-white shadow text-black animated h-full text-center p-6 trans trans-fastest z-40', 
          {
            // 'pointer-events-none': ethereumPermission,
            'slideInDown': !ethereumPermission,
            // 'slideOutUp': ethereumPermission
          }
        )}
      >
        <div className='flex flex-col justify-center h-full'>
          <div>
            <h1 className='text-2xl mb-6'>
              To interact with Vero please permit transactions with your wallet.
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

          <p className='text-blue-300 mt-24'>
            <span className='font-bold'>Vero</span> is a secure, audited app for using your Credit Score as collateral with vendors.
          </p>
        </div>
      </div>
    }
  }
)