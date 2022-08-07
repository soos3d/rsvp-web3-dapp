# RSVP web3 DApp

Web3 RSVP DApp - This DApp is based on the [30 Days of Web3 curriculum](https://www.30daysofweb3.xyz/curriculum/1-getting-started/0-overview), and it's a DApp to create events and manage RSVP. Project made wiht HardHat and Solidity.

> This is updated to the end of [section 3 of the curiculum](https://www.30daysofweb3.xyz/en/curriculum/3-writing-your-smart-contract/5-writing-a-test-script).

## Requirements

- [git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
  - Run `git --version` to verify if it was installed correctly; it should show something like `git version x.x.x`
- [Nodejs](https://nodejs.org/en/)
  - Run `node --version` to verify if it was installed correctly; it should show something like `vx.x.x`
- [Yarn](https://yarnpkg.com/getting-started/install) instead of `npm`
  - You'll know you've installed yarn right if you can run:
    - Run `yarn --version` to verify if it was installed correctly; it should show something like `x.x.x`
    - You might need to [install it with `npm`](https://classic.yarnpkg.com/lang/en/docs/install/) or `corepack`

## Usage

Clone the repository and install dependencies with the `yarn` command.

```
git clone https://github.com/soos3d/rsvp-web3-dapp.git
cd rsvp-web3-dapp
yarn
```

Compile the smart contract:

```bash
npx hardhat compile
```

### Deploy on local network and run test script 

You can run the `run.js`file containing the tests. The file has comments too.

```bash
npm run script
```

It will deploy the smart contract locally and run the tests, giving a result like this:

```bash
> web3RSVP@1.0.0 script
> node scripts/run.js

Contract deployed to: 0x5FbDB2315678afecb367f032d93F642f64180aa3
NEW EVENT CREATED: NewEventCreated [
  '0x8a054be2ea682cd0bdd68f85c9e0aa6d8ac442d7b2716f0a1baab0954490af68',
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  BigNumber { value: "1718926200" },
  BigNumber { value: "3" },
  BigNumber { value: "1000000000000000000" },
  'bafybeibhwfzx6oo5rymsxmkdxpmkfwyvbjrrwcl7cekmbzlupmp5ypkyfi',
  eventID: '0x8a054be2ea682cd0bdd68f85c9e0aa6d8ac442d7b2716f0a1baab0954490af68',
  creatorAddress: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  eventTimestamp: BigNumber { value: "1718926200" },
  maxCapacity: BigNumber { value: "3" },
  deposit: BigNumber { value: "1000000000000000000" },
  eventDataCID: 'bafybeibhwfzx6oo5rymsxmkdxpmkfwyvbjrrwcl7cekmbzlupmp5ypkyfi'
]
EVENT ID: 0x8a054be2ea682cd0bdd68f85c9e0aa6d8ac442d7b2716f0a1baab0954490af68
NEW RSVP: NewRSVP [
  '0x8a054be2ea682cd0bdd68f85c9e0aa6d8ac442d7b2716f0a1baab0954490af68',
  '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266',
  eventID: '0x8a054be2ea682cd0bdd68f85c9e0aa6d8ac442d7b2716f0a1baab0954490af68',
  attendeeAddress: '0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266'
]
NEW RSVP: NewRSVP [
  '0x8a054be2ea682cd0bdd68f85c9e0aa6d8ac442d7b2716f0a1baab0954490af68',
  '0x70997970C51812dc3A010C7d01b50e0d17dc79C8',
  eventID: '0x8a054be2ea682cd0bdd68f85c9e0aa6d8ac442d7b2716f0a1baab0954490af68',
  attendeeAddress: '0x70997970C51812dc3A010C7d01b50e0d17dc79C8'
]
NEW RSVP: NewRSVP [
  '0x8a054be2ea682cd0bdd68f85c9e0aa6d8ac442d7b2716f0a1baab0954490af68',
  '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC',
  eventID: '0x8a054be2ea682cd0bdd68f85c9e0aa6d8ac442d7b2716f0a1baab0954490af68',
  attendeeAddress: '0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC'
]
CONFIRMED: 0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266
CONFIRMED: 0x70997970C51812dc3A010C7d01b50e0d17dc79C8
CONFIRMED: 0x3C44CdDdB6a900fa2b585dd299e03d12FA4293BC
WITHDRAWN: DepositsPaidOut [
  '0x8a054be2ea682cd0bdd68f85c9e0aa6d8ac442d7b2716f0a1baab0954490af68',
  eventID: '0x8a054be2ea682cd0bdd68f85c9e0aa6d8ac442d7b2716f0a1baab0954490af68'
]
```
### Deploy on Mumbai testnet network

You'll need an endpoint to access the Mumbai testnet; I recommend using [Chainstack](https://chainstack.com).

1. [Sign up with Chainstack](https://console.chainstack.com/user/account/create).  
1. [Deploy a node](https://docs.chainstack.com/platform/join-a-public-network).  
1. [View node access and credentials](https://docs.chainstack.com/platform/view-node-access-and-credentials). 

Then get some MATIC test token, you can use the [Polygon faucet](https://faucet.polygon.technology/)

The next step is to create a `.env` file in your root folder containing the environment variables for your node endpoint and private key.

It will look like this:

```bash
MUMBAI_CHAINSTACK_URL=YOUR_CHAINSTACK_URL
STAGING_PRIVATE_KEY=YOUR_PRIVATE_KEY
```

Now you can compile the smart contract. 

```bash
npx hardhat compile
```

Then you can run the deploy script.

```bash
npm run deploy
```

Now your contract is deployed on the Mumbai testnet!

```bash
> rsvp-web3-dapp@1.0.0 deploy
> npx hardhat run scripts/deploy.js --network mumbai

Contract deployed to: 0x8572B74E7c9D89c41AC522Cf108f88Fb29792840
