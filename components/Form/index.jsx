import { useState } from "react"
import { loadDetails } from "../../scripts";
import { ethers } from 'ethers'


export default function Form({details, setDetails}){
    const {burnamintContract, burnamintAddress, oldTokenAddress, newTokenAddress, oldTokenDecimals, address, oldTokenBalance, newTokenBalance, oldTokenAllowance, oldToken, isZero, ratio, inversed} = details
    const [burnValue, setBurnValue] = useState('')
    const enoughAllowance = Number(oldTokenAllowance) >= Number(burnValue)

    const handleApprove = async () => {
      const value = burnValue*10**oldTokenDecimals
      await oldToken.approve(burnamintAddress, String(value))
      const filter = oldToken.filters.Approval(address, burnamintAddress, null)
      oldToken.on(filter, async () => {
        await loadDetails(setDetails)(false)
      })
    }
    const handleBurn = async () => {
      const value = burnValue*10**oldTokenDecimals
      isZero
       ? await burnamintContract.burnamint(oldTokenAddress, newTokenAddress, inversed, address, String(value), {value: ethers.utils.parseEther(burnValue)})
       : await burnamintContract.burnamint(oldTokenAddress, newTokenAddress, inversed, address, String(value))
      const filter = burnamintContract.filters.BurnaMint(oldTokenAddress, newTokenAddress, address, null, null)
      burnamintContract.on(filter, async () => {
        await loadDetails(setDetails)(false)
      })
    }
    console.log({enoughAllowance, oldTokenAllowance, burnValue})
    const mintValue = inversed ? Number(burnValue)*ratio : Number(burnValue)/ratio
    return (
        <>
        <form onSubmit={(e)=>e.preventDefault()} className="flex flex-wrap shadow md:py-16 rounded-md bg-white w-full p-6 mt-20 md:w-800 m-auto">
            <div className="md:flex md:flex-wrap md:w-full md:justify-between">
                <InputField value={burnValue} handleChange={setBurnValue} col="red400" borderCol="red400border" labelText="Burn Old Token" textColor="red-400" tokenName="Old Token" tokenValue={oldTokenBalance} />
                <div className="flex w-full justify-center pt-6 pb-4 transform rotate-90 md:rotate-0 md:w-1/5"><img className="h-6 mt-4" src="/swapicon.png" alt="swap" /></div>
                <InputField value={mintValue} col="green400" borderCol="green400border" disabled labelText="Mint New Token" textColor="greenish" tokenName="New Token" tokenValue={newTokenBalance} />
            </div>
        </form>
        <div className="flex flex-wrap justify-between w-full px-6 mt-10 md:w-800 m-auto">
                <Button onClick={handleApprove} text="Approve" bgActive="greenish" bgInactive="white" disabled={(enoughAllowance||oldTokenBalance<burnValue)} />
                <Button onClick={handleBurn} disabled={(!enoughAllowance&&Number(burnValue)>oldTokenAllowance)||burnValue==""} text="Mint" bgActive="greenish" bgInactive="white" />
        </div>
        </>
    )
}

function InputField({labelText, disabled=false, textColor, tokenName="", tokenValue=0, handleChange, value, col, borderCol}){
    return (
        <label className={`w-full text-${textColor} inline-block font-bold md:w-2/5 ${col}`}>
                {labelText}
                <input value={value} onChange={(e)=>handleChange(e.target.value)} disabled={disabled} className={`w-full border rounded-md h-10 pl-2 text-xl mt-2 outline-none text-light-brown border-${textColor} ${borderCol}`} placeholder="0.00" type="number"/>
                <div className="font-normal text-light-brown mt-3">{tokenName} Balance: {tokenValue}</div>
        </label>
    )
}

function Button({text, bgActive, bgInactive, disabled, onClick}){
    const activeColor = disabled ? bgInactive : bgActive
    const textColor = disabled ? bgActive : bgInactive
    const hoverColor = disabled ? "" : "hover:bg-fade-green "
    return (
        <button disabled={disabled} onClick={onClick} className={`h-10 md:h-12 shadow-md hover:shadow-lg ${hoverColor} rounded-md bg-${activeColor} border border-${bgActive} text-${textColor} w-32 md:w-5/12 inline-block`}>
            {text}
        </button>
    )
}