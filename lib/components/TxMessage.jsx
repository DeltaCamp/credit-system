import React, { PureComponent } from 'react'
import classnames from 'classnames'

import { HeadlineText } from 'lib/components/HeadlineText'
import { Modal } from 'lib/components/Modal'

export const TxMessage = class _TxMessage extends PureComponent {

  render () {
    let className = 'h-12 text-xxs sm:text-xs md:text-base text-white'

    const {
      inWallet,
      inFlight,
      txType
    } = this.props

    return <Modal
      isOpen={(inWallet || inFlight) || false}
      onClose={null}
      className={classnames(
        'w-10/12 lg:w-1/2',
        {
          'animated-light': inFlight
        }
      )}
    >
      <div>
        <div>
          <HeadlineText
            align='center'
            color='purple'
          >
            {txType}
          </HeadlineText>

          {inWallet &&
            <div
              className='py-3 px-4 text-center rounded mb-4'
            >
              Please confirm the transaction in your wallet.
            </div>
          }

          {inFlight &&
            <div
              className='py-3 px-4 text-center rounded mb-4'
            >
              Waiting for confirmations ...
            </div>
          }

        </div>

      </div>
    </Modal>
  }

}
  