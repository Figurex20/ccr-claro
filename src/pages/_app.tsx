import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import SSRProvider from 'react-bootstrap/SSRProvider'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navigation } from '@/generalComponents/navigation'
import { Spinner } from 'react-bootstrap'

import { useState, useEffect } from 'react'
import Head from 'next/head'
export default function App ({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if (mounted) {
    return (
      <Provider store={store}>

        <SSRProvider>

          <Head>
            <title>CCR</title>
            <meta name='description' content='Claro page' />
            <meta name='viewport' content='width=device-width, initial-scale=1' />
            <link rel='icon' href='/favicon.ico' />
          </Head>

          <Navigation />

          <Component {...pageProps} />

        </SSRProvider>

      </Provider>
    )
  } else {
    return (
      <Spinner animation='border' role='status'>
        <span className='visually-hidden'>Loading...</span>
      </Spinner>
    )
  }
}
