import { Stack, Typography, TextField, Paper } from "@mui/material";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import withSnacks from "../../components/hocs/withSnacks";
import Footer from "../../components/Navigation/Footers/Footer";
import Navbar from "../../components/Navigation/Navbars/navbar";
import AlertInfo from "../../components/Other/alert-info";
import { BottomButtons } from "../../components/Other/bottom-buttons";
import apiCall from "../../services/apiCalls/apiCall";

const Custom401 = dynamic(() => import("../401"));

function ResetPassordPage(props) {
  /********** PROPS **********/
  const { setMessageSnack, setOpenSnackBar, setSeverity } = props;

  /********** ROUTER & URL PARAMS **********/
  const router = useRouter();
  const token = router.query.token;

  /********** USE-STATES **********/
  const [userId, setUserId] = useState(null);
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordResetSuccess, setPasswordResetSuccess] = useState("");
  const [showAlert, setShowAlert] = useState({
    show: false,
    type: null,
    text: null,
  });
  const mainButtonDisabled = !(
    passwordConfirmation &&
    password &&
    passwordConfirmation.trim() !== "" &&
    password.trim() !== ""
  );

  /********** INITIAL CHECK **********/
  // Before all, let's check if user has a good token to reset his/her password and not the one of someone else
  useEffect(() => {
    (async () => {
      const res = await apiCall.unauthenticated.passwordResetAccess(token);
      if (!(res && res.ok)) return null;
      const user = await res.json();
      if (user) {
        setUserId(user.id);
      }
    })();
  }, [token]);

  /********** FUNCTIONS **********/
  const resetPassword = async () => {
    if (!userId && !token) return null;
    const res = await apiCall.unauthenticated.passwordReset({
      token,
      password,
      id: userId,
    });
    if (res && res.ok) {
      setMessageSnack("Votre mot de passe a bien été changé");
      setOpenSnackBar(true);
      setSeverity("success");

      setShowAlert({
        show: true,
        severity: "success",
        text: "Ton mot de passe a été réinitialisé avec succès. Tu vas être redirigé vers la page dans 5 secondes.",
      });
      setPasswordResetSuccess(true);

      setTimeout(() => {
        router.push("/");
      }, 5000);
    } else {
      const jsonRes = await res.json();
      setMessageSnack("Problème");
      setOpenSnackBar(true);
      setSeverity("error");
      setShowAlert({
        show: true,
        severity: "warning",
        text: `Un problème est survenu lors de la réinitialisation de ton mot de passe. [CodeError: ${jsonRes.code}]`,
      });
    }
  };

  if (!userId) return <Custom401 />;

  return (
    <>
      <Head>
        <title>Polygones | À propos du site</title>
        <meta
          name="description"
          content="Polygones | Quelques infos au sujet de mon site internet..."
        />
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
            <Typography
              component="h1"
              variant="h6"
              sx={{ marginBottom: "2rem" }}
            >
              Réinitialisation de ton mot de passe
            </Typography>
            {passwordResetSuccess ? (
              <Stack alignItems="center" justifyContent="center" gap={2}>
                <AlertInfo content={showAlert} />
              </Stack>
            ) : (
              <Stack alignItems="center" justifyContent="center" gap={2}>
                <TextField
                  required
                  label="Mot de passe"
                  color="primary"
                  sx={{ width: "100%" }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <TextField
                  required
                  label="Répétez le mot de passe"
                  color="primary"
                  sx={{ width: "100%" }}
                  value={passwordConfirmation}
                  onChange={(e) => setPasswordConfirmation(e.target.value)}
                />
                {showAlert.show ? <AlertInfo content={showAlert} /> : null}
                <BottomButtons
                  cancelOnChange={(e) => router.push("/")}
                  mainButtonText="Enregistrer"
                  mainButtonOnClick={resetPassword}
                  mainButtonDisabled={mainButtonDisabled}
                />
              </Stack>
            )}
          </Paper>
        </Stack>
      </Stack>
      <Footer bgColor={(theme) => theme.palette.background.main} />
    </>
  );

  return <>AUTHORISATION OKLM MAMENE</>;
}

export default withSnacks(ResetPassordPage);
