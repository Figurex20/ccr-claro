import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import SSRProvider from 'react-bootstrap/SSRProvider'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Navigation } from '@/generalComponents/navigation'
import { Spinner } from 'react-bootstrap'

import { useState, useEffect } from 'react'
export default function App ({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if (mounted) {
    return (
      <Provider store={store}>
        <SSRProvider>
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
