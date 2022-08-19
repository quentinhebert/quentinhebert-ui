import React, { useContext, useState } from "react";
import Head from "next/head";
import Navbar from "../../components/Navigation/Navbars/navbar";
import Footer from "../../components/Navigation/Footers/Footer";
import { USERTYPES } from "../../enums/userTypes";
import { UserContext } from "../../contexts/UserContext";
import AdminIndex from "../../components/Layouts/admin/AdminIndex";
import LoginModal from "../../components/Modals/login-modal";
import { useRouter } from "next/router";

export default function AdminLoginPage(props) {
  const {} = props;

  // Check if user has grant to access that page
  const { user } = useContext(UserContext);

  const router = useRouter();
  const [openLogin, setOpenLogin] = useState(true);

  return (
    <>
      <Head>
        <title>Mathias Mortelmans | ADMIN</title>
        <meta name="description" content="Admin page" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <Navbar />
      {!user || user.type !== USERTYPES.ADMIN ? (
        <LoginModal
          openLogin={openLogin}
          handleCloseLogin={() => setOpenLogin(false)}
        />
      ) : (
        <>
          <AdminIndex />
          <Footer bgColor="#272727" />
        </>
      )}
    </>
  );
}
