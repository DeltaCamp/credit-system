import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { ethers } from 'ethers'
import QRCode from 'qrcode.react';
import queryString from 'query-string';
import { web3 } from 'dapp-core'

import { withNetworkAccountQuery } from 'lib/components/hocs/withNetworkAccountQuery'

export const ChargeQR = withNetworkAccountQuery(class _ChargeQR extends PureComponent {
  static propTypes = {
    charge: PropTypes.string.isRequired,
    signature: PropTypes.string.isRequired
  }

  formatUrl () {
    return `${process.env.NEXT_JS_BASE_URL}/recipient/charge?${queryString.stringify(this.props)}`
  }

  render () {
    const url = this.formatUrl()
    return (
      <div className='flex flex-col w-full h-full justify-center items-center'>
        <h1>Show to Merchant</h1>
        <a href={url} target='_blank' className='block w-full h-1/2 max-h-1/2'>
          <QRCode value={url} renderAs='svg' className='w-full h-full' />
        </a>
      </div>
    )
  }
})