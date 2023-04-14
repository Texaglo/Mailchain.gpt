import Head from "next/head";
import Image from "next/image";
import MailSender from "../Components/MailSender/MailSender";
import styles from "../styles/Home.module.css";

const index = () => {
  return (
    <div className={styles.Home}>
      <MailSender />
    </div>
  );
};

export default index;
