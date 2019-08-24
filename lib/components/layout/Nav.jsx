import React, { Component } from 'react'
import classnames from 'classnames'
import Link from 'next/link'
import FeatherIcon from 'feather-icons-react'
import { withRouter } from 'next/router'

import { withCreditSystemAddress } from 'lib/components/hocs/withCreditSystemAddress'
import { EthereumNetworkStatus } from 'lib/components/EthereumNetworkStatus'

export const Nav = withRouter(withCreditSystemAddress(class _Nav extends Component {
  state = {
    menuOpen: false
  }

  toggleMenu = () => {
    this.setState({ menuOpen: !this.state.menuOpen })
  }

  getPage = () => {
    const { page } = this.props.router.query
    switch (page) {
      case 'this':
        return 'that'
      default:
        return 'pool'
    }
  }

  hideOffCanvasMenu = () => {
    this.setState({
      showOffCanvasMenu: false
    })
  }

  render () {
    const { creditSystemAddress } = this.props
    const page = this.getPage()

    const offCanvasLinkClasses = `text-3xl flex-1 mt-2 sm:mt-3`

    return (
      <>
        <div
            className={classnames(
              'bg-purple-900 w-full h-full fixed t-0 l-0 r-0 b-0',
              'text-center align-center text-white trans trans-medium'
            )}
            style={{
              zIndex: 10000,
              transition: '',
              transform: !this.state.showOffCanvasMenu ? 'translateY(100%)' : 'translateY(0%)'
            }}
          >
            <button
              onClick={this.hideOffCanvasMenu}
              className='focus:outline-none active:outline-none'
            >
              <FeatherIcon
                icon='x'
                className='border-2 border-purple-300 fill-current mx-auto my-3 text-purple-200'
              />
            </button>

            <div
              className='flex flex-col items-center py-24'
            >
              <button
                onClick={this.showLearn}
                className={classnames(
                  offCanvasLinkClasses, {
                    'text-blue-600': page !== 'learn',
                    'text-white': page === 'learn'
                  }
                )
              }>
                Learn
              </button>
              <button
                onClick={this.showFaq}
                className={classnames(
                  offCanvasLinkClasses, {
                    'text-blue-600': page !== 'faq',
                    'text-white': page === 'faq'
                  }
                )
              }>
                FAQ
              </button>
              <button
                onClick={this.showAccount}
                className={classnames(
                  offCanvasLinkClasses, {
                    'text-blue-600': page !== 'account',
                    'text-white': page === 'account'
                  }
                )
              }>
                Account
              </button>
              <button
                onClick={this.showPool}
                className={classnames(
                  offCanvasLinkClasses, {
                    'text-blue-600': page !== 'pool',
                    'text-white': page === 'pool'
                  }
                )
              }>
                Pool
              </button>
              {/* <button
                onClick={this.showWinners}
                className={classnames(
                  `text-xl flex-1 mt-2 sm:mt-3`, {
                    'text-orange-600': page !== 'winners',
                    'text-white': page === 'winners'
                  }
                )
              }>
              Winners
            </button> */}
          </div>
        </div>

        <nav className='flex items-center justify-between flex-wrap px-3 py-2 sm:px-10 sm:py-4'>
          <div className='w-1/3 sm:w-auto sm:flex-grow sm:flex-1 items-center text-white'>
            <Link href='/'>
              <a
                className=''
                title='Home'
              >
                Logo
              </a>
            </Link>
          </div>

          <div className='w-1/3 sm:w-auto sm:hidden text-center mt-1 px-4 text-white text-purple-700'>
            <button
              onClick={this.showOffCanvasMenu}
              className='focus:outline-none active:outline-none'
            >
              <FeatherIcon
                icon='menu'
                className='bg-purple-1100 px-1 fill-current'
              />
            </button>
          </div>

          {/* {showLinks && <div
            className='hidden sm:block sm:flex-grow text-center py-2 px-4 text-white'
          >
            <TabButton
              isSmall
              isMonotone
              active={page === 'learn'}
              onClick={this.showLearn}
              roundedClasses='rounded-tl-full rounded-bl-full'
              className={`mt-2 sm:mt-3`}
              color='blue'
            >
              Learn
            </TabButton>
            <TabButton
              isSmall
              isMonotone
              active={page === 'faq'}
              onClick={this.showFaq}
              roundedClasses='rounded-tr-full rounded-br-full'
              color='teal'
            >
              FAQ
            </TabButton>
          </div>
          } */}

          <div className='w-1/3 sm:w-auto flex sm:flex-grow sm:flex-1 items-center w-auto'>
            <div className='text-sm flex-grow text-right'>
              <EthereumNetworkStatus />
            </div>
          </div>
        </nav>
      </>
    )
  }
}))
