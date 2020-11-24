import erc20TokenABI from "./tokenABI"
import burnamintABI from "./burnamintABI"
import {ethAPI} from './eth'
import config from '../config.json'

export const loadDetails = (callback) => async (reconnect=true) => {
    reconnect&&await ethAPI.connect()
    console.log(config[await ethAPI.getNet()])
    const {contractAddress: burnamintAddress, oldTokenAddress, newTokenAddress} = config[await ethAPI.getNet()]
    const address = await ethAPI.getAddress()
    const oldToken = await ethAPI.contractInterface({contractABI: erc20TokenABI, contractAddress: oldTokenAddress})
    const newToken = await ethAPI.contractInterface({contractABI: erc20TokenABI, contractAddress: newTokenAddress})
    const burnamintContract = await ethAPI.contractInterface({contractABI: burnamintABI, contractAddress: burnamintAddress})
    const oldTokenDecimals = await oldToken.decimals()
    const oldTokenBalance = (await oldToken.balanceOf(address)) / 10**(oldTokenDecimals)
    const newTokenBalance = (await newToken.balanceOf(address)) / 10**(await newToken.decimals())

    const oldTokenAllowance = (await oldToken.allowance(address,burnamintAddress)) / 10**(await oldToken.decimals())

    return callback({
        address,
        oldToken,
        newToken,
        oldTokenBalance,
        newTokenBalance,
        oldTokenAllowance,
        connected: true,
        burnamintContract,
        oldTokenDecimals,
        burnamintAddress,
        oldTokenAddress,
        newTokenAddress
    })
}
