import erc20TokenABI from "./tokenABI"
import burnamintABI from "./burnamintABI"
import {ethAPI} from './eth'
import config from '../config.json'

export const zeroAddress = "0x0000000000000000000000000000000000000000"
export const loadDetails = (callback) => async (reconnect=true) => {
    reconnect&&await ethAPI.connect()
    console.log(await ethAPI.getNet())
    const {contractAddress: burnamintAddress, oldTokenAddress, newTokenAddress, ratio, inversed} = config[await ethAPI.getNet()]
    const address = await ethAPI.getAddress()
    const oldToken = await ethAPI.contractInterface({contractABI: erc20TokenABI, contractAddress: oldTokenAddress})
    const newToken = await ethAPI.contractInterface({contractABI: erc20TokenABI, contractAddress: newTokenAddress})
    const burnamintContract = await ethAPI.contractInterface({contractABI: burnamintABI, contractAddress: burnamintAddress})
    const isZero = oldTokenAddress === zeroAddress
    const oldTokenDecimals = isZero ? 18 : await oldToken.decimals()
    const _oldTokenBalance =  isZero ? await ethAPI.getAddressBalance() : (await oldToken.balanceOf(address))
    const oldTokenBalance = _oldTokenBalance / 10**(oldTokenDecimals)
    const newTokenBalance = (await newToken.balanceOf(address)) / 10**(await newToken.decimals())

    const oldTokenAllowance = isZero ? oldTokenBalance : (await oldToken.allowance(address,burnamintAddress)) / 10**(await oldToken.decimals())

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
        newTokenAddress,
        ratio,
        inversed,
        isZero,
    })
}
