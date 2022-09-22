import React, { useContext } from "react";
import Head from "next/head";
import Navbar from "../../../components/Navigation/Navbars/navbar";
import Footer from "../../../components/Navigation/Footers/Footer";
import { USERTYPES } from "../../../enums/userTypes";
import Redirect from "../../../components/Navigation/redirect";
import { UserContext } from "../../../contexts/UserContext";
import { Typography } from "@mui/material";
import AdminAboutPanel from "../../../components/Layouts/admin/AdminAboutPanel";

export default function About(props) {
  const {} = props;

  // Check if user has grant to access that page
  const { user } = useContext(UserContext);
  if (!user || user.type !== USERTYPES.ADMIN) return <Redirect />;

  return (
    <>
      <Head>
        <title>Mathias Mortelmans Films | Edit about page</title>
        <meta name="description" content="Edit panel for admin" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Navbar />

      <AdminAboutPanel user={user} />
      <Footer bgColor="#272727" />
    </>
  );
}
