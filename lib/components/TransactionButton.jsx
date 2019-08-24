import React from 'react'
import classnames from 'classnames'
import { omit } from 'lodash'

import { SmallButton } from 'lib/components/form'

export function TransactionButton(props) {
  let {
    className,
    txInFlight,
    children,
  } = props

  const newProps = omit(props, [
    'children',
    'className',
    'txInFlight',
  ])

  const txInProgressText = <>
    <span
      // className='text-xs sm:text-sm md:text-base xl:text-xl'
    >
      Transaction
      <br /> in progress ...
    </span>
  </>

  return (
    <SmallButton
      color='purple'
      paddingClasses='p-2 xl:px-8 xl:py-6'
      className={classnames(
        className,
        'mx-auto trans'
      )}

      {...newProps}
    >
      {txInFlight ? txInProgressText : children}
    </SmallButton>
  )
}