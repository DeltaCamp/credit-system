import React, { PureComponent } from 'react'
import classnames from 'classnames'

import { Button } from 'lib/components/form'

export const ConnectHumanityDao = class _ConnectHumanityDao extends PureComponent {
  render () {
    return <div
      className={classnames(
        'fixed forceOffScreen t-0 l-0 w-full mx-auto bg-white shadow text-black animated h-full text-center p-6 trans trans-fastest z-30', {
          // 'pointer-events-none': this.props.connected,
          'slideInDown': this.props.connected === false,
          // 'slideOutUp': this.props.connected
        }
      )}
    >
      <h5>
        Step 1.
      </h5>
      <h3>
        For identity verification please sign up to <span className='text-orange-400'>brightID</span>:
      </h3>
      <br />
      <Button
        onClick={this.props.handleConnectDaoClick}
      >
        Connect brightID
      </Button>
    </div>
  }
}