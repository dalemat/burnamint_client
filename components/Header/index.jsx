import Logo from "./logo"

export default function Header(){
    return (
        <div className="flex justify-between w-full font-sans bg-white items-center p-6 px-4 md:px-20 h-20">
            <img className="h-4 md:h-5" src="/logo.png" alt="burnamint logo" />
            <button className="h-6 text-sm md:text-base md:h-8 px-2 rounded-md text-greenish border border-light-brown font-sans">CONNECT WALLET</button>
        </div>
    )
}
