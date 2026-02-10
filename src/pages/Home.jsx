import styles from './Home.module.css'
import Sidebar from './../components/Sidebar';
import Main from '../components/Main';

const Home = () => {
    const logoPath = '../assets/logo.jsx';
  return (
    <main className={styles.flexbox}>
      <Sidebar logoSrc={logoPath}/>
      <Main/>
    </main>
  )
}

export default Home
