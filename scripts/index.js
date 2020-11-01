import erc20TokenABI from "./tokenABI"
import burnamintABI from "./burnamintABI"
import {ethAPI} from './eth'

export const oldTokenAddress = "0x6A7D7BcE0424F369082c4b85Bc3A72DB4Bf85e09"
export const newTokenAddress = "0xc1Ab6FeF8E9Da2f461B9589722F1b1E58D06C211"
export const burnamintAddress = "0x9d8A26611ac917F9BD4C06414DB80a60Ad452137"

export const loadDetails = (callback) => async (reconnect=true) => {
    reconnect&&await ethAPI.connect()
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
    })
}
