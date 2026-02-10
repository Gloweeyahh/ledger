import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RiAlertLine } from "react-icons/ri";
import { FaArrowsRotate } from "react-icons/fa6";
import styles from './StatusPages.module.css';
import Sidebar from '../components/Sidebar';

const Error = () => {
  const navigate = useNavigate();
  const logoPath = '../assets/logo.jsx';

  const handleRetry = () => {

    navigate(-1);
 
  };

  return (
    <main className={styles.flexbox}>
      <Sidebar logoSrc={logoPath} />
      <section className={styles.main_section}>
        <div className={styles.status_container}>
          <div className={styles.status_content}>
            <RiAlertLine size={80} color="red" />
            <h1>Error</h1>
            <p>
              Something went wrong while processing your request.
              <br />
              Please try again or contact support if the problem persists.
            </p>
            <div className={styles.error_buttons}>
              <button 
                className={styles.retry_button}
                onClick={handleRetry}
              >
                <FaArrowsRotate />
                <span>Try Again</span>
              </button>
              <button 
                className={styles.home_button}
                onClick={() => navigate('/')}
              >
                Return to Home
              </button>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default Error;