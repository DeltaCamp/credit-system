import React from 'react'
import { Query } from 'react-apollo'
import { queries, web3, utils } from 'dapp-core'

import { DynamicApolloWrapper } from 'lib/components/DynamicApolloWrapper'
import { networkIdToName } from 'lib/utils/networkIdToName'
import { EtherscanAddressLink } from 'lib/components/EtherscanAddressLink'

export const EthereumNetworkStatus = function _EthereumNetworkStatus() {
  return (
    <div className='mt-2 sm:mt-0 text-xs sm:text-sm tracking-wide leading-none sm:leading-normal text-right'>
      <div className='spinner-hidden'>
        <DynamicApolloWrapper>
          <Query query={queries.systemInfoQuery}>
            {({ data }) => {
              const { systemInfo } = data || {}
              const { hasWeb3Available } = systemInfo || {}
              let content = null

              if (
                systemInfo && systemInfo.hasWeb3Available
              ) {
                content = <Query query={queries.networkAccountQuery}>
                  {({ data }) => {
                    const { networkId, account, loading, error } = data

                    let innerContent = null
                    if (error) {
                      console.error(error)
                      innerContent = <div>
                        {error.message}
                      </div>
                    } else {
                      const networkString = <span
                        className='block sm:inline-block -mt-1 sm:mt-0 py-1 sm:px-2 rounded-lg capitalize'
                      >{networkIdToName(networkId)}</span>

                      if (!hasWeb3Available) {
                        innerContent = networkString
                      } else if (networkId && account) {
                        innerContent =
                          <span className='leading-none text-gray-500 trans'>
                            {<EtherscanAddressLink
                              className='text-blue-500 hover:text-blue-300'
                              address={account}
                            >
                              {utils.shortenAddress(account)}
                            </EtherscanAddressLink>} {networkString}
                          </span>
                      } else if (networkId) {
                        innerContent = <>
                          <a
                            href='#'
                            onClick={() => web3.askEthereumPermissions()}
                            className='underline text-blue-500 hover:text-blue-300'
                          >
                            Connect Wallet
                          </a>
                        </>
                      }
                    }

                    return innerContent
                  }}
                </Query>
              }

              return content
                
            }}
          </Query>
        </DynamicApolloWrapper>
      </div>
    </div>
  )
}