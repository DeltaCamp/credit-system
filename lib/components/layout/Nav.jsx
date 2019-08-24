import React, { Component } from 'react'
import classnames from 'classnames'
import Link from 'next/link'
import FeatherIcon from 'feather-icons-react'
import { withRouter } from 'next/router'

import EcsLogo from 'assets/images/ecs-logo.svg'

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
        return 'or'
    }
  }

  showOffCanvasMenu = () => {
    this.setState({
      showOffCanvasMenu: true
    })
  }

  hideOffCanvasMenu = () => {
    this.setState({
      showOffCanvasMenu: false
    })
  }

  render () {
    const { creditSystemAddress } = this.props
    const page = this.getPage()

    const offCanvasLinkClasses = `text-3xl flex-1 mt-2 sm:mt-3 text-blue-500 hover:text-blue-300`

    return (
      <>
        <div
          className={classnames(
            'bg-white w-full h-full fixed t-0 l-0 r-0 b-0',
            'text-center align-center text-white trans trans-medium'
          )}
          style={{
            zIndex: 10000,
            transition: '',
            transform: !this.state.showOffCanvasMenu ? 'translateY(100%)' : 'translateY(0%)'
          }}
        >
          <div className='main-grid'>
            <div className='main-content'>
              <div
                className='flex flex-col items-center py-24'
              >
                <button
                  onClick={this.showAccount}
                  className={classnames(
                    offCanvasLinkClasses, {
                      'text-black': page !== 'account',
                      'text-black': page === 'account'
                    }
                  )
                  }>
                  Account
                </button>
              </div>
            </div>

            <div className='main-nav spinner-hidden'>
              <div className='h-full'>
                <button
                  onClick={this.hideOffCanvasMenu}
                  className='focus:outline-none active:outline-none'
                >
                  <FeatherIcon
                    icon='x'
                    className='h-full w-full shadow-xl border-2 border-black fill-current mx-auto my-5 text-black'
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        <nav className='flex items-center justify-between py-4 px-6'>
            <Link href='/'>
              <a
                className='w-5/12 inline-block font-condensed text-gray-600 no-underline'
                title='Home'
              >
                <img
                  src={EcsLogo}
                  className='img-fluid'
                />
              </a>
            </Link>

          <div className='w-auto sm:hidden mt-1 text-white text-gray-600'>
            <button
              onClick={this.showOffCanvasMenu}
              className='h-full w-full focus:outline-none active:outline-none'
            >
              <FeatherIcon
                icon='menu'
                className='h-full w-full bg-white border-2 border-gray-200 shadow-xl fill-current'
                style={{
                  padding: '2px'
                }}
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
              color='white'
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

          <div className='w-5/12 w-auto'>
            <div className='text-sm text-right'>
              <EthereumNetworkStatus />
            </div>
          </div>
        </nav>
      </>
    )
  }
}))
