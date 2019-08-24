import React, { PureComponent } from 'react'
import classnames from 'classnames'
import { ethers } from 'ethers'
import FeatherIcon from 'feather-icons-react'

import { abiMapping } from 'lib/apollo/abiMapping'
import { Button } from 'lib/components/form'
import { withCreditSystemUserQuery } from 'lib/components/hocs/withCreditSystemUserQuery'
import { withFormProps } from 'lib/components/hocs/withFormProps'
import { withTokenQuery } from 'lib/components/hocs/withTokenQuery'
import { SubscriptionQueryRefetch } from 'lib/components/SubscriptionQueryRefetch'
import { tokenSubscription } from 'lib/queries/tokenSubscription'

export const StakeFunds = withTokenQuery(withFormProps(withCreditSystemUserQuery(
  class _StakeFunds extends PureComponent {
    handleApproval = (e) => {
      e.preventDefault()

      const token = abiMapping.getAddress('Token', this.props.networkAccountQuery.networkId)
      const creditSystem = abiMapping.getAddress('CreditSystem', this.props.networkAccountQuery.networkId)

      const variables = {
        contractName: 'Token',
        contractAddress: token,
        method: 'approve',
        args: [
          creditSystem,
          ethers.utils.parseEther('100')
        ]
      }

      // console.log({ variables })

      this.props.sendTransaction({variables})
    }

    handleStake = (e) => {
      e.preventDefault()

      const variables = {
        contractName: 'CreditSystem',
        method: 'stake',
        args: [
          ethers.utils.parseEther('100')
        ]
      }

      this.props.sendTransaction({variables})
    }

    render () {
      const { creditSystemUserQuery, tokenQuery } = this.props
      const { CreditSystem } = creditSystemUserQuery || {}
      const { Token } = tokenQuery || {}

      let showStakeFunds = false

      let needsApproval = false

      if (Token) {
        const { allowance } = Token

        // console.log('Token: ', Token)

        if (allowance.lt(ethers.utils.parseEther('100'))) {
          needsApproval = true
        }
      }

      if (CreditSystem) {
        // console.log('CreditSystem: ', CreditSystem)

        const { stake } = CreditSystem

        if (stake.toString() == '0') {
          showStakeFunds = true
        }
      }

      return (
        <SubscriptionQueryRefetch
          subscription={tokenSubscription}
          query={tokenQuery}
          queryKey={'tokenQuery'}>
          <div
            className={classnames(
              'fixed forceOffScreen t-0 l-0 w-full mx-auto bg-white shadow text-black animated h-full text-center p-6 trans trans-fastest z-20', {
                // 'pointer-events-none': !showStakeFunds,
                'slideInDown': showStakeFunds,
              }
            )}
          >
            <h6 className='text-gray-700'>
              Step 3.
            </h6>
            <h3>
              Stake a deposit:
            </h3>
            {this.props.showCheckmark ? <>
              <FeatherIcon
                icon='check-circle'
                className='mx-auto mt-8 text-green-400'
                height='100'
                width='100'
              />
            </> : (
              <>
                <p className='text-sm text-gray-700'>
                  100 Dai will be kept as overdraft protection to pay merchants if your Dai balance falls below 0.
                </p>
                <p className='text-sm text-gray-500 my-6'>
                  You will need to approve the Dai spend prior to depositing.
                </p>

                <div className='flex justify-between my-6 mx-3'>

                  <Button
                    disabled={!needsApproval}
                    onClick={this.handleApproval}
                  >
                    Approve Dai
                  </Button>

                  <Button
                    disabled={needsApproval}
                    onClick={this.handleStake}
                  >
                    Deposit Dai
                  </Button>
                </div>
              </>
            )}
            
          </div>
        </SubscriptionQueryRefetch>
      )
    }
  }
)))