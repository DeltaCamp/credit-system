import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'

import { withApollo } from 'react-apollo'

const debug = require('debug')('pt:components:SubscriptionQueryRefetch')

const subscriptions = {}

export const SubscriptionQueryRefetch = withApollo(class _SubscriptionQueryRefetch extends PureComponent {
  static propTypes = {
    subscription: PropTypes.object.isRequired,
    variables: PropTypes.object,
    query: PropTypes.object,
    queryKey: PropTypes.string.isRequired
  }

  componentDidMount () {
    this.subscribe(this.props.queryKey)
  }

  componentDidUpdate (oldProps) {
    if (this.props.queryKey != oldProps.queryKey) {
      this.unsubscribe(oldProps.queryKey)
      this.subscribe(this.props.queryKey)
    }
  }

  componentWillUnmount () {
    this.unsubscribe(this.props.queryKey)
  }

  subscribe (queryKey) {
    if (!subscriptions[queryKey]) {
      debug(`Creating new subscription for ${queryKey}`)
      subscriptions[queryKey] = {
        count: 1,
        subscription: this.props.client.subscribe({ query: this.props.subscription, variables: this.props.variables || {} })
          .subscribe(data => {
            if (this.props.query) {
              this.props.query.refetch()
            }
          })
      }
    } else {
      debug(`Adding subscription for ${queryKey}`)
      subscriptions[queryKey].count += 1
    }
  }

  unsubscribe (queryKey) {
    debug(`Removing subscription for ${queryKey}`)
    subscriptions[queryKey].count -= 1
    if (subscriptions[queryKey].count === 0) {
      debug(`Destroying subscription for ${queryKey}`)
      subscriptions[queryKey].subscription.unsubscribe()
      delete subscriptions[queryKey]
    }
  }

  render () {
    return <>{this.props.children}</>
  }
})