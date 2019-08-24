import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import classnames from 'classnames'

import { Button } from 'lib/components/form'

export const Modal = class _Modal extends PureComponent {
  static propTypes = {
    isOpen: PropTypes.bool.isRequired,
    onClose: PropTypes.func,
    className: PropTypes.string
  }

  static defaultProps = {
    className: 'w-11/12 lg:w-1/2'
  }
  
  handleRef = (ref) => {
    this.removeChild()

    if (ref) {
      this.bodyTag().appendChild(ref)
      this.ref = ref
    }
  }

  componentWillUnmount () {
    this.removeChild()  
  }

  removeChild () {
    if (this.ref && this.bodyTag().contains(this.ref)) {
      this.bodyTag().removeChild(this.ref)
    }
  }

  bodyTag() {
    return document.getElementsByTagName('body')[0]
  }

  render () {
    const { isOpen } = this.props

    const containerClassName = classnames(
      'fixed top-0 right-0 left-0 bottom-0 z-10',
      {
        'invisible pointer-events-none': !isOpen
      }
    )

    const overlayClassName = classnames(
      'absolute top-0 right-0 left-0 bottom-0 bg-black transition-fast z-10',
      {
      'opacity-70': isOpen,
      'opacity-0': !isOpen,
      }
    )

    const modalClassNames = classnames(
      'z-20 transition-fast-ease-out relative bg-purple-1000 text-purple-300 flex flex-col border-2 md:border-4 border-purple-800 rounded py-4 px-3 md:pt-10 md:pb-6 md:px-4 lg:pt-10 lg:pb-10 lg:px-10',
      this.props.className,
      {
        'scale-0': !isOpen
      }
    )

    return (
      <div className={containerClassName} ref={this.handleRef}>
        <div className='relative flex flex-col justify-center items-center w-100 h-full'>
          <div
            className={overlayClassName}
            onClick={this.props.onClose}
          />

          <div className={modalClassNames}>
            {this.props.onClose && <div className='r-0 t-0 absolute p-2 md:p-4'>
                <Button
                  onClick={this.props.onClose}
                  isText
                  className='font-sans'
                >
                  &#10006;
                </Button>
              </div>
            }

            {this.props.children}
          </div>
        </div>
      </div>
    )
  }
}