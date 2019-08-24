import React, { Component } from 'react'
import classnames from 'classnames'
import dynamic from 'next/dynamic'

import FeatherIcon from 'feather-icons-react'
import { Button } from 'lib/components/form'

export const SpenderQRScanner = class _SpenderQRScanner extends Component {
  state = {
    showCamera: false,
    result: null
  }

  componentDidMount () {
    this.setState({
      qrCodeReader: dynamic(import('react-qr-reader'), {
        ssr: false,
        loading: () => 0
      })
    })
  }

  hideEverything = (e) => {
    this.handleCloseCamera()
    this.props.handleHideQrScanner()
  }

  handleOpenCamera = (e) => {
    if (e) {
      e.preventDefault()
    }

    this.setState({
      showCamera: true
    })
  }

  handleCloseCamera = (e) => {
    if (e) {
      e.preventDefault()
    }

    this.setState({
      showCamera: false
    })
  }

  handleScan = data => {
    if (data) {
      this.props.handleScan(data)
    }
  }

  handleError = err => {
    alert(err)
    console.error(err)
  }
  
  render () {
    const QrReader = this.state.qrCodeReader
    
    if (!QrReader) {
      return null
    }

    return <div
      className={classnames(
        'fixed forceOffScreen t-0 l-0 w-full mx-auto bg-white shadow text-black animated h-full text-center p-6 trans trans-fastest z-20', {
          'slideInDown': this.props.showSpenderQrScanner
        }
      )}
    >
      {this.props.showSpenderQrScanner &&
        <div className='mt-8'>
          <QrReader
            delay={300}
            onError={this.handleError}
            onScan={this.handleScan}
            style={{ width: '100%' }}
          />
        </div>
      }

      <div className='r-0 t-0 absolute p-2 md:p-4'>
        <Button
          onClick={this.hideEverything}
          isText
        >
          &#10006;
        </Button>
      </div>

      <div
        className={classnames(
          `mt-2 mb-4 bg-white rounded shadow-mixed text-black animated h-full p-6 text-center trans trans-fastest`
        )}
      >
        <div className='flex flex-col  h-full'>
          <p className='mb-6 text-2xl'>
            Scan address
          </p>
          <p className='mb-2 text-lg text-gray-600'>
            Scan the recipient's QR code with your camera to send them a payment.
          </p>

          {/* <Button
            onClick={this.handleOpenCamera}
          >
            <FeatherIcon
              icon='aperture'
              className='mx-auto text-white mb-2 mt-1'
              height='28'
              width='28'
            /> Open Camera
          </Button> */}
        </div>
      </div>

      

      
      
    </div>
  }
}