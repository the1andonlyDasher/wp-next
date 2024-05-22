import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "@/styles/globals.css"
import '@/styles/scss/style.scss'
import type { AppProps } from 'next/app'
import Layout from "@/components/layout";


export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout  >
      <Component {...pageProps} />
    </Layout>

  )
}
