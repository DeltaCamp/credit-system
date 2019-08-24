import React, { Component } from 'react'
import FeatherIcon from 'feather-icons-react'
import { withRouter } from 'next/router'

import { Button } from 'lib/components/form'
import { DaiLogo } from 'lib/components/DaiLogo'

export const TxList = 
  withRouter(class _TxList extends Component {

    showTransaction = (txId) => {
      if (e) {
        e.preventDefault()
      }

      this.props.router.push(
        `/recipient/transaction/${txId}`,
        `/recipient/transaction/${txId}`, { shallow: true }
      )
    }

    showTransactions = (e) => {
      if (e) {
        e.preventDefault()
      }

      this.props.router.push(
        `/recipient/transactions`,
        `/recipient/transactions`, { shallow: true }
      )
    }

    render () {
      return <ul className='text-left ml-2 mb-6'>
        <li className='border-b'>
          <Button
            isText
            textClasses='text-sm'
            className='text-blue-600 no-underline w-full text-left py-2'
            onClick={(e) => {
              e.preventDefault()
              this.showTx(1234)
            }}
          >
            <div className='text-left w-5/12 inline-block py-1'>
              2019/08/24
              <br />11:43:12
            </div>
            <div className='rounded text-center text-lg text-blue-700 w-3/12 inline-block px-1 py-1 relative -t-3'>
              16 <DaiLogo />
            </div>
            <div className='rounded text-center w-3/12 inline-block px-1 py-1 relative -t-3'>
              View
            </div>
            <div className='rounded text-center w-1/12 inline-block px-1 py-1 relative'>
              <FeatherIcon icon='trash' width='16' className='text-center' />
            </div>
          </Button>
        </li>
        <li className='border-b'>
          <Button
            isText
            textClasses='text-sm'
            className='text-blue-600 no-underline w-full text-left py-2'
            onClick={(e) => {
              e.preventDefault()
              this.showTx(1235)
            }}
          >
            <div className='text-left w-5/12 inline-block py-1'>
              2019/08/24
              <br />11:40:56
            </div>
            <div className='rounded text-center text-lg text-blue-700 w-3/12 inline-block px-1 py-1 relative -t-3'>
              3 <DaiLogo />
            </div>
            <div className='rounded text-center w-3/12 inline-block px-1 py-1 relative -t-3'>
              View
            </div>
            <div className='rounded text-center w-1/12 inline-block px-1 py-1 relative'>
              <FeatherIcon icon='trash' width='16' className='text-center' />
            </div>
          </Button>
        </li>
        <li className='border-b'>
          <Button
            isText
            textClasses='text-sm'
            className='text-blue-600 no-underline w-full text-left py-2'
            onClick={(e) => {
              e.preventDefault()
              this.showTx(1236)
            }}
          >
            <div className='text-left w-5/12 inline-block py-1'>
              2019/08/24
              <br />11:38:06
            </div>
            <div className='rounded text-center text-lg text-blue-700 w-3/12 inline-block px-1 py-1 relative -t-3'>
              6 <DaiLogo />
            </div>
            <div className='rounded text-center w-3/12 inline-block px-1 py-1 relative -t-3'>
              View
            </div>
            <div className='rounded text-center w-1/12 inline-block px-1 py-1 relative'>
              <FeatherIcon icon='trash' width='16' className='text-center' />
            </div>
          </Button>
        </li>
        <li className=' mt-2'>
          <Button
            isText
            textClasses='text-sm'
            className='text-blue-600 no-underline w-full text-left py-2'
            onClick={this.showTransactions}
          >
            <div className='rounded border border-blue-400 text-center w-2/3 mx-auto px-2 py-2 relative -t-2'>
              View All Transactions
            </div>
          </Button>
        </li>
      </ul>
    }
  })
