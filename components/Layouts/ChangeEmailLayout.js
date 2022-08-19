import React, { useEffect, useState } from "react";
import { Stack, Typography, Paper, Button } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Footer from "../../components/Navigation/Footers/Footer";
import Navbar from "../../components/Navigation/Navbars/navbar";
import AlertInfo from "../../components/Other/alert-info";
import { errorCodes } from "../../config/errorCodes";
import apiCall from "../../services/apiCalls/apiCall";
import withSnacks from "../../components/hocs/withSnacks";

const Custom401 = dynamic(() => import("../../pages/401"));

function ChangeEmailLayout(props) {
  /********** PROPS **********/
  const { setMessageSnack, setOpenSnackBar, setSeverity } = props;

  /********** ROUTER & URL PARAMS **********/
  const router = useRouter();
  const token = router.query.token;

  /********** USE-STATES **********/
  const [emailChanged, setEmailChanged] = useState(false);
  const [error, setError] = useState({
    show: false,
    severity: "warning",
    text: "The access is denied.",
    title: "Invalid token",
  });

  /********** INITIAL CHECK **********/
  // Before all, let's check if user has clicked on the link from email-confirmation email
  useEffect(() => {
    (async () => {
      if (token) {
        const res = await apiCall.unauthenticated.changeEmail(token);
        if (!res) setError({ ...error, show: true });

        if (res.status && res.status === 204) setEmailChanged(true);
        else {
          const jsonRes = await res.json();
          if (jsonRes.code === errorCodes.EMAIL_CHANGE_INVALID_TOKEN)
            return setError({ ...error, show: true });
        }
      }
    })();
  }, [token]);

  if (!token) return <Custom401 />;

  return (
    <>
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
            {emailChanged ? (
              <Typography
                component="h1"
                variant="h6"
                sx={{ marginBottom: "2rem" }}
              >
                Email address updated ✅
              </Typography>
            ) : (
              <Typography
                component="h1"
                variant="h6"
                sx={{ marginBottom: "2rem" }}
              >
                Please wait... We are almost there !
              </Typography>
            )}

            {emailChanged ? (
              <>
                <Typography variant="body1">
                  {`Your email address is now updated. You can
                  update it again, you just have to go to "My account
                  > My personal information"`}
                </Typography>
                <Stack
                  justifyContent="center"
                  alignItems="center"
                  sx={{ marginTop: "2rem" }}
                >
                  <Button
                    variant="outlined"
                    onClick={() => router.push("/account/personal-information")}
                  >
                    Go to my account
                  </Button>
                </Stack>
              </>
            ) : error.show ? (
              <AlertInfo content={error} />
            ) : (
              <Typography variant="body1">
                Please wait, we are confirming your email address...
              </Typography>
            )}
          </Paper>
        </Stack>
      </Stack>
      <Footer />
    </>
  );
}

export default withSnacks(ChangeEmailLayout);
