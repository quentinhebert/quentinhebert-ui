import { Stack, Typography, Paper, Button } from "@mui/material";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import withSnacks from "../../components/hocs/withSnacks";
import Footer from "../../components/Navigation/Footers/Footer";
import Navbar from "../../components/Navigation/Navbars/navbar";
import AlertInfo from "../../components/Other/alert-info";
import { errorCodes } from "../../config/errorCodes";
import apiCall from "../../services/apiCalls/apiCall";

const Custom401 = dynamic(() => import("../401"));

function EmailConfirmationPage(props) {
  /********** PROPS **********/
  const { setMessageSnack, setOpenSnackBar, setSeverity } = props;

  /********** ROUTER & URL PARAMS **********/
  const router = useRouter();
  const token = router.query.token;

  /********** USE-STATES **********/
  const [userId, setUserId] = useState(null);
  const [emailConfirmed, setEmailConfirmed] = useState(false);
  const [error, setError] = useState({
    show: false,
    severity: "warning",
    text: "L'accès demandé n'est pas autorisé.",
    title: "Token invalide",
  });

  /********** INITIAL CHECK **********/
  // Before all, let's check if user has clicked on the link from email-confirmation email
  useEffect(() => {
    (async () => {
      if (token) {
        const res = await apiCall.unauthenticated.emailConfirm(token);
        if (!res) setError({ ...error, show: true });

        if (res.status && res.status === 204) setEmailConfirmed(true);
        else {
          const jsonRes = await res.json();
          if (jsonRes.code === errorCodes.EMAIL_CONFIRM_INVALID_TOKEN)
            return setError({ ...error, show: true });
        }
      }
    })();
  }, [token]);

  if (!token) return <Custom401 />;

  return (
    <>
      <Head>
        <title>Polygones | À propos du site</title>
        <meta name="description" content="Polygones | Confirmation d'e-mail" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Navbar />
      <Stack
        justifyContent="center"
        alignItems="center"
        sx={{ margin: "2rem auto" }}
      >
        <Stack
          alignItems="center"
          justifyContent="center"
          sx={{ margin: "1rem auto" }}
        >
          <Paper variant="contained" sx={{ padding: "3rem" }}>
            {emailConfirmed ? (
              <Typography
                component="h1"
                variant="h6"
                sx={{ marginBottom: "2rem" }}
              >
                Adresse e-mail confirmée
              </Typography>
            ) : (
              <Typography
                component="h1"
                variant="h6"
                sx={{ marginBottom: "2rem" }}
              >
                Encore quelques instants svp...
              </Typography>
            )}

            {emailConfirmed ? (
              <>
                <Typography variant="body1">
                  Ton adresse e-mail est désormais confirmée. Tu peux utiliser
                  la plateforme dans son intégralité ! Enjoy 😎
                </Typography>
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  sx={{ marginTop: "2rem" }}
                >
                  <Button variant="outlined" onClick={() => router.push("/")}>
                    Page d'accueil
                  </Button>
                </Stack>
              </>
            ) : error.show ? (
              <AlertInfo content={error} />
            ) : (
              <Typography variant="body1">
                Un peu de patience... Nous tentons de confirmer ton adresse
                e-mail.
              </Typography>
            )}
          </Paper>
        </Stack>
      </Stack>
      <Footer bgColor={(theme) => theme.palette.background.main} />
    </>
  );
}

export default withSnacks(EmailConfirmationPage);
