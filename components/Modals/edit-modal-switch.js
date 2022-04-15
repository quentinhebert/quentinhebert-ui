import dynamic from "next/dynamic";
import React from "react";
import withSnacks from "../hocs/withSnacks";
const EditUserForm = dynamic(() => import("./Edit-Modals/edit-user-modal"));

function EditModalSwitch(props) {
  /********** PROPS **********/
  const {
    dataId,
    dataModel,
    openEditModal,
    handleCloseEditModal,
    setSeverity,
    setOpenSnackBar,
    setMessageSnack,
  } = props;

  // MAIN SWITCH
  switch (dataModel) {
    case "edit-user":
      return (
        <EditUserForm
          userId={dataId}
          openEditModal={openEditModal}
          handleCloseEditModal={handleCloseEditModal}
          setSeverity={setSeverity}
          setOpenSnackBar={setOpenSnackBar}
          setMessageSnack={setMessageSnack}
        />
      );
    default:
      return <></>;
  }
}

export default withSnacks(EditModalSwitch);
