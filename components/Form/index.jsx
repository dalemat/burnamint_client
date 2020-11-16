export default function Form(){
    return (
        <>
        <form onSubmit={(e)=>e.preventDefault()} className="flex flex-wrap shadow md:py-16 rounded-md bg-white w-full p-6 mt-20 md:w-800 m-auto">
            <fieldset className="md:flex md:flex-wrap md:w-full">
                <InputField labelText="Burn Old Token" textColor="red-400" />
                <div className="flex w-full justify-center pt-6 pb-4 md:w-1/5"><img className="h-6 mt-4" src="/swapicon.png" alt="swap" /></div>
                <InputField labelText="Mint New Token" textColor="greenish" />
            </fieldset>
        </form>
        <div className="flex flex-wrap justify-between w-full mt-10 md:w-800 m-auto">
                <Button text="Approve" bgActive="greenish" bgInactive="white" disabled={false} />
                <Button text="Mint" bgActive="greenish" bgInactive="white" disabled={true} />
        </div>
        </>
    )
}

function InputField({labelText, textColor}){
    return (
        <label className={`w-full text-${textColor} inline-block font-medium md:w-2/5`}>
                {labelText}
                <input className={`w-full border rounded-md h-10 pl-2 text-xl mt-2 outline-none text-light-brown border-${textColor}`} placeholder="0.00" type="number"/>
        </label>
    )
}

function Button({text, bgActive, bgInactive, disabled}){
    const activeColor = disabled ? bgInactive : bgActive
    const textColor = disabled ? bgActive : bgInactive
    return (
        <button className={`h-10 shadow rounded-md bg-${activeColor} border border-${bgActive} text-${textColor} w-32 md:w-5/12 inline-block`}>
            {text}
        </button>
    )
}