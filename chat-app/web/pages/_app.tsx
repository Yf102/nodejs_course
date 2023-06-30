import '../styles/globals.scss'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import { useRouter } from 'next/router'
import { Provider } from 'react-redux'
import store from 'store/store'
import React from 'react'

function MyApp({ Component, pageProps }: AppProps) {
  const router = useRouter()
  const canonicalUrl = `${process.env.NEXT_PUBLIC_BASE_PATH}${
    router.asPath.split('?')[0]
  }`

  return (
    <>
      <Head>
        <title key='title'>Chat App Web</title>
        <meta key='description' name='description' content='Chat App Web' />
        <link rel='canonical' href={canonicalUrl} />

        {/* Open Graph */}
        <meta key='og-title' property='og:title' content='Chat App Web' />
        <meta
          key='og-description'
          property='og:description'
          content='Chat App Web'
        />
        <meta property='og:url' content={canonicalUrl} />
        {/* Open Graph */}

        <meta
          name='viewport'
          content='width=device-width,minimum-scale=1,maximum-scale=5,initial-scale=1'
        />
      </Head>

      <Provider store={store}>
        <Component {...pageProps} />
      </Provider>
    </>
  )
}

export default MyApp
