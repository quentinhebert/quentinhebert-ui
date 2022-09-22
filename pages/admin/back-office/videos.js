import React, { useContext } from "react";
import Head from "next/head";
import Navbar from "../../../components/Navigation/Navbars/navbar";
import Footer from "../../../components/Navigation/Footers/Footer";
import { USERTYPES } from "../../../enums/userTypes";
import Redirect from "../../../components/Navigation/redirect";
import { UserContext } from "../../../contexts/UserContext";
import AdminVideosPanel from "../../../components/Layouts/admin/AdminVideosPanel";
import { Typography } from "@mui/material";

export default function Videos(props) {
  const {} = props;

  // Check if user has grant to access that page
  const { user } = useContext(UserContext);
  if (!user || user.type !== USERTYPES.ADMIN) return <Redirect />;

  return (
    <>
      <Head>
        <title>Mathias Mortelmans Films | Edit videos</title>
        <meta name="description" content="Edit panel for admin" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Navbar />

      <AdminVideosPanel />
      <Footer bgColor="#272727" />
    </>
  );
}
