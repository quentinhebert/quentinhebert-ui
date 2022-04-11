import React from "react";
import Head from "next/head";
import styles from "../../styles/Home.module.css";
import Navbar from "../../components/Navigation/Navbars/navbar";
import Footer from "../../components/Navigation/Footers/Footer";
import withUser from "../../components/hocs/withUser";
import { USERTYPES } from "../../enums/userTypes";
import { useRouter } from "next/router";
import Redirect from "../../components/Navigation/redirect";

function AdminPage(props) {
  const { user } = props;
  console.log("user", user);
  const router = useRouter();

  if (!(!!user && user.type === USERTYPES.ADMIN)) return <Redirect />;

  return (
    <>
      <Head>
        <title>Polygones | ADMIN</title>
        <meta name="description" content="Développeur" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <main className={styles.main}>
        <a onClick={(e) => router.push("/")}>On est sur la page ADMIN</a>
      </main>
      <Footer />
    </>
  );
}

export default withUser(AdminPage);
