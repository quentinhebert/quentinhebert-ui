import React, { useContext } from "react";
import Head from "next/head";
import Navbar from "../../components/Navigation/Navbars/navbar";
import Footer from "../../components/Navigation/Footers/Footer";
import { USERTYPES } from "../../enums/userTypes";
import Redirect from "../../components/Navigation/redirect";
import { UserContext } from "../../contexts/UserContext";
import AdminUsersPanel from "../../components/Layouts/admin/AdminUsersPanel";
import { Typography } from "@mui/material";

export default function AdminUsersManagementPage(props) {
  const {} = props;

  // Check if user has grant to access that page
  const { user } = useContext(UserContext);
  if (!user || user.type !== USERTYPES.ADMIN) return <Redirect />;

  return (
    <>
      <Head>
        <title>Mathias Mortelmans Films | Users</title>
        <meta name="description" content="All the users of your website" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Navbar />

      <AdminUsersPanel />
      <Footer bgColor="#272727" />
    </>
  );
}
