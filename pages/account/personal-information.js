import React, { useContext } from "react";
import Head from "next/head";
import Navbar from "../../components/Navigation/Navbars/navbar";
import Footer from "../../components/Navigation/Footers/Footer";
import { USERTYPES } from "../../enums/userTypes";
import Redirect from "../../components/Navigation/redirect";
import { UserContext } from "../../contexts/UserContext";
import ChangePersonalInformation from "../../components/Layouts/account/ChangePersonalInformation";
import ChangePassword from "../../components/Layouts/account/ChangePassword";
import { Link, Stack, Typography } from "@mui/material";
import { useRouter } from "next/router";

function PersonalInformationPage(props) {
  const {} = props;

  const router = useRouter();

  // Check if user has grant to access that page
  const { user, setUser } = useContext(UserContext);
  if (!user) return <Redirect />;

  return (
    <>
      <Head>
        <title>Polygones | Mon compte</title>
        <meta name="description" content="Page mon compte" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />

      <Stack padding={2}>
        <Typography component="h6" variant="h6">
          <Link onClick={() => router.push("/account")} href="#" color="#000">
            Mon compte
          </Link>
          {" / Mes informations personnelles"}
        </Typography>
      </Stack>

      <ChangePersonalInformation user={user} setUser={setUser} />
      <ChangePassword user={user} setUser={setUser} />

      <Footer bgColor="#272727" />
    </>
  );
}

export default PersonalInformationPage;
