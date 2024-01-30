import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import SSRProvider from 'react-bootstrap/SSRProvider'
// import { Spinner } from 'react-bootstrap'
import { Pagination } from '@/generalComponents/Pagination'
import { useState, useEffect } from 'react'
import Head from 'next/head'
import { Navigation } from '@/generalComponents/navigation'
import 'bootstrap/dist/css/bootstrap.min.css'
import { useRouter } from 'next/router'

export default function App ({ Component, pageProps }: AppProps) {
  const [mounted, setMounted] = useState(false)
  const router = useRouter()
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

          <header className='position-fixed w-100'>
            <Navigation />
          </header>

          <body className='pt-5'>
            <Component {...pageProps} />
          </body>

          <footer className='position-fixed bottom-0 end-0 w-100'>
            {router.pathname === '/' ? <Pagination /> : null}
            {router.pathname === '/informationSites' ? <Pagination /> : null}
          </footer>

        </SSRProvider>

      </Provider>
    )
  // } else {
  //   return (
  //     <Spinner animation='border' role='status'>
  //       <span className='visually-hidden'>Loading...</span>
  //     </Spinner>
  //   )
  }
}
