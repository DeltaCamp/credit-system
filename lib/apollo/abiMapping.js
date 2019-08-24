import { AbiMapping } from 'apollo-link-ethereum'
import { apollo } from 'dapp-core'

import CreditSystemAbi from './abis/CreditSystemAbi'
import TokenAbi from './abis/TokenAbi'

import CreditSystemArtifact from 'artifacts/CreditSystem.json'
import TokenArtifact from 'artifacts/Token.json'

export const abiMapping = new AbiMapping()

apollo.addTruffleArtifact(abiMapping, 'CreditSystem', CreditSystemAbi, CreditSystemArtifact)
apollo.addTruffleArtifact(abiMapping, 'Token', TokenAbi, TokenArtifact)
