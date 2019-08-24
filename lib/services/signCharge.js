import { web3 } from 'dapp-core'
import { ethers } from 'ethers'

export async function signCharge (charge) {
  const dataHash = ethers.utils.keccak256(charge)
  const bin = ethers.utils.arrayify(dataHash)
  const provider = await web3.getWriteProvider()
  const signer = provider.getSigner()
  return await signer.signMessage(bin)
}