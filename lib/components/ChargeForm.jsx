import React, { Component } from 'react'
import classnames from 'classnames'
import ReactTimeout from 'react-timeout'
import FeatherIcon from 'feather-icons-react'
import { withRouter } from 'next/router'
import { withApollo } from 'react-apollo'

import localForage from 'lib/localForage'
import { Button, Input, Form } from 'lib/components/form'
import { LoadingSpinner } from 'lib/components/LoadingSpinner'
import { ConnectWallet } from 'lib/components/ConnectWallet'
import { ConnectHumanityDao } from 'lib/components/ConnectHumanityDao'
import { StakeFunds } from 'lib/components/StakeFunds'
import { SpenderQRScanner } from 'lib/components/SpenderQRScanner'
import { ContentBox } from 'lib/components/ContentBox'
import { withCreditSystemAddress } from 'lib/components/hocs/withCreditSystemAddress'
import { withNetworkAccountQuery } from 'lib/components/hocs/withNetworkAccountQuery'
import { ChargeQR } from 'lib/components/ChargeQR'
import { encodeCharge } from 'lib/services/encodeCharge'
import { signCharge } from 'lib/services/signCharge'
import { shortenAddress } from 'lib/utils/shortenAddress'

const debug = require('debug')('pt:components:ChargeForm')

export const ChargeForm = withRouter(withApollo(ReactTimeout(withCreditSystemAddress(withNetworkAccountQuery(
  class _ChargeForm extends Component {
    state = {
      daiAmountInEther: '',
      showQrCode: false, 
      humanityDaoConnected: false,
      showCheckmark: false,
      recipientSelected: false,
      showSpenderQrScanner: false
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
          daiAmountInEther: value
        })
      }
    }

    handleSubmit = async (e) => {
      e.preventDefault()

      if (this.state.daiAmountInEther > 0 && this.state.recipientSelected) {
        this.setState({
          showQrCode: true
        })

        console.log('ether: ', this.state.daiAmountInEther)
        console.log(ethers.utils.parseEther(this.state.daiAmountInEther))

        const variables = {
          from: this.props.networkAccountQuery.account,
          to: this.state.recipientInfo.address,
          value: ethers.utils.parseEther(this.state.daiAmountInEther)
        }

        const charge = encodeCharge(variables)

        const signature = await signCharge(charge)

        this.setState({
          charge, signature, qrCodeReady: true
        })
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

    showSpenderQrScanner = (e) => {
      if (e) {
        e.preventDefault()
      }

      this.setState({
        showSpenderQrScanner: true
      })
    }

    handleHideQrScanner = (e) => {
      if (e) {
        e.preventDefault()
      }

      this.setState({
        showSpenderQrScanner: false
      })
    }

    setRecipient = (recipientInfo) => {
      this.setState({
        recipientInfo,
        recipientSelected: true
      })
    }

    handleScan = (data) => {
      if (data.length > 0) {
        this.handleHideQrScanner()

        this.setRecipient({
          address: data
        })
        console.log(data)
      }
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
            }
          )}
          style={{
            backgroundColor: '#F9FBFD'
          }}
        >
          {/* <div className='r-0 t-0 absolute p-2 md:p-4'>
            <Button
              onClick={this.handleCloseQRCodeModal}
              isText
            >
              &#10006;
            </Button>
          </div> */}
          
          <div className='flex flex-col justify-center items-center w-100 h-full flex-1'>
            {
              this.state.qrCodeReady ?
                <>
                  <ContentBox
                    noGutter
                  >
                    <ChargeQR
                      charge={this.state.charge}
                      signature={this.state.signature}
                      handleShowAccount={this.handleShowAccount}
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

          <SpenderQRScanner
            handleHideQrScanner={this.handleHideQrScanner}
            handleScan={this.handleScan}
            showSpenderQrScanner={this.state.showSpenderQrScanner}
          />

          {!this.state.recipientSelected ? <>
            <div className='font-sans r-0 t-0 absolute p-2 md:p-4'>
              <Button
                onClick={this.handleShowAccount}
                isText
                isDark
              >
                &#10006;
              </Button>
            </div>

            <ContentBox
              noGutter
            >
              <p className='text-pink-500 text-lg px-8'>
                1. Who would you like to send a payment to?
              </p>
            </ContentBox>
              {/* <p className='text-gray-900 mt-6 ml-4 text-xl text-left'>
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

              <hr /> */}
              <ContentBox className='mt-2 mx-8'>
                <Button
                  color='green'
                  onClick={this.showSpenderQrScanner}
                >
                  <FeatherIcon
                    icon='aperture'
                    className='mx-auto text-white mb-2 mt-1'
                    height='28'
                    width='28'
                  />
                  Scan recipient's address
                </Button>
              </ContentBox>

              <ContentBox className='mt-2 mx-8'>
                <p>
                  Choose from recent recipients:
                </p>
                <p className='border-dotted border rounded-lg bg-gray-300 text-white py-10 text-xl'>
                  Feature coming soon!
                </p>
              </ContentBox>
            </> : <>
            <ContentBox
              noGutter
            >
              <div className='font-sans r-0 t-0 absolute p-2 md:p-4'>
                <Button
                  onClick={this.handleShowAccount}
                  isText
                  isDark
                >
                  &#10006;
                </Button>
              </div>

              <p className='text-pink-500 text-lg px-8'>
                2. How much would you like to send to
                <br />
                "<span className='text-blue-600 font-bold'>{shortenAddress(this.state.recipientInfo.address)}</span>" ?
                {/* "<span className='text-pink-700 font-bold'>{this.state.recipientInfo.name}</span>" ? */}
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
                <FeatherIcon
                  icon='dollar-sign'
                  className='mx-auto text-white mb-2 mt-1'
                  height='28'
                  width='28'
                /> Create Payment
              </Button>
            </ContentBox>
          </>}

          


        </div>
      </>
    }
  }
)))))