import Head from "next/head";
import { useEffect, useState } from "react";
import Form from "../components/Form";
import Header from "../components/Header"
import Hero from "../components/Hero";
import { loadDetails} from "../scripts";

export default function Home() {
  const [details, setDetails] = useState({})  
  const {connected,  address} = details
  
  return (
    <>
      <Head>
        <title>Burnamint</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="w-full h-screen max-w-1400 mr-auto ml-auto">
        <Header address={address} handleConnect={loadDetails(setDetails)} />
        {
          connected
          ? <Form details={details} setDetails={setDetails} />
          : <Hero handleConnect={loadDetails(setDetails)} />
        }
      </main>
    </>
  );
}
