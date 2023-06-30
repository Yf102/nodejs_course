import styles from '../styles/Home.module.scss'

const Home = ({}) => {
  return (
    <div data-testid='home-element' className={styles.container}>
      <div className='grid grid-cols-12 auto-rows-max mx-auto max-w-3xl'>
        <div className='col-span-12 px-3 md:px-6'>This is my Chat App Web</div>
      </div>
    </div>
  )
}

export default Home

// For SSR (performance gain with pre-rendering the page)
export const getStaticProps = async () => {
  return {
    props: {},
    revalidate: 86400,
  }
}
