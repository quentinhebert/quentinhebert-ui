import { Link, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { compose } from "redux";
import withConfirmAction from "../../hocs/withConfirmAction";
import withSnacks from "../../hocs/withSnacks";
import EditAboutPage from "./EditAboutPage";

function AdminAboutPanel(props) {
  const {
    user,
    setSeverity,
    setOpenSnackBar,
    setMessageSnack,
    setActionToFire,
    setOpenConfirmModal,
    setConfirmTitle,
    setNextButtonText,
    setConfirmContent,
  } = props;

  const router = useRouter();

  return (
    <Stack justifyContent="center" direction="column" gap={4} padding="1rem">
      <Typography component="h6" variant="h6">
        <Link onClick={() => router.push("/admin")} href="#" color="#000">
          Dashboard
        </Link>
        {" > Edit About page"}
      </Typography>

      <Typography component="span" variant="body1">
        Beneath, you can edit the different content of your About page.
      </Typography>
      <Stack alignItems="center" justifyContent="center" direction="column">
        <EditAboutPage />
      </Stack>
    </Stack>
  );
}

export default compose(withSnacks, withConfirmAction)(AdminAboutPanel);
