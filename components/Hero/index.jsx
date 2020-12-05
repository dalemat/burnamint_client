const mainText = "Burn Dalc Erc20 Tokens and Get Dfine Tokens. Ratio 10:1"
const mainDesc = " 80,000 Dfine tokens reserved for the swap."
export default function Hero({handleConnect}){
    return (
        <div className="flex flex-wrap justify-center items-center md:mt-20">
            <h1 className="text-center text-brownish text-2xl w-300 md:w-710 md:text-5xl font-bold leading-tight">
                {mainText}
                
            </h1>
            <p className="text-center text-light-brown md:w-800 text-xl px-4 mt-4 md:mt-4">{mainDesc}</p>
            <div className="flex flex-wrap justify-center w-full my-6 md:my-6">
                <div className="bg-white rounded-md shadow p-4 hover:shadow-lg cursor-pointer"><img src="/metamask.png" alt="metamask"/></div>
            </div>
            <div className="text-light-brown w-full text-center md:text-xl">Connect your wallet to mint</div>
            <button onClick={handleConnect} className="bg-greenish hover:bg-fade-green text-white rounded-md shadow-md hover:shadow-lg h-10 md:h-16 mt-6 px-8 md:px-16 md:mt-8">CONNECT METAMASK</button>
        
        </div>
    )
    
}
