import { ethers } from 'ethers'

export function encodeCharge ({ from, to, value, txId }) {
  if (!txId) {
    txId = ethers.utils.randomBytes(32)
  }

  return ethers.utils.defaultAbiCoder.encode(
    [
      'address',
      'address',
      'uint',
      'bytes32'
    ],
    [
      from,
      to,
      value,
      txId
    ]
  )
}
