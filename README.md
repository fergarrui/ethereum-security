# ethereum-security

## :exclamation: :warning: DO NOT USE THE CONTRACTS IN THIS REPOSITORY. THEY ARE VULNERABLE TO SECURITY BUGS. :warning: :exclamation:

Repository with some Ethereum security bugs.
The bugs and fixes are demonstrated using Mocha tests.

Bugs added so far:

* Overflow
* Underflow
* Reentrancy (DAO hack)
* Delegatecall (Parity hack style)
* DOS (e.g. stay as an Auction leader forever)
* DOS (unbounded array loop)
* Force ether (relying on the invariant this.balance == 0)
* Tx.origin

Run:

```
truffle test
```

To debug or run the test suite in more detail:

1. Modify `truffle.js` with:

```
module.exports = {
  networks: {
    development: {
      host: "localhost",
      port: 8545,
      network_id: "*", // Match any network id
      gas : 4000000
    }
  }
};
```

This will run the tests in a local test blockchain. Then `testrpc` & `truffle console` or just `truffle develop` can be run to have an interactive console and be able to see the RPC methods that have been called in the process, and therefore, the transaction hashes (if there was a transaction).

Once you know the transaction hash you want to inspect in more detail, it can be debugged running `truffle debug <tx_hash>`.
See the transaction with `web3.eth.getTransaction("<tx_hash>")` or the transaction receipt: `web3.eth.getTransactionReceipt("<tx_hash>")`

Also, an individual test can be run using:
`truffle test test/<test_folder>/<test_name>.js`
