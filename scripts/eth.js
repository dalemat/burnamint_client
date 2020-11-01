import Onboard from 'bnc-onboard';
import { ethers, Contract } from 'ethers'

const dappId = "f55de6cc-5d4a-4115-b773-f6dde3bbf817";
const networkId = 5777;

export default class ETHAPI{
  provider
  ob
  connected
  onboard(){
    if (!this.ob){
      this.ob = Onboard({
        dappId,
        hideBranding: true,
        networkId,
        subscriptions: {
          wallet: (wallet) => {
            this.provider = new ethers.providers.Web3Provider(wallet.provider);
          },
        },
        walletCheck: [
          {
            checkName: 'accounts'
          },
          { checkName: 'connect' },
          { checkName: 'balance' }
        ]
      });
    }
    return this.ob;
  }

  async connect(){
    await this.onboard().walletSelect()
    this.connected = await this.onboard().walletCheck()
  }

  isConnected(){
    return !!this.provider && !!this.ob
  }

  getSigner() {
    return this.provider.getSigner()
  }
  
  getAddress() {
    return this.getSigner().getAddress()
  }

  toBigNumber (number) {
    return ethers.utils.parseEther(number)
  }

  async contractInterface ({ contractAddress, contractABI }) {
    return new Contract(
        contractAddress,
        contractABI,
        this.getSigner()
    )
  }

  async getTokenBalance ({ contract }) {
    return contract.balanceOf(this.getAddress())
  }

  async checkAllowance ({ poolAddress, contract }) {
      const allowance = await contract.allowance(this.getAddress(), poolAddress)
      const decimals = await contract.decimals()
    return { allowance, decimals }
  }
}

export const ethAPI = new ETHAPI()
