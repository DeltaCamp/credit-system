import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import QRCode from 'qrcode.react';
import queryString from 'query-string';

import { Button } from 'lib/components/form'
import { withNetworkAccountQuery } from 'lib/components/hocs/withNetworkAccountQuery'

export const ChargeQR = withNetworkAccountQuery(class _ChargeQR extends PureComponent {
  static propTypes = {
    charge: PropTypes.string.isRequired,
    signature: PropTypes.string.isRequired
  }

  formatUrl () {
    const { charge, signature } = this.props

    return `${process.env.NEXT_JS_BASE_URL}/recipient/charge?${queryString.stringify({ charge, signature })}`
  }

  render () {
    const url = this.formatUrl()
    return (
      <div
        className='flex flex-col w-full justify-start items-center'
      >
        <p className='text-lg mt-6'>
          To complete payment, have the recipient scan this:
        </p>
        <a
          href={url}
          target='_blank'
          className='block w-full mt-4'
          style={{
            height: '30vh'
          }}
        >
          <QRCode value={url} renderAs='svg' className='w-full h-full' />
        </a>
        <p className='text-xl mt-12'>
          <Button
            isOutline
            onClick={this.props.handleShowAccount}
          >
            Done
          </Button>
        </p>
      </div>
    )
  }
})