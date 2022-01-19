const path = require('path')
const HDWalletProvider = require('@truffle/hdwallet-provider')
require('dotenv').config()
module.exports = {
  contracts_build_directory: path.join(__dirname, 'front_end/src/contracts'),
  plugins: ['truffle-contract-size'],
  networks: {
    development: {
      host: '127.0.0.1',
      port: 7545,
      network_id: '*', // Match any network id
      chainlinkConfig: {
        apiRequest: {
          oracle: '0x7AFe1118Ea78C1eae84ca8feE5C65Bc76CcF879e', //some dummy address since there is no oracle in the local
          jobId:
            '0x00000000000000000000000000000000b0bde308282843d49a3a8d2dd2464af1', //some dummy jobId since there is no oracle in the local
          fees: 0.1 * 10 ** 8
        }
      }
    },
    'mainnet-fork': {
      host: '127.0.0.1',
      port: 8545,
      network_id: 1,
      skipDryRun: true,
      chainlinkConfig: {
        priceFeed: '0x5f4ec3df9cbd43714fe2740f5e3616155c5b8419'
      }
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
      skipDryRun: true,
      chainlinkConfig: {
        apiRequest: {
          oracle: '0x7AFe1118Ea78C1eae84ca8feE5C65Bc76CcF879e',
          jobId: 'b0bde308282843d49a3a8d2dd2464af1',
          fees: 0.1 * 10 ** 18
        },
        priceFeed: '0x8a753747a1fa494ec906ce90e9f37563a8af630e'
      }
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
      skipDryRun: true,
      chainlinkConfig: {
        apiRequest: {
          oracle: '0xc57b33452b4f7bb189bb5afae9cc4aba1f7a4fd8',
          jobId: 'd5270d1c311941d0b08bead21fea7747',
          fees: 0.1 * 10 ** 18
        },
        priceFeed: '0x9326BFA02ADD2366b30bacB125260Af641031331'
      }
    }
  },
  compilers: {
    solc: {
      version: '^0.8.0',
      settings: {
        optimizer: {
          enabled: true,
          runs: 1
        }
      }
    }
  }
}
