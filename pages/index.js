import Head from "next/head";
import { useEffect, useState } from "react";
import { loadDetails, burnamintAddress, oldTokenAddress, newTokenAddress } from "../scripts";
import styles from "../styles/Home.module.css";

export default function Home() {
  const [details, setDetails] = useState({})
  const {connected, burnamintContract, oldTokenDecimals, address, oldTokenBalance, newTokenBalance, oldTokenAllowance, oldToken, newToken} = details
  const [burnValue, setBurnValue] = useState(0)
  const enoughAllowance = oldTokenAllowance >= burnValue
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
    await burnamintContract.burnamint(oldTokenAddress, newTokenAddress, address, String(value))
    const filter = burnamintContract.filters.BurnaMint(oldTokenAddress, newTokenAddress, address, null, null)
    burnamintContract.on(filter, async () => {
      await loadDetails(setDetails)(false)
    })
  }

  console.log({enoughAllowance, oldTokenBalance, burnValue, oldTokenAllowance})
  return (
    <div className={styles.container}>
      <Head>
        <title>Burnamint</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div>
          <div>Address: {address}</div>
          <div>Old Token Balance: {oldTokenBalance}</div>
          <div>New Token Balance: {newTokenBalance}</div>
        </div>
        <form onSubmit={(e) => e.preventDefault()}>
          <label className={styles.label}>
            Burn Old Token
            <input value={burnValue} onChange={e => setBurnValue(e.target.value)}/>
          </label>

          <label className={styles.label}>
            Receive New Token
            <input disabled value={burnValue/10}/>
          </label>

          <div>
            {
              !connected
              ? <button onClick={loadDetails(setDetails)}>Connect wallet</button>
              : <>
                  <button disabled={(enoughAllowance||oldTokenBalance<=burnValue)} onClick={handleApprove}>Approve</button>
                  <button disabled={!enoughAllowance&&burnValue>=oldTokenAllowance} onClick={handleBurn}>Burnamint</button>
               </>
            }
          </div>
        </form>
      </main>
    </div>
  );
}
