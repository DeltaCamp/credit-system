import React, { Component } from 'react'
import classnames from 'classnames'
import ReactTimeout from 'react-timeout'
import SVG from 'react-inlinesvg'
import { withRouter } from 'next/router'
import { withApollo } from 'react-apollo'

import localForage from 'lib/localForage'
import { Button, Input, Form } from 'lib/components/form'
import { LoadingSpinner } from 'lib/components/LoadingSpinner'
import { ConnectWallet } from 'lib/components/ConnectWallet'
import { ConnectHumanityDao } from 'lib/components/ConnectHumanityDao'
import { ContentBox } from 'lib/components/ContentBox'
import { withCreditSystemAddress } from 'lib/components/hocs/withCreditSystemAddress'
import { withNetworkAccountQuery } from 'lib/components/hocs/withNetworkAccountQuery'

const debug = require('debug')('pt:components:ChargeForm')

export const ChargeForm = withRouter(withApollo(ReactTimeout(withCreditSystemAddress(withNetworkAccountQuery(
  class _ChargeForm extends Component {
    state = {
      daiAmountInEther: '',
      qrCode: false, 
      humanityDaoConnected: false
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

    async componentDidMount () {
      if (await localForage.getItem('humanityDaoConnected')) {
        this.handleConnectDaoClick()
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
          qrCode: true
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
        qrCode: false
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
            'fixed t-0 l-0 w-full mx-auto bg-white shadow text-black animated h-full text-center p-6 z-20 trans trans-faster', {
              'fadeOutDown': !this.state.qrCode,
              'fadeInUp': this.state.qrCode,
              'pointer-events-none': !this.state.qrCode
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
          
          <div className='flex flex-col justify-center items-center h-full'>
            

            {
              this.state.qrCodeReady ?
                <>
                  <ContentBox
                  >
                    <div className='text-4xl'>
                      &nbsp;
                    </div>
                    <p className='text-2xl mt-24'>
                      Have the staff scan this:
                    </p>
                    <LoadingSpinner />
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
            'animated', {
              'zoomOut': !this.state.humanityDaoConnected,
              'zoomIn': this.state.humanityDaoConnected
            }
          )}
        >
          <ConnectWallet
            userAddress={userAddress}
          />

          <ConnectHumanityDao
            connected={this.state.humanityDaoConnected}
          />

          <ContentBox>
            <p className='text-blue-300 text-lg'>
              Create a new payment to a merchant (ie. bar, store, etc.)
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
            >
              + Create
            </Button>
          </ContentBox>
        </div>
      </>
    }
  }
)))))