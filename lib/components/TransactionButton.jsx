import React from 'react'
import classnames from 'classnames'
import { omit } from 'lodash'

import { XSmallButton } from 'lib/components/form'

export function TransactionButton(props) {
  let {
    className,
    children,
  } = props

  const newProps = omit(props, [
    'children',
    'className',
  ])

  return (
    <XSmallButton
      color='blue'
      paddingClasses='p-4 px-8'
      className={classnames(
        className,
        'mx-auto trans'
      )}

      {...newProps}
    >
      {children}
    </XSmallButton>
  )
}