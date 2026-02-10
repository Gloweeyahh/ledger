
import { FaBell, FaEye, FaLock } from "react-icons/fa";
import { PiQuestionFill, PiGearSixFill } from "react-icons/pi";
import styles from './Main.module.css'
import Form from "./Form";

const Main = () => {
  return (
    <section className={styles.main_section}>
      <div className={styles.flexbox}>
        <div className={styles.top_content}>
          <h1>Device Initialization</h1>
          <p>
            Manage assets in Live securely from your browser. Advanced security
            for assets, made easy.
          </p>
        </div>
        <div className={styles.nav_icons}>
          <ul>
            <li>
              <a href="/">
                <FaBell />
              </a>
            </li>
            <li>
              <a href="/">
                <FaEye />
              </a>
            </li>
            <li>
              <a href="/">
                <PiQuestionFill />
              </a>
            </li>
            <li>
              <a href="/">
                <FaLock />
              </a>
            </li>
            <li>
              <a href="/">
                <PiGearSixFill />
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className={styles.formContainer}>
        <Form/>
      </div>
    </section>
  );
};

export default Main;
