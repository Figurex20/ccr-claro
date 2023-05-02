import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { store } from '../redux/store'
import { Provider } from 'react-redux'
import SSRProvider from 'react-bootstrap/SSRProvider'
import 'bootstrap/dist/css/bootstrap.min.css'
export default function App ({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <SSRProvider>
        <Component {...pageProps} />
      </SSRProvider>
    </Provider>
  )
}
