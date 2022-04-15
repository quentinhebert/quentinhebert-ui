import React, { useContext } from "react";
import Head from "next/head";
import Navbar from "../../components/Navigation/Navbars/navbar";
import Footer from "../../components/Navigation/Footers/Footer";
import { USERTYPES } from "../../enums/userTypes";
import Redirect from "../../components/Navigation/redirect";
import { UserContext } from "../../contexts/UserContext";
import AdminIndex from "../../components/Layouts/admin/AdminIndex";

function AdminIndexPage(props) {
  const {} = props;

  // Check if user has grant to access that page
  const { user } = useContext(UserContext);
  if (!user || user.type !== USERTYPES.ADMIN) return <Redirect />;

  return (
    <>
      <Head>
        <title>Polygones | ADMIN</title>
        <meta name="description" content="Admin page" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <AdminIndex />
      <Footer bgColor="#272727" />
    </>
  );
}

export default AdminIndexPage;
