const path = require('path')
const HDWalletProvider = require('@truffle/hdwallet-provider')
require('dotenv').config()
module.exports = {
  contracts_build_directory: path.join(__dirname, 'front_end/src/contracts'),
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*' // Match any network id
    },
    'mainnet-fork': {
      host: '127.0.0.1',
      port: 8545,
      network_id: 1,
      skipDryRun: true
    },
    rinkeby: {
      provider: () =>
        new HDWalletProvider(
          process.env.MNEMONIC,
          `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
        ),
      network_id: 4,
      gas: 5500000,
      confirmations: 0,
      timeoutBlocks: 200,
      skipDryRun: true
    },
    kovan: {
      provider: () =>
        new HDWalletProvider(
          process.env.MNEMONIC,
          `https://kovan.infura.io/v3/${process.env.INFURA_PROJECT_ID}`
        ),
      network_id: 42,
      gas: 5500000,
      confirmations: 0,
      timeoutBlocks: 200,
      skipDryRun: true
    }
  },
  compilers: {
    solc: {
      version: '^0.8.0'
    }
  }
}
