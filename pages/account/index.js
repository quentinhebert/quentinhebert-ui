import React, { useContext } from "react";
import Head from "next/head";
import Navbar from "../../components/Navigation/Navbars/navbar";
import Footer from "../../components/Navigation/Footers/Footer";
import Redirect from "../../components/Navigation/redirect";
import { UserContext } from "../../contexts/UserContext";
import AccountIndex from "../../components/Layouts/account/AccountIndex";

function AccountIndexPage(props) {
  const {} = props;

  // Check if user has grant to access that page
  const { user } = useContext(UserContext);
  if (!user) return <Redirect />;

  return (
    <>
      <Head>
        <title>Polygones | Mon compte | Mes informations personnelles</title>
        <meta name="description" content="Page mon compte" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <AccountIndex user={user} />
      <Footer bgColor="#272727" />
    </>
  );
}

export default AccountIndexPage;
