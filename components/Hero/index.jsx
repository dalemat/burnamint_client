const mainText = "Burn Old Tokens and Get New Tokens Instantly"
const mainDesc = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Auctor natoque lorem faucibus et posuere non. Massa cras luctus risus, donec aliquet eu, risus. Nibh bibendum viverra ut est."
export default function({setConn}){
    return (
        <div className="flex flex-wrap justify-center items-center">
            <h1 className="text-center text-brownish text-2xl w-300 md:w-690 md:text-6xl leading-tight">
                {mainText}
            </h1>
            <p className="text-center text-light-brown md:w-800 text-xl px-4 mt-4 md:mt-8">{mainDesc}</p>
            <div className="flex flex-wrap justify-center w-full my-6 md:my-12">
                <div className="bg-white rounded-md shadow p-4"><img src="/metamask.png" alt="metamask"/></div>
            </div>
            <div className="text-light-brown w-full text-center md:text-xl">Connect your wallet to mint</div>
            <button onClick={()=>setConn(true)} className="bg-greenish text-white rounded-md h-10 md:h-16 mt-6 px-8 md:px-16 md:mt-8">CONNECT METAMASK</button>
        </div>
    )
}