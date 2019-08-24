import React, { PureComponent } from 'react'
import classnames from 'classnames'

import FeatherIcon from 'feather-icons-react'
import { Button } from 'lib/components/form'

export const StakeFunds = class _StakeFunds extends PureComponent {
  render () {
    return <div
      className={classnames(
        'fixed forceOffScreen t-0 l-0 w-full mx-auto bg-white shadow text-black animated h-full text-center p-6 trans trans-fastest z-20', {
          'pointer-events-none': this.props.hasStaked,
          'slideInDown': !this.props.hasStaked,
          'slideOutUp': this.props.hasStaked
        }
      )}
    >
      <h6 className='text-gray-700'>
        Step 3.
      </h6>
      <h3>
        Make a deposit of 100 Dai.
      </h3>
      {this.props.showCheckmark ? <>
        <FeatherIcon
          icon='check-circle'
          className='mx-auto mt-8 text-green-400'
          height='100'
          width='100'
        />
       </> : <>
        <h6>
          This will be kept as overdraft to pay merchants if your Dai balance falls below 0.
        </h6>
        <br />

        <Button
          onClick={this.props.handleStake}
        >
          Deposit 100 Dai
        </Button>
      </>}
      
    </div>
  }
}