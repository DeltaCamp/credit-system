import React, { PureComponent } from 'react'
import classnames from 'classnames'

import { Button } from 'lib/components/form'

export const ConnectHumanityDao = class _ConnectHumanityDao extends PureComponent {
  render () {
    return <div
      className={classnames(
        'fixed t-0 l-0 w-full mx-auto bg-white shadow text-black animated h-full text-center p-6 trans trans-fastest', {
          'pointer-events-none': this.props.connected,
          'zoomOut': this.props.connected
        }
      )}
    >
      <h5>
        Step 2.
      </h5>
      <h3>
        For identity verification please connect your Ethereum address to HumanityDAO:
      </h3>
      <br />
      <Button
        onClick={this.props.handleConnectDaoClick}
      >
        Connect HumanityDAO
      </Button>
    </div>
  }
}