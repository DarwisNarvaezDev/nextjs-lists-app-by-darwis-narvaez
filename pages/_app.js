import { Router } from 'next/router';
import { useEffect, useState } from 'react';
import Spinner from '../components/spinner/Spinner';
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  const [showSpinner, setShowSpinner] = useState(false);

  useEffect(() => {
    
    const start = () => {
      console.log("start");
      setShowSpinner(true);
    };
    const end = () => {
      console.log("findished");
      setShowSpinner(false);
    };
    Router.events.on("routeChangeStart", start);
    Router.events.on("routeChangeComplete", end);
    Router.events.on("routeChangeError", end);
    return () => {
      Router.events.off("routeChangeStart", start);
      Router.events.off("routeChangeComplete", end);
      Router.events.off("routeChangeError", end);
    };

  }, [])

  return (
  <>
  { showSpinner && <Spinner /> }
  <Component {...pageProps} />
  </>
  )

}

export default MyApp
