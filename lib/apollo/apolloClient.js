import { apollo, web3 } from 'dapp-core'
import { abiMapping } from './abiMapping'

let client

export async function apolloClient() {
  if (!client) {
    const provider = await web3.getReadProvider({ defaultNetworkName: process.env.NEXT_JS_DEFAULT_ETHEREUM_NETWORK_NAME })

    const resolvers = {
      Query: {
      }
    }
    
    client = await apollo.createClient({abiMapping, provider, resolvers})
  }

  return client
}