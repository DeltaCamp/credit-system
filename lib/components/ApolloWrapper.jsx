import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo'

import { apolloClient } from 'lib/apollo/apolloClient'

class ApolloWrapper extends Component {
  state = {}

  async componentDidMount() {
    const client = await apolloClient()
    this.setState({ client })
  }

  render() {
    const { client } = this.state;

    let children

    if (client) {
      children = 
        <ApolloProvider client={client}>
          {this.props.children}
        </ApolloProvider>
    } else {
      children = <></>
    }

    return children;
  }
}

export default ApolloWrapper