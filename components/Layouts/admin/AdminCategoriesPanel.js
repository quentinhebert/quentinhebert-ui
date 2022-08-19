import { Link, Stack, Typography } from "@mui/material";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import { compose } from "redux";
import withConfirmAction from "../../hocs/withConfirmAction";
import withSnacks from "../../hocs/withSnacks";
import EditCategories from "./EditCategories";

function AdminCategoriesPanel(props) {
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

  /***************** FUNCTIONS *****************/
  // Function to round param at closest decimal
  const formatter = new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <Stack justifyContent="center" direction="column" gap={4} padding="1rem">
      <Typography component="h6" variant="h6">
        <Link onClick={() => router.push("/admin")} href="#" color="#000">
          Dashboard
        </Link>
        {" > Edit categories"}
      </Typography>

      <Typography component="span" variant="body1">
        Beneath, you can edit the different categories of your homepage.
      </Typography>
      <Stack alignItems="center" justifyContent="center" direction="column">
        <EditCategories />
      </Stack>
    </Stack>
  );
}

export default compose(withSnacks, withConfirmAction)(AdminCategoriesPanel);
