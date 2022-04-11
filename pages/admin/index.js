import React, { useContext } from "react";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Navbar from "../../components/Navigation/Navbars/navbar";
import Footer from "../../components/Navigation/Footers/Footer";
import { USERTYPES } from "../../enums/userTypes";
import Redirect from "../../components/Navigation/redirect";
import { UserContext } from "../../contexts/UserContext";

function AdminPage(props) {
  const {} = props;

  // Check if user has grant to access that page
  const { user } = useContext(UserContext);
  if (!user || user.type !== USERTYPES.ADMIN) return <Redirect />;

  return (
    <>
      <Head>
        <title>Polygones | ADMIN</title>
        <meta name="description" content="Développeur" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <main className={styles.main}>On est sur la page ADMIN</main>
      <Footer />
    </>
  );
}

export default AdminPage;
