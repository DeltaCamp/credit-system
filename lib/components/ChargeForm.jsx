import React, { Component } from 'react'
import classnames from 'classnames'
import ReactTimeout from 'react-timeout'
import { withRouter } from 'next/router'
import { withApollo } from 'react-apollo'

import localForage from 'lib/localForage'
import { Button, Input, Form } from 'lib/components/form'
import { LoadingSpinner } from 'lib/components/LoadingSpinner'
import { ConnectWallet } from 'lib/components/ConnectWallet'
import { ConnectHumanityDao } from 'lib/components/ConnectHumanityDao'
import { StakeFunds } from 'lib/components/StakeFunds'
import { ContentBox } from 'lib/components/ContentBox'
import { withCreditSystemAddress } from 'lib/components/hocs/withCreditSystemAddress'
import { withNetworkAccountQuery } from 'lib/components/hocs/withNetworkAccountQuery'

const debug = require('debug')('pt:components:ChargeForm')

export const ChargeForm = withRouter(withApollo(ReactTimeout(withCreditSystemAddress(withNetworkAccountQuery(
  class _ChargeForm extends Component {
    state = {
      daiAmountInEther: '',
      showQrCode: false, 
      humanityDaoConnected: false,
      showCheckmark: false,
      recipientSelected: false,
      showRecipientQRScanner: false
    }

    handleConnectDaoClick = async (e) => {
      if (e) {
        e.preventDefault()
      }

      this.setState({
        humanityDaoConnected: true
      })

      await localForage.setItem('humanityDaoConnected', true)
    }

    handleStake = async (e) => {
      if (e) {
        e.preventDefault()
      }

      this.setState({
        showCheckmark: true
      })

      this.props.setTimeout(() => {
        this.setState({
          hasStaked: true
        })
      }, 1500)

      await localForage.setItem('hasStaked', true)
    }

    async componentDidMount () {
      if (await localForage.getItem('humanityDaoConnected')) {
        this.handleConnectDaoClick()
      }

      if (await localForage.getItem('hasStaked')) {
        this.setState({
          hasStaked: true
        })
      }
    }

    handleAmountTextInputChange = (e) => {
      const INPUT_MAX_LENGTH = 10
      const value = e.target.value

      if (
        /^[0-9]*$/.test(value) &&
        value &&
        value.length <= INPUT_MAX_LENGTH
      ) {
        this.setState({
          daiAmountInEther: parseInt(value, 10)
        })
      }
    }

    handleSubmit = (e) => {
      e.preventDefault()

      if (this.state.daiAmountInEther > 0) {
        this.setState({
          showQrCode: true
        })

        this.props.setTimeout(() => {
          this.setState({
            qrCodeReady: true
          })
        }, 2000)
        
      }
    }

    handleCloseQRCodeModal = (e) => {
      if (e) {
        e.preventDefault()
      }

      this.setState({
        showQrCode: false
      })

    }

    handleShowAccount = (e) => {
      if (e) {
        e.preventDefault()
      }

      this.props.router.push(
        `/`,
        `/`, { shallow: true }
      )
    }

    showRecipientQRScanner = (e) => {
      if (e) {
        e.preventDefault()
      }

      this.setState({
        showRecipientQRScanner: true
      })
      alert('showRecipientQRScanner ! then run setRecipient() and pass an object with keys "name" (of merchant) and "address"')
    }

    setRecipient = (recipientInfo) => {
      this.setState({
        recipientInfo,
        recipientSelected: true
      })
    }

    render() {
      let loading = true

      let networkAccountLoading,
        networkAccountError,
        creditSystemLoading,
        creditSystemError,
        userAddress,
        creditSystemAddress

      let networkAccount = {}
      let creditSystem = {}

      const { networkAccountQuery, creditSystemQuery } = this.props

      if (creditSystemQuery) {
        creditSystem = creditSystemQuery.creditSystem
        creditSystemLoading = creditSystemQuery.loading
        creditSystemError = creditSystemQuery.error
      }

      if (networkAccountQuery) {
        networkAccount = networkAccountQuery.networkAccount
        networkAccountLoading = networkAccountQuery.loading
        networkAccountError = networkAccountQuery.error
      }

      if (
        creditSystem &&
        !creditSystemLoading &&
        networkAccount &&
        !networkAccountLoading
      ) {
        loading = false
        userAddress = networkAccount.account
      }

      if (creditSystemError || networkAccountError) {
        console.error(creditSystemError)
        console.error(networkAccountError)
      }

      return <>
        <div
          className={classnames(
            'fixed forceOffScreen t-0 l-0 w-full mx-auto bg-white shadow text-black animated h-full text-center p-6 trans trans-faster', {
              'slideInDown': this.state.showQrCode,
              'slideOutUp': !this.state.showQrCode,
              'pointer-events-none': !this.state.showQrCode
            }
          )}
          style={{
            backgroundColor: '#F9FBFD'
          }}
        >
          <div className='r-0 t-0 absolute p-2 md:p-4'>
            <Button
              onClick={this.handleCloseQRCodeModal}
              isText
            >
              &#10006;
            </Button>
          </div>
          
          <div className='flex flex-col justify-center items-center'>
            {
              this.state.qrCodeReady ?
                <>
                  <ContentBox
                    className='mt-16'
                  >
                    <p className='text-2xl'>
                      Have the payment recipient scan this:
                    </p>
                    <img
                      className='mx-auto'
                      src='/static/qart1.png'
                      width='200'
                      height='200'
                    />
                  </ContentBox>
                </> : <>
                  <div className='text-4xl'>
                    &nbsp;
                  </div>
                  <p className='text-2xl mt-24'>
                    Building Code ...
                  </p>
                  <LoadingSpinner />
                </>
            }
          </div>
        </div>

        <div
          className={classnames(
            'animated z-1', {
              'zoomOut': !this.state.humanityDaoConnected,
              // 'zoomIn': this.state.humanityDaoConnected
            }
          )}
        >
          <ConnectWallet
            userAddress={userAddress}
          />

          <ConnectHumanityDao
            connected={this.state.humanityDaoConnected}
            handleConnectDaoClick={this.handleConnectDaoClick}
          />

          <StakeFunds
            hasStaked={this.state.hasStaked}
            showCheckmark={this.state.showCheckmark}
            handleStake={this.handleStake}
          />

          <div className='r-0 t-0 absolute p-2 md:p-4'>
            <Button
              onClick={this.handleShowAccount}
              isText
            >
              &#10006;
            </Button>
          </div>

          {!this.state.recipientSelected ? <>
            <ContentBox className='mt-12'>
              <p className='text-pink-500 text-xl px-8'>
                1. Who would you like to send a payment to?
              </p>
              <hr />
              <p className='text-gray-900 mt-6 ml-4 text-xl text-left'>
                Recent:
              </p>
              
              <ul className='text-left ml-2 mb-6'>
                <li className=''>
                  <Button  
                    isText
                    className='text-blue-600 no-underline text-lg w-full text-left py-4'
                    onClick={(e) => {
                      e.preventDefault()
                      this.setRecipient({
                        name: 'The Yard - Open Air',
                        address: '0x6fC21092DA55B392b045eD78F4732bff3C580e2c'
                      })
                    }}
                  >
                    The Yard - Open Air
                  </Button>
                </li>
                <li className=''>
                  <Button  
                    isText
                    className='text-blue-600 no-underline text-lg w-full text-left py-4'
                    onClick={(e) => {
                      e.preventDefault()
                      this.setRecipient({
                        name: 'Room77',
                        address: '0xFULLMEIN'
                      })
                    }}
                  >
                    Room77
                  </Button>
                </li>
                <li className=''>
                  <Button  
                    isText
                    className='text-blue-600 no-underline text-lg w-full text-left py-4'
                    onClick={(e) => {
                      e.preventDefault()
                      this.setRecipient({
                        name: 'Brewhaus',
                        address: '0xLKMASDLKM'
                      })
                    }}
                  >
                    Brewhaus
                  </Button>
                </li>
              </ul>

              <hr />
              <Button
                onClick={this.showRecipientQRScanner}
              >
                + Add new recipient
              </Button>
            </ContentBox>
            </> : <>
            <ContentBox className='mt-12'>
              <p className='text-pink-500 text-xl px-8'>
                  2. How much would you like to send to
                  <br />
                  "<span className='text-pink-700 font-bold'>{this.state.recipientInfo.name}</span>" ?
              </p>
              <hr
                style={{
                  borderTop: '2px solid #f2f2f2',
                  height: 1,
                  margin: '20px auto',
                  width: '80%'
                }}
              />
              <Form
                onSubmit={this.handleSubmit}
              >
                <label
                  htmlFor='amount'
                  className='mb-2 text-left text-xl w-full cursor-pointer'
                >
                  Amount in Dai:
                </label>
                <Input
                  id='amount'
                  type='number'
                  onChange={this.handleAmountTextInputChange}
                  value={this.state.daiAmountInEther}
                  className='input w-full inline-flex'
                  roundedClasses='rounded-tl'
                  placeholder='0'
                />
              </Form>

              <Button
                onClick={this.handleSubmit}
                disabled={this.state.daiAmountInEther < 1}
              >
                + Create Send Code
              </Button>
            </ContentBox>
          </>}

          


        </div>
      </>
    }
  }
)))))