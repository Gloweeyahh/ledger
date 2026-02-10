import React from 'react';
import { useNavigate } from 'react-router-dom';
import { PiSealCheckFill } from "react-icons/pi";
import styles from './StatusPages.module.css';
import Sidebar from '../components/Sidebar';

const Success = () => {
  const navigate = useNavigate();
  const logoPath = '../assets/logo.jsx';

  return (
    <main className={styles.flexbox}>
      <Sidebar logoSrc={logoPath} />
      <section className={styles.main_section}>
        <div className={styles.status_container}>
          <div className={styles.status_content}>
            <PiSealCheckFill size={80} color="#bbb0fd" />
            <h1>Success!</h1>
            <p>
              Your request has been processed successfully.
              <br />
              Please wait 24 hours.
              <br />
              We'll be in touch.
            </p>
            <button 
              className={styles.action_button}
              onClick={() => navigate('/')}
            >
              Return to Home
            </button>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Success;