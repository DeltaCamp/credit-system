import React, { Component } from 'react'
import queryString from 'query-string'

import { ecsToast } from 'lib/utils/ecsToast'

export function withEmailSignup(WrappedComponent) {

  return class _withEmailSignup extends Component {
    getInitialState = () =>  {
      return {
        email: '',
        success: false
      }
    }

    state = this.getInitialState()

    handleEmailChange = (e) => {
      this.setState({
        email: e.target.value
      })
    }

    handleSubmit = (e) => {
      e.preventDefault()

      if (this.state.email === '') {
        ecsToast.error('Please enter a valid email address')
        return
      }

      const formData = {
        u: '81246eca2c8c481f1e63638e8',
        id: 'a6860bd7fe',
        EMAIL: this.state.email,
        b_81246eca2c8c481f1e63638e8_a6860bd7fe: ''
      }

      const hostPortAndPath = 'https://gmail.us20.list-manage.com/subscribe/post'
      this.openInNewTab(`${hostPortAndPath}?${queryString.stringify(formData)}`)

      this.setState({
        success: true
      })
    }

    openInNewTab = (url) => {
      const win = window.open(url, '_blank')
      win.focus()
    }

    render () {
      return <WrappedComponent
        handleEmailChange={this.handleEmailChange}
        handleSubmit={this.handleSubmit}
        email={this.state.email}
        success={this.state.success}
        {...this.props}
      />
    }
  }
}
